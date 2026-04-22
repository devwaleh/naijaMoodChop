"use client";

import { useState, useRef } from "react";

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading: boolean;
}

const MAX_CHARS = 200;

export default function MoodInput({ onSubmit, isLoading }: MoodInputProps) {
  const [mood, setMood] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const trimmed = mood.trim();
  const isValid = trimmed.length >= 3;
  const remaining = MAX_CHARS - mood.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isLoading) return;
    onSubmit(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={mood}
          onChange={(e) => setMood(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          placeholder="How you dey? Type am here..."
          rows={4}
          disabled={isLoading}
          className="
            w-full bg-naija-card border-2 border-naija-border
            text-white font-mono text-base leading-relaxed
            rounded-xl p-4 pb-10 resize-none
            placeholder:text-zinc-600
            focus:outline-none focus:border-naija-yellow
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
          aria-label="Describe your mood"
        />
        <span
          className={`
            absolute bottom-3 right-4 text-xs font-mono tabular-nums
            ${remaining <= 20 ? "text-naija-red" : "text-zinc-600"}
          `}
        >
          {remaining}
        </span>
      </div>

      {trimmed.length > 0 && trimmed.length < 3 && (
        <p className="mt-2 text-sm text-naija-red font-dm">
          Tell me more — at least 3 characters.
        </p>
      )}

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="
          mt-4 w-full py-4 px-6 rounded-xl
          bg-naija-yellow text-naija-dark
          font-syne font-bold text-lg tracking-tight
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:brightness-110 active:scale-[0.98]
          transition-all duration-150
          flex items-center justify-center gap-2
        "
      >
        {isLoading ? (
          <>
            <span className="inline-block w-5 h-5 border-2 border-naija-dark border-t-transparent rounded-full animate-spin" />
            <span>Consulting the oracle...</span>
          </>
        ) : (
          "Chop Am 🍛"
        )}
      </button>

      <p className="mt-2 text-center text-xs text-zinc-600 font-dm">
        Tip: Press Ctrl+Enter (or ⌘+Enter) to submit
      </p>
    </form>
  );
}
