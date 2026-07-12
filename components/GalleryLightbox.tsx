"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/queries";

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <>
      {images.length === 0 && (
        <div className="neu-card p-10 text-center">
          <p className="text-mist">No gallery images available yet. Check back later.</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setLightbox(img)}
            className="neu-card group relative block w-full overflow-hidden text-left"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={img.image}
                alt={img.title}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-navy">{img.title}</h3>
              {img.description && (
                <p className="mt-1 text-xs text-mist">{img.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5"
          onClick={() => setLightbox(null)}
        >
          <div
            className="neu-card relative max-h-[90vh] max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="neu-btn absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center text-navy"
            >
              ×
            </button>
            <div className="relative max-h-[70vh] w-full">
              <Image
                src={lightbox.image}
                alt={lightbox.title}
                width={1200}
                height={900}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-navy">{lightbox.title}</h3>
              {lightbox.description && <p className="mt-1 text-sm text-mist">{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
