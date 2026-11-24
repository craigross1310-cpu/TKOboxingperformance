"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

/** Accessible dialog rendered in a portal. `variant="drawer"` slides from the right (bottom sheet on mobile). */
export function Modal({
  open,
  onClose,
  title,
  children,
  variant = "dialog",
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "dialog" | "drawer";
  labelledBy?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="presentation">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm [animation:page-in_.3s_ease-out_both]"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : title}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex max-h-[calc(100dvh-var(--safe-top)-1rem)] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-white/10 bg-coal text-white shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] outline-none [animation:fade-up_.5s_var(--ease-out-expo)_both]",
          variant === "drawer"
            ? "sm:fixed sm:inset-y-3 sm:right-3 sm:max-h-none sm:max-w-xl sm:rounded-[1.75rem]"
            : "sm:mx-4 sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-[1.75rem]",
        )}
      >
        <span aria-hidden className="absolute left-1/2 top-2.5 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25 sm:hidden" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-ink/70 text-white backdrop-blur-xl transition-colors hover:bg-red active:scale-95"
        >
          <X className="size-5" />
        </button>
        <div className="overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
