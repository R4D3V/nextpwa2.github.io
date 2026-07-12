import Section from "@/components/Section";
import GalleryLightbox from "@/components/GalleryLightbox";
import { getGalleryImages } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <Section
      eyebrow="Our work"
      title="Gallery"
      intro="Photos showcasing our completed projects — estates, compounds, surveys, and construction work."
      className="pt-[calc(var(--nav-h)+1rem)]"
      noReveal
    >
      <GalleryLightbox images={images} />
    </Section>
  );
}
