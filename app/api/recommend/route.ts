import { NextRequest } from "next/server";
import { getFoodRecommendations } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { mood } = body as { mood?: unknown };

  if (!mood || typeof mood !== "string") {
    return Response.json({ error: "Mood is required" }, { status: 400 });
  }

  const trimmed = mood.trim();
  if (trimmed.length < 3 || trimmed.length > 500) {
    return Response.json(
      { error: "Mood must be between 3 and 500 characters" },
      { status: 400 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let recommendations;
    try {
      recommendations = await getFoodRecommendations(trimmed);
    } catch (parseError) {
      // Retry once on JSON parse failure
      if (parseError instanceof SyntaxError) {
        recommendations = await getFoodRecommendations(trimmed);
      } else {
        throw parseError;
      }
    } finally {
      clearTimeout(timeout);
    }

    return Response.json(recommendations);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("429") || error.message.includes("quota")) {
        return Response.json(
          { error: "Too many requests, abeg try again in a moment." },
          { status: 429 }
        );
      }
      if (error.name === "AbortError") {
        return Response.json(
          { error: "Our food oracle took too long. Try again!" },
          { status: 504 }
        );
      }
    }

    console.error("Gemini API error:", error);
    return Response.json(
      { error: "Our food oracle is resting, try again." },
      { status: 500 }
    );
  }
}
