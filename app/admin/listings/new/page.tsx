"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveListing } from "@/lib/admin-store";

export default function NewListingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceLow, setPriceLow] = useState("");
  const [priceHigh, setPriceHigh] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [images, setImages] = useState<string[]>(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  function handleImageUpload(index: number, file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const next = [...images];
      next[index] = reader.result as string;
      setImages(next);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !location || !priceLow || !priceHigh) return;
    setLoading(true);

    const features = featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const desc = description
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const filledImages = images.filter(Boolean);

    saveListing({
      name,
      location,
      priceLow,
      priceHigh,
      description: desc.length ? desc : [description || `${name} — land available in ${location}.`],
      features: features.length ? features : ["Surveyed & pegged boundaries", "Ready title processing", "Access road to the plot", "Flexible installment plans", "Verified ownership documentation"],
      images: filledImages,
    });

    router.push("/admin/listings");
  }

  return (
    <div className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 lg:px-8">
      <div className="w-full max-w-3xl">
        <Link href="/admin/listings" className="text-sm font-medium text-mist transition hover:text-red">
          ← Back to listings
        </Link>
        <h1 className="mt-4 font-display text-4xl text-navy">New Listing</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              placeholder="e.g. Busunju Town Council Estate"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              placeholder="e.g. Busunju"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Price Low</label>
            <input
              value={priceLow}
              onChange={(e) => setPriceLow(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              placeholder="e.g. 6.5M"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Price High</label>
            <input
              value={priceHigh}
              onChange={(e) => setPriceHigh(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              placeholder="e.g. 8M"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Description (one paragraph per line)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none resize-y"
            placeholder={`${name} sits in ${location}, one of the areas Frank Realtors has fully surveyed...`}
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Features (one per line)</label>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none resize-y"
            placeholder="Surveyed &amp; pegged boundaries&#10;Ready title processing&#10;Access road to the plot"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Images (exactly 5)</label>
          <p className="mt-1 text-xs text-mist/70">Upload up to 5 images. They will be stored as base64.</p>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {images.map((img, i) => (
              <label
                key={i}
                className="neu-raised-sm relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl"
              >
                {img ? (
                  <img src={img} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl text-mist/40">+</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageUpload(i, e.target.files?.[0] ?? null)}
                />
                {img && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const next = [...images];
                      next[i] = "";
                      setImages(next);
                    }}
                    className="neu-btn absolute right-1 top-1 flex h-6 w-6 items-center justify-center text-xs text-red"
                  >
                    ×
                  </button>
                )}
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  {i + 1}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="neu-btn w-full px-6 py-3.5 text-sm font-semibold text-red disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save listing"}
        </button>
      </form>
      </div>
    </div>
  );
}
