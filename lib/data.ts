export type Service = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  description: string[];
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "estate-development",
    number: "01",
    name: "Estate Development",
    tagline: "From raw ground to gated estate",
    summary:
      "We plan and develop full residential and commercial estates — roads, plot layout, and titles handled from the first survey peg to the final sale.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    description: [
      "Estate development is where every other service we offer meets in one place. We take raw land, work out the most sellable and liveable layout for it, and carry the project through opening of access roads, subdivision, and titling of individual plots.",
      "Every estate currently on our books — from Busunju to Buloba — passed through this process before a single plot went on sale. It's the backbone of Frank Realtors.",
    ],
    bullets: [
      "Land acquisition & feasibility",
      "Plot layout & subdivision planning",
      "Access road opening",
      "Title processing per plot",
      "Estate sales & installment plans",
    ],
  },
  {
    slug: "surveying",
    number: "02",
    name: "Surveying",
    tagline: "Boundaries you can defend",
    summary:
      "Licensed boundary opening, resurveying, and mapping — the paperwork and pegs that protect a plot from future dispute.",
    image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&h=600&fit=crop",
    description: [
      "A plot is only as secure as its survey. We carry out boundary opening, re-opening of disputed boundaries, and full topographical surveys for clients building, subdividing, or simply confirming what they own.",
      "Every survey we run feeds directly into Ministry of Lands records, so the coordinates on your title match what's pegged on the ground.",
    ],
    bullets: [
      "Boundary opening & re-opening",
      "Topographical & site surveys",
      "Deed plan preparation",
      "Coordinate verification with Ministry of Lands",
      "Subdivision surveys",
    ],
  },
  {
    slug: "land-documentation",
    number: "03",
    name: "Land Documentation",
    tagline: "Clean paper, clear ownership",
    summary:
      "Title searches, transfers, and processing — we handle the Ministry of Lands paperwork so your ownership is never in question.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    description: [
      "Most land disputes in Uganda trace back to weak paperwork, not weak land. We run title searches before you commit to a purchase, process transfers once you have, and follow up on titles stuck in the system.",
      "This is the quiet, unglamorous work that makes every other transaction safe.",
    ],
    bullets: [
      "Title search & due diligence",
      "Transfer processing",
      "Sale agreement drafting",
      "Title follow-up at Ministry of Lands",
      "Land title mortgage support",
    ],
  },
  {
    slug: "land-settlement",
    number: "04",
    name: "Land Settlement",
    tagline: "Resolving disputes on the ground",
    summary:
      "Boundary disputes, family land conflicts, and encroachment — we mediate and settle before they become court cases.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    description: [
      "Land settlement is about getting neighbours, family members, or buyers and sellers to agree on a boundary or claim before it escalates. We combine surveying, local council engagement, and straightforward mediation.",
      "Where settlement isn't possible on-site, we prepare the documentation needed to take a matter further.",
    ],
    bullets: [
      "Boundary dispute mediation",
      "Family land settlement",
      "Encroachment resolution",
      "Local council liaison",
      "Settlement documentation",
    ],
  },
  {
    slug: "farm-management",
    number: "05",
    name: "Farm Management",
    tagline: "Land that works while you're away",
    summary:
      "Day-to-day management of agricultural land for absentee owners — from planting schedules to harvest sales.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    description: [
      "Many of our clients buy land as an investment but live and work elsewhere. Our farm management service keeps that land productive: planting, upkeep, security, and sale of produce, with regular reporting back to the owner.",
      "It's the difference between land that sits idle and land that earns.",
    ],
    bullets: [
      "Planting & crop planning",
      "On-site labour supervision",
      "Land security & upkeep",
      "Produce sales coordination",
      "Regular owner reporting",
    ],
  },
  {
    slug: "construction",
    number: "06",
    name: "Construction",
    tagline: "Structures on solid ground",
    summary:
      "Residential and commercial construction — from foundation to finishing, on land we've often surveyed and titled ourselves.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    description: [
      "Because we already control the land side — surveying, titling, and settlement — construction is a natural next step for clients ready to build. We manage contractors, materials, and timelines against a clear budget.",
      "Whether it's a boundary wall, a home, or a commercial unit, the same site knowledge that protected your title also informs how we build.",
    ],
    bullets: [
      "Foundation & structural work",
      "Residential & commercial builds",
      "Boundary walls & access roads",
      "Contractor & materials management",
      "Site supervision",
    ],
  },

];

