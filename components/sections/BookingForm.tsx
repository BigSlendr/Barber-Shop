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
      <div className="rounded-2xl border border-brand-accent/40 bg-brand-surface p-6">
        <h2 className="text-2xl font-semibold">Booking confirmed</h2>
        <p className="mt-2 text-brand-muted">A confirmation email will be sent shortly. You can add cancellation/reschedule links in your next integration pass.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-brand-surface p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">Barber
          <select className="w-full rounded-lg border border-white/15 bg-brand-background px-3 py-2" value={form.barberId} onChange={(e) => setForm({ ...form, barberId: e.target.value })}>
            {activeShop.barbers.map((barber) => <option key={barber.id} value={barber.id}>{barber.name}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-sm">Service
          <select className="w-full rounded-lg border border-white/15 bg-brand-background px-3 py-2" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
            {activeShop.services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">Date
          <input type="date" className="w-full rounded-lg border border-white/15 bg-brand-background px-3 py-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })} required />
        </label>
        <div className="space-y-1 text-sm">
          Time slot
          <TimeSlotPicker slots={slots} value={form.time} onChange={(time) => setForm({ ...form, time })} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-lg border border-white/15 bg-brand-background px-3 py-2" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-lg border border-white/15 bg-brand-background px-3 py-2" placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <input type="email" className="w-full rounded-lg border border-white/15 bg-brand-background px-3 py-2" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <textarea className="w-full rounded-lg border border-white/15 bg-brand-background px-3 py-2" placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button type="submit" disabled={!form.time} className="w-full rounded-full bg-brand-accent px-6 py-3 font-semibold text-black disabled:opacity-50">Confirm booking</button>
    </form>
  );
}
