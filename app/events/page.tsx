import type { Metadata } from "next";
import { EventExplorer } from "@/components/event-explorer";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events",
  description: "Find upcoming AI Sprouts workshops and explore privacy-safe recaps from past programs.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return <><PageHero eyebrow="Events & field notes" title="Come build something with us." body="Find a future workshop, join an interest list, or step inside a day-by-day program recap." /><section className="section listing-section"><div className="container"><EventExplorer /></div></section><CtaBand /></>;
}
