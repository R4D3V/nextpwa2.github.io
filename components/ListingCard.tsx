import Link from "next/link";
import Image from "next/image";
import { contact } from "@/lib/data";

type Listing = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  titleType: string;
  plotSize: string;
  priceLow: string;
  priceHigh: string;
  images: string[];
};

const statusStyles: Record<string, string> = {
  Available: "bg-red/10 text-red border-red/30",
  "Selling Fast": "bg-gold/10 text-gold border-gold/30",
  "Few Plots Left": "bg-gold/10 text-gold border-gold/30",
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const whatsappHref = `https://wa.me/${contact.phoneDigits}?text=${encodeURIComponent(
    `Hi Frank Realtors, I'm interested in ${listing.name} (${listing.priceLow} - ${listing.priceHigh}).`
  )}`;

  return (
    <div className="neu-card overflow-hidden">
      <Link href={`/land/${listing.slug}`} className="relative block aspect-[4/3] w-full">
        <Image
          src={listing.images[0]}
          alt={listing.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[listing.status]}`}
        >
          {listing.status}
        </span>
      </Link>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">
          {listing.location} · {listing.type}
        </p>
        <Link href={`/land/${listing.slug}`}>
          <h3 className="mt-2 text-base font-semibold text-navy transition hover:text-red">
            {listing.name}
          </h3>
        </Link>
        <p className="mt-4 font-display text-3xl text-red">
          {listing.priceLow} – {listing.priceHigh}
        </p>
        <p className="mt-1 text-xs text-mist">per plot, installments available</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-mist">
          <span>{listing.plotSize}</span>
          <span>·</span>
          <span>{listing.titleType} title</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/land/${listing.slug}`}
            className="neu-raised-sm flex flex-1 items-center justify-center px-4 py-2.5 text-sm font-semibold text-navy"
          >
            View gallery
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn flex flex-1 items-center justify-center px-4 py-2.5 text-sm font-semibold text-red"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
