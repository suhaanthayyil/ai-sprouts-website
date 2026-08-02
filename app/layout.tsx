import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organization } from "@/content/site-data";
import "./globals.css";

const bodyFont = DM_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const displayFont = Fraunces({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(organization.siteUrl),
  title: { default: "AI Sprouts | Creative AI learning for young people", template: "%s | AI Sprouts" },
  description: organization.mission,
  applicationName: "AI Sprouts",
  keywords: ["AI education", "youth coding", "responsible AI", "student workshops", "library programs"],
  openGraph: { type: "website", siteName: "AI Sprouts", title: "AI Sprouts — Growing tomorrow’s creators with AI", description: organization.mission, images: [{ url: "/og.png", width: 1568, height: 1003, alt: "AI Sprouts — growing tomorrow’s creators with AI" }] },
  twitter: { card: "summary_large_image", title: "AI Sprouts — Growing tomorrow’s creators with AI", description: organization.mission, images: ["/og.png"] },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: organization.name,
  url: organization.siteUrl,
  email: organization.email,
  description: organization.mission,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
