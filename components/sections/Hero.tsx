import Link from "next/link";
import { activeShop } from "@/config/shops";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-surface shadow-card">
      <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${activeShop.heroImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/35" />
      <div className="relative px-6 py-20 md:px-12 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">{activeShop.city} Barbershop</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{activeShop.tagline}</h1>
        <p className="mt-6 max-w-xl text-base text-white/80">{activeShop.content.heroDescription}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/book" className="btn-primary">{activeShop.content.primaryCtaLabel}</Link>
          <Link href="/services" className="btn-secondary">{activeShop.content.secondaryCtaLabel}</Link>
        </div>
      </div>
    </section>
  );
}
