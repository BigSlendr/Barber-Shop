export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
};

export type BrandColors = {
  background: string;
  surface: string;
  text: string;
  accent: string;
  muted: string;
};

export type ThemeTokens = {
  colors: BrandColors;
  effects: {
    cardShadow: string;
  };
};

export type ShopHours = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type ServiceItem = {
  id: string;
  name: string;
  description: string;
  durationMins: number;
  price: number;
  featured?: boolean;
};

export type BarberProfile = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  yearsExperience: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type BookingSettings = {
  minAdvanceHours: number;
  maxAdvanceDays: number;
  slotIntervalMins: number;
  cancellationHours: number;
  timezone: string;
};

export type ContentLabels = {
  heroDescription: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  mobileCtaLabel: string;
  callCtaLabel: string;
};

export type AssetPlaceholders = {
  logo: string;
  heroPhoto: string;
  galleryPhotosDir: string;
  barberHeadshotsDir: string;
};

export type ShopConfig = {
  slug: string;
  shopName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  logoText: string;
  heroImage: string;
  socialLinks: SocialLinks;
  colors: BrandColors;
  hours: ShopHours[];
  services: ServiceItem[];
  barbers: BarberProfile[];
  reviews: Review[];
  faqs: { question: string; answer: string }[];
  gallery: string[];
  booking: BookingSettings;
  content: ContentLabels;
};

export type ShopTemplateConfig = {
  shop: ShopConfig;
  themeTokens: ThemeTokens;
  seedDatasetId: string;
  assets: AssetPlaceholders;
  rebrandChecklist: string[];
};
