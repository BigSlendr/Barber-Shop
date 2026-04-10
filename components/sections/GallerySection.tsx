import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function GallerySection({ preview = false }: { preview?: boolean }) {
  const images = preview ? activeShop.gallery.slice(0, 3) : activeShop.gallery;

  return (
    <section>
      <SectionHeader eyebrow="Gallery" title="Recent work" />
      <div className="grid gap-5 md:grid-cols-3">
        {images.map((image, idx) => (
          <div key={image} className="h-60 rounded-2xl border border-white/10 bg-cover bg-center shadow-card transition duration-300 hover:scale-[1.01] hover:border-white/20" style={{ backgroundImage: `url(${image})` }} aria-label={`Gallery ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}
