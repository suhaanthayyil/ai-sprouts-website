import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getMedia, programs } from "@/content/site-data";
import { CtaBand, Eyebrow, MediaFrame, SectionHeading } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) return {};
  return { title: `${event.title} recap`, description: event.summary, alternates: { canonical: `/events/${event.slug}` } };
}

export default async function EventRecapPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  const eventJsonLd = { "@context": "https://schema.org", "@type": "Event", name: event.title, startDate: event.dateISO, location: { "@type": "Place", name: event.location }, description: event.summary, eventStatus: event.status === "Recap" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled" };
  return (
    <>
      <article>
        <header className="recap-page-cover"><div className="container recap-page-grid"><div><Eyebrow>Program recap · {event.verificationStatus === "placeholder" ? "demonstration content" : "verified"}</Eyebrow><h1>{event.title}</h1><p>{event.summary}</p><div className="recap-meta"><span>{event.location}</span><span>{event.dateLabel}</span><span>{event.ageGroup}</span></div></div><div className="recap-cover-poster"><span>FIELD NOTES</span><strong>{event.theme}</strong><i>01—{String(event.days.length).padStart(2, "0")}</i></div></div></header>
        <section className="section recap-objectives"><div className="container"><SectionHeading eyebrow="What we explored" title="Learning goals in action." /><div className="objective-grid">{event.topics.map((topic, index) => <article key={topic}><span>0{index + 1}</span><h2>{topic}</h2><p>Explore the idea, test it through a hands-on activity, and explain a thoughtful takeaway.</p></article>)}</div></div></section>
        {event.days.length ? event.days.map((day, index) => <section className={`section recap-page-day ${index % 2 ? "day-tint" : ""}`} key={day.label}><div className="container"><div className="day-heading"><span>{day.label}</span><div><h2>{index === 0 ? "First, we got curious." : "Then, we made it ours."}</h2><p>{day.summary}</p></div></div><div className="day-gallery">{day.mediaIds.map((id, imageIndex) => <MediaFrame className={`day-image day-image-${imageIndex + 1}`} item={getMedia(id)} key={id} showMeta />)}</div><div className="day-result"><span>What we made</span><p>{day.result}</p></div></div></section>) : <section className="section"><div className="container empty-state"><h2>This event hasn’t happened yet.</h2><p>Join the interest list to hear when details are verified.</p><Link className="button button-primary" href="/register">Register interest</Link></div></section>}
        <section className="section related-section"><div className="container"><SectionHeading eyebrow="Keep growing" title="Related programs" /><div className="related-grid">{programs.slice(0, 3).map((program) => <Link key={program.slug} href={`/programs/${program.slug}`}><span>{program.ages}</span><h3>{program.title}</h3><p>{program.summary}</p><strong>Explore program →</strong></Link>)}</div></div></section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <CtaBand />
    </>
  );
}
