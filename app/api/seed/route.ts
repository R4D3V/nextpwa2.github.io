import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const seedData = [
  {
    name: "Busunju Gardens Estate",
    location: "Busunju",
    type: "Residential",
    status: "Selling Fast",
    titleType: "Freehold",
    plotSize: "50x100 ft",
    priceLow: "12M",
    priceHigh: "18M",
    priceValue: 12000000,
    featured: true,
    description: [
      "Busunju Gardens sits just off the Kampala–Hoima highway, a short drive from the trading centre. Roads are already opened and murramed, with each plot individually surveyed and titled before sale.",
      "The estate is laid out for family homes, with wide access roads and space reserved for a future community borehole.",
    ],
    features: [
      "Freehold title, ready on payment completion",
      "Murramed access roads",
      "10km from Busunju trading centre",
      "Flat, buildable terrain",
      "Installment plans up to 12 months",
    ],
    images: [
      "https://picsum.photos/seed/busunju-1/900/700",
      "https://picsum.photos/seed/busunju-2/900/700",
      "https://picsum.photos/seed/busunju-3/900/700",
      "https://picsum.photos/seed/busunju-4/900/700",
    ],
  },
  {
    name: "Buloba Heights",
    location: "Buloba",
    type: "Residential",
    status: "Available",
    titleType: "Freehold",
    plotSize: "50x100 ft",
    priceLow: "20M",
    priceHigh: "28M",
    priceValue: 20000000,
    featured: true,
    description: [
      "Buloba Heights overlooks the Kampala–Mityana road, close enough to town for a daily commute but quiet enough for a family compound. Every plot has been surveyed and pegged.",
      "Power lines already run along the main access road, and several neighbouring plots have completed homes.",
    ],
    features: [
      "Freehold title, ready on payment completion",
      "Electricity line along main road",
      "6km from Buloba trading centre",
      "Several completed neighbouring homes",
      "Installment plans up to 12 months",
    ],
    images: [
      "https://picsum.photos/seed/buloba-1/900/700",
      "https://picsum.photos/seed/buloba-2/900/700",
      "https://picsum.photos/seed/buloba-3/900/700",
      "https://picsum.photos/seed/buloba-4/900/700",
    ],
  },
  {
    name: "Zigoti Riverside Plots",
    location: "Zigoti",
    type: "Mixed-Use",
    status: "Available",
    titleType: "Freehold",
    plotSize: "100x100 ft",
    priceLow: "15M",
    priceHigh: "22M",
    priceValue: 15000000,
    description: [
      "Larger plots at Zigoti suit both a home and a small commercial plan — several owners here run shops or rentals fronting the main road.",
      "The estate borders the Zigoti river valley, with rich soil that also works well for kitchen gardens.",
    ],
    features: [
      "Freehold title, ready on payment completion",
      "Road-frontage plots available",
      "Suited to home + small business",
      "Fertile soil, good for gardens",
      "Installment plans up to 12 months",
    ],
    images: [
      "https://picsum.photos/seed/zigoti-1/900/700",
      "https://picsum.photos/seed/zigoti-2/900/700",
      "https://picsum.photos/seed/zigoti-3/900/700",
    ],
  },
  {
    name: "Kammengo Estate",
    location: "Kammengo, Mpigi",
    type: "Residential",
    status: "Few Plots Left",
    titleType: "Mailo",
    plotSize: "50x100 ft",
    priceLow: "8M",
    priceHigh: "13M",
    priceValue: 8000000,
    featured: true,
    description: [
      "Kammengo Estate is our most affordable entry point, aimed at first-time land owners. Mailo titles are processed individually per plot once the full estate subdivision is complete.",
      "Only a handful of plots remain on the current phase, with a second phase planned once this one sells out.",
    ],
    features: [
      "Mailo title, processed per plot",
      "Entry-level pricing",
      "Phase 2 planned nearby",
      "15km from Mpigi town",
      "Installment plans up to 12 months",
    ],
    images: [
      "https://picsum.photos/seed/kammengo-1/900/700",
      "https://picsum.photos/seed/kammengo-2/900/700",
      "https://picsum.photos/seed/kammengo-3/900/700",
      "https://picsum.photos/seed/kammengo-4/900/700",
    ],
  },
  {
    name: "Nsangi Commercial Frontage",
    location: "Nsangi",
    type: "Commercial",
    status: "Available",
    titleType: "Freehold",
    plotSize: "50x150 ft",
    priceLow: "35M",
    priceHigh: "55M",
    priceValue: 35000000,
    description: [
      "Frontage plots directly on the Kampala–Masaka highway at Nsangi, suited to a shop, fuel station, or warehouse. Traffic counts here are among the highest of any plot we sell.",
      "Titles for this stretch are fully processed and transfer-ready.",
    ],
    features: [
      "Freehold, transfer-ready title",
      "Direct highway frontage",
      "High daily traffic count",
      "Suited to retail or warehousing",
      "Installment plans available",
    ],
    images: [
      "https://picsum.photos/seed/nsangi-1/900/700",
      "https://picsum.photos/seed/nsangi-2/900/700",
      "https://picsum.photos/seed/nsangi-3/900/700",
    ],
  },
  {
    name: "Kasanje Farmland",
    location: "Kasanje",
    type: "Farmland",
    status: "Available",
    titleType: "Freehold",
    plotSize: "1–5 acres",
    priceLow: "6M",
    priceHigh: "28M",
    priceValue: 6000000,
    description: [
      "Open farmland at Kasanje sold in acre blocks, popular with clients who want land managed on their behalf under our farm management service.",
      "Soil here supports maize, beans, and banana with minimal input — several existing blocks are already under cultivation.",
    ],
    features: [
      "Sold in 1-acre blocks or larger",
      "Farm management service available",
      "Good soil for maize, beans, banana",
      "Freehold title",
      "Installment plans available",
    ],
    images: [
      "https://picsum.photos/seed/kasanje-1/900/700",
      "https://picsum.photos/seed/kasanje-2/900/700",
      "https://picsum.photos/seed/kasanje-3/900/700",
    ],
  },
  {
    name: "Entebbe Road Residential Plots",
    location: "Kisubi, Entebbe Road",
    type: "Residential",
    status: "Few Plots Left",
    titleType: "Freehold",
    plotSize: "50x100 ft",
    priceLow: "45M",
    priceHigh: "70M",
    priceValue: 45000000,
    featured: true,
    description: [
      "Our closest estate to Entebbe town, a short run from the airport and Kisubi's schools and hospitals. Premium pricing reflects the location rather than plot size.",
      "Roads, drainage, and street lighting on the main access road are already complete.",
    ],
    features: [
      "Freehold title, ready on payment completion",
      "10 minutes from Entebbe International Airport",
      "Tarmac access nearby",
      "Street lighting on main road",
      "Installment plans up to 12 months",
    ],
    images: [
      "https://picsum.photos/seed/entebbe-1/900/700",
      "https://picsum.photos/seed/entebbe-2/900/700",
      "https://picsum.photos/seed/entebbe-3/900/700",
      "https://picsum.photos/seed/entebbe-4/900/700",
    ],
  },
  {
    name: "Nkozi Lakeview Plots",
    location: "Nkozi",
    type: "Residential",
    status: "Available",
    titleType: "Freehold",
    plotSize: "50x100 ft",
    priceLow: "10M",
    priceHigh: "16M",
    priceValue: 10000000,
    description: [
      "A quieter estate near Nkozi with several plots offering a distant view of Lake Victoria. Popular with clients planning a retirement home or weekend house.",
      "Access road opening is complete; individual titling is in progress plot by plot.",
    ],
    features: [
      "Freehold title, in progress per plot",
      "Distant lake views from upper plots",
      "Quiet, low-density surroundings",
      "Suited to retirement or weekend homes",
      "Installment plans up to 12 months",
    ],
    images: [
      "https://picsum.photos/seed/nkozi-1/900/700",
      "https://picsum.photos/seed/nkozi-2/900/700",
      "https://picsum.photos/seed/nkozi-3/900/700",
    ],
  },
];

export async function GET() {
  try {
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

    let inserted = 0;
    for (const item of seedData) {
      const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const existing = await sql`SELECT slug FROM land_listings WHERE slug = ${slug}`;
      if (existing.length > 0) continue;

      await sql`
        INSERT INTO land_listings (slug, name, location, type, status, title_type, plot_size,
          price_low, price_high, price_value, featured, description, features, images)
        VALUES (${slug}, ${item.name}, ${item.location}, ${item.type},
          ${item.status}, ${item.titleType}, ${item.plotSize},
          ${item.priceLow}, ${item.priceHigh}, ${item.priceValue}, ${item.featured ?? false},
          ${item.description}, ${item.features}, ${item.images})
      `;
      inserted++;
    }

    return NextResponse.json({ inserted, total: seedData.length });
  } catch (err) {
    console.error("GET /api/seed error:", err);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
