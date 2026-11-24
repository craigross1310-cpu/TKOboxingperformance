export const TZ = "Europe/London";

const partsFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
  hour12: false,
});

const WEEKDAY_INDEX: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

/** Date/time parts of an instant, as seen on a wall clock in Glasgow. */
export function londonParts(date: Date) {
  const p = Object.fromEntries(partsFmt.formatToParts(date).map((x) => [x.type, x.value]));
  const hour = p.hour === "24" ? "00" : p.hour;
  return {
    dateISO: `${p.year}-${p.month}-${p.day}`,
    time: `${hour}:${p.minute}`,
    dayIndex: WEEKDAY_INDEX[p.weekday as string] ?? 0,
  };
}

/** Adds days to a yyyy-mm-dd string (calendar arithmetic, no timezone drift). */
export function addDaysISO(dateISO: string, days: number) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

/** Monday (yyyy-mm-dd) of the Glasgow-local week containing `date`. */
export function mondayOf(date: Date) {
  const { dateISO, dayIndex } = londonParts(date);
  return addDaysISO(dateISO, -dayIndex);
}

export function minutesBetween(a: string, b: string) {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return bh * 60 + bm - (ah * 60 + am);
}

/** "18:00" → "6:00pm" */
export function formatTime12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""}${suffix}`;
}

/** "2026-11-24" → "24 Nov" */
export function formatShortDate(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
