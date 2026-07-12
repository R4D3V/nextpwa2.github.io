import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export type LandListing = {
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

function mapRow(r: Record<string, unknown>): LandListing {
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

export async function getAllListings(): Promise<LandListing[]> {
  const rows = await sql`
    SELECT slug, name, location, type, status, title_type, plot_size,
           price_low, price_high, price_value, featured,
           description, features, images
    FROM land_listings
    ORDER BY featured DESC, price_value ASC
  `;
  return rows.map(mapRow);
}

export async function getListingBySlug(slug: string): Promise<LandListing | null> {
  const rows = await sql`
    SELECT slug, name, location, type, status, title_type, plot_size,
           price_low, price_high, price_value, featured,
           description, features, images
    FROM land_listings
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export async function getFeaturedListings(): Promise<LandListing[]> {
  const rows = await sql`
    SELECT slug, name, location, type, status, title_type, plot_size,
           price_low, price_high, price_value, featured,
           description, features, images
    FROM land_listings
    WHERE featured = true
    ORDER BY price_value ASC
  `;
  return rows.map(mapRow);
}

export async function getOtherListings(excludeSlug: string, limit = 3): Promise<LandListing[]> {
  const rows = await sql`
    SELECT slug, name, location, type, status, title_type, plot_size,
           price_low, price_high, price_value, featured,
           description, features, images
    FROM land_listings
    WHERE slug != ${excludeSlug}
    ORDER BY featured DESC, price_value ASC
    LIMIT ${limit}
  `;
  return rows.map(mapRow);
}

export async function getLocationSummaries(): Promise<{ location: string; count: number }[]> {
  const rows = await sql`
    SELECT location, COUNT(*)::int AS count
    FROM land_listings
    GROUP BY location
    ORDER BY count DESC
  `;
  return rows.map((r) => ({ location: r.location as string, count: r.count as number }));
}
