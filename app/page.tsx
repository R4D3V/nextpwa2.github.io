"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import ListingCard from "@/components/ListingCard";
import PropertySearch from "@/components/PropertySearch";
import Reveal from "@/components/Reveal";
import {
  services,
  contact,
  agents,
  testimonials,
  stats,
  whyChooseUs,
} from "@/lib/data";
import { getListings, AdminLandListing } from "@/lib/admin-store";

const phrases = [
  "Best Deals",
  "Best Offers",
  "Pure Commitment",
  "Best Service",
];

export default function Home() {
  const [featuredLand, setFeaturedLand] = useState<AdminLandListing[]>([]);
  const [locations, setLocations] = useState<
    { location: string; count: number }[]
  >([]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = deleting ? 50 : 100;

    if (!deleting && charIndex === current.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((i) => (deleting ? i - 1 : i + 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phraseIndex]);

  useEffect(() => {
    getListings().then((listings) => {
      setFeaturedLand(listings.filter((l) => l.featured));
      const map = new Map<string, number>();
      for (const l of listings) {
        map.set(l.location, (map.get(l.location) ?? 0) + 1);
      }
      setLocations(
        Array.from(map.entries()).map(([location, count]) => ({
          location,
          count,
        })),
      );
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-svh items-center justify-center overflow-hidden bg-cover bg-center pt-(--nav-h)"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-base/70" />
        <div className="relative z-10 mx-auto flex flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="neu-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy">
              <span className="h-2 w-2 rounded-full bg-red" />
              Land services · {contact.location}
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-navy sm:text-6xl lg:text-7xl">
              {/* <span className="text-red">Realtors</span>{" "} */}
              <span className="inline-block min-w-[6ch] text-left">
                {phrases[phraseIndex].slice(0, charIndex)}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-mist">
              Frank Realtors develops, surveys, documents, and sells land across
              Wakiso and Entebbe — with estates around Entebbe, and installment
              payments on every plot.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/land"
                className="neu-btn px-7 py-3.5 text-sm font-semibold text-red"
              >
                View land available
              </Link>
              <a
                href={`https://wa.me/${contact.phoneDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-raised-sm px-7 py-3.5 text-sm font-semibold text-navy"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured listings */}
      <Section
        eyebrow="Featured"
        title="Featured plots on the market"
        intro="A handful of our estates, hand-picked for location and terms. Every plot below comes with a flexible installment plan."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLand.map((plot, i) => (
            <Reveal key={plot.slug} delay={i * 70}>
              <ListingCard listing={plot} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/land"
            className="neu-btn inline-block px-7 py-3.5 text-sm font-semibold text-red"
          >
            See all estates & prices
          </Link>
        </div>
      </Section>

      {/* Services preview */}
      <Section
        eyebrow="What we do"
        title="Services offered"
        intro="Every stage of a land or building project, handled under one roof — from the first survey peg to the finished compound."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Browse by location */}
      <Section
        eyebrow="Browse by area"
        title="Land available by location"
        intro="Every estate is grouped by the trading centre or road it sits nearest to — pick an area to see what's on offer there."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <Reveal key={loc.location} delay={i * 50}>
              <Link
                href={`/land?location=${encodeURIComponent(loc.location)}`}
                className="neu-card block p-5 text-center"
              >
                <p className="text-sm font-semibold text-navy">
                  {loc.location}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-mist">
                  {loc.count} {loc.count === 1 ? "estate" : "estates"}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section
        eyebrow="Why Frank Realtors"
        title="Why clients buy through us"
        intro="Land in Uganda is only worth what its paperwork can prove. Here's how we protect that on every sale."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="neu-card h-full p-7">
                <h3 className="text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Agents / team */}
      <Section
        eyebrow="The team"
        title="Talk to a Frank Realtors agent"
        intro="Reach out directly on WhatsApp or by phone — every agent below can walk you through current listings and pricing."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {agents.map((agent, i) => (
            <Reveal key={agent.name} delay={i * 70}>
              <div className="neu-card p-7 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full neu-raised-sm">
                  <span className="font-display text-xl text-red">
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {agent.name}
                </h3>
                <p className="text-xs uppercase tracking-wide text-mist">
                  {agent.role}
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <a
                    href={`https://wa.me/${agent.phoneDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-btn px-4 py-2 text-xs font-semibold text-red"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${agent.phoneDigits}`}
                    className="neu-raised-sm px-4 py-2 text-xs font-semibold text-navy"
                  >
                    Call
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow="Client stories"
        title="What buyers say"
        intro="A few notes from clients who've bought and titled land with us."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className="neu-card h-full p-7">
                <p className="text-sm italic leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-navy">{t.name}</p>
                <p className="text-xs uppercase tracking-wide text-mist">
                  {t.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Installment callout */}
      <Section className="pt-0!">
        <div className="neu-raised flex flex-col items-center gap-6 p-10 text-center sm:p-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            We allow installment payments.
          </h2>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist">
            Own land in Busunju, Buloba, Zigoti, and more without paying it all
            upfront. Talk to us about a plan that fits your budget.
          </p>
          <Link
            href="/contact"
            className="neu-btn px-8 py-3.5 text-sm font-semibold text-red"
          >
            Ask about a payment plan
          </Link>
        </div>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-navy">{value}</p>
      <p className="text-xs uppercase tracking-wide text-mist">{label}</p>
    </div>
  );
}
