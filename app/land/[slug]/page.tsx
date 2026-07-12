import Link from "next/link";
import Gallery from "@/components/Gallery";
import { contact } from "@/lib/data";
import { getListingBySlug, getOtherListings } from "@/lib/queries";

export default async function LandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [listing, otherListings] = await Promise.all([
    getListingBySlug(slug),
    getOtherListings(slug, 3),
  ]);

  if (!listing) {
    return (
      <section className="mx-auto max-w-full px-4 sm:px-6 py-20 text-center lg:px-8">
        <h1 className="font-display text-4xl text-navy">Listing not found</h1>
        <Link href="/land" className="mt-4 inline-block text-sm font-semibold text-red">
          ← All land available
        </Link>
      </section>
    );
  }

  const whatsappHref = `https://wa.me/${contact.phoneDigits}?text=${encodeURIComponent(
    `Hi Frank Realtors, I'm interested in ${listing.name} (${listing.priceLow} - ${listing.priceHigh}).`
  )}`;

  return (
    <>
      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 pb-6 pt-[calc(var(--nav-h)+1.25rem)] text-center lg:px-8 sm:pt-[calc(var(--nav-h)+2rem)]">
        <Link href="/land" className="text-sm font-medium text-mist transition hover:text-red">
          ← All land available
        </Link>
        <div className="mt-6 flex flex-col items-center gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {listing.location} · {listing.type}
            </p>
            <h1 className="mt-2 font-display text-4xl text-navy sm:text-5xl">{listing.name}</h1>
          </div>
          <p className="font-display text-4xl text-red sm:text-5xl">
            {listing.priceLow} – {listing.priceHigh}
          </p>
          <p className="text-xs uppercase tracking-wide text-mist">
            {listing.plotSize} · {listing.titleType} title · {listing.status}
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 lg:px-8">
        <div className="flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start">
          <div className="w-full md:w-3/5">
            <Gallery images={listing.images} alt={listing.name} />
          </div>

          <div className="w-full md:w-2/5 md:sticky md:top-[calc(var(--nav-h)+1rem)]">
            <div className="space-y-6">
              <div className="neu-raised space-y-4 p-7">
            {listing.description.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-mist">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="neu-card p-7">
            <h2 className="font-display text-2xl text-navy">Plot features</h2>
            <ul className="mt-4 space-y-3">
              {listing.features.map((feature) => (
                <li key={feature} className="arrow-bullet text-sm text-ink">
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn mt-6 flex items-center justify-center px-6 py-3 text-sm font-semibold text-red"
            >
              Ask about this plot on WhatsApp
            </a>
            <Link
              href="/contact"
              className="neu-raised-sm mt-3 flex items-center justify-center px-6 py-3 text-sm font-semibold text-navy"
            >
              Use the contact form instead
            </Link>
            </div>
          </div>
        </div>
        </div>
      </section>

      {otherListings.length > 0 && (
        <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-16 lg:px-8 sm:py-20">
          <div className="mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              More estates
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">Other land available</h2>
          </div>
          <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherListings.map((l) => (
              <Link key={l.slug} href={`/land/${l.slug}`} className="neu-card block overflow-hidden">
                {l.images[0] && (
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img src={l.images[0]} alt={l.name} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {l.location}
                </p>
                <h3 className="mt-2 text-base font-semibold text-navy">{l.name}</h3>
                <p className="mt-3 font-display text-2xl text-red">
                  {l.priceLow} – {l.priceHigh}
                </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
