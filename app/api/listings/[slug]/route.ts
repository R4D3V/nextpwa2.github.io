import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const rows = await sql`
      SELECT slug, name, location, type, status, title_type, plot_size,
             price_low, price_high, price_value, featured,
             description, features, images, created_at
      FROM land_listings
      WHERE slug = ${slug}
      LIMIT 1
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("GET /api/listings/[slug] error:", err);
    return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();

    const description: string[] = body.description ?? [];
    const features: string[] = body.features ?? [];
    const images: string[] = body.images ?? [];

    const newSlug = body.name
      ? body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : slug;

    if (newSlug !== slug) {
      await sql`DELETE FROM land_listings WHERE slug = ${newSlug}`;
      await sql`UPDATE land_listings SET slug = ${newSlug} WHERE slug = ${slug}`;
    }

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
      WHERE slug = ${newSlug}
    `;

    return NextResponse.json({ slug: newSlug, ...body });
  } catch (err) {
    console.error("PUT /api/listings/[slug] error:", err);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}
