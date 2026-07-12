import Link from "next/link";
import Section from "@/components/Section";
import LandFilters from "@/components/LandFilters";
import { contact } from "@/lib/data";
import { getAllListings } from "@/lib/queries";

export default async function LandPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; type?: string }>;
}) {
  const params = await searchParams;
  const allListings = await getAllListings();

  return (
    <>
      <Section
        eyebrow="On the market now"
        title="Land available"
        intro="We allow installment payments on every estate below. Filter by area, plot type, or sort by price — open a listing for the full photo gallery, features, and terms."
        className="pt-[calc(var(--nav-h)+1rem)]"
        noReveal
      >
        <LandFilters
          allListings={allListings}
          initialLocation={params.location ?? ""}
          initialType={params.type ?? ""}
        />
      </Section>

      <Section className="pt-0!" noReveal>
        <div className="neu-raised flex flex-col items-center gap-6 p-10 text-center sm:p-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            Don&apos;t see the right location?
          </h2>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist">
            New estates are added regularly. Tell us your budget and preferred
            area and we&apos;ll match you to a plot.
          </p>
          <a
            href={`https://wa.me/${contact.phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn px-8 py-3.5 text-sm font-semibold text-red"
          >
            Chat on WhatsApp
          </a>
        </div>
      </Section>
    </>
  );
}
