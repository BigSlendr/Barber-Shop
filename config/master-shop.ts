import { ShopTemplateConfig } from "@/config/types";

export const masterShopConfig: ShopTemplateConfig = {
  shop: {
    slug: "crown-and-blade",
    shopName: "Crown & Blade Barbers",
    tagline: "Precision cuts for the modern gentleman.",
    phone: "+1 (312) 555-0147",
    email: "bookings@crownandblade.com",
    address: "241 West Belmont Ave",
    city: "Chicago",
    state: "IL",
    postalCode: "60657",
    logoText: "C&B",
    heroImage: "/assets/photos/hero-placeholder.jpg",
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com"
    },
    colors: {
      background: "#0f1115",
      surface: "#171a21",
      text: "#f3f4f6",
      accent: "#d4af37",
      muted: "#a1a1aa"
    },
    hours: [
      { day: "Monday", open: "10:00", close: "19:00" },
      { day: "Tuesday", open: "10:00", close: "19:00" },
      { day: "Wednesday", open: "10:00", close: "20:00" },
      { day: "Thursday", open: "10:00", close: "20:00" },
      { day: "Friday", open: "09:00", close: "20:00" },
      { day: "Saturday", open: "09:00", close: "18:00" },
      { day: "Sunday", open: "00:00", close: "00:00", closed: true }
    ],
    services: [
      {
        id: "classic-cut",
        name: "Classic Cut",
        description: "Precision scissor and clipper cut with a hot towel finish.",
        durationMins: 45,
        price: 45,
        featured: true
      },
      {
        id: "skin-fade",
        name: "Skin Fade",
        description: "Modern skin fade with detail work and style consultation.",
        durationMins: 50,
        price: 55,
        featured: true
      },
      {
        id: "beard-design",
        name: "Beard Design",
        description: "Shape, line-up, and conditioning treatment for beard health.",
        durationMins: 30,
        price: 30
      }
    ],
    barbers: [
      {
        id: "barber-1",
        slug: "marcus-reed",
        name: "Marcus Reed",
        title: "Master Barber",
        bio: "Known for executive cuts and texture work with over a decade in premium grooming.",
        specialties: ["Skin fades", "Beard sculpting"],
        image: "/assets/headshots/barber-1.jpg",
        yearsExperience: 12
      },
      {
        id: "barber-2",
        slug: "isaiah-brooks",
        name: "Isaiah Brooks",
        title: "Senior Barber",
        bio: "Specializes in razor detailing and tailored grooming plans.",
        specialties: ["Razor line-ups", "Classic styles"],
        image: "/assets/headshots/barber-2.jpg",
        yearsExperience: 8
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Andre M.",
        rating: 5,
        text: "Best fade in the city. Booking was quick and smooth."
      },
      {
        id: "r2",
        author: "Caleb T.",
        rating: 5,
        text: "Clean atmosphere, elite service, and consistent quality."
      }
    ],
    faqs: [
      {
        question: "Do you accept walk-ins?",
        answer: "Walk-ins are welcome when available, but online booking gets priority."
      },
      {
        question: "How do cancellations work?",
        answer: "Please cancel at least 12 hours before your appointment to avoid fees."
      }
    ],
    gallery: [
      "/assets/photos/gallery-01.jpg",
      "/assets/photos/gallery-02.jpg",
      "/assets/photos/gallery-03.jpg"
    ],
    booking: {
      minAdvanceHours: 2,
      maxAdvanceDays: 60,
      slotIntervalMins: 15,
      cancellationHours: 12,
      timezone: "America/Chicago"
    },
    content: {
      heroDescription: "Book premium cuts, fades, and grooming treatments with our experienced team.",
      primaryCtaLabel: "Book Now",
      secondaryCtaLabel: "View Services",
      mobileCtaLabel: "Book Now",
      callCtaLabel: "Call"
    }
  },
  themeTokens: {
    colors: {
      background: "#0f1115",
      surface: "#171a21",
      text: "#f3f4f6",
      accent: "#d4af37",
      muted: "#a1a1aa"
    },
    effects: {
      cardShadow: "0 12px 30px rgba(0,0,0,0.25)"
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
    "Update business identity, contact information, and timezone in config/master-shop.ts.",
    "Replace /public/assets/logos, /public/assets/photos, and /public/assets/headshots placeholders.",
    "Swap services list in config/master-shop.ts and weekly schedules in data/seeds/sample-seed.ts.",
    "Set NEXT_PUBLIC_SHOP_SLUG and deploy with the new domain."
  ]
};

export const activeShop = masterShopConfig.shop;
