"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Consulting the pepper soup oracle...",
  "Asking mama put for advice...",
  "Checking the pot...",
  "Tasting the stew...",
  "Reading your vibe, abeg wait...",
  "The ancestors are deliberating...",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <p className="text-center text-naija-yellow font-mono text-sm mb-6 h-5 transition-all">
        {LOADING_MESSAGES[messageIndex]}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} delay={i * 150} />
        ))}
      </div>
    </div>
  );
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <div
      className="bg-naija-card rounded-xl border border-naija-border border-l-4 border-l-naija-yellow/30 p-6 flex flex-col gap-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-naija-border shimmer" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-5 w-3/4 rounded bg-naija-border shimmer" />
          <div className="h-3 w-full rounded bg-naija-border shimmer" />
          <div className="h-3 w-2/3 rounded bg-naija-border shimmer" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-14 rounded-lg bg-naija-border shimmer" />
        <div className="h-12 rounded-lg bg-naija-border shimmer" />
        <div className="h-12 rounded-lg bg-naija-border shimmer" />
      </div>
    </div>
  );
}
