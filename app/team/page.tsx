import type { Metadata } from "next";
import { ContactBand, Eyebrow, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people helping young minds grow at AI Sprouts.",
};

const teamSlots = ["Founder or director", "Educator or mentor", "Community partner"];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people helping young ideas grow."
        body="We’re preparing this space to introduce the educators, builders, mentors, and community partners behind AI Sprouts."
      />
      <section className="section team-section">
        <div className="container">
          <div className="section-heading">
            <Eyebrow>Meet the team</Eyebrow>
            <h2>Photos and introductions coming soon.</h2>
            <p>Each profile is ready for a portrait, name, role, and short introduction when the team is ready to be featured.</p>
          </div>
          <div className="team-grid">
            {teamSlots.map((role, index) => (
              <article className="team-card team-card-placeholder" key={role}>
                <figure className={`media-frame team-photo-placeholder tone-${["green", "yellow", "lavender"][index]}`}>
                  <span className="team-photo-icon" aria-hidden="true"><i /><b /></span>
                  <figcaption>Portrait coming soon</figcaption>
                </figure>
                <span>{role}</span>
                <h2>Team member name</h2>
                <p>A short introduction, background, and connection to AI Sprouts will appear here.</p>
              </article>
            ))}
          </div>
          <p className="placeholder-disclosure">This page is intentionally using placeholders until team photos and biographies are added.</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
