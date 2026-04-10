import { activeShop } from "@/config/shops";

export function ContactBlock() {
  return (
    <section className="rounded-2xl border border-white/10 bg-brand-surface p-6">
      <h2 className="text-2xl font-semibold">Hours & Location</h2>
      <p className="mt-3 text-brand-muted">{activeShop.address}, {activeShop.city}, {activeShop.state} {activeShop.postalCode}</p>
      <p className="mt-1 text-brand-muted">{activeShop.phone} • {activeShop.email}</p>
      <div className="mt-4 grid gap-2 text-sm text-brand-muted md:grid-cols-2">
        {activeShop.hours.map((entry) => (
          <p key={entry.day}>{entry.day}: {entry.closed ? "Closed" : `${entry.open} - ${entry.close}`}</p>
        ))}
      </div>
    </section>
  );
}
