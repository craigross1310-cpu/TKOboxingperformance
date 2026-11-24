import type { Metadata } from "next";
import Image from "next/image";
import { brand, media, type Media } from "@/content/media";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { Location } from "@/components/sections/Location";
import { Marquee } from "@/components/sections/Marquee";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "About TKO — Boxing & Performance in Glasgow",
  description:
    "TKO Boxing & Performance Centre is a family-run gym in Glasgow's East End, coached by father and son Gary and Kieran Tarleton. Professional boxing coaching and strength & conditioning under one roof.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    n: "01",
    title: "Real training.",
    body: "Coached by a BBBC-licensed professional coach and a former professional boxer. The same fundamentals, drills and standards whether you’re in your first week or preparing for the ring.",
  },
  {
    n: "02",
    title: "Real results.",
    body: "Boxing skill backed by genuine strength & conditioning. Power, stability, engine — the athletic qualities that make you a better boxer and a fitter person.",
  },
  {
    n: "03",
    title: "All levels welcome.",
    body: "Men, women and kids. Total beginners and experienced fighters. A friendly, focused, no-ego environment built to help you feel confident every time you walk through the door.",
  },
];

const facilities: { title: string; body: string; image: Media }[] = [
  { title: "The ring", body: "Home of Saturday All Levels Sparring — supervised, safe and at your own pace.", image: media.ring },
  { title: "Pads & bags", body: "Pad work with the coaches and heavy-bag drills to build speed, power and technique.", image: media.glovesMat },
  { title: "Strength floor", body: "Barbells, dumbbells, kettlebells and resistance work for real strength & conditioning.", image: media.barbell },
  { title: "Circuit space", body: "Functional equipment and timed stations for TKO Circuit and HYROX-style sessions.", image: media.battleRopes },
];

const different = [
  ["Family-run", "A father-and-son team who run the gym and coach on the floor themselves — not a faceless chain."],
  ["Pro-level coaching for everyone", "The coaches who work with professionals also run Beginners Boxing."],
  ["Boxing + S&C under one roof", "Technical boxing and strength & conditioning, programmed to work together."],
  ["Sparring done properly", "A dedicated, supervised Saturday session — always optional, never forced."],
  ["Train from 6am", "Early pads before work, evening classes after it, weekend boxing too."],
  ["Honest pricing", "Try any class for £10. Memberships from £40/month, with gym access included."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="About TKO"
        title={
          <>
            More than
            <br />a boxing gym.
          </>
        }
        intro="Get fit, learn how to box, or take your training to the next level — with professional coaches, experienced boxers and top-level strength & conditioning support, all under one roof."
        image={media.sparring}
      >
        <ButtonLink href="/booking" size="lg">
          Book a session
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="outline">
          Visit the gym
        </ButtonLink>
      </PageHero>

      {/* Story */}
      <section className="section-y" aria-labelledby="story">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="relative aspect-[881/1200] w-full max-w-md overflow-hidden border border-line">
              <Image src={brand.logo.src} alt={brand.logo.alt} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <Eyebrow className="mb-6">Our story</Eyebrow>
            <Reveal>
              <h2 id="story" className="display-tight text-[clamp(2.2rem,5vw,4.2rem)] text-white">
                A family-run gym, built by boxing people.
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 space-y-6 text-lg leading-relaxed text-white/75">
              <p>
                TKO Boxing &amp; Performance Centre is a family-run gym, owned and run by{" "}
                <strong className="text-white">Gary Tarleton</strong>{" "}
                — a coach with more than 20 years in the boxing and fitness industry, holding a British Boxing Board of
                Control professional licence as both a coach and cornerman.
              </p>
              <p>
                Alongside him on the gym floor is his son, <strong className="text-white">Kieran Tarleton</strong> — a
                retired professional boxer with 13 years in the sport who now coaches full time. Father and son, they
                coach TKO’s classes together.
              </p>
              <p>
                Based at Unit 8, 70 Strathclyde Street in Glasgow’s East End, TKO brings boxing and strength &amp;
                conditioning together in one place — for men, women and kids, from complete beginners to professionals.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-10 border-l-2 border-red pl-6">
              <p className="display-tight text-3xl text-white md:text-4xl">“{site.tagline}”</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee tone="dark" items={["Real training", "Real results", "All levels welcome"]} />

      {/* Philosophy */}
      <section className="section-y" aria-labelledby="philosophy">
        <div className="container-x">
          <div id="philosophy">
            <SectionHeading eyebrow="Training philosophy" title="How we train." />
          </div>
          <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 100} className="bg-ink p-8 md:p-10">
                <span className="font-mono text-sm text-red-bright">{v.n}</span>
                <h3 className="display-tight mt-8 text-4xl text-white">{v.title}</h3>
                <p className="mt-5 leading-relaxed text-steel">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-y border-y border-line bg-coal" aria-labelledby="facilities">
        <div className="container-x">
          <div id="facilities">
            <SectionHeading
              eyebrow="Facilities"
              title="Fully equipped."
              intro="A fully equipped gym with everything boxing and performance training needs. Members get full gym access with every monthly membership."
            />
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="group relative aspect-[3/4] overflow-hidden border border-line">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                    <Photo media={f.image} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="display-tight text-2xl text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Different */}
      <section className="section-y bg-bone text-ink" aria-labelledby="different">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" id="different">
            <SectionHeading tone="light" eyebrow="Why TKO" title="What makes us different." />
          </div>
          <ol className="lg:col-span-7">
            {different.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 70} className="flex gap-6 border-b border-ink/15 py-7 first:pt-0">
                <span className="font-mono text-sm text-red">0{i + 1}</span>
                <div>
                  <h3 className="display-tight text-2xl md:text-3xl">{t}</h3>
                  <p className="mt-2 text-stone">{b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Community */}
      <section className="relative isolate overflow-hidden" aria-labelledby="community">
        <div className="absolute inset-0 -z-10">
          <Photo media={media.boxerWoman} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x section-y">
          <Reveal className="max-w-2xl">
            <Eyebrow className="mb-6">Community</Eyebrow>
            <h2 id="community" className="display text-[clamp(2.8rem,7vw,6rem)] text-white">
              Men. Women.
              <br />
              Kids.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              TKO is for everyone who wants to train with purpose. Adults train side by side from 6am, there’s a
              no-ego Ladies Only Boxing format, and dedicated kids’ classes for ages 7–10 and 11–15 build confidence
              and coordination.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/classes#programme">Kids &amp; ladies classes</ButtonLink>
              <ButtonLink href="/start" variant="outline">
                Start training
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
      <Location />
    </>
  );
}
