# Barbershop Website Template (Next.js + Tailwind + Supabase)

Production-ready barbershop website template built for **rapid client rebranding**.

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Supabase-ready schema and client helper
- PWA setup (manifest + installable behavior via `next-pwa`)
- SEO baseline (metadata + `BarberShop` schema)

## Template Architecture
The codebase is separated into 3 layers:

1. **Brand/Config layer**
   - `config/types.ts` (shape)
   - `config/shops.ts` (active shop profile)
2. **Content/Data layer**
   - `data/booking.ts` (availability, blocked times, mock appointments)
   - Config arrays for services/barbers/reviews/gallery/faq
3. **Application/System layer**
   - `app/**` pages/routes/layout
   - `components/**` reusable UI + sections
   - `lib/**` booking logic + shared utilities + Supabase adapter

## Included pages
- Home
- Book
- Services
- Barbers
- Dynamic barber profile (`/barbers/[slug]`)
- Gallery
- Contact
- My Appointments scaffold (`/appointments`)
- Offline fallback (`/offline`)

## Booking flow
Book page supports:
- barber selection
- service selection
- date selection
- slot selection based on duration
- double-booking and blocked time filtering (mock logic)
- customer data capture (name, phone, email, notes)
- confirmation state

API scaffold: `POST /api/book`.

## Supabase schema
Migration is included at:
- `supabase/migrations/001_initial_schema.sql`

Tables:
- `shops`
- `barbers`
- `services`
- `barber_availability`
- `blocked_times`
- `customers`
- `appointments`

Includes cancellation/reschedule scaffolding fields in `appointments`.

## PWA features
- `public/manifest.webmanifest`
- Placeholder app icons under `public/icons/`
- `next-pwa` integration in `next.config.ts` (enabled in production builds)
- Offline route at `/offline`

> To finalize offline caching strategy per deployment, tune `runtimeCaching` in `next.config.ts`.

## SEO foundation
- Metadata in `app/layout.tsx`
- Open Graph support
- JSON-LD `BarberShop` schema injection

## Getting started
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables
Copy `.env.example` to `.env.local` and fill values.

Required for Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional server workflows:
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SHOP_SLUG`

## How to duplicate this for a new barbershop
1. Clone this repository.
2. Duplicate `config/shops.ts` entry and create a new shop config object.
3. Replace:
   - shop identity (name, tagline, contact)
   - brand colors
   - services
   - barbers
   - gallery + testimonials + FAQs
4. Set `activeShop` to the new config object.
5. Update icon assets in `public/icons/` and logo usage in navbar.
6. Seed Supabase tables for the new shop.
7. Deploy to Vercel (or Cloudflare-compatible Next.js target).

## Placeholder image guidance
- Current sample uses Unsplash URLs.
- For client launches, replace with licensed photos in the same fields:
  - `heroImage`
  - barber profile images
  - gallery images
- Keep aspect ratios consistent for visual polish.

## Notes for each client launch
- Confirm timezone and weekly hours first.
- Enter barber availability and blocked times before going live.
- Verify booking interval (`slotIntervalMins`) and cancellation policy.
- Update local business schema fields (address/phone).
- Replace placeholder icons and manifest branding.
- Test install prompt and offline fallback on mobile.
