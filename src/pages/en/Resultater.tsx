 import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/**
 * NOTE:
 * - The numbers below are placeholders. Replace with actual results when you publish.
 * - Percentages are used here (% bias deviation) like on naie.no.
 */
type CategoryRow = {
  category: string;
  gpt4o: number;
  gemini25: number;
  perplexity: number;
};

// Placeholder numbers (can be replaced)
const nobbqCategoryScores: CategoryRow[] = [
  { category: "Gender", gpt4o: 17, gemini25: 31, perplexity: 21 },
  { category: "Age", gpt4o: 27, gemini25: 26, perplexity: 26 },
  { category: "Nationality", gpt4o: 26, gemini25: 19, perplexity: 26 },
  { category: "Religion", gpt4o: 20, gemini25: 28, perplexity: 16 },
];

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  category: string;
  model: string;
  value: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function GroupedVerticalBarChart() {
  const series = [
    { key: "gpt4o", label: "ChatGPT-4o", color: "#5A23C9" },
    { key: "gemini25", label: "Gemini 2.5", color: "#FF7A1A" },
    { key: "perplexity", label: "Perplexity", color: "#0B0B0F" },
  ] as const;

  const maxValue =
    Math.max(...nobbqCategoryScores.flatMap((d) => [d.gpt4o, d.gemini25, d.perplexity])) || 1;

  // Nice max for axis, minimum 40 like your example
  const yMax = Math.max(40, Math.ceil(maxValue / 5) * 5);
  const yStep = 5;
  const yTicks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);

  // SVG layout
  const width = 980;
  const height = 420;
  const margin = { top: 24, right: 170, bottom: 86, left: 78 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  const cats = nobbqCategoryScores;
  const catCount = cats.length;

  const groupW = plotW / catCount;

  // ✅ Wider gap BETWEEN categories
  const groupOuterPad = 26; // try 22–40 depending on taste

  // ✅ Tight spacing WITHIN category
  const barGap = 4;

  const barsPerGroup = series.length;

  const barW = Math.max(
    12,
    (groupW - groupOuterPad * 2 - barGap * (barsPerGroup - 1)) / barsPerGroup,
  );

  const yToSvg = (v: number) => margin.top + (plotH - (v / yMax) * plotH);
  const hToSvg = (v: number) => (v / yMax) * plotH;

  // Tooltip handling (HTML tooltip over the SVG, like naie.no)
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSeriesKey, setActiveSeriesKey] = useState<"gpt4o" | "gemini25" | "perplexity" | null>(null);
  const [tip, setTip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    category: "",
    model: "",
    value: 0,
  });

  const positionTip = (e: ReactMouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    // Tooltip box is ~200-240px wide depending on text; clamp to container.
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    const x = clamp(rawX + 14, 10, rect.width - 240);
    const y = clamp(rawY - 24, 10, rect.height - 70);
    return { x, y };
  };

  const showTip = (
    e: ReactMouseEvent,
    category: string,
    seriesKey: "gpt4o" | "gemini25" | "perplexity",
    model: string,
    value: number,
  ) => {
    setActiveCategory(category);
    setActiveSeriesKey(seriesKey);
    const pos = positionTip(e);
    setTip({
      visible: true,
      x: pos.x,
      y: pos.y,
      category,
      model,
      value,
    });
  };

  const moveTip = (e: ReactMouseEvent) => {
    if (!tip.visible) return;
    const pos = positionTip(e);
    setTip((prev) => ({ ...prev, x: pos.x, y: pos.y }));
  };

  const hideTip = () => {
    setActiveCategory(null);
    setActiveSeriesKey(null);
    setTip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <Card className="border-0 shadow-md mb-8">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h3 className="text-2xl font-extrabold text-[#0F172A]">% Bias deviation per category per LLM</h3>
            <p className="text-sm text-gray-600 mt-1">
              Source: NoBBQ method, population ≈ 100 prompts, 2025-09-07
            </p>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            {series.map((s) => {
              const isActiveSeries = activeSeriesKey === s.key;
              const isSomeActive = activeSeriesKey !== null;
              return (
                <div
                  key={s.key}
                  className="flex items-center gap-2"
                  style={{ opacity: isSomeActive ? (isActiveSeries ? 1 : 0.35) : 1 }}
                >
                  <span
                    className="w-4 h-4 rounded-sm"
                    style={{
                      backgroundColor: s.color,
                      outline: isActiveSeries ? "2px solid rgba(15,23,42,0.35)" : "none",
                      outlineOffset: "2px",
                    }}
                  />
                  <span
                    className="text-sm text-gray-700 font-medium"
                    style={{
                      fontWeight: isActiveSeries ? 800 : 600,
                      textDecoration: isActiveSeries ? "underline" : "none",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={wrapRef} className="mt-6 overflow-x-auto relative">
          {/* Tooltip */}
          {tip.visible && (
            <div
              className="absolute z-10 rounded-md border border-gray-200 bg-white shadow-lg px-3 py-2 text-sm"
              style={{ left: tip.x, top: tip.y, pointerEvents: "none" }}
            >
              <div className="font-semibold text-[#0F172A]">{tip.category}</div>
              <div className="text-gray-700">
                {tip.model}: <span className="font-semibold">{tip.value}</span>
              </div>
            </div>
          )}

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full min-w-[980px]"
            role="img"
            aria-label="% bias deviation per category per LLM"
            onMouseMove={moveTip}
            onMouseLeave={hideTip}
          >
            {/* Gridlines + Y tick labels */}
            {yTicks.map((t) => {
              const y = yToSvg(t);
              return (
                <g key={t}>
                  <line
                    x1={margin.left}
                    y1={y}
                    x2={width - margin.right}
                    y2={y}
                    stroke="#D7D7DC"
                    strokeWidth={t === 0 ? 2 : 1}
                  />
                  <text x={margin.left - 12} y={y + 4} textAnchor="end" fontSize="12" fill="#111827">
                    {t}
                  </text>
                </g>
              );
            })}

            {/* Axes */}
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={margin.top + plotH}
              stroke="#111827"
              strokeWidth="1.5"
              opacity="0.55"
            />
            <line
              x1={margin.left}
              y1={margin.top + plotH}
              x2={width - margin.right}
              y2={margin.top + plotH}
              stroke="#111827"
              strokeWidth="1.5"
              opacity="0.55"
            />

            {/* Y axis label */}
            <text
              x={22}
              y={margin.top + plotH / 2}
              transform={`rotate(-90 22 ${margin.top + plotH / 2})`}
              fontSize="12"
              fill="#111827"
              opacity="0.95"
            >
              % Bias deviation in the answers
            </text>

            {/* Bars + category labels */}
            {cats.map((row, i) => {
              const groupX = margin.left + i * groupW;
              const startX = groupX + groupOuterPad;
              const isActive = activeCategory === row.category;

              const values = [
                { key: "gpt4o", value: row.gpt4o, label: series[0].label, color: series[0].color },
                { key: "gemini25", value: row.gemini25, label: series[1].label, color: series[1].color },
                { key: "perplexity", value: row.perplexity, label: series[2].label, color: series[2].color },
              ] as const;

              return (
                <g key={row.category}>
                  {/* ✅ Subtle group highlight on hover */}
                  {isActive && (
                    <rect
                      x={groupX + 6}
                      y={margin.top}
                      width={groupW - 12}
                      height={plotH}
                      fill="#5A23C9"
                      opacity="0.06"
                      rx="8"
                    />
                  )}

                  {values.map((v, j) => {
                    const isSomeSeriesActive = activeSeriesKey !== null;
                    const isActiveSeries = activeSeriesKey === v.key;
                    const isSomeCategoryActive = activeCategory !== null;
                    const isActiveCategory = activeCategory === row.category;

                    const x = startX + j * (barW + barGap);
                    const barH = hToSvg(v.value);
                    const y = margin.top + (plotH - barH);

                    return (
                      <rect
                        key={v.key}
                        x={x}
                        y={y}
                        width={barW}
                        height={barH}
                        fill={v.color}
                        opacity={
                          isSomeSeriesActive
                            ? isActiveSeries
                              ? 1
                              : 0.22
                            : isSomeCategoryActive
                              ? isActiveCategory
                                ? 1
                                : 0.6
                              : 0.98
                        }
                        rx="2"
                        style={{ cursor: "default" }}
                        onMouseEnter={(e) => showTip(e, row.category, v.key, v.label, v.value)}
                        onMouseMove={(e) => showTip(e, row.category, v.key, v.label, v.value)}
                      >
                        {/* Fallback tooltip (native) */}
                        <title>{`${row.category}\n${v.label}: ${v.value}`}</title>
                      </rect>
                    );
                  })}

                  {/* Category label under group */}
                  <text
                    x={groupX + groupW / 2}
                    y={margin.top + plotH + 42}
                    textAnchor="middle"
                    fontSize="14"
                    fill="#111827"
                  >
                    {row.category}
                  </text>
                </g>
              );
            })}

            {/* X axis label */}
            <text
              x={margin.left + plotW / 2}
              y={height - 20}
              textAnchor="middle"
              fontSize="12"
              fill="#111827"
              opacity="0.95"
            >
              Category
            </text>
          </svg>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Preliminary results. The numbers are temporary and will be updated as the dataset and methodology are further developed.
        </p>
      </CardContent>
    </Card>
  );
}

const keyFindings = [
  {
    icon: BarChart3,
    title: "1200+ answers analyzed",
    description:
      "Over 1200 AI-generated answers have been systematically analyzed for bias and skew through the NoBBQ benchmark.",
    color: "#5A23C9",
  },
  {
    icon: AlertTriangle,
    title: "Observed differences",
    description:
      "We observe differences in bias patterns between different large language models used in Norway. Further analysis will show how robust the findings are over time and across datasets.",
    color: "#FF7A1A",
  },
  {
    icon: TrendingUp,
    title: "Norway’s first bias indicator",
    description: "NAIE has developed Norway’s first systematic indicator to measure and track bias in AI systems over time.",
    color: "#E85E00",
  },
  {
    icon: CheckCircle,
    title: "Collaboration with LDO",
    description:
      "The results are linked to anti-discrimination legislation through collaboration with the Equality and Anti-Discrimination Ombud.",
    color: "#10B981",
  },
];

const testedCategories = [
  { category: "Age", description: "Bias based on age groups" },
  { category: "Nationality", description: "Bias based on nationality and belonging" },
  { category: "Gender", description: "Skew related to gender identity and gender roles" },
  { category: "Religion", description: "Skew related to religious affiliation" },
];

export default function Resultater() {
  return (
    <div className="min-h-screen bg-[#F6F6F6]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Results</h1>
          <p className="text-lg text-purple-200 max-w-2xl">
            Explore our findings from the NoBBQ benchmark and other research on bias, responsible AI, and sustainability.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3D148A] mb-10 text-center">Key findings</h2>

          {/* Chart first, like on naie.no */}
          <GroupedVerticalBarChart />

          <div className="grid md:grid-cols-2 gap-6">
            {keyFindings.map((finding) => (
              <Card key={finding.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${finding.color}15` }}
                  >
                    <finding.icon className="w-6 h-6" style={{ color: finding.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D148A] mb-1">{finding.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{finding.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NoBBQ Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#3D148A] mb-6">NoBBQ Benchmark</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  NoBBQ (Norwegian Bias Benchmark for Question-answering) is a tool developed by NAIE to systematically
                  measure bias in large language models in Norwegian.
                </p>
                <p>
                  The benchmark tests models with contextual scenarios where the answer should not be influenced by stereotypes. By
                  analyzing thousands of answers, we can identify patterns of skew and rank models based on their
                  bias level.
                </p>
                <p>
                  The results provide valuable insights for organizations considering adopting AI systems, and help them
                  choose models that are more fair and less discriminatory.
                </p>
              </div>
              <Button asChild className="mt-6 bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                <Link to="/en/aktiviteter/bias">
                  Read more about our bias work <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#3D148A] mb-4">Tested categories</h3>
              <div className="space-y-3">
                {testedCategories.map((cat) => (
                  <Card key={cat.category} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#FF7A1A] rounded-full shrink-0" />
                      <div>
                        <span className="font-semibold text-[#3D148A] text-sm">{cat.category}</span>
                        <span className="text-gray-500 text-sm ml-2">— {cat.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white">
            <CardContent className="p-10">
              <h2 className="text-2xl font-bold mb-3">Do you want to use our results?</h2>
              <p className="text-purple-200 mb-6">Contact us to learn more about how our findings can help your organization.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                  <Link to="/en/for-organisasjoner">For organizations</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg"
                >
                  <Link to="/en/kontakt">Contact us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}