"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Quote } from "lucide-react";
import { coaches, type Coach } from "@/content/coaches";
import { timetableClasses } from "@/content/classes";
import { buttonClass } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { CoachPortrait } from "./CoachPortrait";
import { cn } from "@/lib/cn";

export function CoachGrid({ variant = "full" }: { variant?: "full" | "preview" }) {
  const [active, setActive] = useState<Coach | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {coaches.map((coach, i) => (
          <Reveal key={coach.id} delay={i * 120}>
            <button
              type="button"
              onClick={() => setActive(coach)}
              aria-haspopup="dialog"
              className="group relative block w-full overflow-hidden border border-line bg-char text-left"
            >
              <div className={cn("relative", variant === "full" ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[4/5] sm:aspect-[5/5]")}>
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                  <CoachPortrait coach={coach} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-xs text-white/60">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="eyebrow text-red-bright">{coach.experience} in the sport</p>
                  <h3 className="display mt-3 text-[clamp(2.4rem,5vw,3.8rem)] text-white">{coach.name}</h3>
                  <p className="mt-2 text-sm text-white/75">{coach.role}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white">
                    View profile
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.name ?? "Coach"} labelledBy="coach-title">
        {active && <CoachProfile coach={active} onClose={() => setActive(null)} />}
      </Modal>
    </>
  );
}

function CoachProfile({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  const coached = timetableClasses.filter((c) => c.coaches.includes(coach.id));
  return (
    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-full">
        <CoachPortrait coach={coach} sizes="(min-width: 768px) 20rem, 100vw" />
      </div>
      <div className="p-6 sm:p-8 md:p-10">
        <p className="eyebrow text-red-bright">{coach.role}</p>
        <h2 id="coach-title" className="display mt-3 text-5xl text-white">
          {coach.name}
        </h2>
        <p className="mt-4 text-lg text-white">{coach.headline}</p>
        <div className="mt-5 space-y-4 leading-relaxed text-white/75">
          {coach.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {coach.quote && (
          <blockquote className="mt-6 border-l-2 border-red pl-4 text-white">
            <Quote className="mb-2 size-5 text-red-bright" aria-hidden />
            <p className="italic">“{coach.quote}”</p>
          </blockquote>
        )}

        <h3 className="eyebrow mt-8 text-steel">Credentials</h3>
        <ul className="mt-3 space-y-2">
          {coach.credentials.map((c) => (
            <li key={c} className="flex gap-3 text-sm text-white/85">
              <Award className="mt-0.5 size-4 shrink-0 text-red-bright" /> {c}
            </li>
          ))}
        </ul>

        <h3 className="eyebrow mt-8 text-steel">Specialities</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {coach.specialities.map((s) => (
            <li key={s} className="border border-line px-3 py-1.5 text-xs text-white/85">
              {s}
            </li>
          ))}
        </ul>

        <h3 className="eyebrow mt-8 text-steel">Personal training</h3>
        <p className="mt-3 flex gap-3 text-sm text-white/85">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-red-bright" /> {coach.personalTraining}
        </p>

        {coached.length > 0 && (
          <>
            <h3 className="eyebrow mt-8 text-steel">On the timetable</h3>
            <p className="mt-3 text-sm text-white/85">{coached.map((c) => c.name).join(" · ")}</p>
          </>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/booking?coach=${coach.id}#personal-training`}
            onClick={onClose}
            className={buttonClass("primary", "md", "flex-1")}
          >
            Train with {coach.name.split(" ")[0]}
          </Link>
          <Link href="/timetable" onClick={onClose} className={buttonClass("outline", "md", "flex-1")}>
            See classes
          </Link>
        </div>
      </div>
    </div>
  );
}
