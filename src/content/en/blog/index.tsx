export type BlogMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  file: () => Promise<{ default: string }>;
};

export const BLOGS: BlogMeta[] = [
  {
    slug: "measuring-bias-in-ai-systems-part-3",
    title: "Measuring Bias in AI Systems Using Norwegian Language and Context, Part 3",
    date: "2026-02-11",
    excerpt: "Why Norwegian bias measurements produce different outcomes than English ones.",
    file: () => import("./measuring-bias-in-ai-systems-part-3.md?raw"),
  },
  {
    slug: "six-months-left-ai-act-article-10",
    title: "Six Months Left: The Significance of the AI Act Article 10 and Why NAIE Is Launching Now",
    date: "2026-02-05",
    excerpt: "On February 2, Norsk AI-Etikkforening (NAIE) was launched. On the same day, there were six months left until key parts of the EU AI Act enter into force.",
    file: () => import("./six-months-left-ai-act-article-10.md?raw"),
  },
  {
    slug: "measuring-bias-in-ai-systems-part-2",
    title: "Measuring Bias in AI Systems Using Norwegian Language and Context, Part 2",
    date: "2025-09-15",
    excerpt: "Why Norwegian bias measurements produce different outcomes than English ones.",
    file: () => import("./measuring-bias-in-ai-systems-part-2.md?raw"),
  },
  {
    slug: "measuring-bias-in-ai-systems-part-1",
    title: "Measuring Bias in AI Systems Using Norwegian Language and Context, Part 1",
    date: "2025-03-22",
    excerpt: "Why Norwegian bias measurements produce different outcomes than English ones.",
    file: () => import("./measuring-bias-in-ai-systems-part-1.md?raw"),
  },
  // add more posts here...
];