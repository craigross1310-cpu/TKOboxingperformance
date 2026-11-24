/**
 * Every photograph on the site is referenced from here, so swapping in TKO's
 * own photography is a one-file change: drop the files into
 * /public/images/tko/ and update `src` (and `alt`) below.
 *
 * `placeholder: true` marks licensed Unsplash stock used for the demo until
 * the gym's own Instagram photography is supplied.
 */

export type Media = {
  src: string;
  alt: string;
  placeholder?: boolean;
  /** CSS object-position for art direction, e.g. "50% 30%" */
  position?: string;
};

const stock = (file: string, alt: string, position?: string): Media => ({
  src: `/images/stock/${file}.jpg`,
  alt,
  placeholder: true,
  position,
});

export const media = {
  heroRingWalk: stock("ring-walk", "A boxer walking towards a lit ring", "50% 55%"),
  punch: stock("punch-bw", "A boxer landing a straight punch, in black and white", "60% 40%"),
  padsCoach: stock("pads-coach", "A coach holding pads for a boxer during a pad session", "45% 35%"),
  sparring: stock("sparring", "Two boxers in head guards sparring", "50% 35%"),
  ring: stock("boxing-ring", "A boxing ring inside a training gym", "50% 60%"),
  glovesMat: stock("gloves-mat", "A pair of boxing gloves resting on the gym floor"),
  glovesFloor: stock("gloves-floor", "Black boxing gloves on a gym mat"),
  deadlift: stock("deadlift", "An athlete setting up a barbell deadlift", "50% 60%"),
  barbell: stock("barbell-bw", "A loaded barbell on a gym floor, in black and white"),
  barbellWoman: stock("barbell-woman", "A woman training with a barbell across her shoulders", "50% 30%"),
  deadliftDark: stock("deadlift-dark", "An athlete gripping a barbell in a dark gym"),
  dumbbells: stock("dumbbells", "A rack of dumbbells"),
  battleRopes: stock("battle-ropes", "An athlete working battle ropes", "60% 50%"),
  kettlebell: stock("kettlebell", "An athlete training in a dark strength gym", "50% 30%"),
  boxerWoman: stock("boxer-woman", "A female boxer in guard with gloves raised", "50% 30%"),
  handGrip: stock("hand-grip", "A close-up of a hand gripping a climbing rope"),
  gymFloor: stock("gym-floor", "A strength training floor with racks and weights"),
} satisfies Record<string, Media>;

export const brand = {
  logo: { src: "/brand/tko-logo.jpg", alt: "TKO Boxing & Performance Centre logo", width: 881, height: 1200 },
  gloves: { src: "/brand/tko-gloves.png", alt: "", width: 400, height: 438 },
};
