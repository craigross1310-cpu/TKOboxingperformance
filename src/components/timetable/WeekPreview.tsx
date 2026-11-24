import Link from "next/link";
import { categories, getClass } from "@/content/classes";
import { coachLabel } from "@/content/coaches";
import { DAYS_SHORT, regularTimetable } from "@/content/timetable";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryDot } from "@/components/sections/ClassCard";

/** Compact, static view of the regular week for the home page. */
export function WeekPreview() {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-7">
      {DAYS_SHORT.map((d, day) => {
        const sessions = regularTimetable.filter((s) => s.day === day);
        return (
          <Reveal key={d} delay={day * 60} className="bg-ink">
            <div className="flex h-full flex-col p-4">
              <p className="display-tight text-2xl text-white">{d}</p>
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {sessions.map((s) => {
                  const cls = getClass(s.classSlug)!;
                  return (
                    <li key={s.start + s.classSlug}>
                      <Link
                        href={`/classes#${cls.slug}`}
                        className="group block border-l-2 py-1 pl-3 transition-colors hover:bg-char"
                        style={{ borderColor: categories[cls.category].color }}
                      >
                        <span className="font-mono text-xs text-steel">{s.start}</span>
                        <span className="mt-0.5 block text-sm font-semibold leading-snug text-white group-hover:text-red-bright">
                          {cls.name}
                        </span>
                        <span className="block text-xs text-steel">{coachLabel(s.coaches)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function CategoryLegend() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {(["boxing", "sparring", "strength", "conditioning"] as const).map((c) => (
        <li key={c} className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel">
          <CategoryDot category={c} /> {categories[c].label}
        </li>
      ))}
    </ul>
  );
}
