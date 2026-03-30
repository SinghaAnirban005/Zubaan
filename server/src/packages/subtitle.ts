import { CleanerService } from "./cleaner";
import ffmpeg from "fluent-ffmpeg"
import { ASSProcessor } from "./ASS";
import fs  from "fs"

const assProcessor = ASSProcessor.getInstance()

class SubtitleGenerator {
    private static instance: SubtitleGenerator
    constructor(){}

    static getInstance(): SubtitleGenerator {
        if(!SubtitleGenerator.instance){
            SubtitleGenerator.instance = new SubtitleGenerator()
        }

        return SubtitleGenerator.instance
    }

    toSRTTime(seconds: number){
        const ms = Math.round((seconds % 1) * 1000)
        const s = Math.floor(seconds % 60);
        const m = Math.floor((seconds / 60) % 60);
        const h = Math.floor(seconds / 3600);

        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
    }

    generateSRT(input: any) {
        let sentences;
        const cleaner = CleanerService.getInstance()

        if (input.sentences) {
            sentences = input.sentences;
        } else {
            sentences = cleaner.extractSentences(input);
        }

        const srtBlocks = sentences.map((sentence: any, index: any) => {
            const startTime = this.toSRTTime(sentence.start);
            const endTime = this.toSRTTime(sentence.end);
            return `${index + 1}\n${startTime} --> ${endTime}\n${sentence.text}`;
        });

        return srtBlocks.join('\n\n');
    }

    burnSubtitles(
      inputPath: string,
      srtPath: string,
      outputPath: string
    ): Promise<void> {
      return new Promise((resolve, reject) => {

        // probe video dimensions so ASS PlayRes matches actual video
        ffmpeg.ffprobe(inputPath, (err, meta) => {
          if (err) {
            console.error('ffprobe FAILED:', err)
            return reject(err)
          }

          const stream     = meta.streams.find(s => s.codec_type === 'video')
          const videoWidth  = stream?.width  ?? 1280
          const videoHeight = stream?.height ?? 720

          const assPath = srtPath.replace('.srt', '.ass')
          assProcessor.buildAssFile(srtPath, assPath, videoWidth, videoHeight)

          const escapedAssPath = assPath.replace(/\\/g, '/').replace(/:/g, '\\:')
          const videoFilter = `ass=${escapedAssPath}`

          ffmpeg(inputPath)
            .outputOptions([
              '-vf',    videoFilter,
              '-c:v',   'libx264',
              '-c:a',   'copy',
              '-preset','fast',
              '-crf',   '23',
            ])
            .output(outputPath)
            .on('start',    cmd => console.log(`ffmpeg: ${cmd}`))
            .on('progress', p   => console.log(`Encoding: ${Math.round(p.percent ?? 0)}%`))
            .on('end',   () => {
              fs.unlinkSync(assPath);
              resolve()
            })
            .on('error', err => { if (fs.existsSync(assPath)) fs.unlinkSync(assPath); reject(err) })
            .run()
        })
      })
    }
}

export { SubtitleGenerator }