import type { Metadata } from "next";
import Image from "next/image";
import { ContactBand, Eyebrow, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people helping young minds grow at AI Sprouts.",
};

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
            <h2>Meet the people growing AI Sprouts.</h2>
            <p>Our team brings curiosity, practical experience, and a shared belief that young people should help shape the future of technology.</p>
          </div>
          <div className="team-grid">
            <article className="team-card">
              <figure className="media-frame team-photo-real">
                <Image src="/suhaan-thayyil.png" alt="Portrait of Suhaan Thayyil" fill priority sizes="(max-width: 820px) calc(100vw - 40px), 50vw" />
              </figure>
              <span>President</span>
              <h2>Suhaan Thayyil</h2>
              <p>I&apos;m a high school sophomore at Marvin Ridge High School passionate about using AI and machine learning to solve real-world problems.</p>
            </article>
            <article className="team-card team-card-placeholder">
              <figure className="media-frame team-photo-placeholder tone-yellow">
                <span className="team-photo-icon" aria-hidden="true"><i /><b /></span>
                <figcaption>Portrait coming soon</figcaption>
              </figure>
              <span>Senior Vice President</span>
              <h2>Kairav Karunakaran</h2>
              <p>I&apos;m passionate about artificial intelligence and its potential to transform how we learn, create, and solve problems. Through education and hands-on experiences, I hope to make AI more accessible and inspire other students to explore the possibilities of technology.</p>
            </article>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
