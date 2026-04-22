"use client";

import { useState, useCallback } from "react";
import MoodInput from "@/components/MoodInput";
import FoodCard from "@/components/FoodCard";
import LoadingState from "@/components/LoadingState";
import { FoodRecommendation } from "@/types";

type AppState = "idle" | "loading" | "results" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [recommendations, setRecommendations] = useState<FoodRecommendation[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastMood, setLastMood] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleMoodSubmit = useCallback(async (mood: string) => {
    setLastMood(mood);
    setAppState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong.");
        setAppState("error");
        return;
      }

      setRecommendations(data.recommendations);
      setAppState("results");
    } catch {
      setErrorMessage("No network connection. Check your internet and try again.");
      setAppState("error");
    }
  }, []);

  function handleReset() {
    setAppState("idle");
    setRecommendations([]);
    setErrorMessage("");
  }

  function handleShare() {
    if (!recommendations.length) return;

    const text = [
      `🍛 My Naija Mood Chop Results`,
      `Mood: "${lastMood}"`,
      "",
      ...recommendations.map(
        (r, i) =>
          `${i + 1}. ${r.emoji} ${r.name}\n   ${r.description}\n   📍 ${r.whereToFind}`
      ),
      "",
      "Get yours at naijamoodchop.vercel.app",
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-naija-dark/90 backdrop-blur-sm border-b border-naija-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-syne font-bold text-xl text-white leading-none">
              Naija Mood Chop{" "}
              <span className="text-naija-yellow">🍛</span>
            </h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Tell me your vibe, I&apos;ll tell you what to chop.
            </p>
          </div>
          {appState === "results" && (
            <button
              onClick={handleReset}
              className="text-sm font-syne font-bold text-zinc-400 hover:text-naija-yellow transition-colors px-3 py-1 border border-naija-border rounded-lg"
            >
              Try Again
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-10 max-w-5xl mx-auto w-full">
        {/* Hero */}
        {appState === "idle" && (
          <section className="mb-10 text-center animate-fade-in">
            <div className="inline-block mb-4 px-3 py-1 bg-naija-yellow/10 border border-naija-yellow/30 rounded-full">
              <span className="text-naija-yellow font-mono text-xs tracking-wider uppercase">
                Powered by Google Gemini
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-white leading-tight mb-3">
              How you dey?{" "}
              <span className="text-naija-yellow">Talk am.</span>
            </h2>
            <p className="text-zinc-400 font-dm text-lg max-w-lg mx-auto">
              Type your mood in any language — English, Pidgin, Yoruba, Igbo,
              Hausa — and we go recommend the perfect Nigerian chop for your vibe.
            </p>
          </section>
        )}

        {/* Mood input — shown in idle and error states */}
        {(appState === "idle" || appState === "error") && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <MoodInput onSubmit={handleMoodSubmit} isLoading={false} />
          </div>
        )}

        {/* Loading state */}
        {appState === "loading" && (
          <div className="animate-fade-in">
            <div className="max-w-2xl mx-auto mb-8">
              <MoodInput onSubmit={handleMoodSubmit} isLoading={true} />
            </div>
            <LoadingState />
          </div>
        )}

        {/* Error state */}
        {appState === "error" && errorMessage && (
          <div className="max-w-2xl mx-auto mt-4 p-4 bg-naija-red/10 border border-naija-red/30 rounded-xl animate-fade-in">
            <p className="text-naija-red font-dm text-sm">⚠️ {errorMessage}</p>
          </div>
        )}

        {/* Results */}
        {appState === "results" && recommendations.length > 0 && (
          <div className="animate-fade-in">
            <div className="mb-6 text-center">
              <p className="text-zinc-500 font-mono text-sm">
                Based on your vibe:{" "}
                <span className="text-naija-yellow italic">&ldquo;{lastMood}&rdquo;</span>
              </p>
              <h2 className="font-syne font-bold text-2xl text-white mt-1">
                Here&apos;s what to chop 👇
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {recommendations.map((food, i) => (
                <FoodCard key={`${food.name}-${i}`} food={food} index={i} />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleShare}
                className="
                  px-6 py-3 rounded-xl bg-naija-yellow text-naija-dark
                  font-syne font-bold text-sm
                  hover:brightness-110 active:scale-[0.98]
                  transition-all duration-150
                "
              >
                Share My Chop 📋
              </button>
              <button
                onClick={handleReset}
                className="
                  px-6 py-3 rounded-xl border border-naija-border text-zinc-400
                  font-syne font-bold text-sm
                  hover:border-naija-yellow hover:text-naija-yellow
                  transition-all duration-150
                "
              >
                Try Another Mood
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-naija-border px-4 py-6 text-center">
        <p className="text-xs text-zinc-600 font-mono">
          Naija Mood Chop &mdash; No hunger, only vibes.{" "}
          <span className="text-naija-yellow">🍛</span>
        </p>
      </footer>

      {/* Copy toast */}
      {toastVisible && (
        <div className="toast-enter fixed bottom-6 left-1/2 z-50 bg-naija-card border border-naija-yellow/40 text-white font-dm text-sm px-5 py-3 rounded-xl shadow-xl">
          Copied! Now go and chop 🍛
        </div>
      )}
    </div>
  );
}
