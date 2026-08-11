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
          <div><Eyebrow>Our growing community</Eyebrow><h1>Ideas taking root around the world.</h1></div>
          <div className="map-hero-stats"><strong>6</strong><span>chapters across 4 regions and 2 countries</span></div>
        </div>
      </section>
      <section className="section map-section">
        <div className="container">
          <div className="section-heading"><Eyebrow>Our chapters</Eyebrow><h2>Find AI Sprouts near you.</h2><p>Select a highlighted country, then hover or click a state or region to see its chapter count and current cities.</p></div>
          <ChapterMap />
        </div>
      </section>
    </>
  );
}
