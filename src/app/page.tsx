import type { Metadata } from "next";
import { HomePage } from "@/app/pages/HomePage";

export const metadata: Metadata = {
  title: "Heart Space — Guided Conversations for Better Relationships",
  description:
    "Heart Space creates guided conversations that help you relate better — to yourself, to others, and to life.",
  openGraph: {
    title: "Heart Space — Guided Conversations for Better Relationships",
    description:
      "Guided conversations that help you relate better. Join Workshop 1: Surfacing Difficult Conversations.",
    images: ["/shashi-velath.jpg"],
  },
};

export default function Home() {
  return <HomePage />;
}
