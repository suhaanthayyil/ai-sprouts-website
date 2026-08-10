"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";

const mapWidth = 1000;
const mapHeight = 520;

const regions = [
  { id: "north-carolina", state: "North Carolina", country: "United States", chapters: 3, cities: ["Charlotte", "Waxhaw", "Mint Hill"], coordinates: [-80.75, 35.12] as [number, number] },
  { id: "texas", state: "Texas", country: "United States", chapters: 1, cities: ["Frisco"], coordinates: [-96.82, 33.15] as [number, number] },
  { id: "ohio", state: "Ohio", country: "United States", chapters: 1, cities: ["New Albany"], coordinates: [-82.81, 40.08] as [number, number] },
  { id: "tamil-nadu", state: "Tamil Nadu", country: "India", chapters: 1, cities: ["Coimbatore"], coordinates: [76.96, 11.02] as [number, number] },
] as const;

type Region = (typeof regions)[number];

export function ChapterMap() {
  const [activeId, setActiveId] = useState<Region["id"]>("north-carolina");
  const activeRegion = regions.find((region) => region.id === activeId) ?? regions[0];

  const map = useMemo(() => {
    const topology = worldAtlas as unknown as Topology<{ countries: GeometryCollection }>;
    const countries = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>;
    const projection = geoNaturalEarth1().fitExtent([[18, 18], [mapWidth - 18, mapHeight - 18]], countries);
    const path = geoPath(projection);
    return {
      countries: countries.features.map((country, index) => ({ id: country.id ?? index, path: path(country) ?? "" })),
      markers: regions.map((region) => {
        const point = projection(region.coordinates) ?? [0, 0];
        return { ...region, left: `${(point[0] / mapWidth) * 100}%`, top: `${(point[1] / mapHeight) * 100}%` };
      }),
    };
  }, []);

  return (
    <div className="chapter-map-layout">
      <div className="chapter-map-canvas" aria-label="World map showing AI Sprouts chapter regions">
        <svg className="chapter-world-map" viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="chapter-map-title chapter-map-description">
          <title id="chapter-map-title">AI Sprouts chapters around the world</title>
          <desc id="chapter-map-description">Highlighted locations in North Carolina, Texas, Ohio, and Tamil Nadu. Select a marker to see chapter cities.</desc>
          <rect className="map-ocean" width={mapWidth} height={mapHeight} rx="26" />
          <g className="map-graticule" aria-hidden="true"><path d="M18 130H982M18 260H982M18 390H982M250 18V502M500 18V502M750 18V502" /></g>
          <g className="map-countries" aria-hidden="true">{map.countries.map((country) => <path d={country.path} key={country.id} />)}</g>
        </svg>

        {map.markers.map((region) => (
          <button
            className={region.id === activeId ? "map-marker is-active" : "map-marker"}
            key={region.id}
            type="button"
            style={{ left: region.left, top: region.top }}
            aria-pressed={region.id === activeId}
            aria-label={`${region.state}: ${region.chapters} ${region.chapters === 1 ? "chapter" : "chapters"} in ${region.cities.join(", ")}`}
            onClick={() => setActiveId(region.id)}
            onFocus={() => setActiveId(region.id)}
            onMouseEnter={() => setActiveId(region.id)}
          >
            <span>{region.chapters}</span>
            <strong>{region.state}</strong>
          </button>
        ))}
        <p className="map-help">Hover, tap, or tab through a highlighted region.</p>
      </div>

      <aside className="chapter-map-detail" aria-live="polite">
        <p>{activeRegion.country}</p>
        <h2>{activeRegion.state}</h2>
        <strong>{activeRegion.chapters} {activeRegion.chapters === 1 ? "chapter" : "chapters"}</strong>
        <span>Current cities</span>
        <ul>{activeRegion.cities.map((city) => <li key={city}>{city}</li>)}</ul>
      </aside>
    </div>
  );
}
