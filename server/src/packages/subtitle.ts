import { CleanerService } from "./cleaner";
import ffmpeg from "fluent-ffmpeg"

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

    burnSubtitles(inputPath: string, srtPath: string, outputPath: string){
        return new Promise((resolve, reject) => {

    const escapedSrtPath = srtPath.replace(/\\/g, '/').replace(/:/g, '\\:');

    // ASS subtitle style override — controls how subs look on video
    const subtitleStyle = [
      'FontName=Arial',
      'FontSize=18',
      'PrimaryColour=&H00FFFFFF',
      'OutlineColour=&H00000000',
      'Outline=2',
      'Bold=1',
      'Alignment=2',
      'MarginV=30',
    ].join(',');

    ffmpeg(inputPath)
      .outputOptions([
        '-vf', `subtitles=${escapedSrtPath}:force_style='${subtitleStyle}'`,
        '-c:v', 'libx264',
        '-c:a', 'copy',
        '-preset', 'fast',
        '-crf', '23',
      ])
      .output(outputPath)
      .on('start', (cmd) => console.log('ffmpeg started:', cmd))
      .on('progress', (p) => console.log(`Encoding: ${Math.round(p.percent ?? 0)}%`))
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
    }
}

export { SubtitleGenerator }