# Naija Mood Chop 🍛

> **Tell me your vibe, I'll tell you what to chop.**

A single-page AI web app that takes your current mood — in English, Pidgin, Yoruba, Igbo, Hausa, or any mix — and returns 3 personalized Nigerian food recommendations powered by Google Gemini.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (afro-brutalist dark theme)
- **AI:** Google Gemini 1.5 Flash via `@google/generative-ai`
- **Fonts:** Syne · DM Sans · Space Mono (Google Fonts)
- **Deployment:** Vercel (recommended)

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/devwaleh/naijaMoodChop.git
cd naijaMoodChop
npm install
```

### 2. Set up your Gemini API key

```bash
cp .env.example .env.local
```

Open `.env.local` and add your key (get one free at [aistudio.google.com](https://aistudio.google.com)):

```env
GEMINI_API_KEY=your_key_here
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How It Works

1. User types their mood (any language/Pidgin welcome)
2. `POST /api/recommend` sends the mood to Gemini 1.5 Flash
3. Gemini returns exactly 3 food recommendations as structured JSON
4. Each recommendation includes: name, emoji, description, vibe match, where to find it, and a fun fact
5. User can copy all results to clipboard with "Share My Chop"

---

## Deploying to Vercel

```bash
npx vercel
```

Add `GEMINI_API_KEY` as an environment variable in your Vercel project settings.

---

## Project Structure

```
app/
  layout.tsx            # Fonts, metadata
  page.tsx              # Main UI
  globals.css           # Tailwind base + custom animations
  api/recommend/
    route.ts            # POST /api/recommend — Gemini call
components/
  MoodInput.tsx         # Textarea + submit button
  FoodCard.tsx          # Single recommendation card
  LoadingState.tsx      # Shimmer skeletons + oracle messages
lib/
  gemini.ts             # Gemini client + prompt
types/
  index.ts              # Shared TypeScript interfaces
```
