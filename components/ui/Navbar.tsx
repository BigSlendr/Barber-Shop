import Link from "next/link";
import { activeShop } from "@/config/shops";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Barbers", "/barbers"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
  ["Book", "/book"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-wide text-brand-accent">
          {activeShop.logoText}
        </Link>
        <div className="hidden gap-6 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-brand-text/90 hover:text-brand-accent">
              {label}
            </Link>
          ))}
        </div>
        <a href={`tel:${activeShop.phone}`} className="rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-black">
          {activeShop.content.callCtaLabel}
        </a>
      </nav>
    </header>
  );
}
