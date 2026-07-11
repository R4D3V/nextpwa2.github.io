"use client";

export type AdminLandListing = {
  slug: string;
  name: string;
  location: string;
  priceLow: string;
  priceHigh: string;
  description: string[];
  features: string[];
  images: string[];
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

const AUTH_KEY = "fr_admin_auth";
const LISTINGS_KEY = "fr_land_listings";
const GALLERY_KEY = "fr_gallery_images";
const DEFAULT_PASSWORD = "admin123";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function checkAuth(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login(password: string): boolean {
  if (password === DEFAULT_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getListings(): AdminLandListing[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LISTINGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getListingBySlug(slug: string): AdminLandListing | undefined {
  return getListings().find((l) => l.slug === slug);
}

export function saveListing(data: Omit<AdminLandListing, "slug">): AdminLandListing {
  const listings = getListings();
  const slug = slugify(data.name);
  const listing: AdminLandListing = { ...data, slug };
  const idx = listings.findIndex((l) => l.slug === slug);
  if (idx >= 0) {
    listings[idx] = listing;
  } else {
    listings.push(listing);
  }
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  return listing;
}

export function updateListing(slug: string, data: Partial<AdminLandListing>): AdminLandListing | undefined {
  const listings = getListings();
  const idx = listings.findIndex((l) => l.slug === slug);
  if (idx < 0) return undefined;
  listings[idx] = { ...listings[idx], ...data };
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  return listings[idx];
}

export function deleteListing(slug: string) {
  const listings = getListings().filter((l) => l.slug !== slug);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

export function seedListings(
  items: Array<{ name: string; location: string; priceLow: string; priceHigh: string; description: string[]; features: string[]; images: string[] }>
) {
  const existing = getListings();
  const existingSlugs = new Set(existing.map((l) => l.slug));
  let count = 0;
  for (const item of items) {
    const slug = slugify(item.name);
    if (!existingSlugs.has(slug)) {
      existing.push({ ...item, slug });
      existingSlugs.add(slug);
      count++;
    }
  }
  if (count > 0) localStorage.setItem(LISTINGS_KEY, JSON.stringify(existing));
  return count;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const res = await fetch("/api/gallery");
    if (!res.ok) {
      console.error("getGalleryImages failed:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return data.map((r: Record<string, string>) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      image: r.image,
      createdAt: r.created_at,
    }));
  } catch (err) {
    console.error("getGalleryImages error:", err);
    return [];
  }
}

export async function addGalleryImage(data: Omit<GalleryImage, "id" | "createdAt">): Promise<GalleryImage | null> {
  try {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("addGalleryImage failed:", res.status, await res.text());
      return null;
    }
    return res.json();
  } catch (err) {
    console.error("addGalleryImage error:", err);
    return null;
  }
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  try {
    const res = await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) console.error("deleteGalleryImage failed:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("deleteGalleryImage error:", err);
    return false;
  }
}
