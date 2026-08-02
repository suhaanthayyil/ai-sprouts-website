"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { announcement, navigation } from "@/content/site-data";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {announcement.enabled && (
        <div className="announcement">
          <div className="container announcement-inner">
            <p><span>{announcement.label}</span> {announcement.message}</p>
            <Link href={announcement.href}>{announcement.linkLabel} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      )}
      <header className="site-header">
        <div className="container nav-shell">
          <Logo />
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
            <span aria-hidden="true">{open ? "×" : "Menu"}</span>
          </button>
          <nav id="primary-navigation" className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link key={item.href} className={pathname === item.href ? "active" : ""} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <div className="nav-actions">
              <Link className="button button-quiet" href="/programs">Explore programs</Link>
              <Link className="button button-primary" href="/register">Register interest</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
