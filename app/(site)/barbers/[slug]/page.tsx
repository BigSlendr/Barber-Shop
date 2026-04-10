import { notFound } from "next/navigation";
import { activeShop } from "@/config/shops";

export default async function BarberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const barber = activeShop.barbers.find((entry) => entry.slug === slug);

  if (!barber) {
    notFound();
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-brand-surface p-6">
      <h1 className="text-3xl font-semibold">{barber.name}</h1>
      <p className="text-brand-accent">{barber.title}</p>
      <p className="mt-4 text-brand-muted">{barber.bio}</p>
      <p className="mt-6 text-sm">Specialties: {barber.specialties.join(", ")}</p>
      <p className="text-sm text-brand-muted">Experience: {barber.yearsExperience} years</p>
    </article>
  );
}
