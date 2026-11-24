"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, CalendarDays, LayoutGrid, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Floating booking dock (mobile/tablet), back-to-top button (desktop) and demo notice.
 * The dock appears after the hero and tucks away while the footer is on screen.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(footer);
    return () => io.disconnect();
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
  const dockVisible = pastHero && !footerVisible && !onBooking;
  const secondary =
    pathname === "/timetable"
      ? { href: "/classes", label: "Classes", icon: LayoutGrid }
      : { href: "/timetable", label: "Timetable", icon: CalendarDays };

  return (
    <>
      {demoOpen && (
        <div
          role="status"
          className={cn(
            "fixed left-3 right-3 z-40 flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-[#141414]/90 p-4 text-xs leading-relaxed text-white/85 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-[bottom] duration-500 [animation:fade-up_.6s_var(--ease-out-expo)_both] sm:left-4 sm:right-auto sm:max-w-sm lg:bottom-6",
            dockVisible ? "bottom-[calc(var(--safe-bottom)+5rem)]" : "bottom-[var(--safe-bottom)]",
          )}
        >
          <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-amber-400/60 text-[0.55rem] font-bold text-amber-300">
            ?
          </span>
          <p>
            <strong className="text-white">Demo preview for TKO.</strong> Prices, classes and coach details come
            from TKO’s public booking page. Details marked <span className="text-amber-300">?</span> are waiting
            for the owner to confirm. Photos are placeholder stock until TKO’s own are added.
          </p>
          <button onClick={dismissDemo} aria-label="Dismiss demo notice" className="-m-1 rounded-lg p-1 text-steel hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Back to top (desktop) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={pastHero ? 0 : -1}
        className={cn(
          "fixed bottom-6 right-6 z-40 hidden size-12 items-center justify-center rounded-2xl border border-white/10 bg-[#141414]/80 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500 hover:border-white/30 lg:inline-flex",
          pastHero ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      {/* Floating booking dock (mobile & tablet) */}
      {!onBooking && (
        <nav
          aria-label="Quick actions"
          aria-hidden={!dockVisible}
          className={cn(
            "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[var(--safe-bottom)] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] lg:hidden",
            dockVisible ? "translate-y-0 opacity-100" : "translate-y-[calc(100%+1rem)] opacity-0",
          )}
        >
          <div className="pointer-events-auto flex w-full max-w-[26rem] items-center gap-1 rounded-[1.4rem] border border-white/10 bg-[#141414]/90 p-1.5 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.95)] backdrop-blur-2xl backdrop-saturate-150">
            <DockItem href={secondary.href} label={secondary.label} tabbable={dockVisible}>
              <secondary.icon className="size-[1.15rem]" />
            </DockItem>
            <DockItem href={`tel:${site.contact.phoneE164}`} label="Call" tabbable={dockVisible} external>
              <Phone className="size-[1.15rem]" />
            </DockItem>
            <Link
              href="/booking"
              tabIndex={dockVisible ? 0 : -1}
              className="ml-0.5 flex h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-2xl bg-red px-4 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_-10px_rgba(215,38,30,0.9)] transition-[background-color,transform] active:scale-[0.97] active:bg-red-deep"
            >
              Book a session
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

function DockItem({
  href,
  label,
  children,
  tabbable,
  external,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  tabbable: boolean;
  external?: boolean;
}) {
  const cls =
    "flex h-[3.25rem] w-[4.25rem] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl text-white/80 transition-[background-color,color,transform] hover:bg-white/[0.07] hover:text-white active:scale-[0.95] active:bg-white/10";
  const inner = (
    <>
      {children}
      <span className="text-[0.62rem] font-medium tracking-wide">{label}</span>
    </>
  );
  return external ? (
    <a href={href} className={cls} tabIndex={tabbable ? 0 : -1}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} tabIndex={tabbable ? 0 : -1}>
      {inner}
    </Link>
  );
}
