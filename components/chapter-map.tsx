"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";

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

type CountryId = (typeof chapterCountries)[number]["id"];
type Region = (typeof regions)[number];

export function ChapterMap() {
  const [activeCountryId, setActiveCountryId] = useState<CountryId>("united-states");
  const [activeRegionId, setActiveRegionId] = useState<Region["id"]>("north-carolina");
  const activeCountry = chapterCountries.find((country) => country.id === activeCountryId) ?? chapterCountries[0];
  const countryRegions = regions.filter((region) => region.countryId === activeCountry.id);
  const activeRegion = regions.find((region) => region.id === activeRegionId && region.countryId === activeCountry.id) ?? countryRegions[0];

  const mapCountries = useMemo(() => {
    const topology = worldAtlas as unknown as Topology<{ countries: GeometryCollection }>;
    const countries = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>;
    const projection = geoNaturalEarth1().fitExtent([[18, 18], [mapWidth - 18, mapHeight - 18]], countries);
    const path = geoPath(projection);

    return countries.features.map((country, index) => {
      const atlasId = String(country.id ?? "").padStart(3, "0");
      const chapterCountry = chapterCountries.find((item) => item.atlasId === atlasId);
      return { id: country.id ?? index, path: path(country) ?? "", chapterCountry };
    });
  }, []);

  const selectCountry = (countryId: CountryId) => {
    const firstRegion = regions.find((region) => region.countryId === countryId);
    setActiveCountryId(countryId);
    if (firstRegion) setActiveRegionId(firstRegion.id);
  };

  return (
    <div className="chapters-explorer">
      <div className="chapter-country-tabs" aria-label="Choose a country">
        {chapterCountries.map((country) => (
          <button
            className={country.id === activeCountry.id ? "is-active" : ""}
            key={country.id}
            type="button"
            aria-pressed={country.id === activeCountry.id}
            onClick={() => selectCountry(country.id)}
          >
            <span>{country.name}</span>
            <strong>{country.chapters} {country.chapters === 1 ? "chapter" : "chapters"}</strong>
          </button>
        ))}
      </div>

      <div className="chapter-map-layout">
        <div className="chapter-map-canvas">
          <svg className="chapter-world-map" viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="chapter-map-title chapter-map-description">
            <title id="chapter-map-title">AI Sprouts chapter countries</title>
            <desc id="chapter-map-description">The United States and India are highlighted. Hover, focus, or select either country to explore its states and chapter cities.</desc>
            <rect className="map-ocean" width={mapWidth} height={mapHeight} rx="26" />
            <g className="map-graticule" aria-hidden="true"><path d="M18 130H982M18 260H982M18 390H982M250 18V502M500 18V502M750 18V502" /></g>
            <g className="map-countries">
              {mapCountries.map((country) => {
                const isActive = country.chapterCountry?.id === activeCountry.id;
                const isInteractive = Boolean(country.chapterCountry);
                return (
                  <path
                    className={`${isInteractive ? "has-chapters" : ""}${isActive ? " is-active" : ""}`}
                    d={country.path}
                    key={country.id}
                    role={isInteractive ? "button" : undefined}
                    tabIndex={isInteractive ? 0 : undefined}
                    aria-label={country.chapterCountry ? `${country.chapterCountry.name}: ${country.chapterCountry.chapters} ${country.chapterCountry.chapters === 1 ? "chapter" : "chapters"}` : undefined}
                    onClick={() => country.chapterCountry && selectCountry(country.chapterCountry.id)}
                    onFocus={() => country.chapterCountry && selectCountry(country.chapterCountry.id)}
                    onMouseEnter={() => country.chapterCountry && selectCountry(country.chapterCountry.id)}
                    onKeyDown={(event) => {
                      if (country.chapterCountry && (event.key === "Enter" || event.key === " ")) {
                        event.preventDefault();
                        selectCountry(country.chapterCountry.id);
                      }
                    }}
                  />
                );
              })}
            </g>
          </svg>
          <div className="map-country-summary" aria-live="polite">
            <span>Selected country</span>
            <strong>{activeCountry.name}</strong>
            <p>{activeCountry.chapters} {activeCountry.chapters === 1 ? "chapter" : "chapters"} across {countryRegions.length} {countryRegions.length === 1 ? "region" : "states"}</p>
          </div>
          <p className="map-help">Hover, click, or tab to a highlighted country.</p>
        </div>

        <aside className="chapter-region-panel">
          <div className="chapter-region-heading">
            <span>States and regions</span>
            <h2>{activeCountry.name}</h2>
          </div>
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
          <div className="chapter-map-detail" aria-live="polite">
            <p>{activeRegion.country}</p>
            <h3>{activeRegion.state}</h3>
            <strong>{activeRegion.chapters} {activeRegion.chapters === 1 ? "chapter" : "chapters"}</strong>
            <span>Current cities</span>
            <ul>{activeRegion.cities.map((city) => <li key={city}>{city}</li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
