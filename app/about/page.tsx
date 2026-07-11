import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { services, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Frank Realtors",
  description:
    "Frank Realtors is a land and estate development company based in Entebbe, Uganda — surveying, documenting, settling, and developing land across Wakiso and Mpigi.",
};

const values = [
  {
    title: "Clean paperwork, always",
    body: "Every plot we sell has been surveyed, documented, and verified before it reaches a client. No shortcuts on title work.",
  },
  {
    title: "Land people can afford",
    body: "Installment payment plans on every estate, so owning land isn't limited to people who can pay in one lump sum.",
  },
  {
    title: "One team, start to finish",
    body: "From the first survey peg to a finished compound, the same team stays with the project — no handing clients between contractors.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 pb-6 pt-[calc(var(--nav-h)+1.25rem)] text-center lg:px-8 sm:pt-[calc(var(--nav-h)+2rem)]">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <Reveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              About us
            </p>
            <h1 className="mt-3 font-display text-4xl text-navy sm:text-6xl">
              We Have It.
            </h1>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-mist">
              I am really excited that you decided to contact us at Frank
              realtors. Our goal is to help you find the exact property you're
              looking for.  We are designated to reachout to every customer
              certification on every kind of real estate,from rentals,lease
              hold,free hold,private mailo title,customary,lake views,hill views
              ,condominiums,Apartments , stand alones, houses for sale and
              rent.etc with genuine and clear documentations. We are ready to
              help u.we have it !
            </p>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-mist">
              Frank Realtors is a land and estate development company based in{" "}
              {contact.location}. We survey, document, settle, and develop land
              across Wakiso and Mpigi, and carry that same team through to
              construction and compound design when clients are ready to build.
            </p>
            <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-mist">
              Every estate on our books — from Busunju to Buloba — passed
              through our own surveying and documentation process before a
              single plot went on sale, and every one of them comes with
              flexible installment payment plans.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/land"
                className="neu-btn px-7 py-3.5 text-sm font-semibold text-red"
              >
                View land available
              </Link>
              <Link
                href="/contact"
                className="neu-raised-sm px-7 py-3.5 text-sm font-semibold text-navy"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="neu-raised mx-auto flex aspect-square w-full max-w-sm items-center justify-center p-10">
              <div className="neu-pressed flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image
                    src="/logo.png"
                    alt="Frank Realtors"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <p className="font-display text-3xl text-navy">
                  Frank Realtors
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  We Have It
                </p>
                <div className="neu-divider w-16" />
                <p className="text-sm leading-relaxed text-mist">
                  Based in Entebbe, working across Wakiso and Mpigi.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="What we stand for" title="Why clients choose us">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="neu-card p-7">
                <h3 className="text-base font-semibold text-navy">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Under one roof" title="What we do" className="pt-4!">
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <Link
                href={`/services/${s.slug}`}
                className="neu-raised-sm flex items-center justify-between px-5 py-4 text-sm font-medium text-navy transition hover:text-red"
              >
                <span>
                  <span className="mr-2 text-xs text-gold">{s.number}</span>
                  {s.name}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0!">
        <div className="neu-raised flex flex-col items-center gap-6 p-10 text-center sm:p-14">
          <h2 className="font-display text-4xl text-navy sm:text-5xl">
            Let's find you the right plot.
          </h2>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist">
            Tell us your budget and preferred area — we'll match you to an
            estate and walk you through the payment plan.
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
