import type { Metadata } from "next";
import { Suspense } from "react";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { getSchedule } from "@/lib/booking";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PassList } from "@/components/sections/MembershipCards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timetable } from "@/components/timetable/Timetable";
import { CategoryLegend } from "@/components/timetable/WeekPreview";

export const metadata: Metadata = {
  title: "Class Timetable — Book Online",
  description:
    "Live weekly class timetable for TKO Boxing & Performance Centre, Glasgow. Filter by class type or coach and book your session online.",
  alternates: { canonical: "/timetable" },
};

async function LiveTimetable() {
  const schedule = await getSchedule();
  return <Timetable schedule={schedule} />;
}

function TimetableSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading timetable" className="animate-pulse">
      <div className="mb-8 h-16 border border-line bg-char/60" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-char" />
        ))}
      </div>
      <div className="mt-8 grid gap-px border border-line bg-line lg:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-64 bg-ink p-3">
            <div className="h-5 w-12 bg-char" />
            <div className="mt-6 h-20 bg-char" />
            <div className="mt-2 h-20 bg-char" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TimetablePage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Timetable"
        title={
          <>
            Find your
            <br />
            session.
          </>
        }
        intro={`Pick a class, tap Book, done. Booking opens ${site.booking.opensDaysBefore} days before each class and closes when it starts.`}
        image={media.ring}
      />

      <section className="pb-20 pt-6 lg:pb-28" aria-label="Weekly timetable">
        <div className="container-x">
          <Suspense fallback={<TimetableSkeleton />}>
            <LiveTimetable />
          </Suspense>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CategoryLegend />
            <p className="text-xs text-steel">
              Times shown in UK time. Please cancel at least {site.booking.cancellationHours} hours before if you can’t
              make it.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-line bg-coal" aria-labelledby="no-membership">
        <div className="container-x">
          <div id="no-membership" className="mb-10">
            <SectionHeading
              eyebrow="No membership?"
              title="Pay as you go."
              intro="Grab a pass, then book your class on the timetable."
              action={
                <ButtonLink href="/membership" variant="outline">
                  Memberships
                </ButtonLink>
              }
            />
          </div>
          <PassList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
