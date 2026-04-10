"use client";

import Link from "next/link";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-lg font-bold tracking-[0.02em] text-brand-accent">
          {activeShop.logoText}
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-brand-text/85 transition hover:text-brand-accent">
              {label}
            </Link>
          ))}
        </div>
        <a href={`tel:${activeShop.phone}`} className="btn-primary hidden md:inline-flex">
          {activeShop.content.callCtaLabel}
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-text md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
      {menuOpen ? (
        <div className="border-t border-white/10 bg-brand-background/95 px-4 pb-5 pt-2 md:hidden">
          <div className="grid gap-2">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-white/10 bg-brand-surface px-4 py-3 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <a href={`tel:${activeShop.phone}`} className="btn-primary mt-3 w-full">
            {activeShop.content.callCtaLabel}
          </a>
        </div>
      ) : null}
    </header>
  );
}
