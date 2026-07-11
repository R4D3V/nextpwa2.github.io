import Link from "next/link";
import Image from "next/image";
import { services, contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-base">
      <div className="mx-auto max-w-full px-4 sm:px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl neu-raised-sm">
                <Image
                  src="/logo.png"
                  alt="Frank Realtors"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <p className="font-display text-3xl font-bold text-navy">
                Frank <span className="text-red">Realtors</span>
              </p>
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              We Have It
            </p>
            <p className="mt-4 max-w-xs text-sm font-bold leading-relaxed text-mist">
              Estate development, surveying, and land services across Wakiso and
              Mpigi — with installment payment plans on every listing.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-navy">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm font-bold uppercase tracking-wide text-mist">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition hover:text-red"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-navy">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm font-bold uppercase tracking-wide text-mist">
              <li>
                <Link href="/" className="transition hover:text-red">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-red">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-red">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/land" className="transition hover:text-red">
                  Land Available
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition hover:text-red">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-red">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-navy">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2 text-sm font-bold text-mist">
              <li>{contact.location}</li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-red"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneDigits}`}
                  className="transition hover:text-red"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.phoneDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-red"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="neu-divider mt-12" />

        <p className="mt-6 text-center text-xs font-bold text-mist flex justify-center items-center gap-1">
          © {new Date().getFullYear()} Frank Realtors —
          <a
            href="https://raymonjohns.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-red"
          >
            &nbsp;Built with ❤️ by RaymonJohns
          </a>
        </p>
      </div>
    </footer>
  );
}
