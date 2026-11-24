import { media, type Media } from "./media";

/**
 * Class library — sourced from the class types the gym has published on its
 * TeamUp booking page (descriptions lightly edited for length and typos).
 * `teamupOfferingTypeId` links each class to the live TeamUp schedule.
 *
 * `onTimetable: true` means the class appeared on the public TeamUp schedule
 * every week from late Sept to Dec 2026. Others exist on TeamUp but are not
 * currently scheduled — they are listed as "ask about dates".
 */

export type CategoryId = "boxing" | "sparring" | "strength" | "conditioning" | "kids";

export const categories: Record<
  CategoryId,
  { label: string; short: string; color: string; blurb: string }
> = {
  boxing: {
    label: "Boxing",
    short: "Boxing",
    color: "var(--cat-boxing)",
    blurb: "Technique, pads and bag work for every level.",
  },
  sparring: {
    label: "Sparring",
    short: "Sparring",
    color: "var(--cat-sparring)",
    blurb: "Supervised ring time to put it all together.",
  },
  strength: {
    label: "Strength & Conditioning",
    short: "S&C",
    color: "var(--cat-strength)",
    blurb: "Barbells, power and athletic performance.",
  },
  conditioning: {
    label: "Circuits & Conditioning",
    short: "Circuits",
    color: "var(--cat-conditioning)",
    blurb: "High-energy circuits that build an engine.",
  },
  kids: {
    label: "Kids & Juniors",
    short: "Kids",
    color: "var(--cat-kids)",
    blurb: "Confidence, coordination and fun for ages 7–15.",
  },
};

export type Level = "Beginner" | "All levels" | "Intermediate" | "Advanced";

export type GymClass = {
  slug: string;
  name: string;
  teamupOfferingTypeId: number;
  category: CategoryId;
  level: Level;
  durationMins: number;
  minAge?: number;
  maxAge?: number;
  summary: string;
  description: string;
  focus: string[];
  suitableFor: string;
  coaches: ("gary-tarleton" | "kieran-tarleton")[];
  image: Media;
  onTimetable: boolean;
  bring?: string;
  passNote?: string;
};

