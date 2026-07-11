"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListings, getGalleryImages } from "@/lib/admin-store";

export default function AdminDashboard() {
  const [listingCount, setListingCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);

  useEffect(() => {
    setListingCount(getListings().length);
    setGalleryCount(getGalleryImages().length);
  }, []);

  return (
    <div className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 pb-10 pt-[calc(var(--nav-h)+2rem)] text-center lg:px-8">
      <h1 className="font-display text-4xl text-navy">Dashboard</h1>
      <p className="mt-2 text-sm text-mist">Manage your land listings and gallery images.</p>

      <div className="mt-10 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        <Link href="/admin/listings" className="neu-card block p-8">
          <h2 className="font-display text-2xl text-navy">Land Listings</h2>
          <p className="mt-1 text-sm text-mist">
            {listingCount} listing{listingCount !== 1 ? "s" : ""}
          </p>
          <p className="mt-4 text-sm font-semibold text-red">Manage listings →</p>
        </Link>

        <Link href="/admin/gallery" className="neu-card block p-8">
          <h2 className="font-display text-2xl text-navy">Gallery</h2>
          <p className="mt-1 text-sm text-mist">
            {galleryCount} image{galleryCount !== 1 ? "s" : ""}
          </p>
          <p className="mt-4 text-sm font-semibold text-red">Manage gallery →</p>
        </Link>
      </div>
    </div>
  );
}
