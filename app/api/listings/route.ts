import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS land_listings (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'Residential',
      status TEXT NOT NULL DEFAULT 'Available',
      title_type TEXT NOT NULL DEFAULT 'Freehold',
      plot_size TEXT NOT NULL DEFAULT '—',
      price_low TEXT NOT NULL,
      price_high TEXT NOT NULL,
      price_value REAL NOT NULL DEFAULT 0,
      featured BOOLEAN NOT NULL DEFAULT false,
      description TEXT[] NOT NULL DEFAULT '{}',
      features TEXT[] NOT NULL DEFAULT '{}',
      images TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await sql`
      SELECT slug, name, location, type, status, title_type, plot_size,
             price_low, price_high, price_value, featured,
             description, features, images, created_at
      FROM land_listings
      ORDER BY featured DESC, price_value ASC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/listings error:", err);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();

    if (!body.name || !body.location || !body.priceLow || !body.priceHigh) {
      return NextResponse.json({ error: "name, location, priceLow, priceHigh are required" }, { status: 400 });
    }

    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const description: string[] = body.description ?? [];
    const features: string[] = body.features ?? [];
    const images: string[] = body.images ?? [];

    const existing = await sql`SELECT slug FROM land_listings WHERE slug = ${slug}`;

    if (existing.length > 0) {
      await sql`
        UPDATE land_listings SET
          name = ${body.name},
          location = ${body.location},
          type = ${body.type ?? "Residential"},
          status = ${body.status ?? "Available"},
          title_type = ${body.titleType ?? "Freehold"},
          plot_size = ${body.plotSize ?? "—"},
          price_low = ${body.priceLow},
          price_high = ${body.priceHigh},
          price_value = ${body.priceValue ?? 0},
          featured = ${body.featured ?? false},
          description = ${description},
          features = ${features},
          images = ${images}
        WHERE slug = ${slug}
      `;
    } else {
      await sql`
        INSERT INTO land_listings (slug, name, location, type, status, title_type, plot_size,
          price_low, price_high, price_value, featured, description, features, images)
        VALUES (${slug}, ${body.name}, ${body.location}, ${body.type ?? "Residential"},
          ${body.status ?? "Available"}, ${body.titleType ?? "Freehold"}, ${body.plotSize ?? "—"},
          ${body.priceLow}, ${body.priceHigh}, ${body.priceValue ?? 0}, ${body.featured ?? false},
          ${description}, ${features}, ${images})
      `;
    }

    return NextResponse.json({ slug, ...body });
  } catch (err) {
    console.error("POST /api/listings error:", err);
    return NextResponse.json({ error: "Failed to save listing" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensureTable();
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }
    await sql`DELETE FROM land_listings WHERE slug = ${slug}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/listings error:", err);
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}
