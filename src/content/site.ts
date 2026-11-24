/**
 * TKO Boxing & Performance Centre — core business information.
 *
 * Every value here was taken from a public source on 24 Nov 2026:
 *  - TeamUp business profile (contact, address, description, booking links)
 *  - Apple Maps listing (opening hours)
 *  - Google rating as reported by public directory listings
 *
 * Anything marked `confirm: true` should be checked by the owner before launch.
 * Edit this file to update details everywhere on the site.
 */

export const TEAMUP_PROVIDER_ID = "10870265";
export const TEAMUP_SLUG = "10870265-tko-boxing-performance-ce";
export const TEAMUP_BASE = `https://goteamup.com/p/${TEAMUP_SLUG}`;

export const site = {
  name: "TKO Boxing & Performance Centre",
  shortName: "TKO",
  legalName: "TKO Boxing & Performance Centre Ltd",
  companyNumber: "SC846554",
  tagline: "Real training. Real results. All levels welcome.",
  description:
    "Boxing, strength & conditioning and personal training in Glasgow's East End. Professional and amateur licensed coaches, all levels welcome — men, women and kids.",
  /** Verbatim from the gym's own TeamUp profile. */
  ownDescription: [
    "Looking to get fit, learn how to box, or take your training to the next level? TKO is the place to do it. With professional coaches, experienced boxers, and top-level strength & conditioning support, we’ve got everything you need under one roof.",
    "Whether you’re a total beginner or want to train like a pro, our friendly, focused environment is built to help you feel confident, strong, and motivated every time you walk through the door.",
  ],

  contact: {
    email: "tkoboxing020@gmail.com",
    phoneDisplay: "07472 913333",
    phoneE164: "+447472913333",
  },

  address: {
    line1: "Unit 8",
    line2: "70 Strathclyde Street",
    city: "Glasgow",
    postcode: "G40 4JR",
    country: "GB",
    area: "Glasgow East End",
    // Approximate pin for Strathclyde Street, G40 — confirm exact entrance.
    mapQuery: "TKO Boxing & Performance Centre, Unit 8, 70 Strathclyde Street, Glasgow G40 4JR",
  },

  hours: {
    confirm: true,
    source: "Apple Maps listing",
    rows: [
      { days: "Monday – Friday", open: "06:00", close: "21:00" },
      { days: "Saturday – Sunday", open: "07:00", close: "18:00" },
    ],
  },

  rating: {
    confirm: true,
    value: "5.0",
    count: 12,
    source: "Google",
  },

  social: {
    instagram: "https://www.instagram.com/tkoboxingperformancecentre/",
    instagramHandle: "@tkoboxingperformancecentre",
  },

  booking: {
    platform: "TeamUp",
    schedule: `${TEAMUP_BASE}/c/schedule`,
    memberships: `${TEAMUP_BASE}/memberships/`,
    contact: `${TEAMUP_BASE}/contact/`,
    /** Registrations open 7 days before a class and close at the start time. */
    opensDaysBefore: 7,
    /** Late-cancel window from TeamUp settings (1440 minutes). */
    cancellationHours: 24,
  },

  /**
   * When true, a slim banner explains this is a demo and items awaiting
   * owner confirmation are marked. Set to false for launch.
   */
  demoMode: true,
} as const;

export const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.address.mapQuery,
)}`;
export const googleMapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapQuery,
)}`;
export const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapQuery,
)}&z=15&output=embed`;

export const nav = [
  { href: "/classes", label: "Classes" },
  { href: "/timetable", label: "Timetable" },
  { href: "/coaches", label: "Coaches" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
