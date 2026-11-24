import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, CreditCard, Dumbbell, Swords, Target, Ticket, UserRound } from "lucide-react";
import { coaches } from "@/content/coaches";
import { media } from "@/content/media";
import { memberships, passes } from "@/content/memberships";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { TeamUpEmbed } from "@/components/booking/TeamUpEmbed";
import { PtEnquiryForm, PtEnquiryFormWithParams } from "@/components/forms/PtEnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { CoachPortrait } from "@/components/coaches/CoachPortrait";

export const metadata: Metadata = {
  title: "Book a Session — Classes, Passes & Personal Training",
  description:
    "Book boxing, sparring and S&C classes at TKO Glasgow, buy a £10 class pass, join a membership or enquire about 1:1 personal training.",
  alternates: { canonical: "/booking" },
};

const classPass = passes.find((p) => p.id === "class-pass")!;
const dayPass = passes.find((p) => p.id === "day-pass")!;
const sparringPass = passes.find((p) => p.id === "sparring-pass")!;
const gold = memberships.find((m) => m.id === "gold")!;

const options = [
  {
    icon: CalendarDays,
    title: "Book a class",
    body: "Choose a session on the live timetable and reserve your place.",
    cta: "Open timetable",
    href: "/timetable",
    external: false,
    accent: true,
  },
  {
    icon: Ticket,
    title: "Try a class — £10",
    body: `${classPass.description} Valid 5 days.`,
    cta: "Buy class pass",
    href: classPass.href,
    external: true,
  },
  {
    icon: Dumbbell,
    title: "Gym day pass — £10",
    body: dayPass.description,
    cta: "Buy day pass",
    href: dayPass.href,
    external: true,
  },
  {
    icon: Swords,
    title: "Saturday sparring — £10",
    body: sparringPass.description,
    cta: "Buy sparring pass",
    href: sparringPass.href,
    external: true,
  },
  {
    icon: CreditCard,
    title: "Memberships",
    body: `From £40/month. ${gold.name} is £${gold.price}/month for unlimited classes & gym access.`,
    cta: "Compare memberships",
    href: "/membership",
    external: false,
  },
  {
    icon: UserRound,
    title: "Personal training",
    body: "1:1, 2:1 and small-group coaching with Gary or Kieran.",
    cta: "Enquire now",
    href: "#personal-training",
    external: false,
  },
];

const steps = [
  ["Pick", "Choose a class on the timetable — or buy a £10 pass if you’re not a member yet."],
  ["Book", "Tap Book. You’ll reserve on TeamUp, TKO’s secure booking system — create an account in seconds."],
  ["Confirm", "You’ll get a confirmation from TeamUp. Booking opens 7 days ahead and closes at the start time."],
  ["Train", "Arrive a little early, say hello to the coaches and get ready to work."],
];

export default function BookingPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Book a session"
        title={
          <>
            Ready when
            <br />
            you are.
          </>
        }
        intro="Classes, passes, memberships and personal training — all booked through TKO’s secure TeamUp system."
        image={media.glovesMat}
      />

      <section className="pb-20 pt-6 lg:pb-28" aria-label="Booking options">
        <div className="container-x">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {options.map((o, i) => {
              const inner = (
                <>
                  <o.icon className={`size-8 ${o.accent ? "text-white" : "text-red-bright"}`} aria-hidden />
                  <h2 className="display-tight mt-8 text-3xl">{o.title}</h2>
                  <p className={`mt-3 text-sm leading-relaxed ${o.accent ? "text-white/85" : "text-steel"}`}>{o.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                    {o.cta}
                    {o.external ? (
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    ) : (
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </span>
                </>
              );
              const cls = `group flex h-full min-h-[17rem] flex-col p-7 transition-colors md:p-9 ${
                o.accent ? "bg-red text-white hover:bg-red-bright" : "bg-ink text-white hover:bg-char"
              }`;
              return (
                <Reveal key={o.title} delay={i * 70}>
                  {o.external ? (
                    <a href={o.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                      <span className="sr-only">(opens TeamUp in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={o.href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y border-y border-line bg-coal" aria-labelledby="how-booking-works">
        <div className="container-x">
          <div id="how-booking-works">
            <SectionHeading eyebrow="How it works" title="Four steps to the floor." />
          </div>
          <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-4">
            {steps.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="bg-coal p-7">
                <span className="display chrome-text text-6xl">{i + 1}</span>
                <h3 className="display-tight mt-6 text-2xl text-white">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{b}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12">
            <TeamUpEmbed />
          </div>
          <p className="mt-4 text-xs text-steel">
            Cancellations: please give at least {site.booking.cancellationHours} hours’ notice. Monthly memberships need
            30 days’ notice before the next billing date.
          </p>
        </div>
      </section>

      <section id="personal-training" className="section-y scroll-mt-20" aria-labelledby="pt-heading">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Personal training</Eyebrow>
            <Reveal>
              <h2 id="pt-heading" className="display text-[clamp(2.6rem,6vw,5rem)] text-white">
                Train one-to-one.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                Technique, fitness, strength or fight prep — tell us your goals and we’ll match you with the right
                coach and format. Pricing and availability are confirmed by the coach when they reply.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4">
              {coaches.map((c) => (
                <Reveal key={c.id} className="flex items-center gap-4 border border-line p-4">
                  <div className="relative size-16 shrink-0 overflow-hidden">
                    <CoachPortrait coach={c} sizes="4rem" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="mt-1 flex items-start gap-2 text-sm text-steel">
                      <Target className="mt-0.5 size-3.5 shrink-0" /> {c.personalTraining}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="border border-line bg-coal p-6 sm:p-8 md:p-10">
              <h3 className="display-tight mb-8 text-3xl text-white">PT enquiry</h3>
              <Suspense fallback={<PtEnquiryForm />}>
                <PtEnquiryFormWithParams />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
