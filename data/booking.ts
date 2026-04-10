import { masterShopConfig } from "@/config/master-shop";
import { sampleSeedDataset } from "@/data/seeds/sample-seed";

export type WeeklyAvailability = {
  barberId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type BlockedTime = {
  barberId: string;
  startAt: string;
  endAt: string;
  reason?: string;
};

export type ExistingAppointment = {
  barberId: string;
  serviceId: string;
  startAt: string;
  endAt: string;
};

const seedDatasets = {
  "sample-seed-v1": sampleSeedDataset
};

const activeSeedDataset = seedDatasets[masterShopConfig.seedDatasetId as keyof typeof seedDatasets] ?? sampleSeedDataset;

export const weeklyAvailability = activeSeedDataset.weeklyAvailability;
export const blockedTimes = activeSeedDataset.blockedTimes;
export const existingAppointments = activeSeedDataset.existingAppointments;
