import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  title = (
    <>
      Your first round
      <br />
      <span className="text-red-bright">starts here.</span>
    </>
  ),
  intro = "Try any class for £10 — no membership needed. Book online in under a minute.",
}: {
  title?: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-y border-line">
      <div className="absolute inset-0 -z-10">
        <Photo media={media.punch} sizes="100vw" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-deep/50 via-transparent to-transparent mix-blend-multiply" />
      </div>
      <div className="container-x section-y">
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display text-[clamp(3rem,9vw,7.5rem)] text-white">{title}</h2>
            <p className="mt-6 max-w-xl text-lg text-white/80">{intro}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:w-72 lg:shrink-0 lg:flex-col">
            <ButtonLink href="/booking" size="lg">
              Book a session
            </ButtonLink>
            <ButtonLink href="/start" variant="outline" size="lg">
              New? Start here
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
