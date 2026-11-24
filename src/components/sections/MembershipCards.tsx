import { ArrowUpRight, Check } from "lucide-react";
import { memberships, passes, type Plan } from "@/content/memberships";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const featured = plan.highlight === "popular";
  const offer = plan.highlight === "offer";
  return (
    <Reveal delay={i * 100} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col border p-7 md:p-9",
          featured ? "border-white bg-white text-ink" : "border-line bg-char text-white",
        )}
      >
        {plan.badge && (
          <span
            className={cn(
              "absolute -top-3 left-7 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em]",
              offer ? "bg-red text-white" : "bg-ink text-white",
            )}
          >
            {plan.badge}
          </span>
        )}
        <p className={cn("eyebrow", featured ? "text-stone" : "text-steel")}>{plan.tagline}</p>
        <h3 className="display-tight mt-3 text-3xl">{plan.name}</h3>
        <p className="mt-6 flex items-baseline gap-2">
          <span className="display text-7xl">£{plan.price}</span>
          <span className={cn("font-mono text-xs uppercase tracking-[0.16em]", featured ? "text-stone" : "text-steel")}>
            / month
          </span>
        </p>
        <p className={cn("mt-5 text-sm leading-relaxed", featured ? "text-stone" : "text-steel")}>{plan.description}</p>
        <ul className="mt-6 space-y-3 text-sm">
          {plan.includes.map((inc) => (
            <li key={inc} className="flex gap-3">
              <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-red" : "text-red-bright")} /> {inc}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-9">
          <a
            href={plan.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass(featured ? "dark" : offer ? "primary" : "outline", "md", "w-full")}
          >
            Join {plan.name} <ArrowUpRight className="size-4" />
            <span className="sr-only">(opens TeamUp in a new tab)</span>
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function MembershipCards() {
  return (
    <div className="grid gap-6 pt-3 lg:grid-cols-3">
      {memberships.map((p, i) => (
        <PlanCard key={p.id} plan={p} i={i} />
      ))}
    </div>
  );
}

export function PassList({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <ul className={cn("grid border-t sm:grid-cols-3", tone === "light" ? "border-ink/15" : "border-line")}>
      {passes.map((p) => (
        <li
          key={p.id}
          className={cn(
            "flex flex-col border-b py-7 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0",
            tone === "light" ? "border-ink/15" : "border-line",
          )}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className={cn("display-tight text-2xl", tone === "light" ? "text-ink" : "text-white")}>{p.name}</h3>
            <span className={cn("display text-4xl", tone === "light" ? "text-red" : "text-red-bright")}>£{p.price}</span>
          </div>
          <p className={cn("mt-3 text-sm leading-relaxed", tone === "light" ? "text-stone" : "text-steel")}>{p.description}</p>
          <p className={cn("mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em]", tone === "light" ? "text-stone" : "text-steel")}>
            {p.includes.join(" · ")}
          </p>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors",
              tone === "light" ? "text-ink hover:text-red" : "text-white hover:text-red-bright",
            )}
          >
            Buy pass <ArrowUpRight className="size-4" />
            <span className="sr-only">(opens TeamUp in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
