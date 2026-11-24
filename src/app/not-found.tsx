import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden pt-[var(--header-h)]">
      <div className="absolute inset-0 -z-10">
        <Photo media={media.glovesFloor} sizes="100vw" />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="container-x py-20">
        <p className="eyebrow text-red-bright">Error 404</p>
        <h1 className="display mt-6 text-[clamp(4rem,16vw,12rem)] text-white">
          Knocked
          <br />
          out.
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/75">That page doesn’t exist — but your next session does.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/timetable" size="lg" variant="outline">
            View timetable
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
