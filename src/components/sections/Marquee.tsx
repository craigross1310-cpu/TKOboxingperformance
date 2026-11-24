export function Marquee({ items, tone = "red" }: { items: string[]; tone?: "red" | "dark" }) {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden
      className={
        tone === "red"
          ? "relative overflow-hidden border-y border-red-deep bg-red py-4 text-white"
          : "relative overflow-hidden border-y border-line bg-coal py-4 text-white/80"
      }
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none">
        {row.map((item, i) => (
          <span key={i} className="display-tight flex items-center gap-10 text-xl md:text-2xl">
            {item}
            <span className="inline-block size-2 rotate-45 bg-current opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
