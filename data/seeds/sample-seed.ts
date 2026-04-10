import type { BlockedTime, ExistingAppointment, WeeklyAvailability } from "@/data/booking";

export type ShopSeedDataset = {
  weeklyAvailability: WeeklyAvailability[];
  blockedTimes: BlockedTime[];
  existingAppointments: ExistingAppointment[];
};

export const sampleSeedDataset: ShopSeedDataset = {
  weeklyAvailability: [
    { barberId: "barber-1", dayOfWeek: 1, startTime: "10:00", endTime: "19:00" },
    { barberId: "barber-1", dayOfWeek: 2, startTime: "10:00", endTime: "19:00" },
    { barberId: "barber-1", dayOfWeek: 3, startTime: "11:00", endTime: "20:00" },
    { barberId: "barber-2", dayOfWeek: 4, startTime: "10:00", endTime: "19:00" },
    { barberId: "barber-2", dayOfWeek: 5, startTime: "09:00", endTime: "18:00" },
    { barberId: "barber-2", dayOfWeek: 6, startTime: "09:00", endTime: "16:00" }
  ],
  blockedTimes: [
    {
      barberId: "barber-1",
      startAt: "2026-04-13T14:00:00-05:00",
      endAt: "2026-04-13T16:00:00-05:00",
      reason: "Training"
    }
  ],
  existingAppointments: [
    {
      barberId: "barber-1",
      serviceId: "classic-cut",
      startAt: "2026-04-14T12:00:00-05:00",
      endAt: "2026-04-14T12:45:00-05:00"
    }
  ]
};
