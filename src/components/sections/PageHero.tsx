import type { ReactNode } from "react";
import type { Media } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Inner-page hero: cinematic image, oversized title, optional actions. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: Media;
  children?: ReactNode;
  index?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden pb-16 pt-[calc(var(--header-h)+5rem)] md:min-h-[72vh] md:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns">
          <Photo media={image} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>
      {index && (
        <span
          aria-hidden
          className="display outline-text pointer-events-none absolute -right-4 top-[calc(var(--header-h)+1rem)] text-[clamp(6rem,22vw,18rem)] leading-none opacity-40"
        >
          {index}
        </span>
      )}
      <div className="container-x">
        <div className="max-w-4xl">
          <Eyebrow className="mb-6 animate-fade-up">{eyebrow}</Eyebrow>
          <h1 className="display animate-fade-up text-[clamp(3.2rem,11vw,8.5rem)] text-white [animation-delay:80ms]">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/80 [animation-delay:160ms] md:text-xl">
              {intro}
            </p>
          )}
          {children && (
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
