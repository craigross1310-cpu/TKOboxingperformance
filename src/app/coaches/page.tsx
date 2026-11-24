import type { Metadata } from "next";
import { Award, Dumbbell, Swords, Users } from "lucide-react";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoachGrid } from "@/components/coaches/CoachGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Coaches & Personal Trainers",
  description:
    "Meet TKO's father-and-son coaching team: Gary Tarleton — gym owner, BBBC-licensed professional coach and S&C specialist — and his son Kieran Tarleton, retired professional boxer and full-time coach.",
  alternates: { canonical: "/coaches" },
};

const why = [
  { icon: Award, title: "Licensed", body: "BBBC professional licensed coach and cornerman, and licensed professional hand wrapper." },
  { icon: Swords, title: "Been there", body: "A retired professional boxer with 13 years in the sport coaching on the floor every week." },
  { icon: Dumbbell, title: "Strength-backed", body: "Strength & conditioning specialism built into how TKO boxers train." },
  { icon: Users, title: "Family-run", body: "Father and son, on the gym floor every week — coaching everyone from complete beginners to seasoned professionals." },
];

export default function CoachesPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Coaches & PTs"
        title={
          <>
            In your
            <br />
            corner.
          </>
        }
        intro="A family-run gym, coached by father and son. Professional and amateur licensed coaching, with over 30 years of combined experience in boxing between them."
        image={media.padsCoach}
      >
        <ButtonLink href="/booking#personal-training" size="lg">
          Book personal training
        </ButtonLink>
      </PageHero>

      <section className="section-y !pt-12" aria-label="Coach profiles">
        <div className="container-x">
          <CoachGrid />
          <p className="mt-6 text-sm text-steel">Tap a coach to read their full profile.</p>
        </div>
      </section>

      <section className="section-y border-t border-line bg-coal" aria-labelledby="why-coaching">
        <div className="container-x">
          <div id="why-coaching">
            <SectionHeading eyebrow="The difference" title="Real coaching." />
          </div>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 90} className="bg-coal p-7">
                <w.icon className="size-8 text-red-bright" aria-hidden />
                <h3 className="display-tight mt-6 text-2xl text-white">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            One-to-one.
            <br />
            <span className="text-red-bright">Your goals.</span>
          </>
        }
        intro="1:1, 2:1 and small-group personal training with Gary or Kieran — from first gloves to fight camp."
      />
    </>
  );
}
