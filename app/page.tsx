import type { Metadata } from "next";
import Link from "next/link";
import { HomeCarousel } from "@/components/home-carousel";
import { ContactBand, Eyebrow } from "@/components/ui";
import { learningPillars } from "@/content/site-data";

export const metadata: Metadata = {
  title: { absolute: "AI Sprouts | Growing Young Minds" },
  description: "Creative, practical, and responsible AI learning for young people and their communities.",
};

export default function HomePage() {
  return (
    <>
      <section className="home-hero simple-home-hero">
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <Eyebrow>Where curiosity takes root</Eyebrow>
            <h1>Growing tomorrow’s <em>creators</em> with AI.</h1>
            <p>AI Sprouts introduces young people to artificial intelligence, coding, creativity, and responsible innovation through welcoming, hands-on learning.</p>
            <div className="button-row"><Link className="button button-primary" href="/mission">Our mission <span aria-hidden="true">→</span></Link><Link className="text-link" href="/contact">Contact us <span aria-hidden="true">↗</span></Link></div>
            <p className="trust-copy">For young learners, families, schools, libraries, and community partners.</p>
          </div>
          <HomeCarousel />
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>CURIOUS MINDS</span><i>✦</i><span>CREATIVE CODE</span><i>✦</i><span>RESPONSIBLE AI</span><i>✦</i><span>YOUNG CREATORS</span></div>
      </section>

      <section className="section discovery-section">
        <div className="container">
          <div className="section-heading"><Eyebrow>What we nurture</Eyebrow><h2>Big ideas, made wonderfully hands-on.</h2><p>Students gain confidence by understanding a concept, trying it for themselves, and reflecting on how technology affects people.</p></div>
          <div className="home-pillar-grid">
            {learningPillars.map((pillar) => <article key={pillar.title}><div className="pillar-card-top"><span>{pillar.number}</span><i aria-hidden="true">{pillar.icon}</i></div><h3>{pillar.title}</h3><p>{pillar.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section home-mission-section">
        <div className="container home-mission-grid">
          <div className="mission-poster"><span>OUR WHY</span><strong>Young people should shape technology, not just scroll through it.</strong><i>AI SPROUTS · GROWING YOUNG MINDS</i></div>
          <div><Eyebrow>Our mission</Eyebrow><h2>Thoughtful creators grow through practice.</h2><p>We make emerging technology approachable without pretending it is magic. Young people learn to question results, protect privacy, work with others, and build things that express their own ideas.</p><Link className="button button-dark" href="/mission">Read our mission <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section home-community-section">
        <div className="container home-community-grid"><div><Eyebrow>Rooted in community</Eyebrow><h2>Learning grows stronger together.</h2></div><div><p>AI Sprouts is designed to meet young people in the spaces where they already learn and belong, alongside families, educators, libraries, schools, and community organizations.</p><Link href="/contact">Start a conversation <span aria-hidden="true">→</span></Link></div></div>
      </section>
      <ContactBand />
    </>
  );
}
