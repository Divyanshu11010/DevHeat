import { InferenceClient } from "@huggingface/inference";
import SYSTEM_PROMPT from "../assets/prompt.js"

const client = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export default async function getAnalysis(_aggregatedData) {
    const aggregatedData = JSON.stringify(_aggregatedData);

    try {
        const response = await client.chatCompletion({
            provider: "hf-inference",
            model: "mistralai/Mistral-Nemo-Instruct-2407",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${aggregatedData}. Please give me the thorough analysis of it` },
            ],
            max_tokens: 2048,
        });

        return response.choices[0].message.content
    } catch (err) {
        console.error("E011 : " + err.message)
    }
}