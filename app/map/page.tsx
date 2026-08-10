import type { Metadata } from "next";
import { ChapterMap } from "@/components/chapter-map";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chapter Map",
  description: "Explore AI Sprouts chapters in the United States and India.",
};

export default function MapPage() {
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
          <div className="section-heading"><Eyebrow>Chapter map</Eyebrow><h2>Find AI Sprouts near you.</h2><p>Explore our current chapter communities. Each highlighted state shows how many chapters are active and the cities they call home.</p></div>
          <ChapterMap />
        </div>
      </section>
    </>
  );
}
