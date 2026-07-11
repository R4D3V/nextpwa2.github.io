"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/land", label: "Land Available" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-base/90 backdrop-blur">
      <div className="mx-auto flex h-(--nav-h) max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl neu-raised-sm">
            <Image
              src="/logo.png"
              alt="Frank Realtors"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="font-display text-xl leading-none text-navy sm:text-2xl lg:text-3xl">
            Frank <span className="text-red">Realtors</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-navy transition hover:text-red lg:px-4 lg:text-sm"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-navy transition hover:text-red lg:px-4 lg:text-sm"
          >
            About
          </Link>

          <Link
            href="/services"
            className="rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-navy transition hover:text-red lg:px-4 lg:text-sm"
          >
            Services
          </Link>

          <Link
            href="/land"
            className="rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-navy transition hover:text-red lg:px-4 lg:text-sm"
          >
            Land
          </Link>
          <Link
            href="/gallery"
            className="rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-navy transition hover:text-red lg:px-4 lg:text-sm"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="neu-btn ml-2 px-4 py-2 text-xs font-bold uppercase tracking-wide text-navy lg:ml-3 lg:px-5 lg:py-2.5 lg:text-sm"
          >
            Contact
          </Link>
        </nav>

        <button
          ref={btnRef}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="neu-raised-sm flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="flex flex-col items-center gap-1.5 transition">
            <span
              className={`block h-0.5 w-5 bg-navy transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-navy transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-navy transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-[32rem] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <nav className="mt-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="neu-raised-sm px-4 py-3 text-sm font-bold uppercase tracking-wide text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
