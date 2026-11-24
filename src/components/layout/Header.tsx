"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Instagram } from "@/components/icons/Instagram";
import { nav, site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu whenever the route changes (state is preserved across navigations).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo onClick={() => setOpen(false)} />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-underline py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                      isActive(item.href) ? "text-white [background-size:100%_1px]" : "text-steel hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/start"
              className="hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white transition-colors hover:text-red-bright md:inline"
            >
              New here?
            </Link>
            <div className="hidden sm:block">
              <Link href="/booking" className={buttonClass("primary", "sm")}>
                Book a session
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative -mr-2 inline-flex size-11 items-center justify-center text-white xl:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-[45] overflow-y-auto bg-ink pt-[var(--header-h)] xl:hidden"
      >
        <div className="rope-lines absolute inset-0" aria-hidden />
        <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/start", label: "Start here" }].map((item, i) => (
              <li
                key={item.href}
                className="border-b border-line"
                style={open ? { animation: `fade-up 0.6s ${80 + i * 40}ms var(--ease-out-expo) both` } : undefined}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "display-tight flex items-center justify-between py-4 text-[clamp(1.9rem,8vw,3rem)] transition-colors",
                    pathname === item.href ? "text-red-bright" : "text-white hover:text-red-bright",
                  )}
                >
                  {item.label}
                  <span className="font-mono text-xs text-steel">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/booking" onClick={() => setOpen(false)} className={buttonClass("primary", "lg", "w-full")}>
              Book a session
            </Link>
            <div className="mt-4 flex items-center gap-6 text-sm text-steel">
              <a href={`tel:${site.contact.phoneE164}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="size-4" /> {site.contact.phoneDisplay}
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Instagram className="size-4" /> Instagram
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
