import Image from "next/image";
import Link from "next/link";

export function Logo({ hero = false }: { hero?: boolean }) {
  return (
    <Link className={hero ? "brand brand-hero" : "brand"} href="/" aria-label="AI Sprouts home">
      <Image
        className="brand-image"
        src="/ai-sprouts-logo-transparent.png"
        width={690}
        height={690}
        loading={hero ? "eager" : "lazy"}
        alt="AI Sprouts, Growing Young Minds"
      />
      {!hero && <span className="brand-name">AI Sprouts</span>}
    </Link>
  );
}
