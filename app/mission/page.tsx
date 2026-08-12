import type { Metadata } from "next";
import { ContactBand, Eyebrow, PageHero } from "@/components/ui";
import { missionValues } from "@/content/site-data";

export const metadata: Metadata = { title: "Mission", description: "How AI Sprouts advances inclusive, equitable quality education through practical AI learning for young people." };

export default function MissionPage() {
  return (
    <>
      <PageHero eyebrow="Our mission · UN SDG 4" title="Quality AI education should be within every young person’s reach." body="AI Sprouts helps young people gain the knowledge, practical skills, and confidence to use artificial intelligence responsibly and shape technology for the good of their communities." />
      <section className="section manifesto-section"><div className="container manifesto-grid"><div><Eyebrow>Quality education</Eyebrow><h2>Technology learning that includes everyone.</h2><a className="sdg-link" href="https://sdgs.un.org/goals/goal4" target="_blank" rel="noreferrer">Explore UN Sustainable Development Goal 4 <span aria-hidden="true">↗</span></a></div><div className="manifesto-copy"><p className="lead">Our mission supports the spirit of UN Sustainable Development Goal 4: inclusive and equitable quality education, with meaningful learning opportunities for all.</p><p>We turn artificial intelligence from an intimidating idea into a practical tool young people can understand, question, and use. Through hands-on projects, learners build relevant digital skills, creative confidence, and the courage to solve real problems.</p><p>Access and responsibility guide every experience. We create welcoming entry points for different backgrounds and teach learners to protect privacy, check sources, notice unfair outcomes, credit creative work, and understand when people must remain in control.</p></div></div></section>
      <section className="section values-section"><div className="container"><div className="section-heading"><Eyebrow>How we show up</Eyebrow><h2>A learning garden with strong roots.</h2></div><div className="values-grid">{missionValues.map((value, index) => <article key={value.title}><div className="value-card-top"><span>0{index + 1}</span><i aria-hidden="true">{value.icon}</i></div><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>
      <section className="section mission-belief-section"><div className="container mission-belief-grid"><div className="belief-mark" aria-hidden="true">04</div><blockquote>“Every young person deserves the opportunity to understand emerging technology, create with purpose, and use knowledge to improve the world around them.”</blockquote></div></section>
      <ContactBand />
    </>
  );
}
