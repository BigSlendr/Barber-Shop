import { BookingForm } from "@/components/sections/BookingForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function BookPage() {
  return (
    <>
      <SectionHeader title="Book your appointment" description="Pick your barber, service, and time in under one minute." />
      <BookingForm />
    </>
  );
}
