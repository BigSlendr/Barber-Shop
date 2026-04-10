# Barbershop Website Template (Next.js + Tailwind + Supabase)

Production-ready barbershop website template built for **rapid, repeatable client rebranding**.

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Supabase-ready schema and client helper
- PWA setup (manifest + installable behavior via `next-pwa`)
- SEO baseline (metadata + `BarberShop` schema)

## Template Architecture
The project is intentionally split into configuration, seed data, and reusable app logic:

1. **Master Config (single source of truth)**
   - `config/master-shop.ts`
   - Includes business identity, theme tokens, content labels, asset placeholder paths, and active seed dataset ID.
2. **Seed Data (sample operational data)**
   - `data/seeds/sample-seed.ts`
   - Contains sample barber availability, blocked times, and existing appointments.
3. **Application Layer**
   - `app/**` pages/routes/layout
   - `components/**` reusable UI + sections
   - `lib/**` booking logic + shared utilities + Supabase adapter

## Theme Token System
Theme values are centralized and semantic:

- `masterShopConfig.themeTokens.colors`
  - `background`
  - `surface`
  - `text`
  - `accent`
  - `muted`
- `masterShopConfig.themeTokens.effects`
  - `cardShadow`

These tokens are mapped to CSS variables in `app/layout.tsx` and consumed by Tailwind utility classes (`bg-brand-*`, `text-brand-*`, `shadow-card`).

## Placeholder Assets
Use these paths for brand-specific media replacement:

- Logos: `public/assets/logos/`
- Shop photos (hero/gallery): `public/assets/photos/`
- Barber headshots: `public/assets/headshots/`

`config/master-shop.ts` also stores placeholder references under `assets` so new teams know where assets belong.

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

## PWA features
- `public/manifest.webmanifest`
- Placeholder app icons under `public/icons/`
- `next-pwa` integration in `next.config.ts` (enabled in production builds)
- Offline route at `/offline`

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

## Launching a New Shop
1. Clone the repository.
2. Update **only** `config/master-shop.ts` for brand identity, copy, theme tokens, services, and barber profiles.
3. Replace placeholder assets in:
   - `public/assets/logos/`
   - `public/assets/photos/`
   - `public/assets/headshots/`
4. Update the sample seed data in `data/seeds/sample-seed.ts` with real schedules/blocked times.
5. Set `seedDatasetId` in `config/master-shop.ts` if you add additional datasets.
6. Run `npm run lint` and `npm run dev`.
7. Seed Supabase data and deploy.

### Rebranding Checklist (for cloned projects)
- [ ] Shop slug, name, address, phone, email, and timezone updated in `config/master-shop.ts`.
- [ ] Theme tokens updated (colors + card shadow).
- [ ] Logo text and content labels (`Book`, `Call`, hero copy) updated.
- [ ] Service menu replaced with client pricing + durations.
- [ ] Barber roster replaced (names, bios, specialties, headshot paths).
- [ ] Gallery/hero images replaced with licensed brand photos.
- [ ] Weekly availability and blocked times replaced in `data/seeds/sample-seed.ts`.
- [ ] Metadata and local schema reflect the new business.

### Replacing Service Menus and Barber Schedules (simple process)

**Service menu replacement**
1. Open `config/master-shop.ts`.
2. Replace `shop.services` entries (id, name, duration, description, price).
3. Keep IDs stable once live to avoid downstream mapping issues.

**Barber schedules replacement**
1. Open `data/seeds/sample-seed.ts`.
2. Update `weeklyAvailability` for each `barberId` and day.
3. Update `blockedTimes` for breaks, PTO, training, etc.
4. Update/remove `existingAppointments` sample records before go-live.

This keeps operational changes in two files and avoids touching component code.
