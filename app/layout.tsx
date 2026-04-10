import type { Metadata } from "next";
import "./globals.css";
import { activeShop } from "@/config/shops";
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
      <body>
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
        <main className="mx-auto max-w-6xl space-y-20 px-4 py-8">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
