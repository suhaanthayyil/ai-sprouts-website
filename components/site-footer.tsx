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
          <p className="asset-note">Official logo asset pending. Current mark is a clearly labeled website placeholder.</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <div className="footer-links">
            {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/team">Team</Link>
            <Link href="/partners">Partners</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Connect</p>
          <div className="footer-links">
            <Link href="/contact">Contact us</Link>
            <Link href="/register">Register interest</Link>
            <a href={`mailto:${organization.email}`}>{organization.email}</a>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} AI Sprouts. Built with youth privacy in mind.</p>
        <p>Grow curious. Build thoughtfully.</p>
      </div>
    </footer>
  );
}
