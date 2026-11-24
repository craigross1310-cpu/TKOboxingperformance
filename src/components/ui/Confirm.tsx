import { site } from "@/content/site";

/** Small marker shown in demo mode next to details awaiting owner confirmation. */
export function Confirm({ label = "To be confirmed by TKO" }: { label?: string }) {
  if (!site.demoMode) return null;
  return (
    <span
      title={label}
      aria-label={label}
      className="ml-1.5 inline-flex size-4 translate-y-[-1px] items-center justify-center rounded-full border border-amber-400/60 align-middle text-[0.55rem] font-bold text-amber-300"
    >
      ?
    </span>
  );
}
