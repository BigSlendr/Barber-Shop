import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <section className="rounded-2xl border border-white/10 bg-brand-surface p-6">
      <h1 className="text-3xl font-semibold">My Appointments (Scaffold)</h1>
      <p className="mt-3 text-brand-muted">Connect this page to customer auth and Supabase queries to show upcoming, canceled, or rescheduled bookings.</p>
      <Link href="/book" className="mt-4 inline-block underline">Create a new booking</Link>
    </section>
  );
}
