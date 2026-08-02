"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getMedia, programs } from "@/content/site-data";
import { MediaFrame } from "./ui";

const all = "All";

export function ProgramExplorer() {
  const [age, setAge] = useState(all);
  const [format, setFormat] = useState(all);
  const [topic, setTopic] = useState(all);

  const filtered = useMemo(() => programs.filter((program) =>
    (age === all || program.ages === age) &&
    (format === all || program.format === format) &&
    (topic === all || program.topic === topic)
  ), [age, format, topic]);

  return (
    <div>
      <div className="filter-bar" aria-label="Program filters">
        <label>Age group<select value={age} onChange={(event) => setAge(event.target.value)}><option>{all}</option>{[...new Set(programs.map((item) => item.ages))].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Format<select value={format} onChange={(event) => setFormat(event.target.value)}><option>{all}</option>{[...new Set(programs.map((item) => item.format))].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Topic<select value={topic} onChange={(event) => setTopic(event.target.value)}><option>{all}</option>{[...new Set(programs.map((item) => item.topic))].map((value) => <option key={value}>{value}</option>)}</select></label>
        <button type="button" onClick={() => { setAge(all); setFormat(all); setTopic(all); }}>Reset</button>
      </div>
      <p className="results-count" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? "program" : "programs"}</p>
      {filtered.length ? (
        <div className="program-grid">
          {filtered.map((program, index) => (
            <article className="program-card" key={program.slug}>
              <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
              <MediaFrame item={getMedia(program.mediaId)} />
              <div className="program-card-copy">
                <div className="tag-row"><span>{program.ages}</span><span>{program.format}</span><span>{program.duration}</span></div>
                <h2>{program.title}</h2>
                <p>{program.summary}</p>
                <div className="card-foot"><span>{program.level} · {program.topic}</span><Link href={`/programs/${program.slug}`}>View program <span aria-hidden="true">→</span></Link></div>
              </div>
            </article>
          ))}
        </div>
      ) : <div className="empty-state"><h2>No exact match yet.</h2><p>Try resetting the filters or tell us what kind of program you need.</p><button className="button button-primary" type="button" onClick={() => { setAge(all); setFormat(all); setTopic(all); }}>Show all programs</button></div>}
    </div>
  );
}
