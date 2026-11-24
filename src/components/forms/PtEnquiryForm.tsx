"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ptEnquirySchema, type PtEnquiry } from "@/lib/enquiry-schema";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup, Field, Honeypot, inputClass } from "./fields";
import { FormSuccess } from "./FormSuccess";
import { useEnquiry } from "./useEnquiry";

const GOALS = ["Learn to box", "Get fitter", "Lose weight", "Build strength", "Fight / competition prep", "Confidence"] as const;
const EXPERIENCE = ["None", "Some", "Amateur", "Professional"] as const;
const FORMATS = ["1:1", "2:1 / 1:2", "Small group", "Not sure"] as const;
const TIMES = ["Early morning", "Daytime", "Evening", "Weekend"] as const;
const COACHES = ["No preference", "Gary Tarleton", "Kieran Tarleton"] as const;

type Values = Omit<PtEnquiry, "type" | "experience"> & { experience: PtEnquiry["experience"] | "" };

const coachFromParam = (p: string | null): (typeof COACHES)[number] =>
  p === "gary-tarleton" ? "Gary Tarleton" : p === "kieran-tarleton" ? "Kieran Tarleton" : "No preference";

export function PtEnquiryFormWithParams() {
  const params = useSearchParams();
  return <PtEnquiryForm key={params.get("coach") ?? "none"} defaultCoach={coachFromParam(params.get("coach"))} />;
}

export function PtEnquiryForm({ defaultCoach = "No preference" }: { defaultCoach?: (typeof COACHES)[number] }) {
  const initial: Values = {
    name: "",
    email: "",
    phone: "",
    company: "",
    goals: [],
    experience: "",
    coach: defaultCoach,
    format: "Not sure",
    times: [],
    message: "",
  };
  const [v, setV] = useState<Values>(initial);
  const { state, setState, errors, submit, clearError } = useEnquiry(ptEnquirySchema);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV((cur) => ({ ...cur, [key]: value }));
    clearError(key as string);
  };

  if (state.status === "success") {
    const body = [
      `Name: ${v.name}`,
      `Phone: ${v.phone || "—"}`,
      `Goals: ${v.goals.join(", ")}`,
      `Experience: ${v.experience}`,
      `Preferred coach: ${v.coach}`,
      `Format: ${v.format}`,
      `Preferred times: ${v.times.join(", ")}`,
      "",
      v.message ?? "",
    ].join("\n");
    return (
      <FormSuccess
        delivered={state.delivered}
        name={v.name}
        subject={`PT enquiry — ${v.name}`}
        mailBody={body}
        onReset={() => {
          setV(initial);
          setState({ status: "idle" });
        }}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit({ type: "pt", ...v });
      }}
      className="relative grid gap-8"
    >
      <Honeypot value={v.company ?? ""} onChange={(x) => set("company", x)} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          {(p) => <input {...p} className={inputClass} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} />}
        </Field>
        <Field label="Email" error={errors.email}>
          {(p) => (
            <input {...p} type="email" inputMode="email" autoComplete="email" className={inputClass} value={v.email} onChange={(e) => set("email", e.target.value)} />
          )}
        </Field>
        <Field label="Phone" optional error={errors.phone} hint="So a coach can call you back">
          {(p) => (
            <input {...p} type="tel" inputMode="tel" autoComplete="tel" className={inputClass} value={v.phone} onChange={(e) => set("phone", e.target.value)} />
          )}
        </Field>
        <Field label="Preferred coach" error={errors.coach}>
          {(p) => (
            <select {...p} className={inputClass} value={v.coach} onChange={(e) => set("coach", e.target.value as Values["coach"])}>
              {COACHES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <ChoiceGroup legend="Training goals" options={GOALS} value={v.goals} multiple onChange={(x) => set("goals", x as string[])} error={errors.goals} />
      <ChoiceGroup legend="Boxing experience" options={EXPERIENCE} value={v.experience} onChange={(x) => set("experience", x as Values["experience"])} error={errors.experience} />
      <ChoiceGroup legend="Session format" options={FORMATS} value={v.format} onChange={(x) => set("format", x as Values["format"])} error={errors.format} />
      <ChoiceGroup legend="Preferred times" options={TIMES} value={v.times} multiple onChange={(x) => set("times", x as string[])} error={errors.times} />

      <Field label="Anything else?" optional error={errors.message}>
        {(p) => (
          <textarea
            {...p}
            rows={4}
            className={`${inputClass} h-auto py-3`}
            placeholder="Injuries, upcoming fights, goals, availability…"
            value={v.message}
            onChange={(e) => set("message", e.target.value)}
          />
        )}
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-steel">We only use your details to reply to this enquiry.</p>
        <Button type="submit" size="lg" disabled={state.status === "submitting"} className="w-full sm:w-auto">
          {state.status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            "Send PT enquiry"
          )}
        </Button>
      </div>
      {state.status === "error" && (
        <p role="alert" className="border border-red/50 bg-red/10 p-4 text-sm text-white">
          {state.message}
        </p>
      )}
    </form>
  );
}
