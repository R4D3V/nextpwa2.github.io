"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListings, deleteListing, AdminLandListing } from "@/lib/admin-store";

export default function AdminListingsPage() {
  const [listings, setListings] = useState<AdminLandListing[]>([]);

  useEffect(() => {
    setListings(getListings());
  }, []);

  function handleDelete(slug: string) {
    if (!confirm("Delete this listing?")) return;
    deleteListing(slug);
    setListings(getListings());
  }

  return (
    <div className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 lg:px-8">
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-navy">Land Listings</h1>
          <p className="mt-2 text-sm text-mist">{listings.length} listing{listings.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/admin/listings/new" className="neu-btn px-6 py-3 text-sm font-semibold text-red">
            + New listing
          </Link>
        </div>
      </div>

      {listings.length === 0 && (
        <div className="neu-card mt-10 p-10 text-center">
          <p className="text-mist">No listings in the admin database yet.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link href="/admin/listings/new" className="neu-btn px-6 py-3 text-sm font-semibold text-red">
              Create new listing
            </Link>
          </div>
        </div>
      )}

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
                onClick={() => handleDelete(listing.slug)}
                className="neu-btn px-4 py-2 text-sm font-semibold text-red"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
