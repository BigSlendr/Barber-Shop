import dayjs from "dayjs";
import { activeShop } from "@/config/shops";
import { blockedTimes, existingAppointments, weeklyAvailability } from "@/data/booking";

export const getSlotsForBarber = (barberId: string, date: string, serviceDuration: number): string[] => {
  const targetDay = dayjs(date);
  const availability = weeklyAvailability.find(
    (entry) => entry.barberId === barberId && entry.dayOfWeek === targetDay.day()
  );

  if (!availability) {
    return [];
  }

  const start = dayjs(`${date}T${availability.startTime}`);
  const end = dayjs(`${date}T${availability.endTime}`);
  const slots: string[] = [];

  let cursor = start;
  while (cursor.add(serviceDuration, "minute").isBefore(end) || cursor.add(serviceDuration, "minute").isSame(end)) {
    const slotEnd = cursor.add(serviceDuration, "minute");

    const overlapsBlocked = blockedTimes.some((block) => {
      if (block.barberId !== barberId) return false;
      const blockStart = dayjs(block.startAt);
      const blockEnd = dayjs(block.endAt);
      return cursor.isBefore(blockEnd) && slotEnd.isAfter(blockStart);
    });

    const overlapsAppointment = existingAppointments.some((booking) => {
      if (booking.barberId !== barberId) return false;
      const bookingStart = dayjs(booking.startAt);
      const bookingEnd = dayjs(booking.endAt);
      return cursor.isBefore(bookingEnd) && slotEnd.isAfter(bookingStart);
    });

    if (!overlapsBlocked && !overlapsAppointment) {
      slots.push(cursor.format("HH:mm"));
    }

    cursor = cursor.add(activeShop.booking.slotIntervalMins, "minute");
  }

  return slots;
};
