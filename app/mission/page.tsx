import type { Metadata } from "next";
import { ContactBand, Eyebrow, PageHero } from "@/components/ui";
import { missionValues } from "@/content/site-data";

export const metadata: Metadata = { title: "Mission", description: "Why AI Sprouts helps young people become thoughtful creators of technology." };

export default function MissionPage() {
  return (
    <>
      <PageHero eyebrow="Our mission" title="Young people should shape technology, not just consume it." body="AI Sprouts exists to make artificial intelligence and technology practical, creative, responsible, and welcoming for young people." />
      <section className="section manifesto-section"><div className="container manifesto-grid"><div><Eyebrow>Why AI Sprouts</Eyebrow><h2>Curiosity needs room to grow.</h2></div><div className="manifesto-copy"><p className="lead">Young people deserve more than passive access to technology. They deserve the language, confidence, and support to question it and create with it.</p><p>AI Sprouts introduces complex ideas through everyday examples and hands-on exploration. Learners move from wondering how something works to testing, building, presenting, and reflecting on something of their own.</p><p>We teach responsible habits from the beginning: protect personal information, check sources, notice unfair outcomes, credit creative contributions, and know when a human should remain in control.</p></div></div></section>
      <section className="section values-section"><div className="container"><div className="section-heading"><Eyebrow>How we show up</Eyebrow><h2>A learning garden with strong roots.</h2></div><div className="values-grid">{missionValues.map((value, index) => <article key={value.title}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>
      <section className="section mission-belief-section"><div className="container mission-belief-grid"><div className="belief-mark" aria-hidden="true">✦</div><blockquote>“Our goal is not to give young people every answer. It is to help them ask better questions—and feel brave enough to build.”</blockquote></div></section>
      <ContactBand />
    </>
  );
}
