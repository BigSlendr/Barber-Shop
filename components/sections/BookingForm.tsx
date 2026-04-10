"use client";

import { useMemo, useState } from "react";
import { activeShop } from "@/config/shops";
import { getSlotsForBarber } from "@/lib/booking";
import { TimeSlotPicker } from "@/components/sections/TimeSlotPicker";

type AppointmentPayload = {
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
};

export function BookingForm() {
  const [form, setForm] = useState<AppointmentPayload>({
    barberId: activeShop.barbers[0]?.id ?? "",
    serviceId: activeShop.services[0]?.id ?? "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = activeShop.services.find((item) => item.id === form.serviceId);
  const selectedBarber = activeShop.barbers.find((item) => item.id === form.barberId);
  const slots = useMemo(() => {
    if (!form.barberId || !form.date || !selectedService) return [];
    return getSlotsForBarber(form.barberId, form.date, selectedService.durationMins);
  }, [form.barberId, form.date, selectedService]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <div className="card border-brand-accent/40">
        <h2 className="text-2xl font-semibold">Booking confirmed</h2>
        <p className="mt-2 text-brand-muted">A confirmation email will be sent shortly. You can add cancellation/reschedule links in your next integration pass.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7 rounded-2xl border border-white/10 bg-brand-surface p-6 shadow-card md:p-8">
      <div className="rounded-xl border border-white/10 bg-brand-background/45 p-4">
        <p className="field-label">Step 1</p>
        <p className="mt-1 text-lg font-semibold">Choose service details</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="field-label">Barber</span>
            <select className="field-input" value={form.barberId} onChange={(e) => setForm({ ...form, barberId: e.target.value })}>
              {activeShop.barbers.map((barber) => <option key={barber.id} value={barber.id}>{barber.name}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="field-label">Service</span>
            <select className="field-input" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
              {activeShop.services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-brand-background/45 p-4">
        <p className="field-label">Step 2</p>
        <p className="mt-1 text-lg font-semibold">Pick date & time</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="field-label">Date</span>
            <input type="date" className="field-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })} required />
          </label>
          <div className="space-y-2">
            <p className="field-label">Available time</p>
            <TimeSlotPicker slots={slots} value={form.time} onChange={(time) => setForm({ ...form, time })} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-brand-background/45 p-4">
        <p className="field-label">Step 3</p>
        <p className="mt-1 text-lg font-semibold">Your contact details</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input className="field-input" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="field-input" placeholder="Phone number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <input type="email" className="field-input mt-4" placeholder="Email address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea className="field-input mt-4 min-h-20" placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>

      <div className="rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4">
        <p className="field-label text-brand-accent">Booking summary</p>
        <p className="mt-2 text-sm text-white/85">
          {selectedBarber?.name ?? "Your barber"} • {selectedService?.name ?? "Selected service"}
          {selectedService ? ` • ${selectedService.durationMins} min` : null}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button type="submit" disabled={!form.time} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
          Confirm booking
        </button>
        <p className="text-center text-xs text-brand-muted">Secure your slot in under one minute.</p>
      </div>
    </form>
  );
}
