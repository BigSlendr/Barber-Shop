"use client";

type Props = {
  slots: string[];
  value?: string;
  onChange: (value: string) => void;
};

export function TimeSlotPicker({ slots, value, onChange }: Props) {
  if (!slots.length) {
    return <p className="rounded-xl border border-white/10 bg-brand-background/70 px-3 py-2 text-sm text-brand-muted">No available slots for this date.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => onChange(slot)}
          className={`rounded-xl border px-3 py-2 text-sm transition ${
            value === slot
              ? "border-brand-accent bg-brand-accent/15 text-white"
              : "border-white/15 bg-brand-background/60 hover:border-white/35"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
