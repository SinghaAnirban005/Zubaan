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
}

export { CleanerService }