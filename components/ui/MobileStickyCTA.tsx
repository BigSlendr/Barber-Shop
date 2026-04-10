import Link from "next/link";
import { activeShop } from "@/config/shops";

export function MobileStickyCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Link href="/book" className="btn-primary block shadow-card">
        {activeShop.content.mobileCtaLabel}
      </Link>
    </div>
  );
}
