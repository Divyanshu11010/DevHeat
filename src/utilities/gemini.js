import { GoogleGenAI, Type } from "@google/genai";
import SYSTEM_PROMPT from "../assets/prompt.js";

const MY_GOOGLE_KEY = process.env.MY_GOOGLE_KEY;

const ai = new GoogleGenAI({ apiKey: MY_GOOGLE_KEY });

export default async function getAnalysis(_aggregatedData) {
    const aggregatedData = JSON.stringify(_aggregatedData);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${SYSTEM_PROMPT}. The aggregated data is given below: ${aggregatedData}.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        Insight_Generation: {
                            type: Type.STRING,
                        },
                        Profile_Scoring: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.NUMBER },
                                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                                activity: { type: Type.NUMBER },
                                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                            },
                            required: ['score', 'skills', 'activity', 'strengths'],
                        },
                        Recruiter_Readiness_Score: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.NUMBER },
                            },
                            required: ['score'],
                        },
                        Peer_Comparison: {
                            type: Type.OBJECT,
                            properties: {
                                project: { type: Type.NUMBER },
                                language_skills: { type: Type.NUMBER },
                                social_activity: { type: Type.NUMBER },
                                problem_solving_skill: { type: Type.NUMBER },
                            },
                            required: ['project', 'language_skills', 'social_activity', 'problem_solving_skill'],
                        },
                        Personalized_Career_Suggestions: {
                            type: Type.STRING,
                        },
                        Areas_of_Improvement: {
                            type: Type.STRING,
                        },
                    },
                    required: [
                        'Insight_Generation',
                        'Profile_Scoring',
                        'Recruiter_Readiness_Score',
                        'Peer_Comparison',
                        'Personalized_Career_Suggestions',
                        'Areas_of_Improvement',
                    ],
                },
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
    }
}
