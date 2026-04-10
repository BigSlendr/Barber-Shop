import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { activeShop, masterShopConfig } from "@/config/shops";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { MobileStickyCTA } from "@/components/ui/MobileStickyCTA";

export const metadata: Metadata = {
  title: `${activeShop.shopName} | ${activeShop.city} Barbershop`,
  description: activeShop.tagline,
  openGraph: {
    title: activeShop.shopName,
    description: activeShop.tagline,
    images: [activeShop.heroImage]
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={masterShopConfig.themeTokens.colors.background} />
      </head>
      <body style={{
          "--brand-background": masterShopConfig.themeTokens.colors.background,
          "--brand-surface": masterShopConfig.themeTokens.colors.surface,
          "--brand-text": masterShopConfig.themeTokens.colors.text,
          "--brand-accent": masterShopConfig.themeTokens.colors.accent,
          "--brand-muted": masterShopConfig.themeTokens.colors.muted,
          "--brand-shadow-card": masterShopConfig.themeTokens.effects.cardShadow
        } as CSSProperties} className="bg-brand-background font-[var(--font-body)] antialiased">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%)]" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarberShop",
              name: activeShop.shopName,
              telephone: activeShop.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: activeShop.address,
                addressLocality: activeShop.city,
                addressRegion: activeShop.state,
                postalCode: activeShop.postalCode
              }
            })
          }}
        />
        <Navbar />
        <main className="mx-auto max-w-6xl space-y-24 px-4 pb-24 pt-8 md:px-6">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
