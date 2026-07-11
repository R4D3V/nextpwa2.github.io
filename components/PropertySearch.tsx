"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getLocationSummaries } from "@/lib/data";

const types = ["Residential", "Commercial", "Mixed-Use", "Farmland"];
const budgets = [
  { label: "Any budget", value: "" },
  { label: "Under 15M", value: "0-15000000" },
  { label: "15M – 30M", value: "15000000-30000000" },
  { label: "30M – 50M", value: "30000000-50000000" },
  { label: "50M+", value: "50000000-999999999" },
];

export default function PropertySearch() {
  const router = useRouter();
  const locations = getLocationSummaries();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);
    const query = params.toString();
    router.push(query ? `/land?${query}` : "/land");
  }

  return (
    <div className="neu-raised mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3 p-3 text-left sm:flex-row sm:items-center sm:p-4">
      <label className="flex-1">
        <span className="sr-only">Location</span>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="neu-pressed w-full appearance-none rounded-xl bg-transparent px-4 py-3 text-sm text-navy outline-none"
        >
          <option value="">Any location</option>
          {locations.map((l) => (
            <option key={l.location} value={l.location}>
              {l.location} ({l.count})
            </option>
          ))}
        </select>
      </label>

      <label className="flex-1">
        <span className="sr-only">Plot type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="neu-pressed w-full appearance-none rounded-xl bg-transparent px-4 py-3 text-sm text-navy outline-none"
        >
          <option value="">Any type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex-1">
        <span className="sr-only">Budget</span>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="neu-pressed w-full appearance-none rounded-xl bg-transparent px-4 py-3 text-sm text-navy outline-none"
        >
          {budgets.map((b) => (
            <option key={b.label} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={handleSearch}
        className="neu-btn px-6 py-3 text-sm font-semibold text-red sm:shrink-0"
      >
        Search plots
      </button>
    </div>
  );
}
