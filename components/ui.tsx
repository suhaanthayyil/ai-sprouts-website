import Link from "next/link";
import type { ReactNode } from "react";
import { getMedia, type MediaItem } from "@/content/site-data";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true">✦</span>{children}</p>;
}

export function SectionHeading({ eyebrow, title, body, align = "left" }: { eyebrow: string; title: string; body?: string; align?: "left" | "center" }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

export function MediaFrame({ item, className = "", showMeta = false }: { item: MediaItem; className?: string; showMeta?: boolean }) {
  if (item.src) {
    return (
      <figure className={`media-frame tone-${item.tone} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt={item.alt} loading="lazy" />
        {showMeta && <figcaption>{item.title}{item.date ? ` · ${item.date}` : ""}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className={`media-frame media-placeholder tone-${item.tone} ${className}`} aria-label={item.alt}>
      <div className="placeholder-art" aria-hidden="true">
        <span className="placeholder-sun" />
        <span className="placeholder-stem" />
        <span className="placeholder-leaf-one" />
        <span className="placeholder-leaf-two" />
        <span className="placeholder-dots">● · ●</span>
      </div>
      <figcaption>
        <span>{item.category}</span>
        <strong>{item.title}</strong>
        <small>Approved brand photo goes here</small>
      </figcaption>
    </figure>
  );
}

export function ProjectCard({ project }: { project: { title: string; group: string; program: string; tools: string; text: string; skills: string[]; mediaId: string } }) {
  return (
    <article className="project-card">
      <MediaFrame item={getMedia(project.mediaId)} />
      <div className="project-card-copy">
        <div className="tag-row"><span>{project.group}</span><span>{project.program}</span></div>
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        <p className="project-tools"><strong>Tools:</strong> {project.tools}</p>
        <ul className="skill-list" aria-label="Skills developed">{project.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </div>
    </article>
  );
}

export function PageHero({ eyebrow, title, body, children }: { eyebrow: string; title: string; body: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{body}</p>
          {children}
        </div>
        <div className="page-hero-garden" aria-hidden="true">
          <span className="garden-ring garden-ring-one" />
          <span className="garden-ring garden-ring-two" />
          <span className="garden-stem" />
          <span className="garden-leaf garden-leaf-one" />
          <span className="garden-leaf garden-leaf-two" />
          <em>grow • make • share</em>
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <Eyebrow>Ready when you are</Eyebrow>
          <h2>Help a young idea grow.</h2>
          <p>Choose the path that fits your learner, organization, time, or resources.</p>
        </div>
        <div className="cta-grid">
          <Link href="/register">Register a student <span aria-hidden="true">↗</span></Link>
          <Link href="/contact?type=host">Host a program <span aria-hidden="true">↗</span></Link>
          <Link href="/contact?type=volunteer">Volunteer <span aria-hidden="true">↗</span></Link>
          <Link href="/contact?type=sponsor">Sponsor <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
