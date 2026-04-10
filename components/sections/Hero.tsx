import Link from "next/link";
import { activeShop } from "@/config/shops";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-surface">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${activeShop.heroImage})` }} />
      <div className="relative px-6 py-20 md:px-12">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-accent">{activeShop.city} Barbershop</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">{activeShop.tagline}</h1>
        <p className="mt-5 max-w-xl text-brand-muted">{activeShop.content.heroDescription}</p>
        <div className="mt-8 flex gap-4">
          <Link href="/book" className="rounded-full bg-brand-accent px-6 py-3 font-semibold text-black">{activeShop.content.primaryCtaLabel}</Link>
          <Link href="/services" className="rounded-full border border-white/20 px-6 py-3">{activeShop.content.secondaryCtaLabel}</Link>
        </div>
      </div>
    </section>
  );
}
