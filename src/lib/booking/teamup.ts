import { getClassByOfferingType } from "@/content/classes";
import { coaches } from "@/content/coaches";
import { TEAMUP_PROVIDER_ID } from "@/content/site";
import { londonParts, minutesBetween } from "@/lib/time";
import type { BookingProvider, ScheduleSession } from "./types";

/**
 * TeamUp adapter.
 *
 * Reads the gym's PUBLIC class schedule from TeamUp's v2 API in "customer"
 * mode — the same anonymous request TeamUp's own public schedule page makes.
 * No credentials are required or used. Booking itself always happens on
 * TeamUp (secure checkout, waivers, payments).
 *
 * If TKO later issues an API token from TeamUp, set TEAMUP_API_TOKEN and it
 * will be sent automatically.
 */

const API = "https://goteamup.com/api/v2";

type TeamUpEvent = {
  id: number;
  name: string;
  starts_at: string;
  ends_at: string;
  status: string;
  max_occupancy: number | null;
  is_full: boolean;
  customer_url: string;
  offering_type: number | { id: number };
  instructors: { id: number; name: string }[] | string;
};

type Page = { next: string | null; results: TeamUpEvent[] };

function headers(): HeadersInit {
  const h: Record<string, string> = {
    "Teamup-Request-Mode": "customer",
    "Teamup-Provider-ID": TEAMUP_PROVIDER_ID,
    Accept: "application/json",
  };
  if (process.env.TEAMUP_API_TOKEN) h.Authorization = `Token ${process.env.TEAMUP_API_TOKEN}`;
  return h;
}

function mapEvent(e: TeamUpEvent): ScheduleSession {
  const start = londonParts(new Date(e.starts_at));
  const end = londonParts(new Date(e.ends_at));
  const offeringId = typeof e.offering_type === "number" ? e.offering_type : e.offering_type?.id;
  const cls = getClassByOfferingType(offeringId);
  const instructorNames = Array.isArray(e.instructors) ? e.instructors.map((i) => i.name) : [];
  const coachIds = instructorNames
    .map((n) => coaches.find((c) => c.name.toLowerCase() === n.toLowerCase())?.id)
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return {
    id: String(e.id),
    classSlug: cls?.slug ?? null,
    name: cls?.name ?? e.name,
    category: cls?.category ?? "conditioning",
    dateISO: start.dateISO,
    dayIndex: start.dayIndex,
    start: start.time,
    end: end.time,
    durationMins: minutesBetween(start.time, end.time) || cls?.durationMins || 60,
    coachIds,
    coachNames: instructorNames,
    capacity: e.max_occupancy,
    isFull: Boolean(e.is_full),
    cancelled: e.status !== "active",
    bookingUrl: new URL(e.customer_url, "https://goteamup.com").toString(),
  };
}

export const teamUp: BookingProvider = {
  name: "TeamUp",
  async getSchedule(fromISO, toISO) {
    const params = new URLSearchParams({
      provider: TEAMUP_PROVIDER_ID,
      page_size: "100",
      starts_at_gte: fromISO,
      starts_at_lte: toISO,
      expand: "instructors",
    });
    let url: string | null = `${API}/events?${params}`;
    const events: TeamUpEvent[] = [];

    for (let page = 0; url && page < 5; page++) {
      const res: Response = await fetch(url, { headers: headers(), signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`TeamUp responded ${res.status}`);
      const data = (await res.json()) as Page;
      events.push(...data.results);
      url = data.next;
    }

    return events
      .map(mapEvent)
      .filter((s) => s.dateISO! >= fromISO && s.dateISO! < toISO)
      .sort((a, b) => `${a.dateISO}${a.start}`.localeCompare(`${b.dateISO}${b.start}`));
  },
};
