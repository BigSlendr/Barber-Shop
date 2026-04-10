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

/**
 * BarberProfile — represents a single barber on the team.
 *
 * Extended fields:
 *   - instagram: full Instagram profile URL (e.g. "https://instagram.com/barber_handle")
 *   - tiktok: full TikTok profile URL (optional)
 *   - phone: barber's mobile number in E.164 format for SMS notifications (e.g. "+13471234567")
 *   - portfolio: array of image paths showcasing the barber's work (shown on their profile page)
 */
export type BarberProfile = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  yearsExperience: number;
  /** Full Instagram profile URL — shown as a link on the barber profile page */
  instagram?: string;
  /** Full TikTok profile URL — optional social link */
  tiktok?: string;
  /**
   * Barber's mobile number in E.164 format (e.g. "+13471234567").
   * Used by the booking API to send an SMS notification via Twilio when a
   * customer books with this barber. Leave undefined to skip SMS for this barber.
   */
  phone?: string;
  /**
   * Array of image paths (relative to /public) showcasing the barber's work.
   * Displayed as a portfolio grid on the barber's individual profile page.
   * Example: ["/assets/portfolio/barber-1-work-01.jpg", ...]
   */
  portfolio?: string[];
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

/**
 * NotificationConfig — controls SMS and email notifications sent on booking.
 *
 * SMS (Twilio): texts the individual barber when a customer books with them.
 * Email (Resend): sends HTML confirmation emails to both the customer and the barber.
 *
 * All fields are optional — if left undefined the booking API will skip that
 * notification channel gracefully without throwing errors.
 */
export type NotificationConfig = {
  /**
   * Twilio configuration for SMS notifications to barbers.
   * Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER in .env.local
   */
  twilio?: {
    /** Twilio phone number to send FROM (E.164 format, e.g. "+18005551234") */
    fromNumber: string;
  };
  /**
   * Resend configuration for email confirmations to barbers and customers.
   * Set RESEND_API_KEY in .env.local. Also set the verified "from" domain/address.
   */
  resend?: {
    /** Verified sender address (e.g. "bookings@yourdomain.com") */
    fromAddress: string;
    /** Display name shown in the From field (e.g. "Elite Barber Studio") */
    fromName: string;
  };
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
  /** Optional notification settings — configure to enable SMS and email on booking */
  notifications?: NotificationConfig;
};

export type ShopTemplateConfig = {
  shop: ShopConfig;
  themeTokens: ThemeTokens;
  seedDatasetId: string;
  assets: AssetPlaceholders;
  rebrandChecklist: string[];
};
