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
          <div className="map-hero-stats"><strong>10</strong><span>chapters across the United States and India</span></div>
        </div>
      </section>
      <section className="section map-section">
        <div className="container">
          <div className="section-heading"><Eyebrow>Our chapters</Eyebrow><h2>Explore every state on the map.</h2><p>Hover, focus, or click any state in the United States or India to see its current AI Sprouts chapters and cities.</p></div>
          <ChapterMap />
        </div>
      </section>
    </>
  );
}
