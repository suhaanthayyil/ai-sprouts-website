import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true">✦</span>{children}</p>;
}

export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></div>
        <div className="page-hero-logo" aria-hidden="true">
          <span className="page-hero-logo-ring" />
          <Image src="/ai-sprouts-logo-transparent.png" alt="" width={640} height={640} priority />
          <em>learn • make • grow</em>
        </div>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div><Eyebrow>A good place to begin</Eyebrow><h2>Help a young idea grow.</h2><p>Ask a question, explore a community partnership, or simply introduce yourself.</p></div>
        <Link className="button button-dark" href="/contact">Contact AI Sprouts <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
