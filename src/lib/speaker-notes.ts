export interface SpeakerNote {
  title: string;
  notes: string[];
}

/**
 * Private speaker notes for the home presenter console, keyed by chapter number.
 * Prefix a line with HOOK:, METRIC:, or TRANSITION: to have it auto-styled.
 */
export const SPEAKER_NOTES: Record<number, SpeakerNote> = {
  1: {
    title: "The Hook",
    notes: [
      "HOOK: Open cold. A demerger destroys nothing and creates billions. Let it land.",
      "The core idea: splitting a company does not shrink it, it reprices it.",
      "METRIC: One plus one equals three. Markets pay a premium for clarity.",
      "TRANSITION: If clarity alone adds billions, how did this become a machine?",
    ],
  },
  2: {
    title: "Where It Began",
    notes: [
      "Set the scene: the 1960s conglomerate era. Bigger meant safer, until it did not.",
      "METRIC: The 1993 Cusatis, Miles and Woolridge study. Both parents and spin-offs beat the market.",
      "Diversification was oversold. Investors can diversify for free.",
      "TRANSITION: History proved it pays. Now open the machine.",
    ],
  },
  3: {
    title: "The Mechanics",
    notes: [
      "Walk the five steps: board vote, Form 10, distribution, when-issued, listing.",
      "METRIC: One-for-three ratio, zero cash, zero tax on a qualifying spin.",
      "Emphasize: you already owned it. The spin is a second stock handed to you.",
      "TRANSITION: Now you know how. The sharper question is why a board would ever do it.",
    ],
  },
  4: {
    title: "The Catalyst",
    notes: [
      "Four drivers: focus, capital allocation, closing the discount, activist pressure.",
      "HOOK: No board separates for elegance. They do it when the discount gets loud.",
      "METRIC: Roughly forty break-up campaigns per year.",
      "TRANSITION: But the common story about where value comes from is wrong.",
    ],
  },
  5: {
    title: "The Misconception",
    notes: [
      "Concede the skeptic's point: same assets, new wrapper. On assets alone, true.",
      "HOOK: A house sells for more once you turn the lights on.",
      "Value lives in incentives, forced sellers, and the coverage gap.",
      "TRANSITION: If the edge is behavioral, there is a repeatable engine underneath.",
    ],
  },
  6: {
    title: "The Alpha Engine",
    notes: [
      "The technical core. Four engines: forced selling, insider alignment, neglect, cleaner parent.",
      "METRIC: Strongest signal is a spin-co where insiders bought at the open.",
      "METRIC: Most repricing lands inside twenty-four months.",
      "TRANSITION: The engine is universal. The terrain is not.",
    ],
  },
  7: {
    title: "Global Comparison",
    notes: [
      "US, Europe, India. Same logic, different friction.",
      "The regulator row matters most: SEC Form 10 versus India's NCLT scheme.",
      "METRIC: India is the fastest-growing arena for separations.",
      "TRANSITION: Watch it play out on the tape.",
    ],
  },
  8: {
    title: "Case Studies",
    notes: [
      "Four separations: eBay and PayPal, GE, Reliance and Jio Financial, Fiat and Ferrari.",
      "PayPal: the child that outgrew the parent.",
      "Reliance and Jio Financial: the textbook forced-seller moment in India.",
      "TRANSITION: One repeating shape. Now the part almost everyone overlooks.",
    ],
  },
  9: {
    title: "What Most People Miss",
    notes: [
      "The blind spot: everyone watches the spin-co and stops.",
      "Four overlooked layers: the parent stub, the tax-free distribution, the window, the insider.",
      "METRIC: Insider open-market buying, roughly a threefold edge.",
      "TRANSITION: The edge is behavioral, structural, and timed. Turn it into a strategy.",
    ],
  },
  10: {
    title: "The Opportunity",
    notes: [
      "The four-step playbook: screen, read the structure, wait for forced selling, follow insiders.",
      "METRIC: Eighty-plus separations a year, a self-renewing pool.",
      "HOOK: Value is never destroyed in a demerger. It is finally set free.",
      "Close with the invitation, not the hard sell.",
    ],
  },
};
