"use client";

import { useMemo, useState } from "react";

type ChapterState = {
  name: string;
  cities: string[];
};

const unitedStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

const india = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
] as const;

const chapterCities: Record<string, string[]> = {
  "United States:North Carolina": ["Charlotte", "Waxhaw", "Mint Hill"],
  "United States:Ohio": ["New Albany"],
  "United States:Texas": ["Frisco"],
  "India:Tamil Nadu": ["Coimbatore"],
};

function buildStates(country: string, names: readonly string[]): ChapterState[] {
  return names.map((name) => ({ name, cities: chapterCities[`${country}:${name}`] ?? [] }));
}

function CountryPanel({ country, states, initialState }: { country: string; states: ChapterState[]; initialState: string }) {
  const [selected, setSelected] = useState(initialState);
  const [query, setQuery] = useState("");
  const selectedState = states.find((state) => state.name === selected) ?? states[0];
  const visibleStates = useMemo(() => states.filter((state) => state.name.toLowerCase().includes(query.toLowerCase())), [query, states]);
  const chapterCount = states.reduce((total, state) => total + state.cities.length, 0);

  return (
    <article className="country-chapter-panel">
      <header>
        <div><span>Country</span><h2>{country}</h2></div>
        <strong>{chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}</strong>
      </header>
      <label className="state-search">
        <span className="sr-only">Search {country} states</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search states" type="search" />
      </label>
      <div className="state-browser">
        <div className="state-list" aria-label={`${country} states`}>
          {visibleStates.map((state) => (
            <button className={state.name === selectedState.name ? "is-active" : ""} key={state.name} type="button" onClick={() => setSelected(state.name)} aria-pressed={state.name === selectedState.name}>
              <span>{state.name}</span><strong>{state.cities.length}</strong>
            </button>
          ))}
          {visibleStates.length === 0 ? <p>No states match that search.</p> : null}
        </div>
        <div className="state-chapter-detail" aria-live="polite">
          <span>{country}</span>
          <h3>{selectedState.name}</h3>
          {selectedState.cities.length > 0 ? <><strong>{selectedState.cities.length} active {selectedState.cities.length === 1 ? "chapter" : "chapters"}</strong><ul>{selectedState.cities.map((city) => <li key={city}>{city}</li>)}</ul></> : <p>No active chapters yet.</p>}
        </div>
      </div>
    </article>
  );
}

export function ChapterMap() {
  const usStates = useMemo(() => buildStates("United States", unitedStates), []);
  const indiaStates = useMemo(() => buildStates("India", india), []);

  return (
    <div className="country-chapter-grid">
      <CountryPanel country="United States" states={usStates} initialState="North Carolina" />
      <CountryPanel country="India" states={indiaStates} initialState="Tamil Nadu" />
    </div>
  );
}
