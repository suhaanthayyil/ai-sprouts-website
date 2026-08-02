import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs, getMedia } from "@/content/site-data";
import { CtaBand, Eyebrow, MediaFrame } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  if (!program) return {};
  return { title: program.title, description: program.summary, alternates: { canonical: `/programs/${program.slug}` } };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();
  return (
    <>
      <section className="program-detail-hero">
        <div className="container program-detail-grid">
          <div><Eyebrow>{program.eyebrow}</Eyebrow><h1>{program.title}</h1><p>{program.summary}</p><div className="tag-row large"><span>{program.ages}</span><span>{program.level}</span><span>{program.format}</span><span>{program.duration}</span></div><Link className="button button-primary" href="/register">Register interest <span aria-hidden="true">→</span></Link></div>
          <MediaFrame item={getMedia(program.mediaId)} />
        </div>
      </section>
      <section className="section detail-section"><div className="container detail-grid">
        <article><span className="detail-number">01</span><h2>What students build</h2><ul className="check-list">{program.builds.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span className="detail-number">02</span><h2>Learning outcomes</h2><ul className="check-list">{program.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div></section>
      <section className="section schedule-section"><div className="container schedule-grid"><div><Eyebrow>Example schedule</Eyebrow><h2>A clear rhythm for curious minds.</h2><p>Timing is adjusted for the venue, age group, access needs, and program format.</p></div><ol>{program.schedule.map((item) => <li key={item.time}><span>{item.time}</span><p>{item.activity}</p></li>)}</ol></div></section>
      <section className="section safety-section"><div className="container safety-grid"><div><Eyebrow>Care comes first</Eyebrow><h2>Safety & supervision</h2></div><div><p>Programs are designed for age-appropriate tools, active adult facilitation, and clear community expectations. Students should not share personal information with AI tools.</p><p>Specific supervision ratios, venue policies, accounts, and photo-consent practices are confirmed with each host before registration opens.</p></div></div></section>
      <section className="section faq-section"><div className="container"><Eyebrow>Good questions</Eyebrow><h2>Frequently asked</h2><div className="faq-grid"><details><summary>Does my learner need coding experience?</summary><p>{program.level === "Intermediate" ? "This program is best for students with some prior coding confidence; ask us if you are unsure." : "No. Facilitators introduce each tool and concept step by step."}</p></details><details><summary>Does a student need their own device?</summary><p>Device needs depend on the venue and program. The registration details will clearly state what is provided.</p></details><details><summary>Which AI tools are used?</summary><p>Tools are selected for the age group, learning goal, privacy settings, and venue policy. Final tool details are shared before the program.</p></details><details><summary>Can accommodations be requested?</summary><p>Yes. Parents, guardians, and hosts can share access needs without providing unnecessary medical details.</p></details></div></div></section>
      <CtaBand />
    </>
  );
}
