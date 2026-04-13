import { Suspense } from "react";
import { BookPageClient } from "@/components/sections/BookPageClient";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function BookPage() {
  return (
    <>
      <SectionHeader title="Book your appointment" description="Pick your barber, service, and time in under one minute." />
      <Suspense fallback={<div className="rounded-xl border border-white/10 bg-brand-surface p-6 text-sm text-brand-muted">Loading booking options...</div>}>
        <BookPageClient />
      </Suspense>
    </>
  );
}
