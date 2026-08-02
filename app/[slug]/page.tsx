import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryExplorer } from "@/components/gallery-explorer";
import { InterestForm } from "@/components/interest-form";
import { CtaBand, Eyebrow, MediaFrame, PageHero, ProjectCard, SectionHeading } from "@/components/ui";
import { getMedia, involvementPaths, partners, studentProjects, team } from "@/content/site-data";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ type?: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  about: { title: "About", description: "Learn why AI Sprouts helps young people become thoughtful creators, not passive technology consumers." },
  "student-projects": { title: "Student Projects", description: "Explore privacy-safe examples of AI, coding, storytelling, and community projects built by student teams." },
  gallery: { title: "Gallery", description: "A consent-aware editorial gallery for AI Sprouts workshops, projects, team, and community events." },
  team: { title: "Team", description: "Meet the educators, builders, and mentors helping young ideas grow at AI Sprouts." },
  partners: { title: "Partners", description: "See how schools, libraries, nonprofits, and sponsors can partner with AI Sprouts." },
  "get-involved": { title: "Get Involved", description: "Register a learner, host a workshop, mentor young creators, or sponsor AI Sprouts." },
  contact: { title: "Contact", description: "Contact AI Sprouts about programs, hosting, volunteering, or partnerships." },
  register: { title: "Register Interest", description: "Join the AI Sprouts interest list for future youth AI and coding programs." },
  privacy: { title: "Privacy Policy", description: "How AI Sprouts plans to protect family, student, contact, and media information." },
};

export function generateStaticParams() {
  return Object.keys(pageMeta).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = pageMeta[slug];
  return meta ? { ...meta, alternates: { canonical: `/${slug}` } } : {};
}

export default async function MarketingPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  if (!pageMeta[slug]) notFound();

  if (slug === "about") return <AboutPage />;
  if (slug === "student-projects") return <ProjectsPage />;
  if (slug === "gallery") return <GalleryPage />;
  if (slug === "team") return <TeamPage />;
  if (slug === "partners") return <PartnersPage />;
  if (slug === "get-involved") return <GetInvolvedPage />;
  if (slug === "contact") {
    const kind = query.type === "host" ? "host" : query.type === "volunteer" ? "volunteer" : "contact";
    return <FormPage kind={kind} />;
  }
  if (slug === "register") return <FormPage kind="registration" />;
  if (slug === "privacy") return <PrivacyPage />;
  notFound();
}

function AboutPage() {
  return <><PageHero eyebrow="Our mission" title="Young people should shape technology, not just scroll through it." body="AI Sprouts was created to make AI learning practical, creative, responsible, and welcoming for young people in the communities where they already learn." /><section className="section manifesto-section"><div className="container manifesto-grid"><div><Eyebrow>Why AI Sprouts</Eyebrow><h2>Thoughtful creators grow through practice.</h2></div><div className="manifesto-copy"><p className="lead">Technology education works best when students can ask honest questions, make something meaningful, and understand the responsibility that comes with new tools.</p><p>Our approach pairs clear, age-appropriate explanations with experiments, collaborative projects, and reflection. Students learn that AI is neither magic nor an answer machine: it is a set of tools shaped by data, decisions, and people.</p><p>Programs are designed to meet learners in schools, libraries, and community spaces, widening access without lowering expectations.</p></div></div></section><section className="section values-section"><div className="container"><SectionHeading eyebrow="How we teach" title="A learning garden with strong roots." /><div className="values-grid"><article><span>01</span><h3>Accessible by design</h3><p>Friendly language, multiple ways to participate, and flexible pathways for different experience levels.</p></article><article><span>02</span><h3>Creative on purpose</h3><p>Students connect technical ideas to stories, art, games, and challenges they care about.</p></article><article><span>03</span><h3>Responsible from day one</h3><p>Privacy, fairness, accuracy, attribution, and human oversight live inside the making process.</p></article><article><span>04</span><h3>Rooted in community</h3><p>Programs grow through the knowledge of families, educators, libraries, mentors, and local partners.</p></article></div></div></section><section className="section timeline-section"><div className="container"><SectionHeading eyebrow="Our growth" title="Milestones, when verified." body="The timeline is intentionally ready but unpopulated until dates and achievements are confirmed by AI Sprouts." /><ol className="timeline"><li><span>FOUNDING</span><div><h3>Verified origin story needed</h3><p>Add the confirmed launch date, location, and founding motivation.</p></div></li><li><span>PROGRAMS</span><div><h3>Verified first-program milestone needed</h3><p>Add a documented first workshop or community partnership.</p></div></li><li><span>NEXT</span><div><h3>The next chapter</h3><p>Future goals can be published after the team approves the language.</p></div></li></ol></div></section><CtaBand /></>;
}

