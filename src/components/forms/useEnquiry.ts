"use client";

import { useState } from "react";
import type { ZodType } from "zod";
import type { EnquiryResponse } from "@/lib/enquiry-schema";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; delivered: boolean }
  | { status: "error"; message: string };

/** Validates on the client with the same zod schema as the API, then posts. */
export function useEnquiry<T>(schema: ZodType<T>) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(values: unknown) {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) fe[String(issue.path[0])] ??= issue.message;
      setErrors(fe);
      setState({ status: "error", message: "Please check the highlighted fields." });
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }
    setErrors({});
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as EnquiryResponse;
      if (data.ok) setState({ status: "success", delivered: data.delivered });
      else {
        setErrors(data.fieldErrors ?? {});
        setState({ status: "error", message: data.error });
      }
    } catch {
      setState({ status: "error", message: "Network error — please try again, or call or email us." });
    }
  }

  const clearError = (key: string) =>
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });

  return { state, setState, errors, submit, clearError };
}
