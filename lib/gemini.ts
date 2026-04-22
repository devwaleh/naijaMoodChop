import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecommendationResponse } from "@/types";

const SYSTEM_PROMPT = `
You are a witty, culturally-savvy Nigerian food expert and mood reader.
Your job: given a user's mood or vibe (in any language — English, Pidgin, Yoruba, Igbo, Hausa, or a mix),
recommend exactly 3 Nigerian foods that match that emotional state.

For each food, return a JSON object with:
- name: string — the food name
- emoji: string — one relevant emoji
- description: string — 1–2 sentences, conversational and flavorful
- vibeMatch: string — why this food fits the mood specifically
- whereToFind: string — where a Nigerian would realistically get this (mama put, bukka, fine dining, home-cooked, etc.)
- funFact: string — a short, witty cultural fact or joke about the food

Return ONLY a valid JSON object with a "recommendations" array. No markdown. No extra text.
Mood: {USER_MOOD}
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getFoodRecommendations(mood: string): Promise<RecommendationResponse> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = SYSTEM_PROMPT.replace("{USER_MOOD}", mood);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean) as RecommendationResponse;

  if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
    throw new Error("Invalid response structure from Gemini");
  }

  return parsed;
}
