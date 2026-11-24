import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { faqs } from "@/content/faqs";
import { brand, media, type Media } from "@/content/media";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CoachGrid } from "@/components/coaches/CoachGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Location } from "@/components/sections/Location";
import { Marquee } from "@/components/sections/Marquee";
import { MembershipCards, PassList } from "@/components/sections/MembershipCards";
import { InstagramCard, Reviews } from "@/components/sections/SocialProof";
import { CategoryLegend, WeekPreview } from "@/components/timetable/WeekPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        items={["Boxing", "Strength & Conditioning", "Sparring", "HYROX Circuits", "Personal Training", "All levels welcome"]}
      />
      <Intro />
      <Offer />

      {/* Timetable preview */}
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
              intro="13 coached sessions a week — early sessions before work, evening classes after it, and weekend boxing and sparring. Every class is 60 minutes. Booking opens 7 days ahead."
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
          <div className="mt-12">
            <WeekPreview />
            <div className="mt-6">
              <CategoryLegend />
            </div>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="section-y" aria-labelledby="home-coaches">
        <div className="container-x">
          <div id="home-coaches">
            <SectionHeading
              eyebrow="Your coaches"
              title={
                <>
                  In your corner.
                </>
              }
              intro="A family-run gym with a father-and-son team in your corner: a BBBC-licensed professional coach and his son, a former professional boxer — coaching beginners to pros."
              action={
                <ButtonLink href="/coaches" variant="outline">
                  Meet the team
                </ButtonLink>
              }
            />
          </div>
          <div className="mt-14">
            <CoachGrid variant="preview" />
          </div>
        </div>
      </section>

      <AboutSplit />

      {/* Reviews + Instagram */}
      <section className="pb-20 lg:pb-32" aria-label="Reviews and social">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reviews />
          <InstagramCard />
        </div>
      </section>

      {/* Membership */}
      <section className="section-y bg-bone text-ink" aria-labelledby="home-membership">
        <div className="container-x">
          <div id="home-membership">
            <SectionHeading
              tone="light"
              eyebrow="Membership"
              title={
                <>
                  Simple pricing.
                  <br />
                  Serious training.
                </>
              }
              intro="Monthly memberships include full gym access. Or pay as you go from £10 — no contract."
              action={
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-red"
                >
                  Compare options <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>
          <div className="mt-14">
            <MembershipCards />
          </div>
          <div className="mt-16">
            <PassList tone="light" />
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section-y" aria-labelledby="home-faq">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" id="home-faq">
            <SectionHeading eyebrow="Questions" title="Good to know." />
            <Reveal delay={100}>
              <p className="mt-6 max-w-sm text-steel">
                First class nerves? Totally normal. Here are the answers new members ask for most.
              </p>
              <ButtonLink href="/faq" variant="outline" className="mt-8">
                All FAQs
              </ButtonLink>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion faqs={faqs.filter((f) => f.featured).slice(0, 6)} searchable={false} />
          </div>
        </div>
      </section>

      <CtaBand />
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

function Intro() {
  return (
    <section className="section-y relative overflow-hidden" aria-labelledby="intro">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6">This is TKO</Eyebrow>
          <Reveal>
            <h2 id="intro" className="display-tight text-[clamp(2.4rem,6vw,5rem)] text-white">
              More than a boxing gym. <span className="text-steel">A performance centre built on real coaching.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-6 text-lg leading-relaxed text-white/75 md:grid-cols-2">
            {site.ownDescription.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={200} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/about" className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white hover:text-red-bright">
              Our story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/start" className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white hover:text-red-bright">
              New to boxing? <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={150} className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[881/1200] w-full max-w-md overflow-hidden border border-line">
            <Image src={brand.logo.src} alt={brand.logo.alt} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
          </div>
          <p className="mt-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel">
            Men · Women · Kids — pro &amp; amateur licensed coaches
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const pillars: { title: string; body: string; href: string; image: Media; tag: string }[] = [
  {
    title: "Boxing",
    tag: "Beginner → Pro",
    body: "Technique, pads and bag work, coached by a BBBC-licensed coach and a former pro.",
    href: "/classes#beginners-boxing",
    image: media.padsCoach,
  },
  {
    title: "Strength & Conditioning",
    tag: "Athletic performance",
    body: "Barbells, explosive lifts and power work to back up your boxing.",
    href: "/classes#boxing-strength-conditioning",
    image: media.barbellWoman,
  },
  {
    title: "Sparring",
    tag: "Saturdays · 11am",
    body: "Supervised, all-levels ring time. Practise timing and strategy at your own pace.",
    href: "/classes#all-levels-sparring",
    image: media.sparring,
  },
  {
    title: "Personal Training",
    tag: "1:1 · 2:1 · small group",
    body: "Dedicated coaching built around your goals — from first gloves to fight camp.",
    href: "/booking#personal-training",
    image: media.deadliftDark,
  },
];

function Offer() {
  return (
    <section className="pb-20 lg:pb-32" aria-labelledby="offer">
      <div className="container-x">
        <h2 id="offer" className="sr-only">
          What we offer
        </h2>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="bg-ink">
              <Link href={p.href} className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden p-6 md:aspect-[4/5] xl:aspect-[3/4.4]">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out group-hover:scale-105">
                  <Photo media={p.image} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10 transition-colors duration-500 group-hover:via-ink/40" />
                <span className="absolute left-6 top-6 font-mono text-xs text-white/60">0{i + 1}</span>
                <div className="relative">
                  <p className="eyebrow text-red-bright">{p.tag}</p>
                  <h3 className="display-tight mt-3 text-[2.1rem] text-white">{p.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">{p.body}</p>
                  <span className="mt-6 inline-flex size-11 items-center justify-center border border-white/30 text-white transition-all duration-300 group-hover:border-red group-hover:bg-red">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSplit() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-coal" aria-labelledby="home-about">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[26rem] lg:min-h-[44rem]">
          <Photo media={media.ring} sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-coal/60" />
        </div>
        <div className="container-x flex flex-col justify-center py-16 lg:max-w-none lg:px-16 xl:px-24">
          <Reveal>
            <Eyebrow className="mb-6">The gym</Eyebrow>
            <h2 id="home-about" className="display-tight text-[clamp(2.4rem,4.4vw,4.4rem)] text-white">
              Everything.
              <br />
              Under one roof.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              Professional coaches, experienced boxers and top-level strength &amp; conditioning support — in a
              friendly, focused environment built to help you feel confident, strong and motivated.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-8 text-sm text-white/85">
              {["Ring & sparring", "Pads & heavy bags", "Barbells & dumbbells", "Kettlebells", "Functional circuits", "Open gym floor"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="size-1.5 rotate-45 bg-red-bright" aria-hidden /> {f}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/about">About TKO</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Visit us
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
