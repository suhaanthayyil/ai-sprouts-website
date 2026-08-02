"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { media } from "@/content/site-data";
import { MediaFrame } from "./ui";

export function GalleryExplorer() {
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const items = useMemo(() => media.filter((item) => category === "All" || item.category === category), [category]);
  const selected = media.find((item) => item.id === selectedId);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [selected]);

  return (
    <>
      <div className="gallery-filters" aria-label="Gallery categories">
        {["All", ...new Set(media.map((item) => item.category))].map((value) => <button className={category === value ? "active" : ""} type="button" key={value} onClick={() => setCategory(value)}>{value}</button>)}
      </div>
      <p className="consent-note"><span aria-hidden="true">◎</span> Only media with confirmed photo consent should receive a published image source.</p>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <button className={`gallery-item gallery-item-${(index % 5) + 1}`} type="button" key={item.id} onClick={() => setSelectedId(item.id)} aria-label={`Open ${item.title}`}>
            <MediaFrame item={item} showMeta />
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedId(null); }}>
          <div className="lightbox-panel">
            <button ref={closeButtonRef} className="lightbox-close" type="button" onClick={() => setSelectedId(null)} aria-label="Close gallery image">×</button>
            <MediaFrame item={selected} showMeta />
            <div className="lightbox-copy"><span>{selected.category}{selected.date ? ` · ${selected.date}` : ""}</span><h2>{selected.title}</h2><p>{selected.alt}</p><small>Photo consent: {selected.photoConsent.replace("-", " ")}</small></div>
          </div>
        </div>
      )}
    </>
  );
}
