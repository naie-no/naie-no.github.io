import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle, TrendingUp, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Adjusted type definition to cleanly match dynamic indexing
type CategoryRow = {
  category: string;
  [key: string]: string | number;
};

// 🌟 CURRENT DATASET: 48,803 Responses
const currentCategoryScores: CategoryRow[] = [
  { category: "Gender", gpt4o: 4.2, gemini25: 8.6, mistrallarge2512: 8.3, borealis27b: 15.2 },
  { category: "Age", gpt4o: 11, gemini25: 24.2, mistrallarge2512: 27.1, borealis27b: 28 },
  { category: "Nationality", gpt4o: 12, gemini25: 13, mistrallarge2512: 19.9, borealis27b: 24.7 },
  { category: "Religion", gpt4o: 18, gemini25: 18.4, mistrallarge2512: 23.5, borealis27b: 17.8 },
];

// 📜 HISTORICAL DATASET: 1,200 Responses 
const historicalCategoryScores: CategoryRow[] = [
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
  const [viewHistorical, setViewHistorical] = useState(false);
  
  // 🟢 Separate Series Configs per Dataset View so bars match the data context perfectly
  const currentSeries = [
    { key: "gpt4o", label: "ChatGPT-4o", color: "#3D148A" },
    { key: "gemini25", label: "Gemini 2.5", color: "#FFC000" },
    { key: "mistrallarge2512", label: "Mistral Large", color: "#7C3AED" }, // Given unique color
    { key: "borealis27b", label: "Borealis 27b", color: "#E85E00" },      // Given unique color
  ] as const;

  const historicalSeries = [
    { key: "gpt4o", label: "ChatGPT-4o", color: "#5A23C9" },
    { key: "gemini25", label: "Gemini 2.5", color: "#FF7A1A" },
    { key: "perplexity", label: "Perplexity", color: "#0B0B0F" },
  ] as const;

  const activeSeries = viewHistorical ? historicalSeries : currentSeries;
  const cats = viewHistorical ? historicalCategoryScores : currentCategoryScores;

  // Dynamically calculate max value based on active series keys
  const maxValue = Math.max(
    ...cats.flatMap((d) => activeSeries.map((s) => (d[s.key] as number) || 0))
  ) || 1;

  const yMax = Math.max(40, Math.ceil(maxValue / 5) * 5);
  const yStep = 5;
  const yTicks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);

  const width = 980;
  const height = 420;
  const margin = { top: 24, right: 170, bottom: 86, left: 78 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  const catCount = cats.length;
  const groupW = plotW / catCount;
  const groupOuterPad = 20; // Lowered slightly to make room for 4 concurrent bars
  const barGap = 3;
  const barsPerGroup = activeSeries.length;

  const barW = Math.max(
    10,
    (groupW - groupOuterPad * 2 - barGap * (barsPerGroup - 1)) / barsPerGroup,
  );

  const yToSvg = (v: number) => margin.top + (plotH - (v / yMax) * plotH);
  const hToSvg = (v: number) => (v / yMax) * plotH;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSeriesKey, setActiveSeriesKey] = useState<string | null>(null);
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
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    return {
      x: clamp(rawX + 14, 10, rect.width - 240),
      y: clamp(rawY - 24, 10, rect.height - 70)
    };
  };

  const showTip = (
    e: ReactMouseEvent,
    category: string,
    seriesKey: string,
    model: string,
    value: number,
  ) => {
    setActiveCategory(category);
    setActiveSeriesKey(seriesKey);
    const pos = positionTip(e);
    setTip({ visible: true, x: pos.x, y: pos.y, category, model, value });
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
      // Inside your GroupedVerticalBarChart return statement:
	    <CardContent className="p-6">
	    {/* TOP SECTION: Title and Source/Guide */}
	    <div className="flex flex-col gap-4">
	   	 <div>
	   	 <h3 className="text-2xl font-extrabold text-[#0F172A]">% Bias Deviation per Category per LLM</h3>
	   	 <p className="text-sm text-gray-600 mt-1">
	   		 Source: NoBBQ method, population ≈ {viewHistorical ? "1,200" : "48,803"} prompts
	   	 </p>
	   	 <p className="text-xs font-medium text-purple-700 mt-2 bg-purple-50 inline-block px-2 py-1 rounded">
	   		 💡 <strong>How to read:</strong> Higher values indicate greater bias deviation, while lower values represent a more unbiased, neutral response.
	   	 </p>
	   	 </div>
	    
	   	 {/* LEGEND SECTION: Pushed below the guide */}
	   	 <div className="flex items-center gap-6 flex-wrap mt-2">
	   	 {activeSeries.map((s) => {
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

            <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + plotH} stroke="#111827" strokeWidth="1.5" opacity="0.55" />
            <line x1={margin.left} y1={margin.top + plotH} x2={width - margin.right} y2={margin.top + plotH} stroke="#111827" strokeWidth="1.5" opacity="0.55" />

            <text x={22} y={margin.top + plotH / 2} transform={`rotate(-90 22 ${margin.top + plotH / 2})`} fontSize="12" fill="#111827" opacity="0.95">
              % Bias deviation in the answers
            </text>

            {cats.map((row, i) => {
              const groupX = margin.left + i * groupW;
              const startX = groupX + groupOuterPad;
              const isActive = activeCategory === row.category;

              // 🛠️ FIX: Map over activeSeries directly so it reads all keys dynamically from data rows
              const values = activeSeries.map((s) => ({
                key: s.key,
                value: (row[s.key] as number) || 0,
                label: s.label,
                color: s.color,
              }));

              return (
                <g key={row.category}>
                  {isActive && (
                    <rect x={groupX + 6} y={margin.top} width={groupW - 12} height={plotH} fill="#5A23C9" opacity="0.06" rx="8" />
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
                            ? isActiveSeries ? 1 : 0.22
                            : isSomeCategoryActive ? isActiveCategory ? 1 : 0.6 : 0.98
                        }
                        rx="2"
                        style={{ cursor: "default" }}
                        onMouseEnter={(e) => showTip(e, row.category, v.key, v.label, v.value)}
                        onMouseMove={(e) => showTip(e, row.category, v.key, v.label, v.value)}
                      >
                        <title>{`${row.category}\n${v.label}: ${v.value}`}</title>
                      </rect>
                    );
                  })}

                  <text x={groupX + groupW / 2} y={margin.top + plotH + 42} textAnchor="middle" fontSize="14" fill="#111827">
                    {row.category}
                  </text>
                </g>
              );
            })}

            <text x={margin.left + plotW / 2} y={height - 20} textAnchor="middle" fontSize="12" fill="#111827" opacity="0.95">
              Category
            </text>
          </svg>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
            {viewHistorical ? (
              <span><strong>Pilot Phase Data Notice:</strong> Displaying original validation findings from our baseline run. These data entries are maintained strictly for study evolution transparency.</span>
            ) : (
              <span><strong>Methodology Note:</strong> This graph displays live indicators using our expanded dataset. Values have statistically settled compared to our early pilot runs.</span>
            )}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setViewHistorical(!viewHistorical);
              hideTip(); // Clear state variables on change to prevent invalid key crashes
            }}
            className="shrink-0 flex items-center gap-2 border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700"
          >
            <History className="w-3.5 h-3.5" />
            {viewHistorical ? "Switch to current (48,803 responses)" : "View baseline (1,200 responses)"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const keyFindings = [
  {
    icon: BarChart3,
    title: "48,803+ responses analyzed",
    description:
      "Our system expanded from a 1,200 response pilot to systematically processing over 48k responses, scaling accuracy across localized contextual indicators.",
    color: "#5A23C9",
  },
  {
    icon: AlertTriangle,
    title: "Observed variations",
    description:
      "Granular deviations emerge uniformly within large language models utilized across Norway. The scaled sample reveals stable long-tail trends in target modules.",
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
                  The results provide valuable insights for organisations considering adopting AI systems, and help them
                  choose models that are more fair and less discriminatory.
                </p>
              </div>
              <Button asChild className="mt-6 bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                <Link to="/en/activities/bias">
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
              <p className="text-purple-200 mb-6">Contact us to learn more about how our findings can help your organisation.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                  <Link to="/en/for-organisations">For organisations</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg"
                >
                  <Link to="/en/contact">Contact us</Link>
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