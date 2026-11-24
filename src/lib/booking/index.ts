import { cacheLife } from "next/cache";
import { getClass } from "@/content/classes";
import { getCoach } from "@/content/coaches";
import { site } from "@/content/site";
import { regularTimetable } from "@/content/timetable";
import { addDaysISO, minutesBetween, mondayOf } from "@/lib/time";
import { teamUp } from "./teamup";
import type { Schedule, ScheduleSession } from "./types";

export type { Schedule, ScheduleSession } from "./types";

/** The verified weekly pattern, shaped like a live schedule (no dates). */
export function regularSessions(): ScheduleSession[] {
  return regularTimetable.map((r, i) => {
    const cls = getClass(r.classSlug)!;
    return {
      id: `regular-${i}`,
      classSlug: cls.slug,
      name: cls.name,
      category: cls.category,
      dateISO: null,
      dayIndex: r.day,
      start: r.start,
      end: r.end,
      durationMins: minutesBetween(r.start, r.end),
      coachIds: r.coaches,
      coachNames: r.coaches.map((id) => getCoach(id)!.name),
      capacity: r.capacity,
      isFull: false,
      cancelled: false,
      bookingUrl: site.booking.schedule,
    };
  });
}

/**
 * This week + next week from the live booking system, cached for 15 minutes.
 * Falls back to the verified regular timetable if the provider is unreachable.
 */
export async function getSchedule(): Promise<Schedule> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 900, expire: 86400 });

  const monday = mondayOf(new Date());
  const weeks = [monday, addDaysISO(monday, 7)];

  try {
    const sessions = await teamUp.getSchedule(monday, addDaysISO(monday, 14));
    if (sessions.length === 0) throw new Error("No sessions returned");
    return { source: "live", provider: teamUp.name, weeks, sessions, fetchedAt: new Date().toISOString() };
  } catch (err) {
    console.warn("[schedule] Falling back to regular timetable:", (err as Error).message);
    return { source: "regular", provider: teamUp.name, weeks: [], sessions: regularSessions(), fetchedAt: null };
  }
}
