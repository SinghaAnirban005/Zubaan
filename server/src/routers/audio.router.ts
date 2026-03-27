import { Router, Request, Response } from "express";
import { upload } from "../middlewares/multer";
import { audioProcessor } from "../packages/audio";
import { SpeechToText } from "../packages/STT";

const router: Router = Router()

const speechToText = SpeechToText.getInstance()

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
            transcript: transcript
        })

        return
    } catch (error) {
        
    }
})

export default router