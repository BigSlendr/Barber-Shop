import Link from "next/link";

export function MobileStickyCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Link href="/book" className="block rounded-full bg-brand-accent px-6 py-3 text-center font-semibold text-black shadow-card">
        Book Now
      </Link>
    </div>
  );
}
