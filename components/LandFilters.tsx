"use client";

import { useState, useMemo } from "react";
import ListingCard from "@/components/ListingCard";
import type { LandListing } from "@/lib/queries";

const types = ["Residential", "Commercial", "Mixed-Use", "Farmland"];

export default function LandFilters({
  allListings,
  initialLocation,
  initialType,
}: {
  allListings: LandListing[];
  initialLocation: string;
  initialType: string;
}) {
  const [location, setLocation] = useState(initialLocation);
  const [type, setType] = useState(initialType);
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  const locations = useMemo(
    () => Array.from(new Set(allListings.map((l) => l.location))),
    [allListings]
  );

  const filtered = useMemo(() => {
    let list = allListings.filter((l) => {
      if (location && l.location !== location) return false;
      if (type && l.type !== type) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [allListings, location, type, sort]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="neu-pressed rounded-xl bg-transparent px-4 py-2.5 text-sm text-navy outline-none"
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="neu-pressed rounded-xl bg-transparent px-4 py-2.5 text-sm text-navy outline-none"
        >
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="neu-pressed rounded-xl bg-transparent px-4 py-2.5 text-sm text-navy outline-none"
        >
          <option value="default">Sort: featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>

        {(location || type) && (
          <button
            type="button"
            onClick={() => {
              setLocation("");
              setType("");
            }}
            className="neu-raised-sm rounded-xl px-4 py-2.5 text-sm font-semibold text-mist"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-mist">
          No plots match those filters right now — try clearing a filter or ask us on WhatsApp about upcoming estates.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plot) => (
            <ListingCard key={plot.slug} listing={plot} />
          ))}
        </div>
      )}
    </>
  );
}
