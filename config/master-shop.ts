import { ShopTemplateConfig } from "@/config/types";

/**
 * master-shop.ts — Single source of truth for the barbershop template.
 *
 * To rebrand for a new shop:
 *   1. Update all fields in the `shop` object below.
 *   2. Replace assets in /public/assets/ (logo, hero, headshots, portfolio).
 *   3. Update `themeTokens.colors` to match the shop's brand palette.
 *   4. Update barber schedules in data/seeds/sample-seed.ts.
 *   5. Set env vars in .env.local (see .env.example).
 *
 * This file is pre-configured for Elite Barber Studio, Staten Island, NY.
 * Use it as a reference when creating a new shop config.
 */
export const masterShopConfig: ShopTemplateConfig = {
  shop: {
    slug: "elite-barber-studio",
    shopName: "Elite Barber Studio",
    tagline: "Premium cuts. Elite experience. Staten Island's finest.",
    phone: "+17185245990",
    email: "bookings@elitebarberstudio.com",
    address: "2025 Richmond Ave",
    city: "Staten Island",
    state: "NY",
    postalCode: "10314",
    logoText: "ELITE",
    heroImage: "/assets/photos/hero-placeholder.jpg",
    socialLinks: {
      instagram: "https://instagram.com/_elite_barber_studio",
      facebook: "https://facebook.com",
      tiktok: "https://tiktok.com"
    },
    colors: {
      background: "#0d0d0d",
      surface: "#161616",
      text: "#f5f5f5",
      accent: "#c8102e",
      muted: "#9ca3af"
    },
    hours: [
      { day: "Monday", open: "09:00", close: "19:00" },
      { day: "Tuesday", open: "09:00", close: "19:00" },
      { day: "Wednesday", open: "09:00", close: "19:00" },
      { day: "Thursday", open: "09:00", close: "19:00" },
      { day: "Friday", open: "09:00", close: "19:00" },
      { day: "Saturday", open: "09:00", close: "18:00" },
      { day: "Sunday", open: "10:00", close: "16:00" }
    ],
    services: [
      {
        id: "classic-cut",
        name: "Classic Cut",
        description: "Precision scissor and clipper cut tailored to your style.",
        durationMins: 45,
        price: 35,
        featured: true
      },
      {
        id: "skin-fade",
        name: "Skin Fade",
        description: "Clean skin fade with detail work and a hot towel finish.",
        durationMins: 50,
        price: 45,
        featured: true
      },
      {
        id: "beard-design",
        name: "Beard Design",
        description: "Shape, line-up, and conditioning treatment for beard health.",
        durationMins: 30,
        price: 25,
        featured: true
      },
      {
        id: "kids-cut",
        name: "Kids Cut",
        description: "Patient, friendly cuts for children 12 and under.",
        durationMins: 30,
        price: 25
      },
      {
        id: "cut-and-beard",
        name: "Cut + Beard Combo",
        description: "Full haircut and beard design in one session.",
        durationMins: 75,
        price: 60
      },
      {
        id: "lineup",
        name: "Line-Up / Edge-Up",
        description: "Sharp line-up around hairline, temples, and neckline.",
        durationMins: 20,
        price: 15
      }
    ],
    barbers: [
      {
        id: "barber-1",
        slug: "petro",
        name: "Petro",
        title: "Master Barber",
        bio: "One of Staten Island's most sought-after barbers. Petro is known for immaculate skin fades, razor-sharp line-ups, and a relaxed chair-side manner that keeps clients coming back week after week.",
        specialties: ["Skin fades", "Razor line-ups", "Beard sculpting"],
        image: "/assets/headshots/barber-petro.jpg",
        yearsExperience: 10,
        instagram: "https://instagram.com/_elite_barber_studio",
        phone: "+15551234567",
        portfolio: [
          "/assets/portfolio/petro-work-01.jpg",
          "/assets/portfolio/petro-work-02.jpg",
          "/assets/portfolio/petro-work-03.jpg",
          "/assets/portfolio/petro-work-04.jpg",
          "/assets/portfolio/petro-work-05.jpg",
          "/assets/portfolio/petro-work-06.jpg"
        ]
      },
      {
        id: "barber-2",
        slug: "johnny",
        name: "Johnny",
        title: "Senior Barber",
        bio: "Johnny brings precision and creativity to every cut. His specialty is textured styles and modern fades, and he has a loyal following of clients who trust him for consistent, clean results every visit.",
        specialties: ["Textured styles", "Modern fades", "Kids cuts"],
        image: "/assets/headshots/barber-johnny.jpg",
        yearsExperience: 7,
        instagram: "https://instagram.com/_elite_barber_studio",
        phone: "+15559876543",
        portfolio: [
          "/assets/portfolio/johnny-work-01.jpg",
          "/assets/portfolio/johnny-work-02.jpg",
          "/assets/portfolio/johnny-work-03.jpg",
          "/assets/portfolio/johnny-work-04.jpg",
          "/assets/portfolio/johnny-work-05.jpg",
          "/assets/portfolio/johnny-work-06.jpg"
        ]
      },
      {
        id: "barber-3",
        slug: "felix",
        name: "Felix",
        title: "Barber",
        bio: "Felix is the go-to barber for classic cuts and old-school barbershop vibes. Meticulous with a straight razor and known for his hot towel shaves, Felix brings tradition and craft to every appointment.",
        specialties: ["Classic cuts", "Hot towel shaves", "Beard design"],
        image: "/assets/headshots/barber-felix.jpg",
        yearsExperience: 5,
        instagram: "https://instagram.com/_elite_barber_studio",
        phone: "+15554561234",
        portfolio: [
          "/assets/portfolio/felix-work-01.jpg",
          "/assets/portfolio/felix-work-02.jpg",
          "/assets/portfolio/felix-work-03.jpg",
          "/assets/portfolio/felix-work-04.jpg"
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Andre M.",
        rating: 5,
        text: "Best fade on the island. Petro is a legend — been coming here for years and never had a bad cut."
      },
      {
        id: "r2",
        author: "Caleb T.",
        rating: 5,
        text: "Clean shop, great vibes, and every barber here is elite. Johnny hooked me up with the freshest taper I've ever had."
      },
      {
        id: "r3",
        author: "Mike R.",
        rating: 5,
        text: "Felix gave me the cleanest hot towel shave of my life. This is the spot."
      },
      {
        id: "r4",
        author: "Jason L.",
        rating: 5,
        text: "Family-friendly, fast, and consistent. Bring my son here every two weeks. The kids cut is great."
      }
    ],
    faqs: [
      {
        question: "Do you accept walk-ins?",
        answer: "Walk-ins are always welcome! We have two stations available and try to accommodate everyone. Booking online gets you a guaranteed slot and skips the wait."
      },
      {
        question: "How do I cancel or reschedule?",
        answer: "Please cancel or reschedule at least 12 hours before your appointment. You can reply to your confirmation email or call us directly."
      },
      {
        question: "Can I book a specific barber?",
        answer: "Absolutely — visit each barber's profile page to see their work and book directly with them."
      },
      {
        question: "Do you offer kids cuts?",
        answer: "Yes! We offer a dedicated Kids Cut service for children 12 and under. All our barbers are great with kids."
      },
      {
        question: "Where are you located?",
        answer: "We're at 2025 Richmond Ave, Staten Island, NY 10314 — right down the block from the Staten Island Mall."
      }
    ],
    gallery: [
      "/assets/photos/gallery-01.jpg",
      "/assets/photos/gallery-02.jpg",
      "/assets/photos/gallery-03.jpg",
      "/assets/photos/gallery-04.jpg",
      "/assets/photos/gallery-05.jpg",
      "/assets/photos/gallery-06.jpg"
    ],
    booking: {
      minAdvanceHours: 1,
      maxAdvanceDays: 60,
      slotIntervalMins: 15,
      cancellationHours: 12,
      timezone: "America/New_York"
    },
    content: {
      heroDescription: "Walk-ins welcome. Online booking gets you a guaranteed slot with your favourite barber — skip the wait, look your best.",
      primaryCtaLabel: "Book Now",
      secondaryCtaLabel: "Meet the Team",
      mobileCtaLabel: "Book Now",
      callCtaLabel: "Call Us"
    },
    /**
     * Notification configuration.
     * Credentials are read from env vars at runtime (see .env.example).
     * fromNumber and fromAddress here are fallbacks only.
     */
    notifications: {
      twilio: {
        fromNumber: process.env.TWILIO_FROM_NUMBER ?? ""
      },
      resend: {
        fromAddress: process.env.RESEND_FROM_ADDRESS ?? "bookings@elitebarberstudio.com",
        fromName: "Elite Barber Studio"
      }
    }
  },
  themeTokens: {
    colors: {
      background: "#0d0d0d",
      surface: "#161616",
      text: "#f5f5f5",
      accent: "#c8102e",
      muted: "#9ca3af"
    },
    effects: {
      cardShadow: "0 12px 30px rgba(0,0,0,0.35)"
    }
  },
  seedDatasetId: "sample-seed-v1",
  assets: {
    logo: "/assets/logos/shop-logo.svg",
    heroPhoto: "/assets/photos/hero-placeholder.jpg",
    galleryPhotosDir: "/assets/photos",
    barberHeadshotsDir: "/assets/headshots"
  },
  rebrandChecklist: [
    "Update slug, shopName, tagline, phone, email, address, city, state, postalCode in config/master-shop.ts.",
    "Update themeTokens.colors to match your brand palette (background, surface, text, accent, muted).",
    "Replace barbers array with your team — add instagram, phone (E.164 format), and portfolio image paths.",
    "Replace services array with your pricing and durations.",
    "Replace hours array with your actual opening hours.",
    "Replace /public/assets/logos/shop-logo.svg with your logo.",
    "Replace /public/assets/photos/hero-placeholder.jpg with a hero photo.",
    "Add barber headshots to /public/assets/headshots/ and portfolio images to /public/assets/portfolio/.",
    "Update data/seeds/sample-seed.ts with real barber schedules and blocked times.",
    "Set env vars in .env.local: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, RESEND_API_KEY, RESEND_FROM_ADDRESS.",
    "Update public/manifest.webmanifest with your shop name and brand colors.",
    "Deploy and verify PWA install prompt works on mobile."
  ]
};

export const activeShop = masterShopConfig.shop;
