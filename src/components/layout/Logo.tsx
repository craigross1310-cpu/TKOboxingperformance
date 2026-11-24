import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/media";
import { cn } from "@/lib/cn";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="TKO Boxing & Performance Centre — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <Image
        src={brand.gloves.src}
        alt=""
        width={40}
        height={44}
        priority
        className="h-9 w-auto transition-transform duration-500 group-hover:-rotate-6"
      />
      <span className="flex flex-col leading-none">
        <span className="display chrome-text text-[1.65rem] tracking-[0.02em]">TKO</span>
        <span className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.24em] text-steel">
          Boxing &amp; Performance
        </span>
      </span>
    </Link>
  );
}
