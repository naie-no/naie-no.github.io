export type BlogMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  file: () => Promise<{ default: string }>;
};

export const BLOGS: BlogMeta[] = [
  {
    slug: "maling-av-fordommer-i-ai-systemer-del-3",
    title: "Måling av fordommer i AI-systemer ved bruk av norsk språk og kontekst, del 3",
    date: "2026-02-11",
    excerpt: "Hvorfor norske bias-målinger gir andre utslag enn engelske.",
    file: () => import("./maling-av-fordommer-i-ai-systemer-del-3.md?raw"),
  },
  {
    slug: "seks-maneder-igjen-ai-act-artikkel-10",
    title: "Seks måneder igjen: betydningen av AI act artikkel 10 og hvorfor NAIE lanseres nå ",
    date: "2026-02-05",
    excerpt: "Den 2. februar ble Norsk AI-Etikkforening (NAIE) lansert. Samme dag var det seks måneder igjen til sentrale deler av EUs AI Act trer i kraft.",
    file: () => import("./seks-maneder-igjen-ai-act-artikkel-10.md?raw"),
  },
  {
    slug: "maling-av-fordommer-i-ai-systemer-del-2",
    title: "Måling av fordommer i AI-systemer ved bruk av norsk språk og kontekst, del 2",
    date: "2025-09-15",
    excerpt: "Hvorfor norske bias-målinger gir andre utslag enn engelske.",
    file: () => import("./maling-av-fordommer-i-ai-systemer-del-2.md?raw"),
  },
  {
    slug: "maling-av-fordommer-i-ai-systemer-del-1",
    title: "Måling av fordommer i AI-systemer ved bruk av norsk språk og kontekst, del 1",
    date: "2025-03-22",
    excerpt: "Hvorfor norske bias-målinger gir andre utslag enn engelske.",
    file: () => import("./maling-av-fordommer-i-ai-systemer-del-1.md?raw"),
  },
  // add more posts here...
];