export type LandListing = {
  slug: string;
  name: string;
  location: string;
  type: "Residential" | "Commercial" | "Mixed-Use" | "Farmland";
  status: "Available" | "Selling Fast" | "Few Plots Left";
  titleType: "Freehold" | "Mailo" | "Leasehold";
  plotSize: string;
  priceLow: string;
  priceHigh: string;
  priceValue: number;
  featured?: boolean;
  description: string[];
  features: string[];
  images: string[];
};

export const landListings: LandListing[] = [
  {
    slug: "busunju-gardens",
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
      "https://picsum.photos/seed/busunju-5/900/700",
    ],
  },
  {
    slug: "buloba-heights",
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
    slug: "zigoti-riverside",
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
    slug: "kammengo-estate",
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
    slug: "nsangi-commercial",
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
    slug: "kasanje-farmland",
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
    slug: "entebbe-road-plots",
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
    slug: "nkozi-lakeview",
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

export function getFeaturedListings() {
  return landListings.filter((l) => l.featured);
}

export function getLocationSummaries() {
  const map = new Map<string, number>();
  for (const l of landListings) {
    map.set(l.location, (map.get(l.location) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([location, count]) => ({
    location,
    count,
  }));
}

export type Agent = {
  name: string;
  role: string;
  phone: string;
  phoneDigits: string;
};

export const agents: Agent[] = [
  {
    name: "Frank Ssemakula",
    role: "Managing Director",
    phone: "+256 751 886452",
    phoneDigits: "256751886452",
  },
  {
    name: "Doreen Namutebi",
    role: "Sales & Client Relations",
    phone: "+256 782 441207",
    phoneDigits: "256782441207",
  },
  {
    name: "Isaac Mugisha",
    role: "Survey & Documentation Lead",
    phone: "+256 704 118863",
    phoneDigits: "256704118863",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Grace K.",
    location: "Bought a plot in Buloba",
    quote:
      "I paid in installments over eight months and Frank Realtors held the plot the whole time. The title was in my name within weeks of the final payment.",
  },
  {
    name: "Patrick M.",
    location: "Bought a plot in Busunju",
    quote:
      "What I liked most was that the survey pegs were already on the ground before I even paid a deposit. No guessing about boundaries.",
  },
  {
    name: "Sarah N.",
    location: "Kammengo Estate",
    quote:
      "Entry-level price for my first plot, and the team followed up at every stage of the title processing. I never had to chase them.",
  },
  {
    name: "Hassan A.",
    location: "Nsangi Commercial",
    quote:
      "Frontage on the highway at a fair price, transfer done cleanly. I broke ground on my shop three months after buying.",
  },
];

export const stats = [
  { value: "12+", label: "Active estates" },
  { value: "500+", label: "Plots sold" },
  { value: "9", label: "Years in business" },
  { value: "0%", label: "Interest on installments*" },
];

export const whyChooseUs = [
  {
    title: "Titled before you pay in full",
    description:
      "Every plot is surveyed and pegged before it's listed. You're never buying a boundary that only exists on paper.",
  },
  {
    title: "Installments on every listing",
    description:
      "Spread payments over up to 12 months with no interest markup — the price you see is the price you pay.",
  },
  {
    title: "One team, start to finish",
    description:
      "The same company that surveys and titles your plot can also build on it — no handoff between separate contractors.",
  },
];

export const contact = {
  location: "Entebbe, Uganda",
  email: "donffrank@gmail.com",
  phone: "+256 751 886452",
  phoneDigits: "256751886452",
};
