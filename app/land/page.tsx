"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import ListingCard from "@/components/ListingCard";
import { contact, landListings, LandListing } from "@/lib/data";
import { getListings, AdminLandListing } from "@/lib/admin-store";

const types = ["Residential", "Commercial", "Mixed-Use", "Farmland"];

function LandPageContent() {
  const searchParams = useSearchParams();
  const [adminListings, setAdminListings] = useState<AdminLandListing[]>([]);

  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  useEffect(() => {
    setAdminListings(getListings());
  }, []);

  const allListings: LandListing[] = useMemo(() => {
    const staticSlugs = new Set(landListings.map((l) => l.slug));
    const extra: LandListing[] = adminListings
      .filter((l) => !staticSlugs.has(l.slug))
      .map((l) => ({
        ...l,
        type: "Residential",
        status: "Available",
        titleType: "Freehold",
        plotSize: "—",
        priceValue: 0,
      }));
    return [...landListings, ...extra];
  }, [adminListings]);

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
      <Section
        eyebrow="On the market now"
        title="Land available"
        intro="We allow installment payments on every estate below. Filter by area, plot type, or sort by price — open a listing for the full photo gallery, features, and terms."
        className="pt-[calc(var(--nav-h)+1rem)]"
        noReveal
      >
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
      </Section>

      <Section className="pt-0!" noReveal>
        <div className="neu-raised flex flex-col items-center gap-6 p-10 text-center sm:p-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            Don&apos;t see the right location?
          </h2>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist">
            New estates are added regularly. Tell us your budget and preferred
            area and we&apos;ll match you to a plot.
          </p>
          <a
            href={`https://wa.me/${contact.phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn px-8 py-3.5 text-sm font-semibold text-red"
          >
            Chat on WhatsApp
          </a>
        </div>
      </Section>
    </>
  );
}

export default function LandPage() {
  return (
    <Suspense fallback={<div className="pt-[calc(var(--nav-h)+1rem)] text-center text-sm text-mist">Loading...</div>}>
      <LandPageContent />
    </Suspense>
  );
}
