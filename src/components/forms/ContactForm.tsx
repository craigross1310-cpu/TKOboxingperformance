"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactEnquiry } from "@/lib/enquiry-schema";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, inputClass } from "./fields";
import { FormSuccess } from "./FormSuccess";
import { useEnquiry } from "./useEnquiry";

const TOPICS = ["General question", "Membership", "Kids classes", "Personal training", "Other"] as const;
type Values = Omit<ContactEnquiry, "type">;
type Topic = (typeof TOPICS)[number];

const topicFromParam = (p: string | null): Topic =>
  p === "kids" ? "Kids classes" : p === "membership" ? "Membership" : p === "pt" ? "Personal training" : "General question";

export function ContactFormWithParams() {
  const params = useSearchParams();
  const topic = params.get("topic");
  return <ContactForm key={topic ?? "none"} defaultTopic={topicFromParam(topic)} />;
}

export function ContactForm({ defaultTopic = "General question" }: { defaultTopic?: Topic }) {
  const initial: Values = { name: "", email: "", phone: "", company: "", topic: defaultTopic, message: "" };
  const [v, setV] = useState<Values>(initial);
  const { state, setState, errors, submit, clearError } = useEnquiry(contactSchema);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV((cur) => ({ ...cur, [key]: value }));
    clearError(key as string);
  };

  if (state.status === "success") {
    return (
      <FormSuccess
        delivered={state.delivered}
        name={v.name}
        subject={`${v.topic} — ${v.name}`}
        mailBody={`${v.message}\n\n${v.name}\n${v.phone ?? ""}`}
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
        submit({ type: "contact", ...v });
      }}
      className="relative grid gap-6"
    >
      <Honeypot value={v.company ?? ""} onChange={(x) => set("company", x)} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          {(p) => <input {...p} autoComplete="name" className={inputClass} value={v.name} onChange={(e) => set("name", e.target.value)} />}
        </Field>
        <Field label="Email" error={errors.email}>
          {(p) => <input {...p} type="email" autoComplete="email" className={inputClass} value={v.email} onChange={(e) => set("email", e.target.value)} />}
        </Field>
        <Field label="Phone" optional error={errors.phone}>
          {(p) => <input {...p} type="tel" autoComplete="tel" className={inputClass} value={v.phone} onChange={(e) => set("phone", e.target.value)} />}
        </Field>
        <Field label="Topic" error={errors.topic}>
          {(p) => (
            <select {...p} className={inputClass} value={v.topic} onChange={(e) => set("topic", e.target.value as Values["topic"])}>
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <Field label="Message" error={errors.message}>
        {(p) => (
          <textarea {...p} rows={5} className={`${inputClass} h-auto py-3`} value={v.message} onChange={(e) => set("message", e.target.value)} />
        )}
      </Field>
      <Button type="submit" size="lg" disabled={state.status === "submitting"} className="w-full sm:w-auto sm:justify-self-start">
        {state.status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      {state.status === "error" && (
        <p role="alert" className="border border-red/50 bg-red/10 p-4 text-sm text-white">
          {state.message}
        </p>
      )}
    </form>
  );
}
