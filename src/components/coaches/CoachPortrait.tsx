import Image from "next/image";
import type { Coach } from "@/content/coaches";
import { brand } from "@/content/media";
import { Photo } from "@/components/ui/Photo";

/**
 * Shows the coach's real photo when supplied (coaches.ts → photo).
 * Until then, a branded monogram — never a stock face standing in for a real person.
 */
export function CoachPortrait({ coach, sizes = "50vw" }: { coach: Coach; sizes?: string }) {
  if (coach.photo) return <Photo media={coach.photo} sizes={sizes} />;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#2a2a2a_0%,#0f0f0f_60%,#0a0a0a_100%)]">
      <div className="rope-lines absolute inset-0 opacity-70" aria-hidden />
      <Image
        src={brand.gloves.src}
        alt=""
        width={brand.gloves.width}
        height={brand.gloves.height}
        className="absolute left-1/2 top-[8%] w-[46%] -translate-x-1/2 opacity-25 mix-blend-lighten"
      />
      <span
        aria-hidden
        className="display chrome-text absolute inset-x-0 bottom-[14%] text-center text-[clamp(5rem,16vw,9rem)] leading-none"
      >
        {coach.initials}
      </span>
    </div>
  );
}
