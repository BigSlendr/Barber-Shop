import { BarbersSection } from "@/components/sections/BarbersSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { activeShop } from "@/config/shops";

export const metadata = {
  title: `Our Barbers — ${activeShop.shopName}`,
  description: `Meet the team at ${activeShop.shopName}. View each barber's profile, portfolio, and book directly with them.`
};

export default function BarbersPage() {
  return (
    <>
      <SectionHeader
        eyebrow="The Team"
        title="Meet your barbers"
        description="Each barber brings their own style and specialties. Browse profiles, view their work, and book directly."
      />
      <BarbersSection />
    </>
  );
}
