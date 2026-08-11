"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/content/site-data";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
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
          <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
        </button>
        <nav id="primary-navigation" className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} className={pathname === item.href ? "active" : ""} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-primary nav-contact" href="/contact" onClick={() => setOpen(false)}>
            <span>Let’s talk</span>
            <span className="nav-contact-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
