export const BRAND = {
  first: "First Principles",
  second: "Research",
  full: "First Principles Research",
  tagline: "Demergers: The Value Unlock",
};

export interface ChapterMeta {
  n: number;
  slug: string;
  label: string; // "01 / 10"
  kicker: string; // mono micro-label
  title: string;
  blurb: string;
}

/**
 * The narrative arc. One argument, hook -> history -> mechanics -> players ->
 * thesis. Each chapter route is a self-contained dual-mode deck.
 */
export const CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    slug: "the-hook",
    label: "01 / 10",
    kicker: "The Question",
    title: "A Demerger Destroys Nothing And Creates Billions",
    blurb:
      "Splitting a company in two does not shrink it. It reprices it. The reframe that starts everything.",
  },
  {
    n: 2,
    slug: "where-it-began",
    label: "02 / 10",
    kicker: "The Origin",
    title: "The Conglomerate Era And Its Undoing",
    blurb:
      "How the empires of the 1960s became the breakups of the 1990s, and the study that proved it paid.",
  },
  {
    n: 3,
    slug: "the-mechanics",
    label: "03 / 10",
    kicker: "How It Works",
    title: "Anatomy Of A Spin-Off",
    blurb:
      "Parent, spin-co, share distribution, listing. The plumbing of separation, made visible.",
  },
  {
    n: 4,
    slug: "the-catalyst",
    label: "04 / 10",
    kicker: "The Turning Point",
    title: "Why Boards Pull The Trigger",
    blurb:
      "Focus, capital allocation, the conglomerate discount, and the activist knocking at the door.",
  },
  {
    n: 5,
    slug: "the-misconception",
    label: "05 / 10",
    kicker: "The Misread",
    title: "It Is Not Financial Engineering",
    blurb:
      "The obvious take is wrong. The value is not in the accounting. It is in the incentives.",
  },
  {
    n: 6,
    slug: "the-alpha-engine",
    label: "06 / 10",
    kicker: "The Core",
    title: "The Alpha Engine",
    blurb:
      "Forced selling, orphaned small-caps, aligned insiders. Why the numbers keep favoring the spun-off.",
  },
  {
    n: 7,
    slug: "case-studies",
    label: "07 / 10",
    kicker: "The Evidence",
    title: "Learning Through Case Studies",
    blurb:
      "Significant wealth creators, moderate outcomes, and disappointments. Why separations win or fail.",
  },
  {
    n: 8,
    slug: "global-comparison",
    label: "08 / 10",
    kicker: "The Field",
    title: "Demergers Across Borders",
    blurb:
      "The United States, Europe, and India. Same logic, very different tax and regulatory terrain.",
  },
  {
    n: 9,
    slug: "what-most-people-miss",
    label: "09 / 10",
    kicker: "Live Analysis",
    title: "Dissecting a Live Demerger",
    blurb:
      "Analyzing a live ongoing demerger from scratch, going through annual reports, scheme documents, and valuations.",
  },
  {
    n: 10,
    slug: "the-opportunity",
    label: "10 / 10",
    kicker: "Common Pitfalls",
    title: "Investor Mistakes & Pitfalls",
    blurb:
      "Ending the course with the mistakes that repeatedly show up in the market, and the final thesis takeaway.",
  },
];

export const chapterHref = (slug: string) => `/chapters/${slug}`;

export const getChapter = (slug: string) =>
  CHAPTERS.find((c) => c.slug === slug);

export const nextChapter = (slug: string) => {
  const i = CHAPTERS.findIndex((c) => c.slug === slug);
  return i >= 0 && i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : undefined;
};
