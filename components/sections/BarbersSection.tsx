import Image from "next/image";
import Link from "next/link";
import { activeShop } from "@/config/shops";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BarbersSection({ preview = false }: { preview?: boolean }) {
  const barbers = preview ? activeShop.barbers.slice(0, 3) : activeShop.barbers;

  return (
    <section>
      <SectionHeader eyebrow="Team" title="Meet your barbers" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map((barber) => (
          <article key={barber.id} className="card card-hover flex flex-col">
            {/* Headshot */}
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-brand-background">
              {barber.image ? (
                <Image
                  src={barber.image}
                  alt={`${barber.name} headshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl text-brand-muted">
                  ✂️
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col">
              <p className="text-xl font-semibold">{barber.name}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                {barber.title}
              </p>
              <p className="mt-2 text-sm text-brand-muted line-clamp-2">{barber.bio}</p>

              {/* Specialties */}
              {barber.specialties.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {barber.specialties.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-brand-accent/25 bg-brand-accent/10 px-2.5 py-0.5 text-xs text-brand-accent"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex items-center justify-between pt-5">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/barbers/${barber.slug}`}
                    className="text-sm font-medium text-white underline underline-offset-4 transition hover:text-brand-accent"
                  >
                    View profile
                  </Link>
                  {barber.instagram && (
                    <a
                      href={barber.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${barber.name} on Instagram`}
                      className="text-brand-muted transition hover:text-brand-accent"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                </div>
                <Link href={`/book?barber=${barber.id}`} className="btn-primary py-2 text-xs">
                  Book
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {preview && activeShop.barbers.length > 3 && (
        <div className="mt-8 text-center">
          <Link href="/barbers" className="btn-secondary">
            Meet the full team
          </Link>
        </div>
      )}
    </section>
  );
}
