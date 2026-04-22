import type { Metadata } from "next";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naija Mood Chop 🍛",
  description: "Tell me your vibe, I'll tell you what to chop. Nigerian food recommendations powered by AI.",
  keywords: ["Nigerian food", "mood food", "jollof rice", "AI food recommender", "Naija"],
  openGraph: {
    title: "Naija Mood Chop 🍛",
    description: "Tell me your vibe, I'll tell you what to chop.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naija Mood Chop 🍛",
    description: "Tell me your vibe, I'll tell you what to chop.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen bg-naija-dark text-white font-dm">
        {children}
      </body>
    </html>
  );
}
