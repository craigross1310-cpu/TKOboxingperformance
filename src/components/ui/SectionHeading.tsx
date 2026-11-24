import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className, tone = "red" }: { children: ReactNode; className?: string; tone?: "red" | "muted" }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", tone === "red" ? "text-red-bright" : "text-steel", className)}>
      <span aria-hidden className="inline-block h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <Eyebrow className={cn("mb-5", align === "center" && "justify-center")} tone="red">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className={cn("display text-[clamp(2.5rem,7vw,5.5rem)]", tone === "light" ? "text-ink" : "text-white")}>
          {title}
        </h2>
        {intro && (
          <p
            className={cn(
              "mt-6 max-w-2xl text-base leading-relaxed md:text-lg",
              tone === "light" ? "text-stone" : "text-steel",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={150} className="shrink-0">{action}</Reveal>}
    </div>
  );
}
