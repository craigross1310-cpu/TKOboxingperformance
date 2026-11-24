import Image from "next/image";
import type { Media } from "@/content/media";
import { cn } from "@/lib/cn";

/** Brand-graded photograph that fills its (relative) parent. */
export function Photo({
  media,
  sizes = "100vw",
  priority,
  className,
  grade = true,
  alt,
}: {
  media: Media;
  sizes?: string;
  priority?: boolean;
  className?: string;
  grade?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={media.src}
      alt={alt ?? media.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={75}
      className={cn("object-cover", grade && "photo-grade", className)}
      style={{ objectPosition: media.position ?? "50% 50%" }}
    />
  );
}
