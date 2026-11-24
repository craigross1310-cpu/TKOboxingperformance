"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, Clock, Info, RotateCcw, User, Users } from "lucide-react";
import { categories, getClass, type CategoryId } from "@/content/classes";
import { coaches } from "@/content/coaches";
import { site } from "@/content/site";
import { DAYS, DAYS_SHORT } from "@/content/timetable";
import type { Schedule, ScheduleSession } from "@/lib/booking/types";
import { addDaysISO, formatShortDate, formatTime12, londonParts } from "@/lib/time";
import { buttonClass } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Photo } from "@/components/ui/Photo";
import { CategoryDot } from "@/components/sections/ClassCard";
import { cn } from "@/lib/cn";

const noop = () => () => {};
const useNow = () =>
  useSyncExternalStore(
    noop,
    () => {
      const p = londonParts(new Date());
      return `${p.dateISO}|${p.time}|${p.dayIndex}`;
    },
    () => null,
  );

function coachText(s: ScheduleSession) {
  return s.coachNames.length ? s.coachNames.map((n) => n.split(" ")[0]).join(" & ") : "TKO coaching team";
}

export function Timetable({ schedule }: { schedule: Schedule }) {
  const live = schedule.source === "live";
  const now = useNow();
  const [todayISO, nowTime, todayIdxStr] = now ? now.split("|") : [null, null, null];
  const todayIdx = todayIdxStr ? Number(todayIdxStr) : null;

  const [week, setWeek] = useState(0);
  const [pickedDay, setPickedDay] = useState<number | null>(null);
  const [cats, setCats] = useState<CategoryId[]>([]);
  const [coach, setCoach] = useState<string>("all");
  const [active, setActive] = useState<ScheduleSession | null>(null);

  const selectedDay = pickedDay ?? (week === 0 && todayIdx !== null ? todayIdx : 0);
  const weekStart = live ? schedule.weeks[week] : null;

  const presentCats = useMemo(
    () => (Object.keys(categories) as CategoryId[]).filter((c) => schedule.sessions.some((s) => s.category === c)),
    [schedule.sessions],
  );

  const weekSessions = useMemo(() => {
    return schedule.sessions.filter((s) => {
      if (weekStart && s.dateISO) {
        if (s.dateISO < weekStart || s.dateISO >= addDaysISO(weekStart, 7)) return false;
      }
      if (cats.length && !cats.includes(s.category)) return false;
      if (coach !== "all" && !s.coachIds.includes(coach)) return false;
      return true;
    });
  }, [schedule.sessions, weekStart, cats, coach]);

  const byDay = useMemo(() => {
    const days: ScheduleSession[][] = Array.from({ length: 7 }, () => []);
    for (const s of weekSessions) days[s.dayIndex].push(s);
    days.forEach((d) => d.sort((a, b) => a.start.localeCompare(b.start)));
    return days;
  }, [weekSessions]);

  const filtersActive = cats.length > 0 || coach !== "all";
  const resetFilters = () => {
    setCats([]);
    setCoach("all");
  };
  const toggleCat = (c: CategoryId) => setCats((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  const isPast = useCallback(
    (s: ScheduleSession) => Boolean(todayISO && s.dateISO && (s.dateISO < todayISO || (s.dateISO === todayISO && nowTime && s.end <= nowTime))),
    [todayISO, nowTime],
  );

  const dateFor = (day: number) => (weekStart ? addDaysISO(weekStart, day) : null);
  const isToday = (day: number) => (live ? dateFor(day) === todayISO : week === 0 && day === todayIdx);

  return (
    <div>
      {/* Source notice */}
      <div className="mb-8 flex flex-col gap-3 border border-line bg-char/60 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-3 text-white/80">
          <span className="relative mt-1.5 flex size-2.5 shrink-0">
            {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
            <span className={cn("relative inline-flex size-2.5 rounded-full", live ? "bg-emerald-400" : "bg-amber-400")} />
          </span>
          {live ? (
            <span>
              <strong className="text-white">Live timetable</strong> — synced with TKO’s {schedule.provider} booking
              system. Booking opens {site.booking.opensDaysBefore} days before each class.
            </span>
          ) : (
            <span>
              <strong className="text-white">Regular weekly timetable.</strong> Live times couldn’t be loaded just now —
              tap Book to see real-time availability on {schedule.provider}.
            </span>
          )}
        </p>
        <a
          href={site.booking.schedule}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-steel hover:text-white"
        >
          Open in {schedule.provider} <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {live && (
          <div role="group" aria-label="Choose week" className="inline-flex border border-line p-1">
            {schedule.weeks.map((w, i) => (
              <button
                key={w}
                type="button"
                aria-pressed={week === i}
                onClick={() => {
                  setWeek(i);
                  setPickedDay(i === 0 ? null : 0);
                }}
                className={cn(
                  "px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors",
                  week === i ? "bg-white text-ink" : "text-steel hover:text-white",
                )}
              >
                {i === 0 ? "This week" : "Next week"}
                <span className="ml-2 hidden opacity-60 sm:inline">
                  {formatShortDate(w)} – {formatShortDate(addDaysISO(w, 6))}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-steel">Filter</span>
          {presentCats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cats.includes(c)}
              onClick={() => toggleCat(c)}
              className={cn(
                "inline-flex items-center gap-2 border px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition-colors",
                cats.includes(c) ? "border-white bg-white text-ink" : "border-line text-white/80 hover:border-white/40",
              )}
            >
              <CategoryDot category={c} />
              {categories[c].short}
            </button>
          ))}
          <label className="relative">
            <span className="sr-only">Filter by coach</span>
            <select
              value={coach}
              onChange={(e) => setCoach(e.target.value)}
              className="h-[34px] appearance-none border border-line bg-ink pl-3 pr-8 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/85 hover:border-white/40"
            >
              <option value="all">All coaches</option>
              {coaches.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <User className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-steel" />
          </label>
          {filtersActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-2 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-red-bright hover:text-white"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Day tabs (mobile & tablet) */}
      <div role="tablist" aria-label="Day" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 lg:hidden">
        {DAYS_SHORT.map((d, i) => {
          const date = dateFor(i);
          const count = byDay[i].length;
          return (
            <button
              key={d}
              role="tab"
              type="button"
              aria-selected={selectedDay === i}
              onClick={() => setPickedDay(i)}
              className={cn(
                "flex min-w-[4.25rem] flex-col items-center gap-1 border px-3 py-3 transition-colors",
                selectedDay === i ? "border-red bg-red text-white" : "border-line text-white/80",
              )}
            >
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em]">{d}</span>
              <span className="display-tight text-xl">{date ? date.slice(8) : count}</span>
              <span className={cn("h-1 w-1 rounded-full", isToday(i) ? "bg-white" : "bg-transparent")} aria-hidden />
              {isToday(i) && <span className="sr-only">(today)</span>}
            </button>
          );
        })}
      </div>

      {/* Mobile day list */}
      <div className="mt-6 lg:hidden" role="tabpanel" aria-label={DAYS[selectedDay]}>
        <h3 className="display-tight mb-4 text-3xl text-white">
          {DAYS[selectedDay]}
          {dateFor(selectedDay) && <span className="ml-3 text-lg text-steel">{formatShortDate(dateFor(selectedDay)!)}</span>}
        </h3>
        <DayList
          sessions={byDay[selectedDay]}
          onOpen={setActive}
          isPast={isPast}
          empty={<EmptyDay day={DAYS[selectedDay]} filtered={filtersActive} onReset={resetFilters} />}
        />
      </div>

      {/* Desktop week grid */}
      <div className="mt-8 hidden grid-cols-7 gap-px border border-line bg-line lg:grid">
        {DAYS.map((day, i) => (
          <div key={day} className={cn("flex min-h-[22rem] flex-col bg-ink", isToday(i) && "bg-char")}>
            <div className={cn("border-b border-line px-3 py-4", isToday(i) && "border-b-red")}>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel">
                {isToday(i) ? <span className="text-red-bright">Today</span> : DAYS_SHORT[i]}
              </p>
              <p className="display-tight mt-1 text-xl text-white">
                {dateFor(i) ? formatShortDate(dateFor(i)!) : day}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-2">
              {byDay[i].length ? (
                byDay[i].map((s) => <SessionTile key={s.id} s={s} onOpen={setActive} past={isPast(s)} />)
              ) : (
                <p className="m-auto px-2 text-center text-xs text-steel/70">{filtersActive ? "No matching classes" : "Open gym"}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtersActive && weekSessions.length === 0 && (
        <div className="mt-6 hidden lg:block">
          <EmptyDay day="this week" filtered onReset={resetFilters} />
        </div>
      )}

      <SessionDrawer session={active} onClose={() => setActive(null)} past={active ? isPast(active) : false} />
    </div>
  );
}

function SessionTile({ s, onOpen, past }: { s: ScheduleSession; onOpen: (s: ScheduleSession) => void; past: boolean }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(s)}
      className={cn(
        "group relative w-full border border-line bg-char/80 p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-graphite",
        (past || s.cancelled) && "opacity-45",
      )}
      style={{ boxShadow: `inset 3px 0 0 ${categories[s.category].color}` }}
    >
      <p className="font-mono text-[0.7rem] text-white">
        {s.start}
        <span className="text-steel">–{s.end}</span>
      </p>
      <p className="mt-1.5 text-[0.82rem] font-semibold leading-snug text-white">{s.name}</p>
      <p className="mt-1 text-[0.7rem] text-steel">{coachText(s)}</p>
      {(s.isFull || s.cancelled || past) && (
        <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-amber-300">
          {s.cancelled ? "Cancelled" : past ? "Finished" : "Full · waitlist"}
        </p>
      )}
    </button>
  );
}

function DayList({
  sessions,
  onOpen,
  isPast,
  empty,
}: {
  sessions: ScheduleSession[];
  onOpen: (s: ScheduleSession) => void;
  isPast: (s: ScheduleSession) => boolean;
  empty: React.ReactNode;
}) {
  if (!sessions.length) return <>{empty}</>;
  return (
    <ul className="flex flex-col gap-3">
      {sessions.map((s) => {
        const past = isPast(s);
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onOpen(s)}
              className={cn(
                "flex w-full items-stretch gap-4 border border-line bg-char p-4 text-left transition-colors active:bg-graphite",
                (past || s.cancelled) && "opacity-50",
              )}
              style={{ boxShadow: `inset 3px 0 0 ${categories[s.category].color}` }}
            >
              <div className="flex w-16 shrink-0 flex-col justify-center">
                <span className="display-tight text-2xl text-white">{s.start}</span>
                <span className="font-mono text-[0.65rem] text-steel">{s.durationMins} min</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{s.name}</p>
                <p className="mt-1 text-sm text-steel">{coachText(s)}</p>
                <p className="mt-2 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/70">
                  <CategoryDot category={s.category} /> {categories[s.category].short}
                  {s.isFull && !past && <span className="text-amber-300">· Full</span>}
                  {s.cancelled && <span className="text-amber-300">· Cancelled</span>}
                  {past && <span className="text-steel">· Finished</span>}
                </p>
              </div>
              <span className="self-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-red-bright">
                {past || s.cancelled ? "Info" : "Book"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyDay({ day, filtered, onReset }: { day: string; filtered: boolean; onReset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4 border border-dashed border-line p-6 text-sm text-steel">
      <CalendarClock className="size-6 text-white/60" />
      {filtered ? (
        <>
          <p>No classes match your filters on {day}.</p>
          <button type="button" onClick={onReset} className={buttonClass("outline", "sm")}>
            Clear filters
          </button>
        </>
      ) : (
        <p>
          No group classes on {day} — the gym floor is open for members during opening hours. Fancy 1:1 coaching?{" "}
          <Link href="/booking#personal-training" className="text-white underline underline-offset-4">
            Enquire about PT
          </Link>
          .
        </p>
      )}
    </div>
  );
}

function SessionDrawer({ session, onClose, past }: { session: ScheduleSession | null; onClose: () => void; past: boolean }) {
  const cls = session?.classSlug ? getClass(session.classSlug) : undefined;
  return (
    <Modal open={Boolean(session)} onClose={onClose} title={session?.name ?? "Class"} variant="drawer" labelledBy="session-title">
      {session && (
        <div>
          {cls && (
            <div className="relative aspect-[16/9] w-full">
              <Photo media={cls.image} sizes="(min-width: 640px) 36rem, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent" />
            </div>
          )}
          <div className="p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/70">
              <CategoryDot category={session.category} /> {categories[session.category].label}
            </p>
            <h2 id="session-title" className="display-tight mt-3 text-4xl text-white">
              {session.name}
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line text-sm">
              <div className="bg-coal p-4">
                <dt className="eyebrow text-steel">When</dt>
                <dd className="mt-1.5 text-white">
                  {DAYS[session.dayIndex]}
                  {session.dateISO && `, ${formatShortDate(session.dateISO)}`}
                  <br />
                  {formatTime12(session.start)} – {formatTime12(session.end)}
                </dd>
              </div>
              <div className="bg-coal p-4">
                <dt className="eyebrow text-steel">Coach</dt>
                <dd className="mt-1.5 text-white">{session.coachNames.join(" & ") || "TKO coaching team"}</dd>
              </div>
              <div className="bg-coal p-4">
                <dt className="eyebrow text-steel">Duration</dt>
                <dd className="mt-1.5 flex items-center gap-2 text-white">
                  <Clock className="size-4 text-steel" /> {session.durationMins} minutes
                </dd>
              </div>
              <div className="bg-coal p-4">
                <dt className="eyebrow text-steel">Level</dt>
                <dd className="mt-1.5 flex items-center gap-2 text-white">
                  <Users className="size-4 text-steel" /> {cls?.level ?? "All levels"}
                  {session.capacity ? <span className="text-steel">· max {session.capacity}</span> : null}
                </dd>
              </div>
            </dl>

            {cls && <p className="mt-6 leading-relaxed text-white/80">{cls.description}</p>}
            {cls?.bring && (
              <p className="mt-4 flex gap-2 text-sm text-white/80">
                <Info className="mt-0.5 size-4 shrink-0 text-red-bright" /> Bring: {cls.bring}
              </p>
            )}
            {cls?.passNote && <p className="mt-2 text-sm text-steel">{cls.passNote}</p>}

            <div className="mt-8 flex flex-col gap-3">
              {session.cancelled || past ? (
                <p className="border border-line p-4 text-sm text-steel">
                  {session.cancelled ? "This session has been cancelled." : "This session has finished."} Check another day
                  on the timetable.
                </p>
              ) : (
                <a
                  href={session.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("primary", "lg", "w-full")}
                >
                  {session.isFull ? "Join the waitlist" : "Book this class"} <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens TeamUp in a new tab)</span>
                </a>
              )}
              {cls && (
                <Link href={`/classes#${cls.slug}`} onClick={onClose} className={buttonClass("outline", "md", "w-full")}>
                  About this class
                </Link>
              )}
              <p className="text-center text-xs text-steel">
                Secure booking &amp; payment via TeamUp. No account? You can create one in seconds. Need a pass?{" "}
                <Link href="/membership" onClick={onClose} className="text-white underline underline-offset-4">
                  From £10
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
