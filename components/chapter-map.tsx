"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";

countries.registerLocale(enLocale);

const mapWidth = 1000;
const mapHeight = 520;

const chapterCountries = [
  { id: "united-states", atlasId: "840", name: "United States", chapters: 5 },
  { id: "india", atlasId: "356", name: "India", chapters: 1 },
] as const;

const regions = [
  { id: "north-carolina", state: "North Carolina", countryId: "united-states", country: "United States", chapters: 3, cities: ["Charlotte", "Waxhaw", "Mint Hill"] },
  { id: "texas", state: "Texas", countryId: "united-states", country: "United States", chapters: 1, cities: ["Frisco"] },
  { id: "ohio", state: "Ohio", countryId: "united-states", country: "United States", chapters: 1, cities: ["New Albany"] },
  { id: "tamil-nadu", state: "Tamil Nadu", countryId: "india", country: "India", chapters: 1, cities: ["Coimbatore"] },
] as const;

type Region = (typeof regions)[number];

export function ChapterMap() {
  const [activeAtlasId, setActiveAtlasId] = useState("840");
  const [activeRegionId, setActiveRegionId] = useState<Region["id"]>("north-carolina");

  const mapCountries = useMemo(() => {
    const topology = worldAtlas as unknown as Topology<{ countries: GeometryCollection }>;
    const countryFeatures = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>;
    const projection = geoNaturalEarth1().fitExtent([[18, 18], [mapWidth - 18, mapHeight - 18]], countryFeatures);
    const path = geoPath(projection);

    return countryFeatures.features.map((country, index) => {
      const atlasId = String(country.id ?? "").padStart(3, "0");
      const chapterCountry = chapterCountries.find((item) => item.atlasId === atlasId);
      const name = chapterCountry?.name ?? countries.getName(atlasId, "en") ?? `Country ${atlasId}`;
      return { id: country.id ?? index, atlasId, name, path: path(country) ?? "", chapterCountry };
    });
  }, []);

  const activeCountry = mapCountries.find((country) => country.atlasId === activeAtlasId) ?? mapCountries[0];
  const activeChapterCountry = activeCountry.chapterCountry;
  const activeChapterCount = activeChapterCountry?.chapters ?? 0;
  const countryRegions = activeChapterCountry ? regions.filter((region) => region.countryId === activeChapterCountry.id) : [];
  const activeRegion = countryRegions.find((region) => region.id === activeRegionId) ?? countryRegions[0];

  const selectCountry = (atlasId: string) => {
    const chapterCountry = chapterCountries.find((country) => country.atlasId === atlasId);
    const firstRegion = chapterCountry ? regions.find((region) => region.countryId === chapterCountry.id) : undefined;
    setActiveAtlasId(atlasId);
    if (firstRegion) setActiveRegionId(firstRegion.id);
  };

  return (
    <div className="chapters-explorer">
      <div className="chapter-country-tabs" aria-label="Countries with active chapters">
        {chapterCountries.map((country) => (
          <button
            className={country.atlasId === activeCountry.atlasId ? "is-active" : ""}
            key={country.id}
            type="button"
            aria-pressed={country.atlasId === activeCountry.atlasId}
            onClick={() => selectCountry(country.atlasId)}
          >
            <span>{country.name}</span>
            <strong>{country.chapters} {country.chapters === 1 ? "chapter" : "chapters"}</strong>
          </button>
        ))}
      </div>

      <div className="chapter-map-layout">
        <div className="chapter-map-canvas">
          <svg className="chapter-world-map" viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="chapter-map-title chapter-map-description">
            <title id="chapter-map-title">AI Sprouts chapters by country</title>
            <desc id="chapter-map-description">Every country can be hovered, focused, or selected. Countries without active AI Sprouts chapters show a count of zero.</desc>
            <rect className="map-ocean" width={mapWidth} height={mapHeight} rx="26" />
            <g className="map-graticule" aria-hidden="true"><path d="M18 130H982M18 260H982M18 390H982M250 18V502M500 18V502M750 18V502" /></g>
            <g className="map-countries">
              {mapCountries.map((country) => {
                const chapterCount = country.chapterCountry?.chapters ?? 0;
                const isActive = country.atlasId === activeCountry.atlasId;
                return (
                  <path
                    className={`${chapterCount > 0 ? "has-chapters" : "is-empty"}${isActive ? " is-active" : ""}`}
                    d={country.path}
                    key={country.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${country.name}: ${chapterCount} ${chapterCount === 1 ? "chapter" : "chapters"}`}
                    onClick={() => selectCountry(country.atlasId)}
                    onFocus={() => selectCountry(country.atlasId)}
                    onMouseEnter={() => selectCountry(country.atlasId)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectCountry(country.atlasId);
                      }
                    }}
                  />
                );
              })}
            </g>
          </svg>
          <p className="map-help">Hover, click, or tab to any country.</p>
        </div>

        <aside className="chapter-region-panel" aria-live="polite">
          <div className="chapter-region-heading">
            <span>Chapter locations</span>
            <h2>{activeCountry.name}</h2>
            <p className="chapter-country-count"><strong>{activeChapterCount}</strong> {activeChapterCount === 1 ? "chapter" : "chapters"}</p>
          </div>

          {activeRegion ? (
            <>
              <div className="chapter-region-list" aria-label={`Chapter regions in ${activeCountry.name}`}>
                {countryRegions.map((region) => (
                  <button
                    className={region.id === activeRegion.id ? "is-active" : ""}
                    key={region.id}
                    type="button"
                    aria-pressed={region.id === activeRegion.id}
                    onClick={() => setActiveRegionId(region.id)}
                    onFocus={() => setActiveRegionId(region.id)}
                    onMouseEnter={() => setActiveRegionId(region.id)}
                  >
                    <span>{region.state}</span>
                    <strong>{region.chapters}</strong>
                  </button>
                ))}
              </div>
              <div className="chapter-map-detail">
                <p>{activeRegion.country}</p>
                <h3>{activeRegion.state}</h3>
                <strong>{activeRegion.chapters} {activeRegion.chapters === 1 ? "chapter" : "chapters"}</strong>
                <span>Current cities</span>
                <ul>{activeRegion.cities.map((city) => <li key={city}>{city}</li>)}</ul>
              </div>
            </>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
