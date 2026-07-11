"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import { contact, landListings, LandListing } from "@/lib/data";
import { getListings, AdminLandListing } from "@/lib/admin-store";

export default function LandDetailPage() {
  const params = useParams<{ slug: string }>();
  const [adminListings, setAdminListings] = useState<AdminLandListing[]>([]);

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

  const listing = allListings.find((l) => l.slug === params.slug) ?? null;
  const otherListings = listing
    ? allListings.filter((l) => l.slug !== listing.slug).slice(0, 3)
    : [];

  if (!listing) {
    return (
      <section className="mx-auto max-w-full px-4 sm:px-6 py-20 text-center lg:px-8">
        <h1 className="font-display text-4xl text-navy">Listing not found</h1>
        <Link href="/land" className="mt-4 inline-block text-sm font-semibold text-red">
          ← All land available
        </Link>
      </section>
    );
  }

  const whatsappHref = `https://wa.me/${contact.phoneDigits}?text=${encodeURIComponent(
    `Hi Frank Realtors, I'm interested in ${listing.name} (${listing.priceLow} - ${listing.priceHigh}).`
  )}`;

  return (
    <>
      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 pb-6 pt-[calc(var(--nav-h)+1.25rem)] text-center lg:px-8 sm:pt-[calc(var(--nav-h)+2rem)]">
        <Link href="/land" className="text-sm font-medium text-mist transition hover:text-red">
          ← All land available
        </Link>
        <div className="mt-6 flex flex-col items-center gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {listing.location} · {listing.type}
            </p>
            <h1 className="mt-2 font-display text-4xl text-navy sm:text-5xl">{listing.name}</h1>
          </div>
          <p className="font-display text-4xl text-red sm:text-5xl">
            {listing.priceLow} – {listing.priceHigh}
          </p>
          <p className="text-xs uppercase tracking-wide text-mist">
            {listing.plotSize} · {listing.titleType} title · {listing.status}
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 lg:px-8">
        <Gallery images={listing.images} alt={listing.name} />

        <div className="mt-8 w-full max-w-2xl space-y-6">
          <div className="neu-raised space-y-4 p-7">
            {listing.description.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-mist">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="neu-card p-7">
            <h2 className="font-display text-2xl text-navy">Plot features</h2>
            <ul className="mt-4 space-y-3">
              {listing.features.map((feature) => (
                <li key={feature} className="arrow-bullet text-sm text-ink">
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn mt-6 flex items-center justify-center px-6 py-3 text-sm font-semibold text-red"
            >
              Ask about this plot on WhatsApp
            </a>
            <Link
              href="/contact"
              className="neu-raised-sm mt-3 flex items-center justify-center px-6 py-3 text-sm font-semibold text-navy"
            >
              Use the contact form instead
            </Link>
          </div>
        </div>
      </section>

      {otherListings.length > 0 && (
        <Section eyebrow="More estates" title="Other land available" className="pt-4!">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherListings.map((l) => (
              <Link key={l.slug} href={`/land/${l.slug}`} className="neu-card block p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {l.location}
                </p>
                <h3 className="mt-2 text-base font-semibold text-navy">{l.name}</h3>
                <p className="mt-3 font-display text-2xl text-red">
                  {l.priceLow} – {l.priceHigh}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
