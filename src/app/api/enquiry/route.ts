import { site } from "@/content/site";
import { enquirySchema, type Enquiry, type EnquiryResponse } from "@/lib/enquiry-schema";

/**
 * Receives PT and contact enquiries.
 *
 * Delivery: if RESEND_API_KEY is set, the enquiry is emailed to
 * ENQUIRY_TO_EMAIL (defaults to the gym's public address) via Resend.
 * Without it the request is validated and acknowledged with
 * `delivered: false`, and the UI tells the visitor it was NOT sent and
 * offers a pre-filled email instead — no enquiry is silently lost.
 */

function toText(e: Enquiry) {
  const lines = [
    `New ${e.type === "pt" ? "personal training" : "website"} enquiry`,
    "",
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone || "—"}`,
  ];
  if (e.type === "pt") {
    lines.push(
      `Goals: ${e.goals.join(", ")}`,
      `Experience: ${e.experience}`,
      `Preferred coach: ${e.coach}`,
      `Format: ${e.format}`,
      `Preferred times: ${e.times.join(", ")}`,
      "",
      e.message || "",
    );
  } else {
    lines.push(`Topic: ${e.topic}`, "", e.message);
  }
  return lines.join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" } satisfies EnquiryResponse, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return Response.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors } satisfies EnquiryResponse,
      { status: 422 },
    );
  }

  const enquiry = parsed.data;
  // Honeypot tripped: pretend success, do nothing.
  if (enquiry.company) return Response.json({ ok: true, delivered: false } satisfies EnquiryResponse);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: true, delivered: false } satisfies EnquiryResponse);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "TKO Website <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO_EMAIL ?? site.contact.email],
      reply_to: enquiry.email,
      subject: `${enquiry.type === "pt" ? "PT enquiry" : "Website enquiry"} — ${enquiry.name}`,
      text: toText(enquiry),
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] Email delivery failed", res.status);
    return Response.json(
      { ok: false, error: "We couldn’t send that just now. Please email or call us instead." } satisfies EnquiryResponse,
      { status: 502 },
    );
  }

  return Response.json({ ok: true, delivered: true } satisfies EnquiryResponse);
}
