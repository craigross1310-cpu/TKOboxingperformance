import type { CategoryId } from "@/content/classes";

/**
 * Provider-agnostic schedule model. The UI only ever sees these types, so the
 * booking platform (TeamUp today) can be swapped for another provider by
 * writing a new adapter that returns a `Schedule`.
 */

export type ScheduleSession = {
  id: string;
  classSlug: string | null;
  name: string;
  category: CategoryId;
  dateISO: string | null; // yyyy-mm-dd (Glasgow) — null for the regular weekly pattern
  dayIndex: number; // 0 = Monday
  start: string; // HH:MM
  end: string;
  durationMins: number;
  coachIds: string[];
  coachNames: string[];
  capacity: number | null;
  isFull: boolean;
  cancelled: boolean;
  bookingUrl: string;
};

export type Schedule = {
  source: "live" | "regular";
  provider: string;
  /** Mondays (yyyy-mm-dd) of the weeks covered — empty for the regular pattern. */
  weeks: string[];
  sessions: ScheduleSession[];
  fetchedAt: string | null;
};

export interface BookingProvider {
  name: string;
  getSchedule(fromISO: string, toISO: string): Promise<ScheduleSession[]>;
}
