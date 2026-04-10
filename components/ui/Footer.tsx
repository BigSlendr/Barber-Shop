import Link from "next/link";
import { activeShop } from "@/config/shops";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-background/70 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-xl font-semibold">{activeShop.shopName}</p>
          <p className="mt-2 text-sm text-brand-muted">{activeShop.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-accent">Quick links</p>
          <div className="mt-2 space-y-1 text-sm text-brand-muted">
            <Link href="/book">Book</Link>
            <br />
            <Link href="/services">Services</Link>
            <br />
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="text-sm text-brand-muted">
          <p>{activeShop.address}</p>
          <p>
            {activeShop.city}, {activeShop.state} {activeShop.postalCode}
          </p>
          <p className="mt-2">{activeShop.phone}</p>
        </div>
      </div>
    </footer>
  );
}
