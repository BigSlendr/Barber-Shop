# Barbershop PWA Template

A production-ready, config-driven barbershop website template built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**. Designed to be cloned and rebranded for any barbershop in under an hour.

Pre-configured for **Elite Barber Studio** — 2025 Richmond Ave, Staten Island, NY.

---

## Features

| Feature | Details |
|---|---|
| **PWA** | Installable on iOS and Android via `next-pwa`. Offline page, manifest, and service worker included. |
| **Barber profiles** | Each barber has a full profile page with bio, specialties, portfolio photo grid, and social links. |
| **Instagram integration** | Per-barber Instagram links on profile cards and individual profile pages. |
| **Portfolio gallery** | Upload work photos per barber — displayed as a responsive grid on their profile page. |
| **Booking flow** | 5-step booking form: choose barber → service → date → time → contact details. |
| **URL pre-selection** | Linking to `/book?barber=barber-1` pre-selects that barber in the booking form. |
| **SMS notifications** | Twilio sends the barber an SMS the moment a customer books with them. |
| **Email confirmations** | Resend sends HTML confirmation emails to both the customer and the barber. |
| **Config-driven** | All shop data (name, hours, services, barbers, colors) lives in one file: `config/master-shop.ts`. |
| **Multi-shop ready** | Designed to support multiple shops from a single codebase via `NEXT_PUBLIC_SHOP_SLUG`. |
| **Supabase-ready** | Schema migrations included for persistent appointment storage. |
| **SEO** | OpenGraph metadata, JSON-LD structured data, and per-page metadata generation. |

---

## Quick Start

```bash
git clone https://github.com/BigSlendr/Barber-Shop.git my-barbershop
cd my-barbershop
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

---

## Rebranding for a New Shop

All shop configuration lives in **`config/master-shop.ts`**. Follow this checklist:

### 1. Update shop identity

```ts
shop: {
  slug: "your-shop-slug",
  shopName: "Your Shop Name",
  tagline: "Your tagline here.",
  phone: "+15551234567",
  email: "bookings@yourshop.com",
  address: "123 Main St",
  city: "Your City",
  state: "NY",
  postalCode: "10001",
}
```

### 2. Update brand colors

```ts
themeTokens: {
  colors: {
    background: "#0d0d0d",   // Page background
    surface: "#161616",       // Card/panel background
    text: "#f5f5f5",          // Primary text
    accent: "#c8102e",        // Brand accent (buttons, highlights)
    muted: "#9ca3af"          // Secondary text
  }
}
```

### 3. Add your barbers

Each barber supports the following fields:

```ts
{
  id: "barber-1",           // Unique ID (keep stable once live)
  slug: "john-doe",         // URL slug for /barbers/john-doe
  name: "John Doe",
  title: "Master Barber",
  bio: "Bio text here...",
  specialties: ["Skin fades", "Beard design"],
  image: "/assets/headshots/barber-john.jpg",
  yearsExperience: 8,
  instagram: "https://instagram.com/your_handle",  // Optional
  tiktok: "https://tiktok.com/@your_handle",       // Optional
  phone: "+15551234567",    // E.164 format — used for SMS notifications
  portfolio: [              // Work photos shown on profile page
    "/assets/portfolio/john-work-01.jpg",
    "/assets/portfolio/john-work-02.jpg",
  ]
}
```

### 4. Replace assets

| Asset | Path |
|---|---|
| Shop logo | `/public/assets/logos/shop-logo.svg` |
| Hero photo | `/public/assets/photos/hero-placeholder.jpg` |
| Barber headshots | `/public/assets/headshots/barber-{slug}.jpg` |
| Portfolio photos | `/public/assets/portfolio/{slug}-work-01.jpg` |
| Gallery photos | `/public/assets/photos/gallery-01.jpg` ... |

### 5. Update barber schedules

Edit `data/seeds/sample-seed.ts`:

```ts
weeklyAvailability: [
  { barberId: "barber-1", dayOfWeek: 1, startTime: "09:00", endTime: "19:00" },
  // dayOfWeek: 0=Sun, 1=Mon, ..., 6=Sat
]
```

### 6. Set environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_FROM_NUMBER=+18005551234

RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_ADDRESS=bookings@yourdomain.com
```

### 7. Update the PWA manifest

Edit `public/manifest.webmanifest` — update `name`, `short_name`, `description`, `theme_color`, and `background_color`.

---

## Notification System

### SMS (Twilio)

When a customer completes a booking, the API automatically sends an SMS to the barber's phone number (set in `config/master-shop.ts` under `barber.phone`).

**SMS message format:**
```
New booking at Elite Barber Studio!
Client: John Smith (555-123-4567)
Service: Skin Fade (50 min)
When: Saturday, April 12, 2026 at 2:30 PM
Booking ID: A1B2C3D4
```

