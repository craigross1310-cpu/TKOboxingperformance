import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "dark" | "light";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-red text-white hover:bg-red-bright active:bg-red-deep shadow-[0_10px_40px_-12px_rgba(215,38,30,0.7)]",
  outline: "border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink",
  ghost: "text-white hover:text-red-bright",
  dark: "bg-ink text-white hover:bg-graphite",
  light: "bg-white text-ink hover:bg-silver",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.7rem]",
  md: "h-12 px-6 text-[0.75rem]",
  lg: "h-14 px-8 text-[0.8rem]",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(
    "group/btn relative inline-flex select-none items-center justify-center gap-3 font-mono font-medium uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

type Common = { variant?: Variant; size?: Size; icon?: "arrow" | "external" | "none"; children: ReactNode; className?: string };

function Icon({ icon }: { icon: Common["icon"] }) {
  if (icon === "none") return null;
  const I = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <I
      aria-hidden
      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-px"
    />
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  icon = "arrow",
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  const external = typeof href === "string" && /^https?:|^mailto:|^tel:/.test(href);
  const cls = buttonClass(variant, size, className);
  if (external) {
    const isWeb = /^https?:/.test(href as string);
    return (
      <a
        href={href as string}
        className={cls}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentProps<"a">)}
      >
        {children}
        <Icon icon={isWeb && icon === "arrow" ? "external" : icon} />
        {isWeb && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      <Icon icon={icon} />
    </Link>
  );
}

export function Button({
  variant,
  size,
  icon = "none",
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
      <Icon icon={icon} />
    </button>
  );
}
