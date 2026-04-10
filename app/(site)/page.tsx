import { BarbersSection } from "@/components/sections/BarbersSection";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { FAQSection } from "@/components/sections/FAQSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection preview />
      <BarbersSection preview />
      <GallerySection preview />
      <ReviewsSection />
      <ContactBlock />
      <FAQSection />
    </>
  );
}