function ProjectsPage() {
  return <><PageHero eyebrow="Student projects" title="Ideas with roots, wings, and working code." body="Privacy-safe project examples show what students can create without exposing names, accounts, or personal information." /><section className="section"><div className="container"><div className="project-grid project-grid-wide">{studentProjects.map((project) => <ProjectCard key={project.title} project={project} />)}</div></div></section><section className="section project-principles"><div className="container"><SectionHeading eyebrow="More than a final screen" title="We celebrate the thinking behind the project." /><div className="principle-grid"><article><strong>Question</strong><p>What problem or possibility matters to us?</p></article><article><strong>Process</strong><p>What did we test, revise, and learn?</p></article><article><strong>People</strong><p>Who could benefit—and who could be left out?</p></article><article><strong>Perspective</strong><p>What should a human stay responsible for?</p></article></div></div></section><CtaBand /></>;
}

function GalleryPage() {
  return <><PageHero eyebrow="Life at AI Sprouts" title="A scrapbook for curious work." body="Filter workshops, projects, team moments, and behind-the-scenes details. Every image slot carries consent status in the central data model." /><section className="section gallery-section"><div className="container"><GalleryExplorer /></div></section><section className="section community-section"><div className="container community-grid"><div><Eyebrow>From our community</Eyebrow><h2>A graceful home for Instagram stories.</h2><p>This section uses curated local entries until official Instagram Graph API credentials and approved post links are supplied. It never scrapes the account.</p><a className="button button-dark" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Visit Instagram <span aria-hidden="true">↗</span></a></div><div className="social-placeholder-grid"><article><span>POST</span><strong>Workshop announcement</strong><p>Image, caption excerpt, date, and original link pending.</p></article><article><span>REEL</span><strong>Program recap</strong><p>Approved thumbnail and original post link pending.</p></article><article><span>CAROUSEL</span><strong>Student spotlight</strong><p>Privacy-safe caption and media permission pending.</p></article></div></div></section><CtaBand /></>;
}

function TeamPage() {
  return <><PageHero eyebrow="Meet the team" title="Warm guides for brave first tries." body="AI Sprouts brings educators, builders, and community mentors together around practical, responsible learning." /><section className="section"><div className="container team-grid">{team.map((person, index) => <article className="team-card" key={`${person.role}-${index}`}><MediaFrame item={getMedia(person.mediaId)} /><span>{person.role}</span><h2>{person.name}</h2><p>{person.expertise}</p><blockquote>“{person.favorite}”</blockquote></article>)}</div><p className="container placeholder-disclosure">All team profiles above are publication-ready placeholders. Replace them only with approved names, biographies, portraits, and links.</p></section><CtaBand /></>;
}

function PartnersPage() {
  return <><PageHero eyebrow="Partners" title="Let’s grow a local learning ecosystem." body="Schools, libraries, nonprofits, community groups, and sponsors make hands-on technology learning easier to reach." /><section className="section"><div className="container partner-page-grid">{partners.map((partner, index) => <article key={partner.name}><div className="partner-logo-placeholder" aria-label={`${partner.name} logo placeholder`}>P{index + 1}</div><span>{partner.type}</span><h2>{partner.name}</h2><p>Approved partner name, logo, relationship summary, and website link can be added here.</p></article>)}</div></section><section className="section host-banner"><div className="container host-banner-grid"><div><Eyebrow>Bring AI Sprouts to you</Eyebrow><h2>A program shaped around your community.</h2></div><div><p>We’ll discuss your learners, goals, schedule, venue, devices, accessibility needs, and safeguarding expectations before recommending a format.</p><Link className="button button-primary" href="/contact?type=host">Host a program <span aria-hidden="true">→</span></Link></div></div></section><CtaBand /></>;
}

