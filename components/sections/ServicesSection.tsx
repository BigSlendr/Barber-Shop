import { activeShop } from "@/config/shops";
import { currency } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesSection({ preview = false }: { preview?: boolean }) {
  const services = preview ? activeShop.services.slice(0, 3) : activeShop.services;

  return (
    <section>
      <SectionHeader eyebrow="Services" title="Crafted grooming services" description="Transparent pricing and duration to keep your day on schedule." />
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="rounded-2xl border border-white/10 bg-brand-surface p-5">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="mt-2 text-sm text-brand-muted">{service.description}</p>
            <p className="mt-4 text-sm text-brand-muted">{service.durationMins} min</p>
            <p className="text-lg font-bold text-brand-accent">{currency(service.price)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
