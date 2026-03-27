import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../lib/prompt";

interface Sentences {
    id: string,
    text: string,
    start: string,
    end: string
}

class HinglishService {

    private static instance: HinglishService
    constructor(){}

    static getInstance(): HinglishService {
        if(!HinglishService.instance){
            HinglishService.instance = new HinglishService()
        }

        return HinglishService.instance
    }

    async convert(sentences: Sentences[]) {
        const payload = sentences.map((s, i) => (
            {
            id: i,
            text: s.text,
            start: s.start,
            end: s.end
            }
        ))

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string)

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });


        try {
            const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\nInput: ${JSON.stringify(payload)}` }] }],
            });

            const response = result.response;
            const rawText = response.text();

            const formatted = JSON.parse(rawText);

            return sentences.map((original, i) => ({
            ...original,
            text: formatted.find((f: any) => f.id === i)?.text ?? original.text,
            }));
        } catch (error) {
            console.error("Gemini API Error:", error);
            throw new Error(`Gemini API failed: ${error}`);
        }
    }
}

export { HinglishService }