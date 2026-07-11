import type { Metadata } from "next";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Frank Realtors",
  description:
    "Get in touch with Frank Realtors in Entebbe, Uganda — call, email, or message us on WhatsApp about land or land services.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Get in touch"
      title="Let's talk about your land"
      intro="Message us directly on WhatsApp, or fill in the form and we'll receive it as a WhatsApp message ready to send."
      className="pt-[calc(var(--nav-h)+1rem)]"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Reveal delay={0}>
            <InfoCard label="Location" value={contact.location} icon="pin" />
          </Reveal>
          <Reveal delay={80}>
            <InfoCard
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
              icon="mail"
            />
          </Reveal>
          <Reveal delay={160}>
            <InfoCard
              label="Phone"
              value={contact.phone}
              href={`tel:${contact.phoneDigits}`}
              icon="phone"
            />
          </Reveal>
          <Reveal delay={240}>
            <a
              href={`https://wa.me/${contact.phoneDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-red"
            >
              Chat with us on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal direction="right" delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function InfoCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: "pin" | "mail" | "phone";
}) {
  const content = (
    <div className="neu-card flex items-center gap-4 p-5">
      <span className="neu-pressed flex h-12 w-12 shrink-0 items-center justify-center text-red">
        <Icon name={icon} />
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-mist">
          {label}
        </span>
        <span className="block text-base font-medium text-navy">{value}</span>
      </span>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function Icon({ name }: { name: "pin" | "mail" | "phone" }) {
  if (name === "pin") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 22s7-7.58 7-12.5A7 7 0 1 0 5 9.5C5 14.42 12 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1.02L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
