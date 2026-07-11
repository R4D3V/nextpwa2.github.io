"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/data";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const lines = [
      `New enquiry from the Frank Realtors website`,
      `Name: ${name}`,
      interest ? `Interested in: ${interest}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${contact.phoneDigits}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="neu-card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy">
          Your name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sarah Namutebi"
          className="neu-pressed w-full border-none bg-base px-4 py-3 text-sm text-ink outline-none placeholder:text-mist focus-visible:ring-2 focus-visible:ring-red/60"
        />
      </div>

      <div>
        <label htmlFor="interest" className="mb-2 block text-sm font-medium text-navy">
          What are you interested in?
        </label>
        <select
          id="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="neu-pressed w-full border-none bg-base px-4 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-red/60"
        >
          <option value="">Select an option</option>
          <option value="Buying land / an estate plot">Buying land / an estate plot</option>
          <option value="Estate Development">Estate Development</option>
          <option value="Surveying">Surveying</option>
          <option value="Land Documentation">Land Documentation</option>
          <option value="Land Settlement">Land Settlement</option>
          <option value="Farm Management">Farm Management</option>
          <option value="Construction">Construction</option>
          <option value="Compound Design">Compound Design</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit more about what you're looking for..."
          className="neu-pressed w-full resize-none border-none bg-base px-4 py-3 text-sm text-ink outline-none placeholder:text-mist focus-visible:ring-2 focus-visible:ring-red/60"
        />
      </div>

      <button
        type="submit"
        className="neu-btn flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-red sm:w-auto"
      >
        <WhatsAppIcon />
        Send via WhatsApp
      </button>
      <p className="text-xs text-mist">
        This opens WhatsApp with your message pre-filled to {contact.phone}. Nothing is sent
        until you hit send in WhatsApp.
      </p>
    </form>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.842.505 3.567 1.383 5.043L2 22l5.106-1.339A9.951 9.951 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.062a8.037 8.037 0 0 1-4.29-1.238l-.308-.184-3.032.795.81-2.955-.2-.303A8.048 8.048 0 0 1 3.938 12c0-4.451 3.62-8.062 8.063-8.062 4.451 0 8.062 3.611 8.062 8.062 0 4.452-3.611 8.062-8.062 8.062z" />
    </svg>
  );
}
