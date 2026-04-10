import { ShopConfig } from "@/config/types";

export const sampleShop: ShopConfig = {
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
  heroImage:
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80",
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
      image:
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
      yearsExperience: 12
    },
    {
      id: "barber-2",
      slug: "isaiah-brooks",
      name: "Isaiah Brooks",
      title: "Senior Barber",
      bio: "Specializes in razor detailing and tailored grooming plans.",
      specialties: ["Razor line-ups", "Classic styles"],
      image:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=900&q=80",
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
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80"
  ],
  booking: {
    minAdvanceHours: 2,
    maxAdvanceDays: 60,
    slotIntervalMins: 15,
    cancellationHours: 12,
    timezone: "America/Chicago"
  }
};

export const activeShop = sampleShop;
