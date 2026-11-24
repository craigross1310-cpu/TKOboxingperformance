"use client";

import { useId, useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { faqCategories, type Faq, type FaqCategory } from "@/content/faqs";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function Item({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span className="text-lg font-semibold text-white transition-colors group-hover:text-red-bright md:text-xl">
            {faq.q}
            {!faq.verified && site.demoMode && (
              <span className="ml-3 inline-block translate-y-[-2px] border border-amber-400/50 px-1.5 py-0.5 align-middle font-mono text-[0.55rem] uppercase tracking-[0.16em] text-amber-300">
                Draft
              </span>
            )}
          </span>
          <span
            className={cn(
              "mt-1 inline-flex size-8 shrink-0 items-center justify-center border border-line transition-all duration-500",
              open ? "rotate-45 border-red bg-red text-white" : "text-white group-hover:border-white/40",
            )}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pb-7 pr-12 leading-relaxed text-white/75" hidden={!open}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ faqs, searchable = true }: { faqs: Faq[]; searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "All">("All");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (category === "All" || f.category === category) &&
        (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    );
  }, [faqs, query, category]);

  const cats = faqCategories.filter((c) => faqs.some((f) => f.category === c));

  return (
    <div>
      {searchable && (
        <div className="mb-10 flex flex-col gap-5">
          <label className="relative block">
            <span className="sr-only">Search questions</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-steel" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — e.g. gloves, beginners, price"
              className="h-14 w-full border border-line bg-char pl-12 pr-12 text-base text-white placeholder:text-steel focus:border-white/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center text-steel hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </label>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="FAQ categories">
            {(["All", ...cats] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
                  category === c ? "border-white bg-white text-ink" : "border-line text-white/80 hover:border-white/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-line">
        {filtered.map((f) => (
          <Item key={f.id} faq={f} open={openId === f.id} onToggle={() => setOpenId((cur) => (cur === f.id ? null : f.id))} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="border border-dashed border-line p-8 text-center text-steel">
          <p>No questions match “{query}”.</p>
          <p className="mt-2 text-sm">
            Ask us directly:{" "}
            <a href={`mailto:${site.contact.email}`} className="text-white underline underline-offset-4">
              {site.contact.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${site.contact.phoneE164}`} className="text-white underline underline-offset-4">
              {site.contact.phoneDisplay}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
