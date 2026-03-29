import { Router, Request, Response } from "express";
import { SubtitleGenerator } from "../packages/subtitle";
import fs from "fs"

const router: Router = Router()

const subtitleProcessor = SubtitleGenerator.getInstance()

router.post('/generate', async(req, res) => {
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

router.post('/burn', async (req: Request, res: Response) => {
  const { srt, videoPath } = req.body

  if (!srt || !videoPath) {
    res.status(400).json({ error: 'srt and videoPath are required' })
    return
  }

  if (!fs.existsSync(videoPath)) {
    res.status(404).json({ error: 'Video file not found — it may have been cleaned up. Re-upload.' })
    return
  }

  const srtPath    = `${videoPath}.srt`
  const outputPath = `${videoPath}_burned.mp4`

  try {
    fs.writeFileSync(srtPath, srt, 'utf8')
    await subtitleProcessor.burnSubtitles(videoPath, srtPath, outputPath)

    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Disposition', `attachment; filename="subtitled_${Date.now()}.mp4"`)

    const readStream = fs.createReadStream(outputPath)
    readStream.pipe(res)

    readStream.on('close', () => {
      // Cleanup everything including original upload
      [videoPath, srtPath, outputPath].forEach((f) => {
        if (fs.existsSync(f)) fs.unlinkSync(f)
      })
    })

  } catch (err) {
    [srtPath, outputPath].forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f)
    })
    res.status(500).json({ error: err })
  }
})

export default router