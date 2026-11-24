/**
 * Coach profiles — written from each coach's own profile on the gym's TeamUp
 * booking page. Nothing has been added beyond what they state publicly.
 * Add `photo` once real portraits are supplied (see media.ts).
 */

import type { Media } from "./media";

export type Coach = {
  id: "gary-tarleton" | "kieran-tarleton";
  name: string;
  initials: string;
  role: string;
  headline: string;
  bio: string[];
  quote?: string;
  credentials: string[];
  specialities: string[];
  personalTraining: string;
  experience: string;
  photo?: Media;
  instagram?: string;
};

export const coaches: Coach[] = [
  {
    id: "gary-tarleton",
    name: "Gary Tarleton",
    initials: "GT",
    role: "Gym Owner · Professional Boxing Coach · S&C Specialist",
    headline: "20+ years in boxing and fitness. BBBC-licensed coach and cornerman.",
    bio: [
      "Gary is a seasoned coach and the owner of TKO — a family-run gym he coaches alongside his son, Kieran. He has over 20 years of experience in the boxing and fitness industry.",
      "He holds a British Boxing Board of Control (BBBC) professional licence as both a coach and a licensed cornerman, and is a licensed professional hand wrapper.",
      "Gary specialises in strength and conditioning, technical boxing and performance coaching across all levels — from beginners to professionals — and brings expertise, energy and dedication to every session, whether it’s 1:1, 1:2 or a small or large group.",
    ],
    credentials: [
      "20+ years industry experience",
      "BBBC Professional Licensed Coach & Cornerman",
      "Licensed Professional Hand Wrapper",
      "Strength & Conditioning Specialist",
    ],
    specialities: ["Strength & conditioning", "Technical boxing", "Performance coaching", "Amateur to pro"],
    personalTraining: "1:1 and 1:2 personal training, plus small and large group sessions.",
    experience: "20+ years",
  },
  {
    id: "kieran-tarleton",
    name: "Kieran Tarleton",
    initials: "KT",
    role: "Retired Professional Boxer · Full-time Coach & PT",
    headline: "Gary’s son. Former professional boxer with 13 years in the sport.",
    bio: [
      "Kieran is Gary’s son and a retired professional boxer with 13 years of experience in the sport.",
      "After retiring from professional boxing, he put all of his passion for the sport into coaching. He’s now a full-time personal trainer and coach.",
      "Kieran trains everyone from complete beginners to amateur boxers and seasoned professionals.",
    ],
    quote: "I love helping people become the best version of themselves through the sport I love.",
    credentials: ["Retired professional boxer", "13 years in boxing", "Full-time coach & personal trainer"],
    specialities: ["Boxing technique", "Pad work", "Sparring", "Beginners to pros"],
    personalTraining: "1-1, 2-1 and small group personal training.",
    experience: "13 years",
  },
];

export function getCoach(id: string) {
  return coaches.find((c) => c.id === id);
}

export const coachLabel = (ids: string[]) =>
  ids.length ? ids.map((id) => getCoach(id)?.name.split(" ")[0]).filter(Boolean).join(" & ") : "TKO coaching team";
