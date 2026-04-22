"use client";

import { FoodRecommendation } from "@/types";

interface FoodCardProps {
  food: FoodRecommendation;
  index: number;
}

export default function FoodCard({ food, index }: FoodCardProps) {
  return (
    <div
      className="
        relative bg-naija-card rounded-xl border border-naija-border
        border-l-4 border-l-naija-yellow
        p-6 flex flex-col gap-4
        hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(245,166,35,0.15)]
        transition-all duration-300 animate-slide-up
      "
      style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start gap-4">
        <span className="text-5xl leading-none select-none" role="img" aria-label={food.name}>
          {food.emoji}
        </span>
        <div>
          <h3 className="font-syne font-bold text-xl text-white leading-tight">
            {food.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-400 font-dm leading-relaxed">
            {food.description}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <Section label="Vibe Match" icon="✨" text={food.vibeMatch} accent />
        <Section label="Where to Find" icon="📍" text={food.whereToFind} />
        <Section label="Fun Fact" icon="🤣" text={food.funFact} />
      </div>
    </div>
  );
}

function Section({
  label,
  icon,
  text,
  accent,
}: {
  label: string;
  icon: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        accent ? "bg-naija-yellow/10 border border-naija-yellow/20" : "bg-black/30"
      }`}
    >
      <p className="text-xs font-syne font-bold tracking-wider uppercase text-zinc-500 mb-1">
        {icon} {label}
      </p>
      <p className="text-sm font-dm text-zinc-300 leading-relaxed">{text}</p>
    </div>
  );
}
