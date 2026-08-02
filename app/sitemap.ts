import type { MetadataRoute } from "next";
import { events, organization, programs } from "@/content/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/programs", "/events", "/student-projects", "/gallery", "/team", "/partners", "/get-involved", "/contact", "/register", "/privacy"];
  return [
    ...paths.map((path) => ({ url: `${organization.siteUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...programs.map((program) => ({ url: `${organization.siteUrl}/programs/${program.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...events.map((event) => ({ url: `${organization.siteUrl}/events/${event.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
