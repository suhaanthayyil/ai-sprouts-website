import type { Metadata } from "next";
import { GoogleFormEmbed } from "@/components/google-form-embed";
import { PageHero } from "@/components/ui";
import { organization } from "@/content/site-data";

export const metadata: Metadata = { title: "Contact Us", description: "Contact AI Sprouts about learning, community partnerships, volunteering, or general questions." };

const contactFormId = "1FAIpQLSfASL_O-nskr9gQDkKLvz1splvEUWhIVWqyoqQxgjVJMEr8XA";

export default function ContactPage() {
  return (
    <><PageHero eyebrow="Get in touch" title="Let’s start with a good question." body="Tell us what brought you here. We would love to hear from families, schools, libraries, volunteers, sponsors, and community partners." /><section className="section form-section"><div className="container form-layout"><aside><span>Say hello</span><h2>Every conversation can plant a seed.</h2><p>Email us directly at <a href={`mailto:${organization.email}`}>{organization.email}</a>, or send us a message below.</p><ul><li>Ask about learning opportunities</li><li>Explore a school or library partnership</li><li>Share volunteer or sponsor interest</li><li>Send a general question</li></ul><div className="contact-instagram"><span aria-hidden="true">◎</span><div><strong>Follow our journey</strong><p>See workshop moments, student projects, and the latest from AI Sprouts.</p><a href={organization.instagram} target="_blank" rel="noreferrer">@aisproutsofficial <span aria-hidden="true">↗</span></a></div></div></aside><GoogleFormEmbed formId={contactFormId} title="Send a message to AI Sprouts" height={860} /></div></section></>
  );
}
