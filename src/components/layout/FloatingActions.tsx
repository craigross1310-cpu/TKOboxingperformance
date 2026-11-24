"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp, CalendarDays, X } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Sticky mobile booking bar, scroll-to-top button and the demo notice. */
export function FloatingActions() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!site.demoMode) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("tko-demo-dismissed") === "1";
    } catch {}
    if (!dismissed) {
      const t = setTimeout(() => setDemoOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismissDemo = () => {
    setDemoOpen(false);
    try {
      sessionStorage.setItem("tko-demo-dismissed", "1");
    } catch {}
  };

  const onBooking = pathname === "/booking";

  return (
    <>
      {demoOpen && (
        <div
          role="status"
          className="fixed bottom-24 left-4 right-4 z-40 flex items-start gap-3 border border-amber-400/30 bg-ink/95 p-4 text-xs leading-relaxed text-white/85 shadow-2xl backdrop-blur-xl [animation:fade-up_.6s_var(--ease-out-expo)_both] sm:right-auto sm:max-w-sm lg:bottom-6"
        >
          <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-amber-400/60 text-[0.55rem] font-bold text-amber-300">
            ?
          </span>
          <p>
            <strong className="text-white">Demo preview for TKO.</strong> Prices, classes and coach details come
            from TKO’s public booking page. Details marked <span className="text-amber-300">?</span> are waiting
            for the owner to confirm. Photos are placeholder stock until TKO’s own are added.
          </p>
          <button onClick={dismissDemo} aria-label="Dismiss demo notice" className="-m-1 p-1 text-steel hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Scroll to top (desktop) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={scrolled ? 0 : -1}
        className={cn(
          "fixed bottom-6 right-6 z-40 hidden size-12 items-center justify-center border border-line bg-ink/80 text-white backdrop-blur transition-all duration-500 hover:border-white lg:inline-flex",
          scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      {/* Sticky booking bar (mobile) */}
      {!onBooking && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
          <div className="flex gap-2">
            <Link
              href="/timetable"
              className={buttonClass("outline", "md", "flex-1 px-3")}
              aria-label="View timetable"
            >
              <CalendarDays className="size-4" /> Timetable
            </Link>
            <Link href="/booking" className={buttonClass("primary", "md", "flex-[1.4] px-3")}>
              Book a session
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
