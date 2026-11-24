import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Instagram } from "@/components/icons/Instagram";
import { googleMapsDirections, nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-coal pb-[calc(var(--safe-bottom)+2.5rem)] pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">{site.description}</p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-red-bright"
            >
              <Instagram className="size-4" /> {site.social.instagramHandle}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="eyebrow mb-5 text-steel">Explore</h2>
              <ul className="space-y-3 text-sm">
                {[{ href: "/", label: "Home" }, ...nav].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline text-white/85 hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5 text-steel">Train</h2>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "/booking", label: "Book a session" },
                  { href: "/start", label: "Start training" },
                  { href: "/timetable", label: "Live timetable" },
                  { href: "/booking#personal-training", label: "Personal training" },
                  { href: "/membership", label: "Memberships & passes" },
                ].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline text-white/85 hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow mb-5 text-steel">Visit</h2>
              <address className="space-y-4 text-sm not-italic text-white/85">
                <a href={googleMapsDirections} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-red-bright" />
                  <span>
                    {site.address.line1}, {site.address.line2}
                    <br />
                    {site.address.city} {site.address.postcode}
                  </span>
                </a>
                <a href={`tel:${site.contact.phoneE164}`} className="flex gap-3 hover:text-white">
                  <Phone className="size-4 shrink-0 text-red-bright" /> {site.contact.phoneDisplay}
                </a>
                <a href={`mailto:${site.contact.email}`} className="flex gap-3 break-all hover:text-white">
                  <Mail className="size-4 shrink-0 text-red-bright" /> {site.contact.email}
                </a>
              </address>
              <dl className="mt-6 space-y-1 text-sm">
                {site.hours.rows.map((r) => (
                  <div key={r.days} className="flex justify-between gap-4">
                    <dt className="text-steel">{r.days}</dt>
                    <dd className="font-mono text-white/85">
                      {r.open}–{r.close}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div aria-hidden className="display chrome-text mt-20 select-none text-center text-[clamp(4rem,22vw,20rem)] leading-[0.8] opacity-[0.12]">
          TKO
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 text-xs text-steel md:flex-row md:items-center md:justify-between">
          <p>
            © {site.legalName}. Registered in Scotland, company no. {site.companyNumber}.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Bookings powered by {site.booking.platform}</span>
            <a
              href={site.booking.schedule}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white"
            >
              Member login <ArrowUpRight className="size-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
