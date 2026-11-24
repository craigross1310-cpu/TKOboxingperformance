/**
 * TKO's regular weekly timetable.
 *
 * Verified from the public TeamUp schedule: this exact pattern ran every week
 * from 28 Sep to 7 Dec 2026. The TKO HYROX Circuit (Tue 07:00) has run weekly
 * since 10 Nov 2026.
 *
 * The Timetable page shows the LIVE TeamUp schedule when it is reachable and
 * falls back to this list otherwise. The home page preview uses this list.
 */

export type RegularSession = {
  day: number; // 0 = Monday … 6 = Sunday
  start: string; // "HH:MM" Europe/London
  end: string;
  classSlug: string;
  coaches: ("gary-tarleton" | "kieran-tarleton")[];
  capacity: number | null;
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const GK: RegularSession["coaches"] = ["gary-tarleton", "kieran-tarleton"];

export const regularTimetable: RegularSession[] = [
  { day: 0, start: "06:00", end: "07:00", classSlug: "pads-class", coaches: GK, capacity: 14 },
  { day: 0, start: "18:00", end: "19:00", classSlug: "beginners-boxing", coaches: GK, capacity: 14 },
  { day: 1, start: "07:00", end: "08:00", classSlug: "tko-hyrox-circuit", coaches: [], capacity: null },
  { day: 1, start: "18:00", end: "19:00", classSlug: "pads-bags-circuits", coaches: [], capacity: 14 },
  { day: 2, start: "06:00", end: "07:00", classSlug: "pads-class", coaches: GK, capacity: 14 },
  { day: 2, start: "18:00", end: "19:00", classSlug: "pads-and-bags", coaches: GK, capacity: 14 },
  { day: 3, start: "06:00", end: "07:00", classSlug: "boxing-strength-conditioning", coaches: [], capacity: 14 },
  { day: 3, start: "18:00", end: "19:00", classSlug: "tko-circuit", coaches: [], capacity: 14 },
  { day: 4, start: "06:00", end: "07:00", classSlug: "pads-class", coaches: GK, capacity: 14 },
  { day: 4, start: "18:00", end: "19:00", classSlug: "beginners-boxing", coaches: GK, capacity: 14 },
  { day: 5, start: "09:00", end: "10:00", classSlug: "pads-and-bags", coaches: ["gary-tarleton"], capacity: 14 },
  { day: 5, start: "11:00", end: "12:00", classSlug: "all-levels-sparring", coaches: GK, capacity: 10 },
  { day: 6, start: "09:00", end: "10:00", classSlug: "all-levels-boxing", coaches: ["gary-tarleton"], capacity: 14 },
];
