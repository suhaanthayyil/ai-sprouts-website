import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organization } from "@/content/site-data";
import "./globals.css";

const bodyFont = localFont({ src: "./fonts/dm-sans.woff2", variable: "--font-body", display: "swap", weight: "100 1000" });
const displayFont = localFont({ src: "./fonts/fraunces.woff2", variable: "--font-display", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  title: { default: "AI Sprouts", template: "%s | AI Sprouts" },
  description: organization.mission,
  icons: { icon: "/ai-sprouts-logo-transparent.png", apple: "/ai-sprouts-logo-transparent.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body>
    </html>
  );
}
