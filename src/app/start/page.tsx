import type { Metadata } from "next";
import { ArrowUpRight, Check, Droplets, Footprints, Hand, Shirt } from "lucide-react";
import { media } from "@/content/media";
import { passes } from "@/content/memberships";
import { site } from "@/content/site";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { GoalPicker } from "@/components/start/GoalPicker";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Start Training — Your First Session",
  description:
    "New to boxing? Find the right class, see what happens in your first session, what to bring, and book a £10 class at TKO Boxing & Performance Centre, Glasgow.",
  alternates: { canonical: "/start" },
};

const firstClass = [
  ["Skipping", "Get warm and find your rhythm."],
  ["Stance & footwork", "Balance, movement and staying on your toes."],
  ["Shadow boxing", "Put the shapes together with no pressure."],
  ["Punch technique", "Jab, cross, hooks — the right way, from day one."],
  ["Simple combos", "Link it all together on pads and bags."],
];

const kit = [
  { icon: Shirt, label: "Comfortable gym clothes" },
  { icon: Footprints, label: "Trainers" },
  { icon: Droplets, label: "Water bottle" },
  { icon: Hand, label: "Hand wraps if you have them" },
];

export default function StartPage() {
  const classPass = passes.find((p) => p.id === "class-pass")!;
  return (
    <>
      <PageHero
        index="00"
        eyebrow="New to TKO"
        title={
          <>
            Start
            <br />
            here.
          </>
        }
        intro="Never boxed? Perfect. Most people who walk through our door haven’t. Here’s everything you need for your first session — in four steps."
        image={media.skipping}
      >
        <ButtonLink href={classPass.href} size="lg">
          Try a class — £10
        </ButtonLink>
        <ButtonLink href="#step-1" size="lg" variant="outline">
          Find my class
        </ButtonLink>
      </PageHero>

      <section id="step-1" className="section-y scroll-mt-20" aria-labelledby="s1">
        <div className="container-x">
          <div id="s1">
            <SectionHeading eyebrow="Step 1" title="Choose your class." intro="What brings you to TKO? Pick one and we’ll point you to the right session." />
          </div>
          <div className="mt-12">
            <GoalPicker />
          </div>
        </div>
      </section>

      <section className="section-y border-y border-line bg-coal" aria-labelledby="s2">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" id="s2">
            <SectionHeading eyebrow="Step 2" title="Know what to expect." />
            <Reveal delay={100}>
              <p className="mt-6 text-lg leading-relaxed text-steel">
                Beginners Boxing is built for your first day: a fun, supportive hour that builds confidence, fitness and
                skills at your own pace. Coaches adapt everything to you — and sparring is always optional.
              </p>
            </Reveal>
          </div>
          <ol className="lg:col-span-7">
            {firstClass.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 70} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-line py-6 first:pt-0">
                <span className="display chrome-text text-4xl">{i + 1}</span>
                <div>
                  <h3 className="display-tight text-2xl text-white">{t}</h3>
                  <p className="mt-1 text-steel">{b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y" aria-labelledby="s3">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" id="s3">
            <SectionHeading eyebrow="Step 3" title="Get ready." />
          </div>
          <div className="lg:col-span-7">
            <Reveal className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {kit.map((k) => (
                <div key={k.label} className="flex items-center gap-4 bg-ink p-6">
                  <k.icon className="size-6 text-red-bright" aria-hidden />
                  <span className="text-white">{k.label}</span>
                </div>
              ))}
            </Reveal>
            <Reveal delay={100} className="mt-8 space-y-3 text-white/80">
              <p className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-red-bright" /> Arrive 10–15 minutes early so a coach can say
                hello and ask about any injuries.
                <Confirm />
              </p>
              <p className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-red-bright" /> No gloves yet? Ask the team before your first
                session.
                <Confirm />
              </p>
              <p className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-red-bright" /> Adult classes are generally 16+. Kids’ classes
                run for ages 7–10 and 11–15.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-bone text-ink" aria-labelledby="s4">
        <div className="container-x">
          <div id="s4">
            <SectionHeading tone="light" eyebrow="Step 4" title="Book your first visit." />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal className="flex flex-col border border-ink bg-ink p-8 text-white">
              <p className="eyebrow text-red-bright">Most popular first step</p>
              <h3 className="display-tight mt-4 text-3xl">1x Class Pass</h3>
              <p className="display mt-4 text-6xl">£{classPass.price}</p>
              <p className="mt-4 text-sm text-white/75">Book any one class from the timetable. Valid for 5 days.</p>
              <a href={classPass.href} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "mt-auto w-full")}>
                Buy class pass <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens TeamUp in a new tab)</span>
              </a>
            </Reveal>
            <Reveal delay={90} className="flex flex-col border border-ink/15 p-8">
              <p className="eyebrow text-stone">Already decided?</p>
              <h3 className="display-tight mt-4 text-3xl">Join as a member</h3>
              <p className="mt-4 text-stone">Memberships from £40/month, including full gym access.</p>
              <div className="mt-auto pt-8">
                <ButtonLink href="/membership" variant="dark" className="w-full">
                  See memberships
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={180} className="flex flex-col border border-ink/15 p-8">
              <p className="eyebrow text-stone">Got questions first?</p>
              <h3 className="display-tight mt-4 text-3xl">Talk to a coach</h3>
              <p className="mt-4 text-stone">
                Call{" "}
                <a href={`tel:${site.contact.phoneE164}`} className="font-semibold text-ink underline underline-offset-4">
                  {site.contact.phoneDisplay}
                </a>{" "}
                or send us a message.
              </p>
              <div className="mt-auto pt-8">
                <ButtonLink href="/contact" variant="dark" className="w-full">
                  Contact TKO
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-14 flex flex-col items-start gap-4 border-t border-ink/15 pt-10 md:flex-row md:items-center md:justify-between">
            <Eyebrow tone="muted" className="!text-stone">
              Booking opens 7 days before each class
            </Eyebrow>
            <ButtonLink href="/timetable" variant="dark">
              View the timetable
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
