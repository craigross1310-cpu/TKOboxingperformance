import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { coaches } from "@/content/coaches";
import { faqs } from "@/content/faqs";
import { media, type Media } from "@/content/media";
import { memberships, passes } from "@/content/memberships";
import { googleMapsSearch, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CoachPortrait } from "@/components/coaches/CoachPortrait";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Instagram } from "@/components/icons/Instagram";
import { Location } from "@/components/sections/Location";
import { CategoryLegend, WeekPreview } from "@/components/timetable/WeekPreview";

/**
 * The home page is a hub: each section gives the key facts in a glance and
 * hands off to the page that has the detail.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />

      {/* Timetable */}
      <section className="section-y border-y border-line bg-coal" aria-labelledby="home-timetable">
        <div className="container-x">
          <div id="home-timetable">
            <SectionHeading
              eyebrow="The week at TKO"
              title={
                <>
                  Seven days.
                  <br />
                  <span className="outline-text">No excuses.</span>
                </>
              }
              intro="13 coached, 60-minute sessions a week. Booking opens 7 days ahead."
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/timetable">Live timetable</ButtonLink>
                  <ButtonLink href="/classes" variant="outline">
                    All classes
                  </ButtonLink>
                </div>
              }
            />
          </div>
          <div className="mt-10 lg:mt-12">
            <WeekPreview />
            <div className="mt-6">
              <CategoryLegend />
            </div>
          </div>
        </div>
      </section>

      <Coaches />
      <Pricing />
      <NewHere />
      <Location />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns">
          <Photo media={media.heroRingWalk} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/40" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgba(215,38,30,0.25),transparent_70%)]" />
      </div>

      <div className="container-x pb-10 pt-[calc(var(--header-h)+4rem)] md:pb-14">
        <Eyebrow className="mb-7 animate-fade-up !text-white/85">Glasgow · East End · All levels</Eyebrow>
        <h1 className="display text-[clamp(3rem,12.6vw,12rem)] text-white">
          <span className="block animate-fade-up [animation-delay:60ms]">Box.</span>
          <span className="block animate-fade-up [animation-delay:140ms]">Build.</span>
          <span className="block animate-fade-up text-red-bright [animation-delay:220ms]">Perform.</span>
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl animate-fade-up text-lg leading-relaxed text-white/85 [animation-delay:300ms] md:text-xl lg:col-span-6">
            Professional boxing coaching and strength &amp; conditioning under one roof. From your first jab to
            fight night — <span className="text-white">all levels welcome.</span>
          </p>
          <div className="flex animate-fade-up flex-col gap-3 [animation-delay:380ms] sm:flex-row lg:col-span-6 lg:justify-end">
            <ButtonLink href="/booking" size="lg">
              Book a session
            </ButtonLink>
            <ButtonLink href="/about" size="lg" variant="outline">
              Explore the gym
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 grid animate-fade-up grid-cols-2 border-t border-white/15 [animation-delay:460ms] md:grid-cols-4">
          {[
            ["20+", "Years coaching experience"],
            ["BBBC", "Licensed pro coach & cornerman"],
            ["£10", "Try any class"],
            ["7", "Days of classes a week"],
          ].map(([k, v]) => (
            <div key={v} className="border-white/15 py-5 pr-4 odd:border-r md:border-r md:last:border-r-0 md:px-6 md:first:pl-0">
              <dt className="sr-only">{v}</dt>
              <dd>
                <span className="display chrome-text block text-4xl md:text-5xl">{k}</span>
                <span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel">{v}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const pillars: { title: string; body: string; href: string; image: Media; tag: string }[] = [
  {
    title: "Boxing",
    tag: "Beginner → Pro",
    body: "Technique, pads and bag work for every level.",
    href: "/classes#beginners-boxing",
    image: media.padsCoach,
  },
  {
    title: "Strength & Conditioning",
    tag: "Performance",
    body: "Barbells, explosive lifts and power work.",
    href: "/classes#boxing-strength-conditioning",
    image: media.barbellWoman,
  },
  {
    title: "Sparring",
    tag: "Saturdays · 11am",
    body: "Supervised, all-levels ring time.",
    href: "/classes#all-levels-sparring",
    image: media.sparring,
  },
  {
    title: "Personal Training",
    tag: "1:1 · 2:1 · group",
    body: "Coaching built around your goals.",
    href: "/booking#personal-training",
    image: media.deadliftDark,
  },
];

function Intro() {
  return (
    <section className="section-y" aria-labelledby="intro">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow className="mb-6">This is TKO</Eyebrow>
            <h2 id="intro" className="display-tight text-[clamp(2.3rem,5.5vw,4.6rem)] text-white">
              More than a boxing gym.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-white/75">
              A family-run gym in Glasgow’s East End, coached by father and son. Professional coaches, experienced
              boxers and real strength &amp; conditioning — for men, women and kids, from total beginners to pros.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white hover:text-red-bright"
            >
              Our story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <h3 className="sr-only">What we offer</h3>
        <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line xl:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="bg-ink">
              <Link
                href={p.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-4 sm:p-6 xl:aspect-[3/4]"
              >
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out group-hover:scale-105">
                  <Photo media={p.image} sizes="(min-width: 1280px) 25vw, 50vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
                <div className="relative">
                  <p className="eyebrow !text-[0.6rem] text-red-bright sm:!text-[0.72rem]">{p.tag}</p>
                  <h4 className="display-tight mt-2 text-[clamp(1.2rem,4.6vw,2.1rem)] text-white">{p.title}</h4>
                  <p className="mt-2 hidden max-w-xs text-sm leading-relaxed text-white/75 sm:block">{p.body}</p>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 size-5 text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-bright" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coaches() {
  return (
    <section className="section-y" aria-labelledby="home-coaches">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5" id="home-coaches">
          <SectionHeading
            eyebrow="Your coaches"
            title={
              <>
                Father &amp; son.
                <br />
                In your corner.
              </>
            }
            intro="A BBBC-licensed professional coach and his son, a former professional boxer."
          />
        </div>
        <div className="grid gap-3 lg:col-span-7">
          {coaches.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <Link
                href="/coaches"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-char p-3 pr-5 transition-colors hover:border-white/30 sm:gap-6"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
                  <CoachPortrait coach={c} sizes="6rem" variant="avatar" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="eyebrow !text-[0.6rem] text-red-bright">{c.experience} in the sport</p>
                  <h3 className="display-tight mt-1.5 text-2xl text-white sm:text-3xl">{c.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-steel">{c.id === "kieran-tarleton" ? "Gary’s son · Former pro boxer · Coach & PT" : "Gym owner · BBBC pro coach · S&C"}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-red-bright" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const classPass = passes.find((p) => p.id === "class-pass")!;
  const bronze = memberships.find((m) => m.id === "bronze")!;
  const gold = memberships.find((m) => m.id === "gold")!;
  const winter = memberships.find((m) => m.id === "winter-unlimited")!;
  const tiles = [
    { label: "Try a class", price: classPass.price, unit: "one-off", note: "No membership needed" },
    { label: bronze.name, price: bronze.price, unit: "/month", note: "2 classes a week + gym" },
    { label: gold.name, price: gold.price, unit: "/month", note: "Unlimited classes + gym" },
    { label: winter.name, price: winter.price, unit: "/month", note: "Unlimited — winter offer", offer: true },
  ];

  return (
    <section className="section-y bg-bone text-ink" aria-labelledby="home-pricing">
      <div className="container-x">
        <div id="home-pricing">
          <SectionHeading
            tone="light"
            eyebrow="Membership"
            title="Simple pricing."
            intro="Every membership includes full gym access. No contract on passes."
            action={
              <ButtonLink href="/membership" variant="dark">
                Compare memberships
              </ButtonLink>
            }
          />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.label} delay={i * 70} className="bg-bone">
              <Link href="/membership" className="group flex h-full flex-col p-5 transition-colors hover:bg-paper sm:p-7">
                <p className="eyebrow !text-[0.6rem] text-stone sm:!text-[0.72rem]">
                  {t.offer ? <span className="text-red">{t.label}</span> : t.label}
                </p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="display text-5xl sm:text-6xl">£{t.price}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-stone">{t.unit}</span>
                </p>
                <p className="mt-3 text-sm text-stone">{t.note}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-4 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={googleMapsSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm text-ink"
          >
            <span className="flex gap-0.5 text-amber-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span>
              <strong>{site.rating.value}</strong> on Google · {site.rating.count} reviews
              <Confirm label="Rating to be confirmed — check live Google profile" />
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-stone group-hover:text-red">Read</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink hover:text-red"
          >
            <Instagram className="size-4" /> {site.social.instagramHandle}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function NewHere() {
  const picks = ["experience", "try-first", "how-to-book"]
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  return (
    <section className="section-y border-b border-line" aria-labelledby="home-new">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5" id="home-new">
          <SectionHeading
            eyebrow="New here?"
            title="Start with one class."
            intro="Never boxed before? That’s exactly who Beginners Boxing is for. Here are the questions people ask first."
          />
          <Reveal delay={100} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/start">Start here</ButtonLink>
            <ButtonLink href="/faq" variant="outline">
              All FAQs
            </ButtonLink>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <FaqAccordion faqs={picks} searchable={false} />
        </div>
      </div>
    </section>
  );
}
