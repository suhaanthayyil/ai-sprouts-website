import Link from "next/link";
import { Logo } from "./logo";
import { navigation, organization } from "@/content/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Logo />
          <p>{organization.mission}</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <div className="footer-links">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
        </div>
        <div>
          <p className="footer-label">Say hello</p>
          <div className="footer-links"><a href={`mailto:${organization.email}`}>{organization.email}</a><Link href="/contact">Contact form</Link></div>
        </div>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getFullYear()} AI Sprouts.</p><p>Growing young minds.</p></div>
    </footer>
  );
}
