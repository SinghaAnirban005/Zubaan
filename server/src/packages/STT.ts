import { DeepgramClient } from "@deepgram/sdk"
import fs from "fs"
import fsPromises from "fs"

class SpeechToText {

    private static instance: SpeechToText
    private deepgram: DeepgramClient

    private constructor(){
        this.deepgram = new DeepgramClient({
            apiKey: process.env.DEEPGRAM_API_KEY
        })
    }

    static getInstance(): SpeechToText {
        if(!SpeechToText.instance){
            SpeechToText.instance = new SpeechToText()
        }

        return SpeechToText.instance
    }

    async getText(audioPath: string): Promise<any> {
            try {
        const result = await this.deepgram.listen.v1.media.transcribeFile(
            fs.createReadStream(audioPath),
            {
                model: "nova-3",
                language: 'hi',
                smart_format: true,
            }
        );
        
        return result;
    } catch (error) {
        console.error(`Transcription failed for ${audioPath}:`, error);
        throw error;
    } finally {
        try {
            if (fs.existsSync(audioPath)) {
                await fsPromises.unlink(audioPath, () => {});
                console.log(`Successfully deleted: ${audioPath}`);
            }
        } catch (cleanupError) {
            console.error(`Failed to delete file: ${audioPath}`, cleanupError);
        }
    }
}
}

export { SpeechToText }