function GetInvolvedPage() {
  return <><PageHero eyebrow="Get involved" title="There’s more than one way to help an idea grow." body="Choose a path below for a clear picture of who it’s for, what participation involves, and what happens next." /><section className="section"><div className="container involvement-grid">{involvementPaths.map((path, index) => <article key={path.title}><span>0{index + 1}</span><h2>{path.title}</h2><p>{path.text}</p><dl><dt>Time commitment</dt><dd>{path.commitment}</dd><dt>What happens next</dt><dd>{path.next}</dd></dl><Link href={path.href}>{path.next} <span aria-hidden="true">→</span></Link></article>)}</div></section><CtaBand /></>;
}

function FormPage({ kind }: { kind: "registration" | "contact" | "host" | "volunteer" }) {
  const copy = kind === "registration" ? { eyebrow: "Family interest form", title: "Tell us what your learner is curious about.", body: "A parent or guardian should complete this form. It is an interest form, not a confirmed registration or payment." } : kind === "host" ? { eyebrow: "Host a program", title: "Bring a hands-on program to your community.", body: "Share the basics about your organization and learners. We’ll use them only to plan a useful follow-up conversation." } : kind === "volunteer" ? { eyebrow: "Volunteer interest", title: "Share a skill. Make space for a first try.", body: "Tell us how you might like to help. Volunteer roles, checks, training, and age requirements depend on the program." } : { eyebrow: "Contact AI Sprouts", title: "Let’s start with a good question.", body: "Ask about a program, partnership, volunteer role, or anything else. Please don’t include sensitive student information." };
  return <><PageHero eyebrow={copy.eyebrow} title={copy.title} body={copy.body} /><section className="section form-section"><div className="container form-layout"><aside><span>Before you send</span><h2>Keep it simple and privacy-safe.</h2><ul><li>Adults should contact us on behalf of children.</li><li>Do not share medical records or private student details.</li><li>Interest forms do not reserve a place.</li><li>Submission data is accepted for demo purposes but is not yet connected to a CRM.</li></ul></aside><InterestForm kind={kind} /></div></section></>;
}

function PrivacyPage() {
  return <><PageHero eyebrow="Privacy" title="Young people’s privacy is a design requirement." body="This policy is a publication-ready framework and must be reviewed with the organization’s actual tools, vendors, practices, and legal counsel before launch." /><section className="section policy-section"><div className="container policy-layout"><nav aria-label="Privacy policy sections"><a href="#collect">What we collect</a><a href="#use">How we use it</a><a href="#youth">Youth privacy</a><a href="#media">Photos & media</a><a href="#retention">Retention</a><a href="#rights">Your choices</a></nav><article><p className="policy-updated">Placeholder policy · Last reviewed: not yet reviewed</p><h2 id="collect">What we collect</h2><p>Contact and interest forms request adult contact details, basic program preferences, and optional access-planning notes. AI Sprouts should not request student full names, birth dates, account credentials, medical records, or other unnecessary sensitive information through public forms.</p><h2 id="use">How we use information</h2><p>Submitted details should be used to respond to the inquiry, plan a suitable program, manage registration when applicable, and meet legal or safeguarding obligations. The production system must document its storage provider, processors, access controls, and retention periods.</p><h2 id="youth">Youth privacy</h2><p>Parents or guardians should contact AI Sprouts for children. The public site does not offer student accounts and should not knowingly collect information directly from children when adult consent or involvement is appropriate.</p><h2 id="media">Photos and media</h2><p>The content model records consent status for every gallery item. Student media should only be published after the organization confirms appropriate consent and removes unnecessary identifying details. Full student names are not published by default.</p><h2 id="retention">Security and retention</h2><p>Production form data must be encrypted in transit, access-controlled, retained only as long as necessary, and never logged unnecessarily. This initial build accepts validated submissions but intentionally does not persist them until an approved destination is configured.</p><h2 id="rights">Your choices</h2><p>People should be able to request access, correction, or deletion where applicable, and withdraw optional photo permission through a documented contact process. Add the organization’s verified privacy contact and jurisdiction-specific rights before launch.</p></article></div></section></>;
}
