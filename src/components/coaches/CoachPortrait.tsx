import Image from "next/image";
import type { Coach } from "@/content/coaches";
import { brand } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

/**
 * Shows the coach's real photo when supplied (coaches.ts → photo).
 * Until then, a branded monogram — never a stock face standing in for a real person.
 * The monogram is SVG so it scales from a 64px avatar to a full card.
 */
export function CoachPortrait({
  coach,
  sizes = "50vw",
  variant = "card",
}: {
  coach: Coach;
  sizes?: string;
  variant?: "card" | "avatar";
}) {
  if (coach.photo) return <Photo media={coach.photo} sizes={sizes} />;
  const gradId = `chrome-${coach.id}-${variant}`;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#2a2a2a_0%,#0f0f0f_60%,#0a0a0a_100%)]">
      {variant === "card" && (
        <>
          <div className="rope-lines absolute inset-0 opacity-70" aria-hidden />
          <Image
            src={brand.gloves.src}
            alt=""
            width={brand.gloves.width}
            height={brand.gloves.height}
            className="absolute right-[6%] top-[6%] w-[22%] opacity-40 mix-blend-lighten"
          />
        </>
      )}
      <svg
        aria-hidden
        viewBox="0 0 100 60"
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          variant === "card" ? "top-[14%] w-[78%]" : "top-1/2 w-[86%] -translate-y-1/2",
        )}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#d9dbdf" />
            <stop offset="62%" stopColor="#8e939b" />
            <stop offset="100%" stopColor="#e9eaec" />
          </linearGradient>
        </defs>
        <text
          x="50"
          y="50"
          textAnchor="middle"
          fill={`url(#${gradId})`}
          fillOpacity={variant === "card" ? 0.22 : 0.9}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontStretch: "125%", fontSize: 52 }}
        >
          {coach.initials}
        </text>
      </svg>
    </div>
  );
}
