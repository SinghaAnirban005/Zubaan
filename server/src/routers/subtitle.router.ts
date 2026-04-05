import { Router, Request, Response } from "express";
import { SubtitleGenerator } from "../packages/subtitle";
import fs from "fs"
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router()

const subtitleProcessor = SubtitleGenerator.getInstance()

router.post('/generate', authMiddleware, async(req, res) => {
    try {
        const { sentences, videoPath } = req.body

        if(!sentences){
            res.status(400).json({
                message: 'Invalid input'
            })
            return
        }

        if (!videoPath || !fs.existsSync(videoPath)) {
            res.status(400).json({ error: 'videoPath missing or file no longer exists' })
            return
        }

        const subtitles = subtitleProcessor.generateSRT({
            sentences: sentences
        })

        if(!subtitles){
            res.status(400).json({
                message: 'Subtitles does not exist'
            })
            return
        }

        return res.status(200).json({
            message: 'Generated subtitles',
            data: subtitles,
            videoPath: videoPath
        })

    } catch (error) {
        console.error(error)
        throw error
    }
})

router.post('/burn', authMiddleware, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId

  const job = await prisma.subtitle.create({
    data: {
      userId: userId,
      srtData: '',
      status: 'PENDING'
    }
  })

  const { srt, videoPath } = req.body

  if (!srt || !videoPath) {
    res.status(400).json({ error: 'srt and videoPath are required' })
    return
  }

  if (!fs.existsSync(videoPath)) {
    res.status(404).json({ error: 'Video file not found — it may have been cleaned up. Re-upload.' })
    return
  }

  await prisma.subtitle.update({
    where: {
      id: job.id
    },
    data: {
      srtData: srt
    }
  })

  const srtPath    = `${videoPath}.srt`
  const outputPath = `${videoPath}_burned.mp4`

  try {
    fs.writeFileSync(srtPath, srt, 'utf8')
    await subtitleProcessor.burnSubtitles(videoPath, srtPath, outputPath)

    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Disposition', `attachment; filename="subtitled_${Date.now()}.mp4"`)

    const readStream = fs.createReadStream(outputPath)
    readStream.pipe(res)

    readStream.on('close', async() => {
      [videoPath, srtPath, outputPath].forEach((f) => {
        if (fs.existsSync(f)) fs.unlinkSync(f)
      })

      await prisma.subtitle.update({
      where: {
        id: job.id
      },
      data: {
        status: 'DONE'
      }
    })
    })

    readStream.on('error', async (streamErr) => {
      console.error('Stream error:', streamErr)
      await prisma.subtitle.update({
        where: { id: job.id },
        data:  { status: 'FAILED' }
      })
    })

  } catch (err) {
    [srtPath, outputPath].forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f)
    })

    await prisma.subtitle.update({
      where: { id: job.id },
      data: {
        status: 'FAILED'
      }
    })

    res.status(500).json({ error: err })
  }
})

export default router