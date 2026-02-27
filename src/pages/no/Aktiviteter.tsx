import { Link, useParams } from "react-router-dom";
import { BarChart3, Shield, Leaf, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const activities = {
  overview: {
    title: "Aktiviteter",
    subtitle: "NAIE arbeider med tre hovedpilarer for å fremme etisk og ansvarlig AI i Norge.",
  },
  bias: {
    title: "Bias",
    icon: BarChart3,
    color: "#5A23C9",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/2c507247-45cd-446a-a931-cc2cf506b4f8.png",
    intro: "NAIE undersøker og måler bias i AI-systemer gjennom systematisk testing og benchmarking.",
    sections: [
      {
        title: "NoBBQ – Norwegian Bias Benchmark for Question-answering",
        content:
          "NoBBQ er Norges første benchmark spesifikt designet for å måle bias i store språkmodeller (LLMs) på norsk. Benchmarken tester AI-modeller for skjevheter knyttet til beskyttede kategorier som kjønn, etnisitet, religion, alder, funksjonsevne og seksuell orientering.",
      },
      {
        title: "Hvordan fungerer NoBBQ?",
        content:
          "NoBBQ består av tusenvis av spørsmål designet for å avdekke implisitt og eksplisitt bias i AI-svar. Modellene testes med kontekstuelle scenarioer der svaret ikke bør påvirkes av stereotyper eller fordommer. Vi analyserer svarene systematisk for å identifisere mønstre av skjevhet.",
      },
      {
        title: "Resultater og funn",
        points: [
          "Over 1200 AI-genererte svar har blitt analysert",
          "Signifikante forskjeller i bias-nivåer mellom ulike modeller",
          "Norges første systematiske bias-indikator for AI",
          "Samarbeid med LDO for å knytte funn til diskrimineringslovgivning",
        ],
      },
    ],
  },
  "ansvarlig-ai": {
    title: "Ansvarlig AI",
    icon: Shield,
    color: "#FF7A1A",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/9162907a-6407-4f58-908a-72c3fb328131.png",
    intro: "NAIE fremmer ansvarlig utvikling og bruk av kunstig intelligens gjennom retningslinjer, beste praksis og verktøy.",
    sections: [
      {
        title: "Hva er ansvarlig AI?",
        content:
          "Ansvarlig AI handler om å utvikle og bruke kunstig intelligens på en måte som er etisk, transparent, rettferdig og i tråd med menneskerettigheter og samfunnsverdier. Det innebærer å ta hensyn til potensielle negative konsekvenser og aktivt arbeide for å minimere dem.",
      },
      {
        title: "NAIEs tilnærming",
        content:
          "Vi arbeider med å utvikle praktiske verktøy og retningslinjer som organisasjoner kan bruke for å implementere ansvarlig AI. Dette inkluderer rammeverk for etisk vurdering, sjekklister for AI-prosjekter, og veiledning for transparens og forklarbarhet.",
      },
      {
        title: "Fokusområder",
        points: [
          "Transparens og forklarbarhet i AI-systemer",
          "Rettferdighet og ikke-diskriminering",
          "Personvern og datasikkerhet",
          "Menneskelig kontroll og overstyring",
          "Ansvarlighet og sporbarhet",
        ],
      },
    ],
  },
  baerekraft: {
    title: "Bærekraft",
    icon: Leaf,
    color: "#10B981",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/5dbf5d3e-295f-427b-86d9-cfecd9b430b2.png",
    intro: "NAIE undersøker miljøpåvirkningen av AI-systemer og arbeider for mer bærekraftig AI-utvikling.",
    sections: [
      {
        title: "AI og miljøpåvirkning",
        content:
          "Trening og drift av store AI-modeller krever enorme mengder energi og beregningsressurser. Dette har en betydelig miljøpåvirkning gjennom karbonutslipp, vannforbruk og elektronisk avfall. NAIE arbeider for å synliggjøre og redusere denne påvirkningen.",
      },
      {
        title: "Vårt arbeid",
        content:
          "Vi måler og rapporterer om energiforbruk og karbonavtrykk knyttet til AI-systemer som brukes i Norge. Gjennom forskning og samarbeid utvikler vi anbefalinger for mer bærekraftig AI-praksis.",
      },
      {
        title: "Nøkkeltemaer",
        points: [
          "Energiforbruk ved trening av AI-modeller",
          "Karbonavtrykk fra datasentre",
          "Vannforbruk i kjølesystemer",
          "Bærekraftige alternativer og optimaliseringsteknikker",
          "Rapportering og transparens om miljøpåvirkning",
        ],
      },
    ],
  },
};

type ActivityKey = "bias" | "ansvarlig-ai" | "baerekraft";

export default function Aktiviteter() {
  const { slug } = useParams<{ slug?: string }>();

  const activity = slug ? activities[slug as ActivityKey] : null;

  if (!activity || !slug) {
    return <OverviewPage />;
  }

  const act = activity as typeof activities.bias;

  return (
    <div className="min-h-screen bg-[#F6F6F6]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="absolute inset-0 opacity-15">
          <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D148A]/90 to-[#3D148A]/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="text-purple-200 hover:text-white !bg-transparent mb-4 -ml-3">
            <Link to="/aktiviteter">
              <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til aktiviteter
            </Link>
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${act.color}20` }}>
              <act.icon className="w-7 h-7" style={{ color: act.color }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{act.title}</h1>
          </div>
          <p className="text-lg text-purple-200 max-w-2xl">{act.intro}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {act.sections.map((section, i) => (
            <Card key={i} className="border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#3D148A] mb-4">{section.title}</h2>
                {section.content && (
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                )}
                {section.points && (
                  <ul className="space-y-3 mt-4">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: act.color }} />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#3D148A] mb-4">Utforsk våre resultater</h2>
          <p className="text-gray-600 mb-6">Se hva vi har funnet gjennom vår forskning og analyse.</p>
          <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
            <Link to="/resultater">
              Se resultater <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function OverviewPage() {
  const pillarList: ActivityKey[] = ["bias", "ansvarlig-ai", "baerekraft"];

  return (
    <div className="min-h-screen bg-[#F6F6F6]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />

      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{activities.overview.title}</h1>
          <p className="text-lg text-purple-200 max-w-2xl">{activities.overview.subtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pillarList.map((key) => {
              const act = activities[key] as typeof activities.bias;
              return (
                <Link key={key} to={`/no/aktiviteter/${key}`} className="group">
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${act.color}15` }}>
                          <act.icon className="w-5 h-5" style={{ color: act.color }} />
                        </div>
                        <h3 className="text-xl font-bold text-[#0A0A0A]">{act.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{act.intro}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: act.color }}>
                        Les mer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}