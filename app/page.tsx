import type { Metadata } from "next";
import Link from "next/link";
import {
  events,
  getMedia,
  impact,
  learningPillars,
  partners,
  processSteps,
  programs,
  studentProjects,
  testimonials,
} from "@/content/site-data";
import { CtaBand, Eyebrow, MediaFrame, ProjectCard, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "AI Sprouts | Growing tomorrow’s creators with AI" },
  description: "Creative, hands-on, and responsible AI learning for young people, families, schools, libraries, and community partners.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = programs[0];
  const recap = events.find((event) => event.status === "Recap")!;

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <Eyebrow>Where curiosity takes root</Eyebrow>
            <h1>Growing tomorrow’s <em>creators</em> with AI.</h1>
            <p>AI Sprouts gives young learners practical, creative, and responsible experiences with artificial intelligence, coding, and technology.</p>
            <div className="button-row">
              <Link className="button button-primary" href="/programs">Explore programs <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="/student-projects">See what students built <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="trust-line"><span className="trust-avatars" aria-hidden="true"><i>S</i><i>L</i><i>F</i></span><p>Designed for <strong>schools, libraries, families,</strong> and community partners.</p></div>
          </div>
          <div className="hero-collage" aria-label="AI Sprouts activity photo placeholders">
            <div className="hero-scribble" aria-hidden="true">ideas<br />grow<br />here ↗</div>
            <MediaFrame item={getMedia("hero-1")} className="hero-media hero-media-one" />
            <MediaFrame item={getMedia("hero-2")} className="hero-media hero-media-two" />
            <MediaFrame item={getMedia("hero-3")} className="hero-media hero-media-three" />
            <div className="hero-badge" aria-hidden="true"><strong>make</strong><span>test</span><em>share!</em></div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>CURIOUS MINDS</span><i>✦</i><span>CREATIVE CODE</span><i>✦</i><span>RESPONSIBLE AI</span><i>✦</i><span>BIG IDEAS</span></div>
      </section>

      <section className="section discovery-section">
        <div className="container">
          <SectionHeading eyebrow="What students discover" title="Big ideas, made wonderfully hands-on." body="Every program balances clear explanations with making, testing, talking, and reflecting." />
          <div className="pillar-grid">
            {learningPillars.map((pillar) => <article key={pillar.title} className="pillar-card"><span>{pillar.icon}</span><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section featured-program-section">
        <div className="container featured-program">
          <MediaFrame item={getMedia(featured.mediaId)} className="featured-program-media" />
          <div className="featured-program-copy">
            <Eyebrow>Featured program · {featured.format}</Eyebrow>
            <h2>{featured.title}</h2>
            <p className="feature-lead">{featured.summary}</p>
            <dl className="program-facts">
              <div><dt>Who it’s for</dt><dd>{featured.ages} · {featured.level}</dd></div>
              <div><dt>Format</dt><dd>{featured.duration} hands-on workshop</dd></div>
              <div><dt>Students build</dt><dd>{featured.builds.slice(0, 2).join(" + ")}</dd></div>
            </dl>
            <div className="chip-row">{featured.outcomes.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
            <Link className="button button-dark" href={`/programs/${featured.slug}`}>Explore {featured.title} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section recap-section">
        <div className="container">
          <div className="recap-cover">
            <div className="recap-number">RECENT<br />RECAP <span>01</span></div>
            <div><Eyebrow>Instagram-style field notes</Eyebrow><h2>{recap.title}</h2><p>{recap.summary}</p></div>
            <dl><div><dt>Where</dt><dd>{recap.location}</dd></div><div><dt>When</dt><dd>{recap.dateLabel}</dd></div><div><dt>Theme</dt><dd>{recap.theme}</dd></div></dl>
            <div className="recap-topics">{recap.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
          </div>
          {recap.days.map((day, dayIndex) => (
            <div className={`recap-day ${dayIndex % 2 ? "recap-day-reverse" : ""}`} key={day.label}>
              <div className="recap-day-copy"><span>{day.label}</span><h3>{dayIndex === 0 ? "Discover the patterns." : "Build, test, and share."}</h3><p>{day.summary}</p><blockquote>Project result: {day.result}</blockquote></div>
              <div className="recap-photos">{day.mediaIds.map((id, index) => <MediaFrame key={id} item={getMedia(id)} className={index ? "recap-photo-small" : "recap-photo-large"} />)}</div>
            </div>
          ))}
          <div className="section-link"><Link href={`/events/${recap.slug}`}>Read the full program recap <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeading eyebrow="The learning journey" title="From “what if?” to “look what we made.”" body="Students move from understanding a concept to creating and sharing something of their own." />
          <ol className="process-grid">{processSteps.map((step) => <li key={step.title}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section project-section">
        <div className="container">
          <div className="section-heading-row"><SectionHeading eyebrow="Student projects" title="Built by curious teams." body="Privacy-safe examples of the kinds of projects young creators can make." /><Link href="/student-projects">See all projects <span aria-hidden="true">→</span></Link></div>
          <div className="project-grid">{studentProjects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
        </div>
      </section>

      <section className="section impact-section">
        <div className="container impact-grid">
          <div className="impact-intro"><Eyebrow>Impact, honestly reported</Eyebrow><h2>Small moments.<br />Growing momentum.</h2><p>Numbers will be published here only after they are verified by the AI Sprouts team.</p></div>
          <div className="impact-cards">{impact.map((item) => <article key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.note}</p></article>)}</div>
        </div>
      </section>

      <section className="section partners-section">
        <div className="container">
          <SectionHeading eyebrow="Community powered" title="Good things grow in partnership." body="The partner system is ready for approved school, library, nonprofit, and sponsor logos." align="center" />
          <div className="partner-strip">{partners.map((partner) => <div key={partner.name}><span aria-hidden="true">✳</span><strong>{partner.name}</strong><small>{partner.type}</small></div>)}</div>
          <div className="center-action"><Link className="button button-primary" href="/contact?type=host">Bring AI Sprouts to your community <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container"><SectionHeading eyebrow="Community voices" title="What learning feels like." body="These slots are intentionally labeled until approved, real testimonials are supplied." />
          <div className="testimonial-grid">{testimonials.map((item) => <blockquote key={item.audience}><span>{item.audience}</span><p>“{item.quote}”</p><cite>{item.attribution}</cite></blockquote>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
