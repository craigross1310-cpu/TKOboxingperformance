"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, MonitorSmartphone } from "lucide-react";
import { site } from "@/content/site";
import { Button, buttonClass } from "@/components/ui/Button";

/**
 * Embeds TKO's TeamUp booking pages (schedule / memberships) in-page.
 * Loaded only on request so the third-party app never slows the site down.
 */
export function TeamUpEmbed() {
  const [view, setView] = useState<null | "schedule" | "memberships">(null);
  const [loading, setLoading] = useState(false);

  const src = view === "memberships" ? site.booking.memberships : site.booking.schedule;

  if (!view) {
    return (
      <div className="flex flex-col items-start gap-6 border border-line bg-char p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex gap-5">
          <MonitorSmartphone className="size-10 shrink-0 text-red-bright" aria-hidden />
          <div>
            <h3 className="display-tight text-2xl text-white">Book without leaving the site</h3>
            <p className="mt-2 max-w-xl text-sm text-steel">
              Open TKO’s booking system right here to log in, buy a pass and reserve your spot.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            variant="primary"
            onClick={() => {
              setLoading(true);
              setView("schedule");
            }}
          >
            Open class booking
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setLoading(true);
              setView("memberships");
            }}
          >
            Buy a pass
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-char px-4 py-3">
        <div role="group" aria-label="Booking view" className="flex gap-1">
          {(["schedule", "memberships"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => {
                if (v !== view) {
                  setLoading(true);
                  setView(v);
                }
              }}
              className={`px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] ${view === v ? "bg-white text-ink" : "text-steel hover:text-white"}`}
            >
              {v === "schedule" ? "Classes" : "Passes & memberships"}
            </button>
          ))}
        </div>
        <a href={src} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost", "sm", "h-8 px-2")}>
          Open full screen <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white text-ink">
            <Loader2 className="size-6 animate-spin" />
            <span className="ml-3 text-sm">Loading booking system…</span>
          </div>
        )}
        <iframe
          key={view}
          title={`TKO ${view === "schedule" ? "class booking" : "passes and memberships"} on TeamUp`}
          src={src}
          onLoad={() => setLoading(false)}
          className="block h-[80vh] min-h-[38rem] w-full border-0"
        />
      </div>
      <p className="bg-char px-4 py-3 text-xs text-steel">
        Having trouble logging in inside the page? Some browsers block third-party logins —{" "}
        <a href={src} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
          open TeamUp in a new tab
        </a>{" "}
        instead.
      </p>
    </div>
  );
}
