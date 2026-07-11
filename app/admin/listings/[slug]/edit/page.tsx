"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getListingBySlug, saveListing, updateListing, AdminLandListing } from "@/lib/admin-store";

const PLOT_TYPES = ["Residential", "Commercial", "Mixed-Use", "Farmland"];
const STATUS_OPTIONS = ["Available", "Selling Fast", "Few Plots Left"];
const TITLE_OPTIONS = ["Freehold", "Mailo", "Leasehold"];

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [listing, setListing] = useState<AdminLandListing | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Residential");
  const [status, setStatus] = useState("Available");
  const [titleType, setTitleType] = useState("Freehold");
  const [plotSize, setPlotSize] = useState("");
  const [priceLow, setPriceLow] = useState("");
  const [priceHigh, setPriceHigh] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [images, setImages] = useState<string[]>(["", "", "", "", ""]);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListingBySlug(params.slug).then((found) => {
      if (!found) {
        router.push("/admin/listings");
        return;
      }
      setListing(found);
      setName(found.name);
      setLocation(found.location);
      setType(found.type);
      setStatus(found.status);
      setTitleType(found.titleType);
      setPlotSize(found.plotSize);
      setPriceLow(found.priceLow);
      setPriceHigh(found.priceHigh);
      setFeatured(found.featured);
      setDescription(found.description.join("\n"));
      setFeaturesText(found.features.join("\n"));
      const imgs = [...found.images];
      while (imgs.length < 5) imgs.push("");
      setImages(imgs.slice(0, 5));
    });
  }, [params.slug, router]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!listing || !name || !location || !priceLow || !priceHigh) return;
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
    const numericLow = parseFloat(priceLow.replace(/[^0-9.]/g, ""));
    const priceValue = isNaN(numericLow) ? 0 : numericLow * (priceLow.includes("M") ? 1000000 : 1);

    await updateListing(params.slug, {
      name,
      location,
      type,
      status,
      titleType,
      plotSize: plotSize || "—",
      priceLow,
      priceHigh,
      priceValue,
      featured,
      description: desc.length ? desc : [description],
      features: features.length ? features : ["Surveyed & pegged boundaries"],
      images: filledImages,
    });

    router.push("/admin/listings");
  }

  if (!listing) return null;

  return (
    <div className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 pb-10 pt-[calc(var(--nav-h)+2rem)] lg:px-8">
      <div className="w-full max-w-3xl">
        <Link href="/admin/listings" className="text-sm font-medium text-mist transition hover:text-red">
          ← Back to listings
        </Link>
        <h1 className="mt-4 font-display text-4xl text-navy">Edit Listing</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Price Low</label>
            <input
              value={priceLow}
              onChange={(e) => setPriceLow(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Price High</label>
            <input
              value={priceHigh}
              onChange={(e) => setPriceHigh(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
            >
              {PLOT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Title Type</label>
            <select
              value={titleType}
              onChange={(e) => setTitleType(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
            >
              {TITLE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Plot Size</label>
            <input
              value={plotSize}
              onChange={(e) => setPlotSize(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
            />
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-5 w-5 rounded accent-red"
              />
              <span className="text-xs font-semibold uppercase tracking-wide text-mist">Featured</span>
            </label>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none resize-y"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Features (one per line)</label>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none resize-y"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Images (up to 5)</label>
          <p className="mt-1 text-xs text-mist/70">Click to replace. Images stored as base64.</p>
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
          {loading ? "Saving..." : "Update listing"}
        </button>
      </form>
      </div>
    </div>
  );
}
