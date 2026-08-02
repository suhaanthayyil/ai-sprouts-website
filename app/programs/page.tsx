import type { Metadata } from "next";
import { ProgramExplorer } from "@/components/program-explorer";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore hands-on AI, coding, creativity, and responsible technology programs for young people.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero eyebrow="Programs for growing minds" title="Make, test, question, repeat." body="Filter by age, format, or topic to find a practical program that meets young creators where they are." />
      <section className="section listing-section"><div className="container"><ProgramExplorer /></div></section>
      <CtaBand />
    </>
  );
}
