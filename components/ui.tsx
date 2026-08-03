import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true">✦</span>{children}</p>;
}

export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></div>
        <div className="page-hero-garden" aria-hidden="true">
          <span className="garden-ring garden-ring-one" />
          <span className="garden-ring garden-ring-two" />
          <span className="garden-flower">
            <span className="flower-head">
              <i className="flower-petal flower-petal-one" />
              <i className="flower-petal flower-petal-two" />
              <i className="flower-petal flower-petal-three" />
              <i className="flower-petal flower-petal-four" />
              <i className="flower-petal flower-petal-five" />
              <i className="flower-center" />
            </span>
            <span className="garden-stem" />
            <span className="garden-leaf garden-leaf-one" />
            <span className="garden-leaf garden-leaf-two" />
          </span>
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
