import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="neu-card block p-6 sm:p-7">
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <span className="font-display text-3xl text-gold">{service.number}</span>
      <h3 className="mt-3 text-lg font-semibold text-navy">{service.name}</h3>
      <p className="mt-2 text-sm italic text-red">{service.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-mist">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy">
        Learn more
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
