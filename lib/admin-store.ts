"use client";

export type AdminLandListing = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  titleType: string;
  plotSize: string;
  priceLow: string;
  priceHigh: string;
  priceValue: number;
  featured: boolean;
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
const DEFAULT_PASSWORD = "admin123";

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

function mapRow(r: Record<string, unknown>): AdminLandListing {
  return {
    slug: r.slug as string,
    name: r.name as string,
    location: r.location as string,
    type: (r.type as string) ?? "Residential",
    status: (r.status as string) ?? "Available",
    titleType: (r.title_type as string) ?? "Freehold",
    plotSize: (r.plot_size as string) ?? "—",
    priceLow: r.price_low as string,
    priceHigh: r.price_high as string,
    priceValue: (r.price_value as number) ?? 0,
    featured: (r.featured as boolean) ?? false,
    description: r.description as string[],
    features: r.features as string[],
    images: r.images as string[],
  };
}

export async function getListings(): Promise<AdminLandListing[]> {
  try {
    const res = await fetch("/api/listings");
    if (!res.ok) {
      console.error("getListings failed:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return data.map(mapRow);
  } catch (err) {
    console.error("getListings error:", err);
    return [];
  }
}

export async function getListingBySlug(slug: string): Promise<AdminLandListing | undefined> {
  try {
    const res = await fetch(`/api/listings/${encodeURIComponent(slug)}`);
    if (res.status === 404) return undefined;
    if (!res.ok) {
      console.error("getListingBySlug failed:", res.status, await res.text());
      return undefined;
    }
    return mapRow(await res.json());
  } catch (err) {
    console.error("getListingBySlug error:", err);
    return undefined;
  }
}

export async function saveListing(data: Omit<AdminLandListing, "slug">): Promise<AdminLandListing | null> {
  try {
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("saveListing failed:", res.status, await res.text());
      return null;
    }
    return mapRow(await res.json());
  } catch (err) {
    console.error("saveListing error:", err);
    return null;
  }
}

export async function updateListing(slug: string, data: Partial<AdminLandListing>): Promise<AdminLandListing | null> {
  try {
    const res = await fetch(`/api/listings/${encodeURIComponent(slug)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("updateListing failed:", res.status, await res.text());
      return null;
    }
    return mapRow(await res.json());
  } catch (err) {
    console.error("updateListing error:", err);
    return null;
  }
}

export async function deleteListing(slug: string): Promise<boolean> {
  try {
    const res = await fetch("/api/listings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (!res.ok) console.error("deleteListing failed:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("deleteListing error:", err);
    return false;
  }
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
