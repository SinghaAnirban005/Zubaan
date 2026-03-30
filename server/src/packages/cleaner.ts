interface Sentence {
    id: string,
    text: string,
    start: string,
    end: string
}

interface Cue {
    text: string,
    start: string,
    end: string
}

class CleanerService {
    
    private static instance: CleanerService
    constructor(){}

    static getInstance(): CleanerService {
        if(!CleanerService.instance){
            CleanerService.instance = new CleanerService()
        }

        return CleanerService.instance
    }
    
    extractSentences(deepgramResponse: any) {
        const paragraphs = deepgramResponse.results.channels[0].alternatives[0].paragraphs.paragraphs;

        const sentences = [];
        for (const para of paragraphs) {
        for (const sentence of para.sentences) {
        sentences.push({
            text: sentence.text,
            start: sentence.start,
            end: sentence.end,
        });
        }
    }
    return sentences;
    }

    chunkIntoWords(sentences: Sentence[], wordsPerCue = 3): Cue[] {
        const cues: Cue[] = []

        for (const sentence of sentences) {
            const words = sentence.text.trim().split(/\s+/)
            const totalWords = words.length
            const totalDuration = Number(sentence.end) - Number(sentence.start)

            // split into groups of N
            const chunks: string[][] = []
            for (let i = 0; i < words.length; i += wordsPerCue) {
            chunks.push(words.slice(i, i + wordsPerCue))
            }

            // Distribute time proportionally by word count
            let cursor = sentence.start
            for (const chunk of chunks) {
            const chunkDuration = (chunk.length / totalWords) * totalDuration
            cues.push({
                text: chunk.join(' '),
                start: cursor,
                end: cursor + chunkDuration,
            })
            cursor += chunkDuration
            }
        }

        return cues
    }
}

export { CleanerService }