import type { Metadata } from "next";
import { ChapterMap } from "@/components/chapter-map";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chapters",
  description: "Explore AI Sprouts chapters in the United States and India.",
};

export default function ChaptersPage() {
  return (
    <>
      <section className="map-hero">
        <div className="container map-hero-grid">
          <div><Eyebrow>Our growing community</Eyebrow><h1>Two countries. One growing learning community.</h1></div>
          <div className="map-hero-stats"><strong>6</strong><span>chapters across the United States and India</span></div>
        </div>
      </section>
      <section className="section map-section">
        <div className="container">
          <div className="section-heading"><Eyebrow>Our chapters</Eyebrow><h2>Explore every state.</h2><p>Browse the United States and India side by side. Select any state to see current AI Sprouts chapters or discover where a chapter could grow next.</p></div>
          <ChapterMap />
        </div>
      </section>
    </>
  );
}
