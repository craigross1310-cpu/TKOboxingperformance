import { TEAMUP_BASE } from "./site";

/**
 * Memberships and passes — exactly as published on TKO's TeamUp memberships
 * page (24 Nov 2026). "Buy" links go straight to TeamUp's secure checkout.
 */

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: "month" | "once";
  tagline: string;
  description: string;
  includes: string[];
  href: string;
  highlight?: "popular" | "offer";
  badge?: string;
  terms?: string;
};

const monthlyTerms =
  "Billed monthly from your start date. 30 days’ notice before the next billing date is required to cancel. Non-transferable.";

export const memberships: Plan[] = [
  {
    id: "winter-unlimited",
    name: "Winter Unlimited",
    price: 40,
    period: "month",
    tagline: "Seasonal offer",
    description: "Gym access and unlimited classes for the winter.",
    includes: ["Unlimited group classes", "Full gym access", "Boxing, circuits & S&C"],
    href: `${TEAMUP_BASE}/memberships/291277/`,
    highlight: "offer",
    badge: "Winter offer",
    terms: monthlyTerms,
  },
  {
    id: "gold",
    name: "TKO Gold",
    price: 60,
    period: "month",
    tagline: "Unlimited classes & gym access",
    description:
      "The all-inclusive membership: unlimited access to the gym and all group classes — boxing, circuits, strength training and more. Train as often as you like.",
    includes: ["Unlimited group classes", "Full gym access", "Boxing, circuits & strength", "Train on your terms"],
    href: `${TEAMUP_BASE}/memberships/239185/`,
    highlight: "popular",
    badge: "Full access",
    terms: monthlyTerms,
  },
  {
    id: "bronze",
    name: "TKO Bronze",
    price: 40,
    period: "month",
    tagline: "2 classes a week & full gym access",
    description:
      "Access to the fully equipped gym plus 2 classes per week of your choice — boxing, strength or conditioning. Get fit at your own pace.",
    includes: ["2 classes per week", "Full gym access", "Choose any class type"],
    href: `${TEAMUP_BASE}/memberships/235445/`,
    terms: monthlyTerms,
  },
];

export const passes: Plan[] = [
  {
    id: "class-pass",
    name: "1x Class Pass",
    price: 10,
    period: "once",
    tagline: "Try a class",
    description: "Try any class from the timetable before signing up to a monthly membership.",
    includes: ["Book 1 class", "Valid for 5 days from purchase"],
    href: `${TEAMUP_BASE}/memberships/237703/`,
  },
  {
    id: "day-pass",
    name: "Gym Day Pass",
    price: 10,
    period: "once",
    tagline: "Use the gym",
    description: "Try the gym without committing to a membership and experience the TKO community.",
    includes: ["Full gym access", "Valid for 1 day"],
    href: `${TEAMUP_BASE}/memberships/250432/`,
  },
  {
    id: "sparring-pass",
    name: "Saturday Sparring Pass",
    price: 10,
    period: "once",
    tagline: "Saturday sparring",
    description:
      "Essential for all participants at Saturday sparring. Bring your own gloves and hand wraps.",
    includes: ["Saturday All Levels Sparring", "Valid for 4 days from purchase"],
    href: `${TEAMUP_BASE}/memberships/287527/`,
  },
];

export const formatPrice = (p: Plan) => `£${p.price}`;
