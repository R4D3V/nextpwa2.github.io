"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListings, saveListing, deleteListing, AdminLandListing } from "@/lib/admin-store";

export default function AdminListingsPage() {
  const [listings, setListings] = useState<AdminLandListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListings().then((l) => { setListings(l); setLoading(false); });
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this listing?")) return;
    await deleteListing(slug);
    setListings(await getListings());
  }

  async function handleDuplicate(listing: AdminLandListing) {
    await saveListing({
      name: `${listing.name} (copy)`,
      location: listing.location,
      type: listing.type,
      status: listing.status,
      titleType: listing.titleType,
      plotSize: listing.plotSize,
      priceLow: listing.priceLow,
      priceHigh: listing.priceHigh,
      priceValue: listing.priceValue,
      featured: false,
      description: listing.description,
      features: listing.features,
      images: listing.images,
    });
    setListings(await getListings());
  }

  return (
    <div className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 lg:px-8">
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-navy">Land Listings</h1>
          <p className="mt-2 text-sm text-mist">{loading ? "Loading..." : `${listings.length} listing${listings.length !== 1 ? "s" : ""}`}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/admin" className="neu-raised-sm px-5 py-2.5 text-sm font-semibold text-navy">
            ← Dashboard
          </Link>
          <Link href="/admin/listings/new" className="neu-btn px-6 py-3 text-sm font-semibold text-red">
            + New listing
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid w-full max-w-5xl gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="neu-card flex items-center gap-6 p-5">
              <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-base-light" />
              <div className="min-w-0 flex-1">
                <div className="h-3 w-24 animate-pulse rounded bg-base-light" />
                <div className="mt-2 h-4 w-48 animate-pulse rounded bg-base-light" />
                <div className="mt-2 h-3 w-32 animate-pulse rounded bg-base-light" />
              </div>
              <div className="flex shrink-0 gap-2">
                <div className="h-9 w-16 animate-pulse rounded bg-base-light" />
                <div className="h-9 w-20 animate-pulse rounded bg-base-light" />
                <div className="h-9 w-16 animate-pulse rounded bg-base-light" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="neu-card mt-10 p-10 text-center">
          <p className="text-mist">No listings in the admin database yet.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link href="/admin/listings/new" className="neu-btn px-6 py-3 text-sm font-semibold text-red">
              Create new listing
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid w-full max-w-5xl gap-4">
          {listings.map((listing) => (
            <div key={listing.slug} className="neu-card flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 p-5">
              {listing.images[0] && (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img src={listing.images[0]} alt="" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{listing.location}</p>
                <h3 className="truncate text-base font-semibold text-navy">{listing.name}</h3>
                <p className="text-sm text-mist">{listing.priceLow} – {listing.priceHigh}</p>
              </div>
              <div className="flex shrink-0 gap-2 flex-wrap">
                <Link
                  href={`/admin/listings/${listing.slug}/edit`}
                  className="neu-raised-sm px-4 py-2 text-sm font-semibold text-navy"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDuplicate(listing)}
                  className="neu-raised-sm px-4 py-2 text-sm font-semibold text-navy"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => handleDelete(listing.slug)}
                  className="neu-btn px-4 py-2 text-sm font-semibold text-red"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
