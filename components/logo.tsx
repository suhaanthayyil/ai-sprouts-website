import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="AI Sprouts home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-seed" />
        <span className="brand-leaf brand-leaf-left" />
        <span className="brand-leaf brand-leaf-right" />
      </span>
      {!compact && (
        <span className="brand-wordmark">
          <strong>AI</strong> Sprouts
        </span>
      )}
    </Link>
  );
}
