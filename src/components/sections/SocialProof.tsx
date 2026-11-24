import { ArrowUpRight, Star } from "lucide-react";
import { Instagram } from "@/components/icons/Instagram";
import { googleMapsSearch, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Reviews: we never write testimonials. This block shows the public Google
 * rating and sends visitors to read the real reviews. Owner-approved quotes
 * can be added later (see HANDOVER.md).
 */
export function Reviews() {
  return (
    <Reveal className="flex h-full flex-col justify-between border border-line bg-char p-7 md:p-10">
      <div>
        <p className="eyebrow text-steel">What members say</p>
        <div className="mt-6 flex items-end gap-4">
          <span className="display text-[6rem] leading-[0.8] text-white">{site.rating.value}</span>
          <div className="pb-2">
            <div className="flex gap-1 text-amber-300" aria-label={`${site.rating.value} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" aria-hidden />
              ))}
            </div>
            <p className="mt-2 text-sm text-steel">
              Rated on {site.rating.source} · {site.rating.count} reviews
              <Confirm label="Rating to be confirmed — check live Google profile" />
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-md leading-relaxed text-white/80">
          Don’t take our word for it — read what TKO members say about the coaching, the community and the results.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={googleMapsSearch} variant="light" icon="external">
          Read Google reviews
        </ButtonLink>
      </div>
    </Reveal>
  );
}

export function InstagramCard() {
  return (
    <Reveal delay={120} className="h-full">
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden border border-line bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#2a0d0b] p-7 md:p-10"
      >
        <div aria-hidden className="absolute -right-16 -top-16 size-72 rounded-full bg-red/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <div className="relative flex items-center justify-between">
          <p className="eyebrow text-steel">Follow the training</p>
          <Instagram className="size-7 text-white" />
        </div>
        <div className="relative">
          <p className="text-[clamp(1.15rem,2.3vw,1.9rem)] font-semibold tracking-tight text-white [overflow-wrap:anywhere]">
            {site.social.instagramHandle}
          </p>
          <p className="mt-4 max-w-sm text-white/70">
            Fight nights, pad sessions, member wins and timetable updates — first on Instagram.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white">
            Follow on Instagram
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Reveal>
  );
}
