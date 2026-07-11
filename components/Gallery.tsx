"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="neu-card relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={images[active]}
          alt={`${alt} — photo ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
          priority={active === 0}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
              className="neu-btn absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-navy"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setActive((i) => (i + 1) % images.length)}
              className="neu-btn absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-navy"
            >
              <ChevronIcon direction="right" />
            </button>
            <span className="neu-pill absolute bottom-3 right-3 px-3 py-1 text-xs font-semibold text-navy">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`View photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl transition ${
                i === active ? "neu-pressed" : "neu-raised-sm opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
