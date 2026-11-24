"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Info, Target, UserRound, Users } from "lucide-react";
import { categories, type CategoryId, type GymClass, type Level } from "@/content/classes";
import { coachLabel } from "@/content/coaches";
import { DAYS_SHORT, regularTimetable } from "@/content/timetable";
import { site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { CategoryDot } from "@/components/sections/ClassCard";
import { cn } from "@/lib/cn";

const LEVELS: (Level | "Any")[] = ["Any", "Beginner", "All levels", "Intermediate", "Advanced"];

function scheduleFor(slug: string) {
  return regularTimetable
    .filter((s) => s.classSlug === slug)
    .map((s) => `${DAYS_SHORT[s.day]} ${s.start}`);
}

export function ClassExplorer({ classes }: { classes: GymClass[] }) {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [level, setLevel] = useState<Level | "Any">("Any");

  const cats = (Object.keys(categories) as CategoryId[]).filter((c) => classes.some((x) => x.category === c));
  const list = useMemo(
    () => classes.filter((c) => (cat === "all" || c.category === cat) && (level === "Any" || c.level === level)),
    [classes, cat, level],
  );

  return (
    <div>
      <div className="rounded-2xl border border-line bg-char/60 p-3 sm:p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            <FilterChip on={cat === "all"} onClick={() => setCat("all")}>
              All
            </FilterChip>
            {cats.map((c) => (
              <FilterChip key={c} on={cat === c} onClick={() => setCat(c)}>
                <CategoryDot category={c} /> {categories[c].short}
              </FilterChip>
            ))}
          </div>
          <label className="flex items-center gap-3 border-t border-line pt-4 md:border-t-0 md:pt-0">
            <span className="eyebrow text-steel">Level</span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level | "Any")}
              className="h-10 flex-1 rounded-full border border-line bg-ink px-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white md:flex-none"
            >
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "class" : "classes"}
      </p>

      {list.length === 0 ? (
        <div className="mt-8 border border-dashed border-line p-10 text-center text-steel">
          <p>No classes match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setCat("all");
              setLevel("Any");
            }}
            className={buttonClass("outline", "sm", "mt-5")}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {list.map((cls, i) => (
            <ClassRow key={cls.slug} cls={cls} flip={i % 2 === 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
        on ? "border-white bg-white text-ink" : "border-line text-white/80 hover:border-white/40",
      )}
    >
      {children}
    </button>
  );
}

function ClassRow({ cls, flip }: { cls: GymClass; flip: boolean }) {
  const times = scheduleFor(cls.slug);
  return (
    <article id={cls.slug} className="scroll-mt-28 grid overflow-hidden border border-line bg-char md:grid-cols-5">
      <div className={cn("relative min-h-[16rem] md:col-span-2", flip && "md:order-2")}>
        <Photo media={cls.image} sizes="(min-width: 768px) 40vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-char/70 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-ink/75 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white backdrop-blur">
          <CategoryDot category={cls.category} /> {categories[cls.category].label}
        </span>
      </div>
      <div className="flex flex-col p-6 md:col-span-3 md:p-10">
        <h2 className="display-tight text-[clamp(2rem,4vw,3rem)] text-white">{cls.name}</h2>
        <p className="mt-2 text-lg text-red-bright">{cls.summary}</p>
        <p className="mt-5 leading-relaxed text-white/75">{cls.description}</p>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 text-sm lg:grid-cols-4">
          <Meta icon={<Users className="size-4" />} label="Level" value={cls.level} />
          <Meta icon={<Clock className="size-4" />} label="Duration" value={`${cls.durationMins} min`} />
          <Meta
            icon={<UserRound className="size-4" />}
            label="Ages"
            value={cls.maxAge ? `${cls.minAge}–${cls.maxAge}` : cls.minAge ? `${cls.minAge}+` : "Adults"}
          />
          <Meta icon={<Target className="size-4" />} label="Coach" value={coachLabel(cls.coaches)} />
        </dl>

        <div className="mt-6">
          <p className="eyebrow text-steel">Training focus</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cls.focus.map((f) => (
              <li key={f} className="border border-line px-3 py-1.5 text-xs text-white/85">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5 text-sm text-white/75">
          <span className="text-steel">Suitable for: </span>
          {cls.suitableFor}
        </p>
        {cls.bring && (
          <p className="mt-2 flex gap-2 text-sm text-white/75">
            <Info className="mt-0.5 size-4 shrink-0 text-red-bright" /> Bring: {cls.bring}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white">
            {cls.onTimetable ? (
              <>
                <span className="text-steel">Weekly: </span>
                {times.join(" · ")}
              </>
            ) : (
              <span className="text-amber-300">Not on this week’s timetable — ask about dates</span>
            )}
          </p>
          {cls.onTimetable ? (
            <Link href={`/timetable`} className={buttonClass("primary", "md")}>
              Book this class <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link href={`/contact?topic=${cls.category === "kids" ? "kids" : "general"}`} className={buttonClass("outline", "md")}>
              Register interest
            </Link>
          )}
        </div>
        {cls.passNote && <p className="mt-3 text-xs text-steel">{cls.passNote}</p>}
        <p className="sr-only">Book via {site.booking.platform}.</p>
      </div>
    </article>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel">
        {icon} {label}
      </dt>
      <dd className="mt-1.5 text-white">{value}</dd>
    </div>
  );
}
