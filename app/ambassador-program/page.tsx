import type { Metadata } from "next";
import { GoogleFormEmbed } from "@/components/google-form-embed";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ambassador Program",
  description: "Apply to join the AI Sprouts Ambassador Program and help young people grow as thoughtful creators with AI.",
};

const ambassadorFormId = "1FAIpQLSd8JeqH1jjBSzCoSwOQuToNULssEDCOMjYo_DnYqd5QBc6DDA";

export default function AmbassadorProgramPage() {
  return (
    <>
      <PageHero eyebrow="Ambassador program" title="Grow ideas. Lead with purpose." body="Join a community of student leaders who want to make AI learning creative, responsible, and welcoming for young people." />
      <section className="section form-section ambassador-section">
        <div className="container form-layout">
          <aside>
            <span>Become an ambassador</span>
            <h2>Help good ideas take root.</h2>
            <p>We’re looking for curious, dependable students who want to represent AI Sprouts and create positive impact in their communities.</p>
            <ul><li>Champion responsible AI learning</li><li>Share ideas from your school community</li><li>Support workshops and outreach</li><li>Grow as a student leader</li></ul>
          </aside>
          <GoogleFormEmbed formId={ambassadorFormId} title="AI Sprouts Ambassador Program application" height={1240} />
        </div>
      </section>
    </>
  );
}
