import Link from "next/link";
import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BarbersSection({ preview = false }: { preview?: boolean }) {
  const barbers = preview ? activeShop.barbers.slice(0, 2) : activeShop.barbers;

  return (
    <section>
      <SectionHeader eyebrow="Team" title="Meet your barbers" />
      <div className="grid gap-4 md:grid-cols-2">
        {barbers.map((barber) => (
          <article key={barber.id} className="rounded-2xl border border-white/10 bg-brand-surface p-5">
            <p className="text-xl font-semibold">{barber.name}</p>
            <p className="text-brand-accent">{barber.title}</p>
            <p className="mt-3 text-sm text-brand-muted">{barber.bio}</p>
            <Link href={`/barbers/${barber.slug}`} className="mt-4 inline-block text-sm underline">View profile</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
