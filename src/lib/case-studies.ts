export interface CaseStudy {
  id: string;
  parent: string;
  spin: string;
  year: string;
  region: string;
  headline: string;
  summary: string;
  takeaway: string;
  stats: { value: number; label: string; suffix?: string; prefix?: string }[];
}

/**
 * Four well-known separations, used both by the case-studies chapter deck and
 * the /case-studies overview grid. Figures are directional and rounded for
 * narrative purposes.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ebay-paypal",
    parent: "eBay",
    spin: "PayPal",
    year: "2015",
    region: "United States",
    headline: "The child that outgrew the parent",
    summary:
      "eBay spun off PayPal after an activist campaign argued the payments business was being throttled inside a marketplace. Freed to sign deals with rivals, PayPal compounded into a company far larger than the parent that once owned it.",
    takeaway:
      "A high-growth unit trapped in a mature parent is the classic setup. Independence removed the conflict that stopped PayPal from partnering with eBay's competitors.",
    stats: [
      { value: 47, prefix: "$", suffix: "B", label: "PayPal value at spin" },
      { value: 4, suffix: "x", label: "Approx. later peak vs spin" },
      { value: 1, suffix: " activist", label: "Campaign that forced it" },
    ],
  },
  {
    id: "ge-breakup",
    parent: "General Electric",
    spin: "Aerospace, HealthCare, Vernova",
    year: "2021 to 2024",
    region: "United States",
    headline: "An empire chooses three clean stories",
    summary:
      "The original American conglomerate ended the debate by splitting into three focused public companies: aviation, healthcare, and energy. Each got its own board, balance sheet, and investor base after decades of a holding-company discount.",
    takeaway:
      "Even the archetypal conglomerate concluded that three understandable businesses would be valued higher than one unmodelable whole.",
    stats: [
      { value: 3, suffix: " cos", label: "Independent listings" },
      { value: 100, prefix: "$", suffix: "B+", label: "Combined value unlocked" },
      { value: 130, suffix: " yrs", label: "Of conglomerate, ended" },
    ],
  },
  {
    id: "reliance-jio-financial",
    parent: "Reliance Industries",
    spin: "Jio Financial Services",
    year: "2023",
    region: "India",
    headline: "A financial arm, handed to shareholders",
    summary:
      "Reliance demerged its financial services business into a separately listed Jio Financial Services, distributing shares to existing holders. Index funds tracking Reliance faced mechanical selling of the new entity, a textbook forced-seller moment in the Indian market.",
    takeaway:
      "The clearest recent example of the forced-selling engine in India: a large-cap parent, a newly listed child, and benchmark funds that could not hold it.",
    stats: [
      { value: 1, suffix: " : 1", label: "Distribution ratio" },
      { value: 20, prefix: "$", suffix: "B+", label: "Spin-co scale" },
      { value: 1, suffix: "st", label: "Of a wave in India" },
    ],
  },
  {
    id: "fiat-ferrari",
    parent: "Fiat Chrysler",
    spin: "Ferrari",
    year: "2015 to 2016",
    region: "Europe",
    headline: "A luxury jewel, finally priced as one",
    summary:
      "Ferrari was carved out and then fully separated from Fiat Chrysler. As a standalone, the market repriced it not as a carmaker but as a luxury brand, a multiple its industrial parent could never command.",
    takeaway:
      "Separation let the market apply the right lens. A luxury franchise buried in an auto group was worth a fraction of a luxury franchise standing alone.",
    stats: [
      { value: 10, prefix: "$", suffix: "B", label: "Ferrari value at spin" },
      { value: 5, suffix: "x", label: "Approx. later re-rating" },
      { value: 1, suffix: " lens", label: "Luxury, not autos" },
    ],
  },
];

export const getCaseStudy = (id: string) =>
  CASE_STUDIES.find((c) => c.id === id);
