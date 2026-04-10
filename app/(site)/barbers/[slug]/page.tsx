import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { activeShop } from "@/config/shops";

export async function generateStaticParams() {
  return activeShop.barbers.map((barber) => ({ slug: barber.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const barber = activeShop.barbers.find((b) => b.slug === slug);
  if (!barber) return {};
  return {
    title: `${barber.name} — ${activeShop.shopName}`,
    description: barber.bio
  };
}

export default async function BarberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const barber = activeShop.barbers.find((b) => b.slug === slug);
  if (!barber) notFound();

  const hasPortfolio = barber.portfolio && barber.portfolio.length > 0;

  return (
    <div className="space-y-12">
      {/* Back link */}
      <Link
        href="/barbers"
        className="inline-flex items-center gap-2 text-sm text-brand-muted transition hover:text-brand-text"
      >
        <span aria-hidden="true">←</span> All barbers
      </Link>

      {/* Profile header */}
      <article className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Headshot */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-surface">
          {barber.image ? (
            <Image
              src={barber.image}
              alt={`${barber.name} headshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl text-brand-muted">
              ✂️
            </div>
          )}
        </div>

        {/* Bio block */}
        <div className="flex flex-col justify-center space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
              {barber.title}
            </p>
            <h1 className="mt-2 text-4xl font-bold">{barber.name}</h1>
            <p className="mt-1 text-sm text-brand-muted">
              {barber.yearsExperience} year{barber.yearsExperience !== 1 ? "s" : ""} of experience
            </p>
          </div>

          <p className="max-w-prose text-base leading-relaxed text-brand-text/85">{barber.bio}</p>

          {/* Specialties */}
          {barber.specialties.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">
                Specialties
              </p>
              <div className="flex flex-wrap gap-2">
                {barber.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-3">
            {barber.instagram && (
              <a
                href={barber.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:bg-white/10"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
            )}
            {barber.tiktok && (
              <a
                href={barber.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:bg-white/10"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                </svg>
                TikTok
              </a>
            )}
          </div>

          {/* Book CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/book?barber=${barber.id}`} className="btn-primary">
              Book with {barber.name.split(" ")[0]}
            </Link>
            <Link href="/services" className="btn-secondary">
              View services
            </Link>
          </div>
        </div>
      </article>

      {/* Portfolio grid */}
      {hasPortfolio && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            {barber.name.split(" ")[0]}&apos;s Work
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {barber.portfolio!.map((src, index) => (
              <div
                key={src}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-brand-surface"
              >
                <Image
                  src={src}
                  alt={`${barber.name} work ${index + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No portfolio placeholder */}
      {!hasPortfolio && (
        <section className="rounded-2xl border border-white/10 bg-brand-surface p-8 text-center">
          <p className="text-brand-muted">
            Portfolio photos coming soon. Follow{" "}
            {barber.instagram ? (
              <a
                href={barber.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent underline underline-offset-4"
              >
                {barber.name}&apos;s Instagram
              </a>
            ) : (
              barber.name
            )}{" "}
            for the latest work.
          </p>
        </section>
      )}

      {/* Inline booking CTA banner */}
      <section className="rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-8 text-center">
        <p className="text-xl font-semibold">Ready to book with {barber.name.split(" ")[0]}?</p>
        <p className="mt-2 text-sm text-brand-muted">
          Pick your service and time slot — takes less than a minute.
        </p>
        <Link href={`/book?barber=${barber.id}`} className="btn-primary mt-6 inline-flex">
          Book Now
        </Link>
      </section>
    </div>
  );
}
