import fs from "fs"

class ASSProcessor {
    constructor(){}

    private static instance: ASSProcessor

    static getInstance(): ASSProcessor {
        if(!ASSProcessor.instance){
            ASSProcessor.instance = new ASSProcessor()
        }

        return ASSProcessor.instance
    }

    toAssTime(srtTime: string): string {
        return srtTime
            .replace(',', '.')
            .replace(/^0/, '')
            .slice(0, -1)
    }

    parseSRT(srt: string): Array<{ start: string; end: string; text: string }> {
        const blocks = srt.trim().split(/\n\n+/)
        return blocks.map(block => {
        const lines    = block.split('\n')
        const timeLine = lines[1]!
        const [start, end] = timeLine.split(' --> ')
        const text     = lines.slice(2).join('\n')
        return { start: start!.trim(), end: end!.trim(), text }
    })
    }

    buildAssFile(srtPath: string, assPath: string, videoWidth: number, videoHeight: number): void {
        const srtContent = fs.readFileSync(srtPath, 'utf8')
        
        // parse SRT into cues
        const cues = this.parseSRT(srtContent)
        
        const barHeight = Math.round(videoHeight * 0.08)
        const fontSize  = Math.round(videoHeight * 0.028)

        const assHeader = `[Script Info]
        ScriptType: v4.00+
        PlayResX: ${videoWidth}
        PlayResY: ${videoHeight}
        WrapStyle: 1

        [V4+ Styles]
        Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
        Style: Default,Arial,${fontSize},&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,1,0,2,80,80,${Math.round(barHeight * 0.3)},1

        [Events]
        Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
        `

        const events = cues.map((cue: any) => {
            const start = this.toAssTime(cue.start)
            const end   = this.toAssTime(cue.end)
            const text  = cue.text.replace(/\n/g, '\\N')
            return `Dialogue: 0,${start},${end},Default,,0,0,0,,${text}`
        }).join('\n')

        fs.writeFileSync(assPath, assHeader + events, 'utf8')
    }
}

export { ASSProcessor }