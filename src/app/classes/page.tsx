import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { otherFormats, programmeClasses, timetableClasses } from "@/content/classes";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClassExplorer } from "@/components/classes/ClassExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Classes — Boxing, Sparring, S&C & Circuits",
  description:
    "Beginners boxing, pads, sparring, boxing strength & conditioning, TKO Circuit and HYROX-style classes in Glasgow. 60-minute coached sessions for all levels.",
  alternates: { canonical: "/classes" },
};

export default function ClassesPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Classes"
        title={
          <>
            Train with
            <br />
            purpose.
          </>
        }
        intro="Boxing, sparring, strength & conditioning and high-energy circuits. Every class is 60 minutes, coached, and built so beginners and experienced boxers can train side by side."
        image={media.padsCoach}
      >
        <ButtonLink href="/timetable" size="lg">
          View timetable
        </ButtonLink>
        <ButtonLink href="/start" size="lg" variant="outline">
          Not sure where to start?
        </ButtonLink>
      </PageHero>

      <section className="section-y !pt-12" aria-labelledby="weekly-classes">
        <div className="container-x">
          <div id="weekly-classes" className="mb-10">
            <SectionHeading
              eyebrow="On the timetable"
              title="Weekly classes."
              intro={`${timetableClasses.length} class types run every week. Filter by type or level to find your fit.`}
            />
          </div>
          <ClassExplorer classes={timetableClasses} />
        </div>
      </section>

      <section className="section-y border-t border-line bg-coal" aria-labelledby="programme">
        <div className="container-x">
          <div id="programme" className="mb-12">
            <SectionHeading
              eyebrow="Also in the TKO programme"
              title="Kids, ladies & specialist."
              intro="These classes are part of TKO’s programme but aren’t on this week’s timetable. Register interest and we’ll let you know when the next block starts."
            />
          </div>
          <ClassExplorer classes={programmeClasses} />
          <Reveal className="mt-12 border border-line p-6 md:p-8">
            <p className="eyebrow text-steel">More formats</p>
            <p className="mt-3 text-white/80">
              TKO also runs rotating circuit formats including {otherFormats.join(", ")}. Check the live timetable for
              what’s on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y" aria-labelledby="where-to-start">
        <div className="container-x">
          <Reveal className="grid items-center gap-10 border border-red/40 bg-gradient-to-br from-red/15 to-transparent p-8 md:grid-cols-[auto_1fr_auto] md:p-12">
            <Compass className="size-14 text-red-bright" aria-hidden />
            <div>
              <h2 id="where-to-start" className="display-tight text-[clamp(2rem,4.5vw,3.5rem)] text-white">
                Not sure where to start?
              </h2>
              <p className="mt-3 max-w-2xl text-white/75">
                Start with <strong className="text-white">Beginners Boxing</strong> on Monday or Friday at 6pm, or an{" "}
                <strong className="text-white">All Levels</strong> session at the weekend. A £10 class pass is all you
                need — no membership, no pressure.
              </p>
            </div>
            <ButtonLink href="/start" size="lg">
              First-timer guide
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