**Setup:**
1. Create a Twilio account at [twilio.com](https://twilio.com)
2. Purchase a phone number
3. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` in `.env.local`
4. Add each barber's `phone` field in `config/master-shop.ts`

### Email (Resend)

Two HTML emails are sent on each booking:

- **Customer confirmation** — booking summary with date, time, barber, service, and location
- **Barber notification** — client details and appointment summary

**Setup:**
1. Create a Resend account at [resend.com](https://resend.com) (free: 3,000 emails/month)
2. Verify your sending domain
3. Set `RESEND_API_KEY` and `RESEND_FROM_ADDRESS` in `.env.local`

> Both SMS and email are optional. If env vars are not set, notifications are skipped gracefully — the booking still confirms successfully.

---

## Architecture

```
config/
  master-shop.ts     <- Single source of truth for all shop data
  types.ts           <- TypeScript types for all config shapes
  shops.ts           <- Re-exports activeShop and masterShopConfig

app/
  (site)/
    page.tsx          <- Home page
    barbers/
      page.tsx        <- Barbers listing
      [slug]/page.tsx <- Individual barber profile (portfolio + social + book CTA)
    book/page.tsx     <- Booking page
    services/         <- Services page
    gallery/          <- Gallery page
    contact/          <- Contact page
  api/
    book/route.ts     <- Booking API (validates, fires SMS + email, returns bookingId)
  offline/page.tsx    <- PWA offline fallback

components/
  sections/
    BarbersSection.tsx   <- Barber grid with headshots, Instagram links, Book buttons
    BookingForm.tsx      <- 5-step booking form with URL barber pre-selection
    Hero.tsx             <- Hero section
    ServicesSection.tsx  <- Services grid
    GallerySection.tsx   <- Photo gallery
    ReviewsSection.tsx   <- Customer reviews
    FAQSection.tsx       <- FAQ accordion
    TimeSlotPicker.tsx   <- Time slot grid
    ContactBlock.tsx     <- Contact info block
  ui/
    Navbar.tsx           <- Sticky responsive navbar
    Footer.tsx           <- Footer with social icons, hours, contact
    MobileStickyCTA.tsx  <- Mobile bottom bar with Book Now CTA
    SectionHeader.tsx    <- Reusable section header

lib/
  booking.ts          <- Slot availability calculator
  notifications.ts    <- Twilio SMS + Resend email helpers
  supabase.ts         <- Supabase client (optional)
  utils.ts            <- Utility functions

data/
  booking.ts          <- Exports weekly availability, blocked times, existing appointments
  seeds/
    sample-seed.ts    <- Sample barber schedules and blocked times

supabase/
  migrations/
    001_initial_schema.sql               <- Core schema
    002_barber_profile_enhancements.sql  <- Portfolio, Instagram, phone columns

public/
  assets/
    headshots/   <- Barber headshot photos
    photos/      <- Hero and gallery photos
    portfolio/   <- Per-barber work portfolio photos
    logos/       <- Shop logo
  icons/         <- PWA icons (192x192, 512x512)
  manifest.webmanifest
  sw.js          <- Service worker (auto-generated by next-pwa)
```

---

## Deployment

### Vercel (recommended)

```bash
vercel --prod
```

Set all env vars in the Vercel dashboard under **Settings > Environment Variables**.

### Other platforms

Any platform that supports Next.js 15 will work (Netlify, Railway, Render, etc.).

---

## PWA Notes

- The service worker is generated automatically by `next-pwa` in production builds.
- In development (`npm run dev`), the PWA is disabled to avoid caching issues.
- The manifest includes two shortcuts: **Book Now** and **Our Barbers** — these appear in the app launcher on Android.
- Replace `/public/icons/icon-192.svg` and `/public/icons/icon-512.svg` with your shop's logo for the home screen icon.

---

## Rebranding Checklist

- [ ] `slug`, `shopName`, `tagline`, `phone`, `email`, `address`, `city`, `state`, `postalCode` updated in `config/master-shop.ts`
- [ ] `themeTokens.colors` updated to match brand palette
- [ ] Barbers array updated with real names, bios, `instagram`, `phone` (E.164), and `portfolio` paths
- [ ] Services array updated with real pricing and durations
- [ ] Hours array updated with actual opening times
- [ ] Logo replaced at `/public/assets/logos/shop-logo.svg`
- [ ] Hero photo replaced at `/public/assets/photos/hero-placeholder.jpg`
- [ ] Barber headshots added to `/public/assets/headshots/`
- [ ] Portfolio photos added to `/public/assets/portfolio/`
- [ ] `data/seeds/sample-seed.ts` updated with real barber schedules
- [ ] `.env.local` configured with Twilio and Resend credentials
- [ ] `public/manifest.webmanifest` updated with shop name and brand colors
- [ ] PWA install prompt tested on mobile

---

## License

MIT — free to use and modify for any barbershop project.
