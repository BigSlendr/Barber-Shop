"use client";

import { useSearchParams } from "next/navigation";
import { BookingForm } from "@/components/sections/BookingForm";

export function BookPageClient() {
  const searchParams = useSearchParams();
  const barber = searchParams.get("barber") ?? "";

  return <BookingForm initialBarberId={barber} />;
}
