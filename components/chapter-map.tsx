"use client";

import { useEffect, useMemo, useState } from "react";
import { geoAlbersUsa, geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties, MultiPolygon, Polygon } from "geojson";

type StateFeature = Feature<Geometry, GeoJsonProperties> & { properties: { shapeName?: string } };

const mapWidth = 620;
const mapHeight = 410;

const usStateNames = new Set([
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
]);

const chapterCities: Record<string, string[]> = {
  "United States:North Carolina": ["Charlotte", "Waxhaw", "Mint Hill"],
  "United States:Ohio": ["New Albany"],
  "United States:Texas": ["Frisco"],
  "India:Andaman and Nicobar Islands": ["Port Blair"],
  "India:Delhi": ["New Delhi"],
  "India:Kerala": ["Kozhikode"],
  "India:Tamil Nadu": ["Coimbatore"],
  "India:Telangana": ["Hyderabad"],
};

function normalizeName(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function rewindGeometry(geometry: Geometry): Geometry {
  if (geometry.type === "Polygon") {
    const polygon = geometry as Polygon;
    return { ...polygon, coordinates: polygon.coordinates.map((ring) => [...ring].reverse()) };
  }
  if (geometry.type === "MultiPolygon") {
    const multiPolygon = geometry as MultiPolygon;
    return { ...multiPolygon, coordinates: multiPolygon.coordinates.map((polygon) => polygon.map((ring) => [...ring].reverse())) };
  }
  return geometry;
}

function CountryMap({ country, dataUrl, initialState, filter }: { country: "United States" | "India"; dataUrl: string; initialState: string; filter?: Set<string> }) {
  const [features, setFeatures] = useState<StateFeature[]>([]);
  const [selected, setSelected] = useState(initialState);

  useEffect(() => {
    let active = true;
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${country} map data.`);
        return response.json() as Promise<FeatureCollection<Geometry>>;
      })
      .then((collection) => {
        if (!active) return;
        const states = collection.features
          .map((feature) => ({ ...feature, geometry: rewindGeometry(feature.geometry), properties: feature.properties ?? {} }) as StateFeature)
          .filter((feature) => {
            const name = normalizeName(feature.properties.shapeName ?? "");
            return name && (!filter || filter.has(name));
          });
        setFeatures(states);
      })
      .catch(() => { if (active) setFeatures([]); });
    return () => { active = false; };
  }, [country, dataUrl, filter]);

  const paths = useMemo(() => {
    if (!features.length) return [];
    const collection: FeatureCollection<Geometry> = { type: "FeatureCollection", features };
    const projection = country === "United States" ? geoAlbersUsa() : geoMercator();
    projection.fitExtent([[18, 18], [mapWidth - 18, mapHeight - 18]], collection);
    const path = geoPath(projection);
    return features.map((feature) => ({
      name: normalizeName(feature.properties.shapeName ?? "Unknown"),
      path: path(feature) ?? "",
    })).filter((state) => state.path);
  }, [country, features]);

  const cities = chapterCities[`${country}:${selected}`] ?? [];
  const chapterCount = Object.entries(chapterCities).filter(([key]) => key.startsWith(`${country}:`)).reduce((total, [, locations]) => total + locations.length, 0);

  return (
    <article className="country-map-panel">
      <header>
        <div><span>Interactive map</span><h2>{country}</h2></div>
        <strong>{chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}</strong>
      </header>
      <div className="country-map-canvas">
        {paths.length ? (
          <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-label={`${country} map with interactive states`}>
            <g>
              {paths.map((state) => {
                const count = chapterCities[`${country}:${state.name}`]?.length ?? 0;
                return <path
                  className={`${count ? "has-chapters" : ""}${selected === state.name ? " is-active" : ""}`}
                  d={state.path}
                  key={state.name}
                  role="button"
                  tabIndex={0}
                  aria-label={`${state.name}: ${count} ${count === 1 ? "chapter" : "chapters"}`}
                  onMouseEnter={() => setSelected(state.name)}
                  onFocus={() => setSelected(state.name)}
                  onClick={() => setSelected(state.name)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected(state.name);
                    }
                  }}
                />;
              })}
            </g>
          </svg>
        ) : <p className="map-loading">Loading map...</p>}
      </div>
      <div className="map-state-detail" aria-live="polite">
        <div><span>Selected state</span><h3>{selected}</h3></div>
        {cities.length ? <div><strong>{cities.length} active {cities.length === 1 ? "chapter" : "chapters"}</strong><ul>{cities.map((city) => <li key={city}>{city}</li>)}</ul></div> : <p>No active chapters yet.</p>}
      </div>
      <p className="country-map-help">Hover, focus, or click a state to explore chapters.</p>
    </article>
  );
}

export function ChapterMap() {
  return (
    <div className="country-map-grid">
      <CountryMap country="United States" dataUrl="/us-states.geojson" initialState="North Carolina" filter={usStateNames} />
      <CountryMap country="India" dataUrl="/india-states.geojson" initialState="Tamil Nadu" />
    </div>
  );
}
