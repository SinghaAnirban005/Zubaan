import ffmpeg from "fluent-ffmpeg"
import path from "path"
import fs from "fs"

class AudioProcessor {

    extractAudio(videoPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileName = path.parse(videoPath).name
            const audioPath = path.join('audio', `${fileName}.mp3`)

            if(!fs.existsSync("audio")){
                fs.mkdirSync('audio')
            }

            ffmpeg(videoPath)
                .noVideo()
                .audioCodec("libmp3lame")
                .save(audioPath)
                .on("end", () => {
                    console.log("Audio extracted")
                    resolve(audioPath)
                })
                .on("error", (err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}

export const audioProcessor = new AudioProcessor()