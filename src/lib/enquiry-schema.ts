import { z } from "zod";

const phone = z
  .string()
  .trim()
  .max(30)
  .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone number")
  .or(z.literal(""));

const base = {
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.email("Enter a valid email address").max(120),
  phone,
  /** Honeypot — real people never fill this in. */
  company: z.string().max(0).optional().or(z.literal("")),
};

export const ptEnquirySchema = z.object({
  type: z.literal("pt"),
  ...base,
  goals: z.array(z.string()).min(1, "Pick at least one goal"),
  experience: z.enum(["None", "Some", "Amateur", "Professional"], { message: "Choose your experience" }),
  coach: z.enum(["No preference", "Gary Tarleton", "Kieran Tarleton"]),
  format: z.enum(["1:1", "2:1 / 1:2", "Small group", "Not sure"]),
  times: z.array(z.string()).min(1, "Pick at least one time"),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  type: z.literal("contact"),
  ...base,
  topic: z.enum(["General question", "Membership", "Kids classes", "Personal training", "Other"]),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(1500),
});

export const enquirySchema = z.discriminatedUnion("type", [ptEnquirySchema, contactSchema]);

export type PtEnquiry = z.infer<typeof ptEnquirySchema>;
export type ContactEnquiry = z.infer<typeof contactSchema>;
export type Enquiry = z.infer<typeof enquirySchema>;

export type EnquiryResponse =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
