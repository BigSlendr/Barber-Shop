import Link from "next/link";
import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BarbersSection({ preview = false }: { preview?: boolean }) {
  const barbers = preview ? activeShop.barbers.slice(0, 2) : activeShop.barbers;

  return (
    <section>
      <SectionHeader eyebrow="Team" title="Meet your barbers" />
      <div className="grid gap-5 md:grid-cols-2">
        {barbers.map((barber) => (
          <article key={barber.id} className="card card-hover">
            <p className="text-xl font-semibold">{barber.name}</p>
            <p className="text-sm uppercase tracking-[0.1em] text-brand-accent">{barber.title}</p>
            <p className="mt-3 text-sm text-brand-muted">{barber.bio}</p>
            <Link href={`/barbers/${barber.slug}`} className="mt-5 inline-flex text-sm font-medium text-white underline underline-offset-4">
              View profile
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
