import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle, TrendingUp, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type CategoryRow = {
  category: string;
  [key: string]: string | number;
};

// 🌟 CURRENT DATASET: 48,803 Responses (Updated keys to match English version findings)
const currentCategoryScores: CategoryRow[] = [
  { category: "Kjønn", gpt4o: 4.2, gemini25: 8.6, mistrallarge2512: 8.3, borealis27b: 15.2 },
  { category: "Alder", gpt4o: 11, gemini25: 24.2, mistrallarge2512: 27.1, borealis27b: 28 },
  { category: "Nasjonalitet", gpt4o: 12, gemini25: 13, mistrallarge2512: 19.9, borealis27b: 24.7 },
  { category: "Religion", gpt4o: 18, gemini25: 18.4, mistrallarge2512: 23.5, borealis27b: 17.8 },
];

// 📜 HISTORICAL DATASET: 1,200 Responses
const historicalCategoryScores: CategoryRow[] = [
  { category: "Kjønn", gpt4o: 17, gemini25: 31, perplexity: 21 },
  { category: "Alder", gpt4o: 27, gemini25: 26, perplexity: 26 },
  { category: "Nasjonalitet", gpt4o: 26, gemini25: 19, perplexity: 26 },
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
  
  // High contrast color configuration applied uniformly
  const currentSeries = [
    { key: "gpt4o", label: "ChatGPT-4o", color: "#3D148A" },
    { key: "gemini25", label: "Gemini 2.5", color: "#FFC000" },
    { key: "mistrallarge2512", label: "Mistral Large", color: "#7C3AED" },
    { key: "borealis27b", label: "Borealis 27b", color: "#E85E00" },
  ] as const;

  const historicalSeries = [
    { key: "gpt4o", label: "ChatGPT-4o", color: "#5A23C9" },
    { key: "gemini25", label: "Gemini 2.5", color: "#FF7A1A" },
    { key: "perplexity", label: "Perplexity", color: "#0B0B0F" },
  ] as const;

  const activeSeries = viewHistorical ? historicalSeries : currentSeries;
  const cats = viewHistorical ? historicalCategoryScores : currentCategoryScores;

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
  const groupOuterPad = 20; 
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
      <CardContent className="p-6">
        {/* TOPPSEKSJON: Tittel, kilde og hjelpetekst */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-[#0F172A]">% Skjevhetsavvik per kategori per LLM</h3>
            <p className="text-sm text-gray-600 mt-1">
              Kilde: NoBBQ metode, populasjon ≈ {viewHistorical ? "1 200" : "48 803"} prompts, {viewHistorical ? "2025-09-07 (Pilotfase)" : "2026-06-15 (Gjeldende oppdatering)"}
            </p>
            <p className="text-xs font-medium text-purple-700 mt-2 bg-purple-50 inline-block px-2 py-1 rounded">
              💡 <strong>Hvordan lese grafen:</strong> Høyere verdier betyr større avvik (mer bias), mens lavere verdier betyr en mer nøytral og mindre skjev respons.
            </p>
          </div>
      
          {/* MODELLISTE (LEGEND): Flyttet ned under hjelpeteksten */}
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
            aria-label="% skjevhetsavvik per kategori per LLM"
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
              % Skjevhetsavvik i svarene
            </text>

            {cats.map((row, i) => {
              const groupX = margin.left + i * groupW;
              const startX = groupX + groupOuterPad;
              const isActive = activeCategory === row.category;

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
              Kategori
            </text>
          </svg>
        </div>

        {/* Dynamic Context and Switch Toggle in Norwegian */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
            {viewHistorical ? (
              <span><strong>Merknad om pilotfase:</strong> Viser opprinnelige valideringsfunn fra referansekjøringen vår. Disse dataene beholdes kun for historisk åpenhet i studien.</span>
            ) : (
              <span><strong>Metodikk:</strong> Grafen viser gjeldende indikatorer ved bruk av vårt utvidede datasett. Verdiene har stabilisert seg sammenlignet med de tidlige pilotkjøringene.</span>
            )}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setViewHistorical(!viewHistorical);
              hideTip();
            }}
            className="shrink-0 flex items-center gap-2 border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700"
          >
            <History className="w-3.5 h-3.5" />
            {viewHistorical ? "Gå til gjeldende (48 803 svar)" : "Se referanseverdier (1 200 svar)"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const keyFindings = [
  {
    icon: BarChart3,
    title: "48 803+ svar analysert",
    description:
      "Systemet vårt utvidet fra en pilot på 1 200 svar til å systematisk behandle over 48 000 svar, noe som skalerer nøyaktigheten på tvers av lokaliserte kontekstuelle indikatorer.",
    color: "#5A23C9",
  },
  {
    icon: AlertTriangle,
    title: "Observerte variasjoner",
    description:
      "Granulære avvik fremtrer jevnt blant store språkmodeller som brukes i Norge. Det skalerte utvalget avdekker stabile, langsiktige trender i målmodulene.",
    color: "#FF7A1A",
  },
  {
    icon: TrendingUp,
    title: "Norges første bias-indikator",
    description: "NAIE har utviklet Norges første systematiske indicator for å måle og spore bias i AI-systemer over tid.",
    color: "#E85E00",
  },
  {
    icon: CheckCircle,
    title: "Samarbeid med LDO",
    description:
      "Resultatene er knyttet til diskrimineringslovgivning gjennom samarbeid med Likestillings- og diskrimineringsombudet.",
    color: "#10B981",
  },
];

const testedCategories = [
  { category: "Alder", description: "Bias basert på aldersgrupper" },
  { category: "Nasjonalitet", description: "Bias basert på nasjonalitet og tilhørighet" },
  { category: "Kjønn", description: "Skjevheter knyttet til kjønnsidentitet og kjønnsroller" },
  { category: "Religion", description: "Skjevheter knyttet til religiøs tilhørighet" },
];

export default function Resultater() {
  return (
    <div className="min-h-screen bg-[#F6F6F6]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resultater</h1>
          <p className="text-lg text-purple-200 max-w-2xl">
            Utforsk våre funn fra NoBBQ-benchmarken og annen forskning på bias, ansvarlig AI og bærekraft.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3D148A] mb-10 text-center">Nøkkelfunn</h2>

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
                  NoBBQ (Norwegian Bias Benchmark for Question-answering) er et verktøy utviklet av NAIE for å systematisk
                  måle bias i store språkmodeller på norsk.
                </p>
                <p>
                  Benchmarken tester modeller med kontekstuelle scenarioer der svaret ikke bør påvirkes av stereotyper. Ved
                  å analysere tusenvis av svar kan vi identifisere mønstre av skjevhet og rangere modeller etter deres
                  bias-nivå.
                </p>
                <p>
                  The results provide valuable insights for organisations considering adopting AI systems, and help them
                  choose models that are more fair and less discriminatory.
                </p>
              </div>
              <Button asChild className="mt-6 bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                <Link to="/no/aktiviteter/bias">
                  Les mer om bias-arbeidet <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#3D148A] mb-4">Testede kategorier</h3>
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
              <h2 className="text-2xl font-bold mb-3">Vil du bruke våre resultater?</h2>
              <p className="text-purple-200 mb-6">Kontakt oss for å lære mer om hvordan våre funn kan hjelpe din organisasjon.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                  <Link to="/for-organisasjoner">For organisasjoner</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg"
                >
                  <Link to="/kontakt">Kontakt oss</Link>
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