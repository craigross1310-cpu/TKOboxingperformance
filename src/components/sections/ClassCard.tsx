import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { categories, type GymClass } from "@/content/classes";
import { coachLabel } from "@/content/coaches";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

export function CategoryDot({ category, className }: { category: GymClass["category"]; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2 shrink-0 rounded-full", className)}
      style={{ background: categories[category].color }}
    />
  );
}

export function ClassCard({ cls, index, compact }: { cls: GymClass; index?: number; compact?: boolean }) {
  return (
    <Link
      href={`/classes#${cls.slug}`}
      className="group relative flex h-full flex-col overflow-hidden border border-line bg-char transition-colors duration-500 hover:border-white/30"
    >
      <div className={cn("relative overflow-hidden", compact ? "aspect-[4/3]" : "aspect-[4/5]")}>
        <Photo
          media={cls.image}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/20 to-transparent" />
        {index !== undefined && (
          <span className="absolute left-4 top-4 font-mono text-xs text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="absolute right-4 top-4 inline-flex items-center gap-2 bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white backdrop-blur">
          <CategoryDot category={cls.category} />
          {categories[cls.category].short}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="display-tight text-2xl text-white md:text-[1.7rem]">{cls.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-steel">{cls.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> {cls.durationMins} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" /> {cls.level}
          </span>
          <ArrowRight className="size-4 text-red-bright transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        {!compact && (
          <p className="sr-only">Coached by {coachLabel(cls.coaches)}</p>
        )}
      </div>
    </Link>
  );
}
