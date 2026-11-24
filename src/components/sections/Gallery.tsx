"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { gallery } from "@/content/media";
import { Modal } from "@/components/ui/Modal";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? gallery[index] : null;

  return (
    <>
      <div className="grid grid-flow-row-dense auto-rows-[10rem] grid-cols-2 gap-2 sm:auto-rows-[14rem] md:grid-cols-4 md:gap-3 lg:auto-rows-[16rem]">
        {gallery.map((g, i) => (
          <Reveal
            key={g.media.src + i}
            delay={(i % 4) * 80}
            className={cn(g.span === "tall" && "row-span-2", g.span === "wide" && "col-span-2")}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block size-full overflow-hidden bg-char"
              aria-label={`View photo: ${g.caption}`}
            >
              <Photo
                media={g.media}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white">
                {g.caption}
              </span>
              <Expand className="absolute right-3 top-3 size-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </Reveal>
        ))}
      </div>

      <Modal open={index !== null} onClose={close} title={current?.caption ?? "Photo"}>
        {current && (
          <figure className="relative">
            <div className="relative aspect-[4/3] w-full bg-ink sm:aspect-[16/10]">
              <Photo media={current.media} sizes="(min-width: 640px) 48rem, 100vw" className="!object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 p-4">
              <span className="eyebrow text-white">{current.caption}</span>
              <span className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="inline-flex size-11 items-center justify-center border border-line hover:border-white">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="inline-flex size-11 items-center justify-center border border-line hover:border-white">
                  <ChevronRight className="size-5" />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </>
  );
}
