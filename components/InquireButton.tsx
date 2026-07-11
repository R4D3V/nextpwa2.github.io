"use client";

import { contact } from "@/lib/data";

export default function InquireButton({ serviceName, serviceSlug }: { serviceName: string; serviceSlug: string }) {
  function handleClick() {
    const url = window.location.href;
    const text = encodeURIComponent(
      `I'm interested in ${serviceName}\n\nService page: ${url}`
    );
    window.open(`https://wa.me/${contact.phoneDigits}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={handleClick}
      className="neu-btn mt-7 flex w-full items-center justify-center px-6 py-3 text-sm font-semibold text-red"
    >
      Enquire about this service
    </button>
  );
}
