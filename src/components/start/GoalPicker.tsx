"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getClass } from "@/content/classes";
import { DAYS_SHORT, regularTimetable } from "@/content/timetable";
import { Photo } from "@/components/ui/Photo";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Goal = {
  id: string;
  label: string;
  recommend: string[]; // class slugs
  note: string;
  cta?: { label: string; href: string };
};

const goals: Goal[] = [
  {
    id: "learn",
    label: "Learn to box from scratch",
    recommend: ["beginners-boxing", "all-levels-boxing"],
    note: "Beginners Boxing covers stance, footwork, punch technique and simple combos at your own pace. All Levels Boxing on Sunday is a great second session.",
  },
  {
    id: "fit",
    label: "Get fit & burn calories",
    recommend: ["pads-class", "tko-circuit", "tko-hyrox-circuit"],
    note: "Pads Class and the circuits are high-energy, all-levels sessions — coaches scale everything to you.",
  },
  {
    id: "strong",
    label: "Get stronger & more athletic",
    recommend: ["boxing-strength-conditioning", "pads-bags-circuits"],
    note: "Boxing S&C builds full-body power with barbells and explosive lifts. Pads, Bags & Circuits mixes skill and strength.",
  },
  {
    id: "experienced",
    label: "I’ve boxed before",
    recommend: ["pads-and-bags", "all-levels-sparring"],
    note: "Sharpen up with Pads & Bags, then put it together at Saturday sparring (bring gloves & wraps).",
  },
  {
    id: "kids",
    label: "Classes for my child",
    recommend: ["kids-7-10", "kids-11-15"],
    note: "TKO has run kids’ boxing for ages 7–10 and 11–15. Get in touch to ask about the next available dates.",
    cta: { label: "Ask about kids classes", href: "/contact?topic=kids" },
  },
  {
    id: "pt",
    label: "One-to-one coaching",
    recommend: [],
    note: "Gary offers 1:1 and 1:2; Kieran offers 1-1, 2-1 and small group. Tell us your goals and we’ll match you.",
    cta: { label: "Enquire about PT", href: "/booking#personal-training" },
  },
];

export function GoalPicker() {
  const [goal, setGoal] = useState<Goal>(goals[0]);
  const recs = goal.recommend.map((s) => getClass(s)!).filter(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div role="radiogroup" aria-label="What brings you to TKO?" className="flex flex-col gap-2 lg:col-span-5">
        {goals.map((g, i) => (
          <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={goal.id === g.id}
            onClick={() => setGoal(g)}
            className={cn(
              "group flex items-center justify-between gap-4 border px-5 py-4 text-left transition-colors",
              goal.id === g.id ? "border-red bg-red text-white" : "border-line text-white/85 hover:border-white/40",
            )}
          >
            <span className="flex items-center gap-4">
              <span className="font-mono text-xs opacity-60">0{i + 1}</span>
              <span className="text-lg font-semibold">{g.label}</span>
            </span>
            <ArrowRight className={cn("size-4 transition-transform", goal.id === g.id ? "translate-x-0" : "-translate-x-1 opacity-40")} />
          </button>
        ))}
      </div>

      <div aria-live="polite" className="border border-line bg-char p-6 md:p-8 lg:col-span-7">
        <p className="eyebrow text-red-bright">We recommend</p>
        <p className="mt-4 text-lg leading-relaxed text-white/85">{goal.note}</p>
        {recs.length > 0 && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {recs.map((c) => {
              const times = regularTimetable.filter((r) => r.classSlug === c.slug).map((r) => `${DAYS_SHORT[r.day]} ${r.start}`);
              return (
                <li key={c.slug}>
                  <Link href={`/classes#${c.slug}`} className="group flex h-full flex-col overflow-hidden border border-line bg-ink transition-colors hover:border-white/40">
                    <div className="relative aspect-[16/9]">
                      <Photo media={c.image} sizes="(min-width: 1024px) 20vw, 50vw" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="display-tight text-xl text-white">{c.name}</p>
                      <p className="mt-1 text-sm text-steel">{c.level}</p>
                      <p className="mt-auto pt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/80">
                        {times.length ? times.join(" · ") : "Ask about dates"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {goal.cta ? (
            <Link href={goal.cta.href} className={buttonClass("primary", "md")}>
              {goal.cta.label} <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link href="/timetable" className={buttonClass("primary", "md")}>
              Find a time <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
