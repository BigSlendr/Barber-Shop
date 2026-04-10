"use client";

type Props = {
  slots: string[];
  value?: string;
  onChange: (value: string) => void;
};

export function TimeSlotPicker({ slots, value, onChange }: Props) {
  if (!slots.length) {
    return <p className="text-sm text-brand-muted">No available slots for this date.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => onChange(slot)}
          className={`rounded-lg border px-3 py-2 text-sm ${value === slot ? "border-brand-accent bg-brand-accent/10" : "border-white/15"}`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
