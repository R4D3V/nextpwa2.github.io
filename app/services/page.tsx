import type { Metadata } from "next";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Frank Realtors",
  description:
    "Estate development, surveying, land documentation, land settlement, farm management, construction, and compound design in Entebbe, Uganda.",
};

export default function ServicesPage() {
  return (
    <Section
      eyebrow="What we offer"
      title="Services offered"
      intro="From the first survey peg to the finished compound, each service below is its own page with full detail. Most projects touch more than one."
      className="pt-[calc(var(--nav-h)+1rem)]"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 60}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
