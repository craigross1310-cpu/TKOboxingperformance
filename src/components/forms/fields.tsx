"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass =
  "h-13 w-full border border-line bg-ink px-4 text-base text-white placeholder:text-steel/70 transition-colors focus:border-white/60 focus:outline-none aria-[invalid=true]:border-red-bright";

export function Field({
  label,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/80">
        {label}
        {optional && <span className="normal-case tracking-normal text-steel">Optional</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {error ? (
        <p id={`${id}-err`} className="text-sm text-red-bright" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-steel">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ChoiceGroup({
  legend,
  options,
  value,
  onChange,
  multiple,
  error,
}: {
  legend: string;
  options: readonly string[];
  value: string[] | string;
  onChange: (v: string[] | string) => void;
  multiple?: boolean;
  error?: string;
}) {
  const id = useId();
  const selected = Array.isArray(value) ? value : [value];
  const toggle = (opt: string) => {
    if (!multiple) return onChange(opt);
    const cur = value as string[];
    onChange(cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
  };
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined} aria-invalid={Boolean(error)}>
      <legend className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/80">
        {legend}
        {multiple && <span className="ml-2 normal-case tracking-normal text-steel">Choose any</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              role={multiple ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => toggle(opt)}
              className={cn(
                "min-h-11 border px-4 py-2 text-sm transition-colors",
                on ? "border-white bg-white text-ink" : "border-line text-white/85 hover:border-white/40",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-bright" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Off-screen honeypot field to catch bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute left-[-10000px] top-auto size-px overflow-hidden">
      <label>
        Company
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
