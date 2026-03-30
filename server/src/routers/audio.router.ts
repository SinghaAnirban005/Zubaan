import { Router, Request, Response } from "express";
import { upload } from "../middlewares/multer";
import { audioProcessor } from "../packages/audio";
import { SpeechToText } from "../packages/STT";
import fs from "fs"

import { HinglishService } from "../packages/hinglish";
import { CleanerService } from "../packages/cleaner";
import { prisma } from "../lib/prisma";

const router: Router = Router()

const cleaner = CleanerService.getInstance()

const speechToText = SpeechToText.getInstance()
const highlishProcessor = HinglishService.getInstance()

router.post('/upload', upload.single("video"), async(req: Request, res: Response) => {
    try {
        const videoPath = req.file?.path

        if(!videoPath){
            res.status(400).json({
                message: "Video path not found"
            })
            return
        }

        const audio = await audioProcessor.extractAudio(videoPath)
        if(!audio){
            res.status(400).json({
                message: "Audio not found"
            })
            return
        }

        const transcript = await speechToText.getText(audio)

        res.status(200).json({
            message: "Transcript ready !!",
            transcript: transcript,
            videoPath: videoPath
        })

        return
    } catch (error) {
        console.error(error)
        
        return res.status(500).json({
            message: error
        })
    }
})

router.post('/generate', async(req, res) => {
    try {
        const { sentences, videoPath } = req.body

        if(!sentences){
            res.status(400).json({
                message: "Missing input"
            })
            return
        }

        if (!videoPath || !fs.existsSync(videoPath)) {
            res.status(400).json({ error: 'videoPath missing or file no longer exists' })
            return
        }

        const result = await highlishProcessor.convert(sentences)

        const cues = await cleaner.chunkIntoWords(result, 3)

        return res.status(200).json({
            message: 'Converted to hinglish',
            videoPath: videoPath,
            data: result,
            cues: cues
        })
    } catch (error) {
        console.error(error)
        
        return res.status(500).json({
            message: 'Server error'
        })
    }
})

export default router