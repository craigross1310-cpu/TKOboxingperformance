/**
 * FAQs. `verified: true` answers come from TKO's own published information
 * (TeamUp class descriptions, membership terms and booking settings).
 * `verified: false` answers are sensible DRAFTS for the owner to approve —
 * they display a small "Draft" tag while site.demoMode is on.
 */

export type FaqCategory = "Getting started" | "Booking & passes" | "Membership" | "Classes & training" | "Visiting";

export type Faq = {
  id: string;
  q: string;
  a: string;
  category: FaqCategory;
  verified: boolean;
  featured?: boolean;
};

export const faqCategories: FaqCategory[] = [
  "Getting started",
  "Booking & passes",
  "Membership",
  "Classes & training",
  "Visiting",
];

export const faqs: Faq[] = [
  {
    id: "experience",
    q: "Do I need boxing experience?",
    a: "No. TKO is all levels — from total beginners to professionals. If you’re new, start with Beginners Boxing (Monday and Friday, 6pm), which teaches skipping, stance, footwork, shadow boxing, punch technique and simple combos at your own pace.",
    category: "Getting started",
    verified: true,
    featured: true,
  },
  {
    id: "try-first",
    q: "Can I try a class before joining?",
    a: "Yes. A 1x Class Pass is £10 and lets you book one class from the timetable (valid for 5 days). There’s also a £10 Gym Day Pass if you’d like to try the gym itself.",
    category: "Getting started",
    verified: true,
    featured: true,
  },
  {
    id: "fitness-levels",
    q: "Are classes suitable for different fitness levels?",
    a: "Yes. Most classes — including Pads, Pads & Bags, All Levels Boxing, TKO Circuit and the HYROX Circuit — are built for all levels, and coaches adapt drills to you. Boxing Strength & Conditioning is the more advanced session.",
    category: "Getting started",
    verified: true,
  },
  {
    id: "age",
    q: "How old do I need to be?",
    a: "Adult classes are generally 16+. TKO has also run dedicated kids’ boxing classes for ages 7–10 and 11–15 — get in touch to ask about the next available dates.",
    category: "Getting started",
    verified: true,
    featured: true,
  },
  {
    id: "how-to-book",
    q: "How do I book a class?",
    a: "Pick a class on our timetable and hit Book — you’ll complete the booking on TeamUp, TKO’s secure booking system. Booking opens 7 days before each class and stays open until the class starts.",
    category: "Booking & passes",
    verified: true,
    featured: true,
  },
  {
    id: "cancel",
    q: "What if I can’t make a session?",
    a: "Please cancel through TeamUp as early as you can. TKO’s booking system asks for at least 24 hours’ notice — cancellations inside 24 hours count as late cancellations.",
    category: "Booking & passes",
    verified: true,
  },
  {
    id: "pay-as-you-go",
    q: "Can I pay for individual sessions?",
    a: "Yes — a 1x Class Pass is £10, a Gym Day Pass is £10 and the Saturday Sparring Pass is £10.",
    category: "Booking & passes",
    verified: true,
  },
  {
    id: "memberships",
    q: "How do memberships work?",
    a: "Memberships are monthly and bought online through TeamUp. TKO Gold (£60/month) gives unlimited classes and gym access; TKO Bronze (£40/month) gives 2 classes a week plus full gym access. A Winter Unlimited offer is currently £40/month. Billing starts on your chosen start date.",
    category: "Membership",
    verified: true,
    featured: true,
  },
  {
    id: "cancel-membership",
    q: "How do I cancel my membership?",
    a: "Memberships require 30 days’ notice before your next billing date to cancel. Memberships are non-transferable.",
    category: "Membership",
    verified: true,
  },
  {
    id: "pt",
    q: "Do you offer personal training?",
    a: "Yes. Gary offers 1:1 and 1:2 personal training, and Kieran offers 1-1, 2-1 and small group sessions — from complete beginners to amateur and professional boxers. Send a PT enquiry and the team will come back to you with availability and pricing.",
    category: "Classes & training",
    verified: true,
    featured: true,
  },
  {
    id: "sparring",
    q: "Do I have to spar?",
    a: "Never. Sparring is a separate Saturday session (11am) and always optional. You’ll need a valid Saturday Sparring Pass or membership, plus your own gloves and hand wraps.",
    category: "Classes & training",
    verified: true,
  },
  {
    id: "what-to-wear",
    q: "What should I wear and bring?",
    a: "Comfortable gym clothes, trainers, a water bottle and a towel. If you have hand wraps, bring them. For sparring you must bring your own gloves and wraps.",
    category: "Classes & training",
    verified: false,
  },
  {
    id: "gloves",
    q: "Do I need my own boxing gloves?",
    a: "For your first classes, speak to the team before you arrive about borrowing gloves. If you keep training, we recommend your own pair of gloves and wraps — the coaches are happy to advise on what to buy.",
    category: "Classes & training",
    verified: false,
  },
  {
    id: "arrive",
    q: "How early should I arrive?",
    a: "Aim to arrive 10–15 minutes before your first class so a coach can say hello, ask about any injuries and get you warmed up.",
    category: "Visiting",
    verified: false,
  },
  {
    id: "where",
    q: "Where is the gym?",
    a: "Unit 8, 70 Strathclyde Street, Glasgow G40 4JR — in Glasgow’s East End.",
    category: "Visiting",
    verified: true,
    featured: true,
  },
  {
    id: "parking",
    q: "Is there parking?",
    a: "Please contact the gym for the latest parking information before your first visit.",
    category: "Visiting",
    verified: false,
  },
];