export const classes: GymClass[] = [
  {
    slug: "beginners-boxing",
    name: "Beginners Boxing",
    teamupOfferingTypeId: 271966,
    category: "boxing",
    level: "Beginner",
    durationMins: 60,
    minAge: 16,
    summary: "New to boxing? Start here.",
    description:
      "This beginner-friendly class teaches the basics — skipping, stance, footwork, shadow boxing, punch technique and simple combos — in a fun, supportive environment. Build confidence, fitness and skills at your own pace.",
    focus: ["Stance & footwork", "Punch technique", "Simple combinations", "Fitness"],
    suitableFor: "Complete beginners and anyone returning to boxing.",
    coaches: ["gary-tarleton", "kieran-tarleton"],
    image: media.skipping,
    onTimetable: true,
  },
  {
    slug: "pads-class",
    name: "Pads Class",
    teamupOfferingTypeId: 271978,
    category: "boxing",
    level: "All levels",
    durationMins: 60,
    minAge: 16,
    summary: "Fast hands, sharp combos, serious energy.",
    description:
      "Perfect your punch technique while you crush your fitness goals. Work through intense pad drills designed to improve speed, power and endurance — a great way to burn calories, build strength and sharpen your punches in one fast-paced session.",
    focus: ["Speed", "Power", "Combinations", "Endurance"],
    suitableFor: "All levels — the 6am session is the early-riser favourite.",
    coaches: ["gary-tarleton", "kieran-tarleton"],
    image: media.padsCoach,
    onTimetable: true,
  },
  {
    slug: "pads-and-bags",
    name: "Pads & Bags",
    teamupOfferingTypeId: 273921,
    category: "boxing",
    level: "All levels",
    durationMins: 60,
    summary: "Pad work and bag drills, power-packed.",
    description:
      "A power-packed boxing session combining pad work and bag drills to improve speed, power and technique. Perfect for all fitness levels.",
    focus: ["Pad work", "Heavy bag", "Technique", "Power"],
    suitableFor: "All fitness levels.",
    coaches: ["gary-tarleton", "kieran-tarleton"],
    image: media.glovesMat,
    onTimetable: true,
  },
  {
    slug: "pads-bags-circuits",
    name: "Pads, Bags & Circuits",
    teamupOfferingTypeId: 291624,
    category: "boxing",
    level: "All levels",
    durationMins: 60,
    summary: "Boxing skills meets strength circuits.",
    description:
      "A high-energy mix of pad work, bag drills and strength circuits. Build power, stamina and endurance while sharpening your boxing skills.",
    focus: ["Boxing skills", "Strength circuits", "Stamina"],
    suitableFor: "Anyone who wants boxing and a full-body workout in one hour.",
    coaches: [],
    image: media.punch,
    onTimetable: true,
  },
  {
    slug: "all-levels-boxing",
    name: "All Levels Boxing",
    teamupOfferingTypeId: 271981,
    category: "boxing",
    level: "All levels",
    durationMins: 60,
    minAge: 16,
    summary: "Fundamentals, drills and pads — adapted to you.",
    description:
      "Whether you’re a total beginner or a seasoned puncher, this class brings the heat. Learn solid boxing fundamentals, improve technique and boost your fitness with a mix of drills, combos and pad work, all adapted to your individual level.",
    focus: ["Fundamentals", "Technique", "Pad work", "Fitness"],
    suitableFor: "Everyone — the Sunday morning session.",
    coaches: ["gary-tarleton"],
    image: media.ring,
    onTimetable: true,
  },
  {
    slug: "all-levels-sparring",
    name: "TKO All Levels Sparring",
    teamupOfferingTypeId: 271987,
    category: "sparring",
    level: "All levels",
    durationMins: 60,
    summary: "Step into the ring under expert supervision.",
    description:
      "Take your skills to the next level. Whether you’re new to sparring or experienced, this session offers a supportive environment to practise technique, timing and ring strategy. Under the guidance of experienced coaches you’ll spar at your own pace, improving confidence and control in the ring.",
    focus: ["Timing", "Ring strategy", "Defence", "Confidence"],
    suitableFor: "Boxers of various skill levels. Capped at 10 places.",
    coaches: ["gary-tarleton", "kieran-tarleton"],
    image: media.sparring,
    onTimetable: true,
    bring: "Your own gloves and hand wraps.",
    passNote: "A valid Saturday Sparring Pass (£10) or membership is essential for all participants.",
  },
  {
    slug: "boxing-strength-conditioning",
    name: "Boxing Strength & Conditioning",
    teamupOfferingTypeId: 271984,
    category: "strength",
    level: "Advanced",
    durationMins: 60,
    minAge: 16,
    summary: "Build the strength to back up your boxing.",
    description:
      "An advanced session targeting full-body power using barbells, dumbbells, resistance work and explosive lifts. Perfect for improving punch force, stability and overall athletic performance.",
    focus: ["Explosive power", "Barbell strength", "Stability", "Punch force"],
    suitableFor: "Boxers and athletes who want to perform — some lifting experience helps.",
    coaches: [],
    image: media.deadlift,
    onTimetable: true,
  },
  {
    slug: "tko-circuit",
    name: "TKO Circuit",
    teamupOfferingTypeId: 273919,
    category: "conditioning",
    level: "All levels",
    durationMins: 60,
    minAge: 16,
    summary: "Push your limits. Build all-round fitness.",
    description:
      "A high-energy circuit class combining strength, cardio and core work. A full-body workout using functional equipment, bodyweight movements and timed stations. Expect variety, intensity and results.",
    focus: ["Strength", "Cardio", "Core", "Timed stations"],
    suitableFor: "All fitness levels.",
    coaches: [],
    image: media.battleRopes,
    onTimetable: true,
  },
  {
    slug: "tko-hyrox-circuit",
    name: "TKO HYROX Circuit",
    teamupOfferingTypeId: 298852,
    category: "conditioning",
    level: "All levels",
    durationMins: 60,
    summary: "HYROX-style training. No experience needed.",
    description:
      "Take part in TKO’s new HYROX-style circuit, designed to challenge you with a different style of training while delivering a high-calorie burn. Suitable for beginners to advanced — no HYROX experience needed.",
    focus: ["Engine", "Functional fitness", "Race-style stations"],
    suitableFor: "Beginners to advanced.",
    coaches: [],
    image: media.kettlebell,
    onTimetable: true,
  },

  // ——— In the TKO programme, not currently on the weekly schedule ———
  {
    slug: "kids-7-10",
    name: "Kids Boxing — Ages 7–10",
    teamupOfferingTypeId: 282379,
    category: "kids",
    level: "Beginner",
    durationMins: 60,
    minAge: 7,
    maxAge: 10,
    summary: "Moving, learning and smiling.",
    description:
      "A fun, active class that builds confidence, coordination and basic boxing skills — all while burning off that after-school energy. We mix games, drills and lots of movement to keep things exciting. No experience needed.",
    focus: ["Confidence", "Coordination", "Basic skills", "Fun"],
    suitableFor: "Children aged 7–10.",
    coaches: [],
    image: media.glovesFloor,
    onTimetable: false,
    bring: "Water, comfy clothes and listening ears.",
  },
  {
    slug: "kids-11-15",
    name: "Kids Boxing — Ages 11–15",
    teamupOfferingTypeId: 271990,
    category: "kids",
    level: "Beginner",
    durationMins: 60,
    minAge: 11,
    maxAge: 15,
    summary: "Fitness, focus and technique.",
    description:
      "Fun, energy and boxing fundamentals to help build strength, coordination and confidence. Through dynamic drills and friendly competition, young boxers improve their fitness, focus and technique while having a great time.",
    focus: ["Fundamentals", "Fitness", "Focus", "Confidence"],
    suitableFor: "Young people aged 11–15.",
    coaches: [],
    image: media.boxerWoman,
    onTimetable: false,
  },
  {
    slug: "ladies-only-boxing",
    name: "Ladies Only Boxing",
    teamupOfferingTypeId: 271998,
    category: "boxing",
    level: "All levels",
    durationMins: 60,
    minAge: 16,
    summary: "Real boxing skills. No-ego environment.",
    description:
      "Designed to help women of all levels build strength, boost confidence and learn real boxing skills in a supportive, no-ego environment. Expect fun combos, pad work and fitness drills that leave you feeling strong and unstoppable.",
    focus: ["Technique", "Confidence", "Pad work", "Fitness"],
    suitableFor: "Women of all levels.",
    coaches: [],
    image: media.boxerWoman,
    onTimetable: false,
  },
  {
    slug: "technical-boxing",
    name: "Technical Boxing",
    teamupOfferingTypeId: 271980,
    category: "boxing",
    level: "Intermediate",
    durationMins: 60,
    minAge: 16,
    summary: "Precision, footwork and defence.",
    description:
      "Master the craft with a focus on precision and technique. This class breaks down footwork, head movement, punch precision and defensive drills — ideal for boxers who want to refine their form.",
    focus: ["Footwork", "Head movement", "Defence", "Precision"],
    suitableFor: "Boxers with some experience.",
    coaches: [],
    image: media.punch,
    onTimetable: false,
  },
  {
    slug: "advanced-boxing",
    name: "Advanced Boxing",
    teamupOfferingTypeId: 271972,
    category: "boxing",
    level: "Advanced",
    durationMins: 60,
    minAge: 16,
    summary: "Train like a pro.",
    description:
      "A high-level session for experienced fighters: advanced combos, defensive techniques, footwork drills and ring strategy. Strictly for experienced boxers.",
    focus: ["Advanced combos", "Defence", "Ring strategy"],
    suitableFor: "Experienced boxers only.",
    coaches: [],
    image: media.ring,
    onTimetable: false,
  },
  {
    slug: "punch-and-power",
    name: "Punch & Power",
    teamupOfferingTypeId: 271970,
    category: "boxing",
    level: "All levels",
    durationMins: 60,
    minAge: 14,
    summary: "Speed, endurance and knockout power.",
    description:
      "An explosive session combining powerful punch combos, strength circuits and core work to build speed, endurance and serious knockout power — whether you’re training to get lean, feel strong or blow off steam.",
    focus: ["Power", "Core", "Combinations"],
    suitableFor: "Ages 14+, all levels.",
    coaches: [],
    image: media.glovesMat,
    onTimetable: false,
  },
  {
    slug: "kettlebell",
    name: "Kettlebell Class",
    teamupOfferingTypeId: 271982,
    category: "strength",
    level: "All levels",
    durationMins: 60,
    minAge: 16,
    summary: "Swing, press and lift.",
    description:
      "Functional movements and dynamic conditioning to build power, endurance and stability. Expect strength circuits, explosive lifts and core work.",
    focus: ["Power", "Endurance", "Core"],
    suitableFor: "All levels.",
    coaches: [],
    image: media.dumbbells,
    onTimetable: false,
  },
  {
    slug: "mega-circuit",
    name: "Sunday Mega Circuit",
    teamupOfferingTypeId: 272068,
    category: "conditioning",
    level: "All levels",
    durationMins: 60,
    summary: "30 stations. One full-body session.",
    description:
      "Crush calories, build strength and push your limits with a high-energy 30-station circuit. Each station targets a different muscle group, blending strength, cardio and endurance.",
    focus: ["30 stations", "Full body", "Endurance"],
    suitableFor: "All levels.",
    coaches: [],
    image: media.gymFloor,
    onTimetable: false,
  },
];

export const timetableClasses = classes.filter((c) => c.onTimetable);
export const programmeClasses = classes.filter((c) => !c.onTimetable);

export function getClass(slug: string) {
  return classes.find((c) => c.slug === slug);
}

export function getClassByOfferingType(id: number) {
  return classes.find((c) => c.teamupOfferingTypeId === id);
}

/** Other circuit formats published on TeamUp, mentioned (not detailed) on the Classes page. */
export const otherFormats = [
  "Box Burn",
  "Blaze Circuit",
  "Around the Clock Circuit",
  "Full Body Circuit",
  "Upper Body",
  "Lower Body",
  "Push Day",
  "Pull Day",
  "Glutes & Legs",
];
