"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { activeShop } from "@/config/shops";
import { getSlotsForBarber } from "@/lib/booking";
import { TimeSlotPicker } from "@/components/sections/TimeSlotPicker";

type FormState = {
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const today = new Date().toISOString().split("T")[0];

export function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedBarberId = searchParams.get("barber") ?? "";

  const [form, setForm] = useState<FormState>({
    barberId: preselectedBarberId || (activeShop.barbers[0]?.id ?? ""),
    serviceId: activeShop.services[0]?.id ?? "",
    date: today,
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const [slots, setSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    bookingId?: string;
    message?: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedBarberId) {
      setForm((prev) => ({ ...prev, barberId: preselectedBarberId, time: "" }));
    }
  }, [preselectedBarberId]);

  const selectedBarber = activeShop.barbers.find((b) => b.id === form.barberId);
  const selectedService = activeShop.services.find((s) => s.id === form.serviceId);

  useEffect(() => {
    if (!form.barberId || !form.serviceId || !form.date) {
      setSlots([]);
      return;
    }
    const duration = selectedService?.durationMins ?? 30;
    const available = getSlotsForBarber(form.barberId, form.date, duration);
    setSlots(available);
    setForm((prev) => ({ ...prev, time: "" }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.barberId, form.serviceId, form.date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, bookingId: data.bookingId, message: data.message });
      } else {
        setResult({ ok: false, error: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setResult({ ok: false, error: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
        <div className="mb-4 text-4xl">&#x2705;</div>
        <h2 className="text-2xl font-semibold text-white">Booking Confirmed!</h2>
        <p className="mt-2 text-brand-muted">{result.message}</p>
        {result.bookingId && (
          <p className="mt-4 text-sm text-brand-muted">
            Reference: <span className="font-mono text-white">{result.bookingId}</span>
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setResult(null);
            setForm({
              barberId: activeShop.barbers[0]?.id ?? "",
              serviceId: activeShop.services[0]?.id ?? "",
              date: today,
              time: "",
              name: "",
              phone: "",
              email: "",
              notes: ""
            });
          }}
          className="btn-secondary mt-6"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step 1 - Choose barber */}
      <div className="space-y-3">
        <p className="field-label">1. Choose your barber</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeShop.barbers.map((barber) => (
            <button
              key={barber.id}
              type="button"
              onClick={() => setForm({ ...form, barberId: barber.id, time: "" })}
              className={`rounded-xl border p-4 text-left transition ${
                form.barberId === barber.id
                  ? "border-brand-accent bg-brand-accent/10"
                  : "border-white/15 bg-brand-background/60 hover:border-white/30"
              }`}
            >
              <p className="font-semibold text-white">{barber.name}</p>
              <p className="text-xs text-brand-muted">{barber.title}</p>
              {barber.specialties.length > 0 && (
                <p className="mt-1 text-xs text-brand-accent">
                  {barber.specialties.slice(0, 2).join(" · ")}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 - Choose service */}
      <div className="space-y-3">
        <p className="field-label">2. Choose a service</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {activeShop.services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setForm({ ...form, serviceId: service.id, time: "" })}
              className={`rounded-xl border p-4 text-left transition ${
                form.serviceId === service.id
                  ? "border-brand-accent bg-brand-accent/10"
                  : "border-white/15 bg-brand-background/60 hover:border-white/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-white">{service.name}</p>
                <p className="shrink-0 font-semibold text-brand-accent">${service.price}</p>
              </div>
              <p className="mt-1 text-xs text-brand-muted">{service.description}</p>
              <p className="mt-1 text-xs text-brand-muted">{service.durationMins} min</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3 - Pick date */}
      <div className="space-y-3">
        <p className="field-label">3. Pick a date</p>
        <input
          type="date"
          className="field-input max-w-xs"
          min={today}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })}
          required
        />
      </div>

      {/* Step 4 - Pick time */}
      <div className="space-y-3">
        <p className="field-label">4. Pick a time</p>
        <TimeSlotPicker slots={slots} value={form.time} onChange={(t) => setForm({ ...form, time: t })} />
      </div>

      {/* Step 5 - Contact details */}
      <div className="space-y-4">
        <p className="field-label">5. Your contact details</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="field-input"
            placeholder="Full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="field-input"
            placeholder="Phone number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <input
          type="email"
          className="field-input"
          placeholder="Email address (confirmation will be sent here)"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          className="field-input min-h-20"
          placeholder="Notes (optional - style references, allergies, etc.)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      {/* Booking summary */}
      <div className="rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4">
        <p className="field-label text-brand-accent">Booking summary</p>
        <p className="mt-2 text-sm text-white/85">
          {selectedBarber?.name ?? "Your barber"} &bull; {selectedService?.name ?? "Selected service"}
          {selectedService ? ` · ${selectedService.durationMins} min · $${selectedService.price}` : null}
        </p>
        {form.date && form.time && (
          <p className="mt-1 text-sm text-brand-muted">
            {form.date} at {form.time}
          </p>
        )}
      </div>

      {result?.error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {result.error}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!form.time || submitting}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Confirming..." : "Confirm booking"}
        </button>
        <p className="text-center text-xs text-brand-muted">
          You will receive a confirmation email. Your barber will be notified by SMS.
        </p>
      </div>
    </form>
  );
}
