"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { events } from "@/content/site-data";

export function EventExplorer() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = useMemo(() => events.filter((event) => {
    const matchQuery = `${event.title} ${event.location} ${event.theme}`.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (status === "All" || event.status === status);
  }), [query, status]);

  return (
    <div>
      <div className="event-tools">
        <label><span className="sr-only">Search events</span><input type="search" placeholder="Search by name, place, or theme" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="segmented" aria-label="Filter events by status">
          {["All", "Interest open", "Registration soon", "Recap"].map((value) => <button className={status === value ? "active" : ""} type="button" onClick={() => setStatus(value)} key={value}>{value}</button>)}
        </div>
      </div>
      <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "event" : "events"}</p>
      <div className="event-list">
        {filtered.map((event) => (
          <article className="event-row" key={event.slug}>
            <div className="event-date"><span>{event.status === "Recap" ? "PAST" : "NEXT"}</span><strong>{event.dateLabel}</strong></div>
            <div className="event-main"><p>{event.theme}</p><h2>{event.title}</h2><div className="event-meta"><span>{event.location}</span><span>{event.ageGroup}</span>{event.capacity && <span>{event.capacity}</span>}</div></div>
            <div className="event-action"><span className={`status status-${event.status.toLowerCase().replaceAll(" ", "-")}`}>{event.status}</span><Link href={event.status === "Recap" ? `/events/${event.slug}` : "/register"}>{event.status === "Recap" ? "Read recap" : "Join interest list"} <span aria-hidden="true">→</span></Link></div>
          </article>
        ))}
      </div>
      {!filtered.length && <div className="empty-state"><h2>No events found.</h2><p>Try a broader search or view all event types.</p><button className="button button-primary" type="button" onClick={() => { setQuery(""); setStatus("All"); }}>Clear filters</button></div>}
    </div>
  );
}
