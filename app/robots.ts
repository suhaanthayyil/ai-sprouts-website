import type { MetadataRoute } from "next";
import { organization } from "@/content/site-data";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${organization.siteUrl}/sitemap.xml` };
}
