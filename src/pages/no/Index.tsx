import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight, BarChart3, Shield, Leaf, TrendingUp, Users, Award, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const pillars = [
  {
    title: "Bias",
    description:
      "Vi undersøker og måler bias i AI-systemer. Gjennom NoBBQ-benchmarken tester vi store språkmodeller for skjevheter knyttet til kjønn, etnisitet, religion og andre beskyttede kategorier.",
    icon: BarChart3,
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/2c507247-45cd-446a-a931-cc2cf506b4f8.png",
    path: "/no/aktiviteter/bias",
    color: "#5A23C9",
  },
  {
    title: "Ansvarlig AI",
    description:
      "Vi fremmer ansvarlig utvikling og bruk av kunstig intelligens i Norge. Vårt arbeid inkluderer retningslinjer, beste praksis og verktøy for etisk AI-implementering.",
    icon: Shield,
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/9162907a-6407-4f58-908a-72c3fb328131.png",
    path: "/no/aktiviteter/ansvarlig-ai",
    color: "#FF7A1A",
  },
  {
    title: "Bærekraft",
    description:
      "Vi undersøker miljøpåvirkningen av AI-systemer og arbeider for mer bærekraftig AI-utvikling. Vi måler og rapporterer om energiforbruk og karbonavtrykk.",
    icon: Leaf,
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/5dbf5d3e-295f-427b-86d9-cfecd9b430b2.png",
    path: "/no/aktiviteter/baerekraft",
    color: "#10B981",
  },
];

const stats = [
  { value: "3", label: "Pilarer", icon: TrendingUp },
  { value: "1200+", label: "AI-svar analysert", icon: BarChart3 },
  { value: "Norges første", label: "Bias-indikator", icon: Award },
  { value: "Samarbeid", label: "med LDO", icon: Users },
];

const questions = [
{
  question: "Hvordan vet vi om et KI-system behandler mennesker i ulike aldre, kjønn eller nasjonaliteter rettferdig?",
  context: "Vi analyserer om språkmodeller gir systematisk ulike svar basert på beskyttede eller sårbare grupper i norsk kontekst.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Hvis KI stille ekskluderer enkelte grupper fra jobbmuligheter, hvem oppdager det — og hvem har ansvaret?",
  context: "Vi undersøker om automatiserte anbefalinger eller vurderinger fører til utilsiktet diskriminering.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Hva skjer når KI-anbefalinger i helse eller velferd er basert på skjeve historiske data?",
  context: "Historiske datasett kan inneholde systematiske skjevheter. Vi tester hvordan dette påvirker moderne KI-systemer.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Hvordan hindrer vi at KI forsterker stereotype oppfatninger i stedet for å utfordre dem?",
  context: "Vi analyserer om KI gjentar eller forsterker etablerte stereotyper i språk og beslutningsstøtte.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Hvis et KI-system misrepresenterer norske mennesker, kultur eller identitet — hvem retter det?",
  context: "Vi undersøker hvordan globale modeller håndterer norsk språk, kultur og samfunnsforhold.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Hvordan kan vi sikre at KI ikke overser minoriteter eller sårbare grupper?",
  context: "Vi tester om modeller systematisk underrepresenterer eller feiltolker bestemte samfunnsgrupper.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Ville du stolt på en beslutning som påvirker livet ditt hvis du ikke forstår hvordan algoritmen kom frem til den?",
  context: "Vi arbeider for større åpenhet og forklarbarhet i KI-systemer som påvirker enkeltmennesker.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Når KI-systemer gjør feil, hvem bør holdes ansvarlig — og hvordan?",
  context: "Vi analyserer ansvarslinjer mellom utviklere, leverandører og organisasjoner som tar KI i bruk.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvor åpne bør offentlige institusjoner være når de bruker KI i barnevern, HR eller skatt?",
  context: "Vi undersøker krav til transparens og dokumentasjon når KI tas i bruk i offentlig sektor.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvordan sikrer vi at KI-løsninger ikke skaper flere problemer enn de løser?",
  context: "Vi vurderer risiko, utilsiktede konsekvenser og behovet for kontinuerlig evaluering av KI-systemer.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Bør KI få være med på å bestemme hvem som får økonomisk støtte, jobb eller bolig?",
  context: "Vi diskuterer hvor grensen bør gå mellom automatiserte anbefalinger og menneskelig skjønn.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvilke sikkerhetsmekanismer trenger vi før skoler eller kommuner begynner å stole på KI?",
  context: "Vi kartlegger krav til testing, dokumentasjon og risikovurdering før KI tas i bruk i sårbare områder.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvordan bør virksomheter teste KI-systemene for å sikre at de ikke diskriminerer utilsiktet?",
  context: "Vi utvikler og tilpasser metodikk for systematisk evaluering av bias og rettferdighet.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvis KI gir råd til en leder i en sensitiv HR-sak, hvordan sikrer vi at rådet er lovlig og rettferdig?",
  context: "Vi analyserer juridiske og etiske implikasjoner ved bruk av KI i beslutningsstøtte.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvor bør grensen gå mellom maskinanbefalinger og menneskelig skjønn?",
  context: "Vi undersøker hvordan samspill mellom menneske og maskin kan struktureres på en ansvarlig måte.",
  pillar: "Ansvarlig AI",
  color: "#FF7A1A",
},
{
  question: "Hvor mye energi skal vi tillate at KI-systemer bruker — og hvem bestemmer hva som er «verdt det»?",
  context: "Vi synliggjør miljøpåvirkningen av trening og drift av store språkmodeller.",
  pillar: "Bærekraft",
  color: "#10B981",
},
{
  question: "Er det ansvarlig å trene stadig større modeller når miljøpåvirkningen er ukjent?",
  context: "Vi undersøker energibruk, ressursforbruk og behovet for mer transparens rundt KI-modellers klimaavtrykk.",
  pillar: "Bærekraft",
  color: "#10B981",
},
];

const milestones = [
  { year: "Feb 2026", title: "NAIE ble lansert til publikum", description: "Den 2. februar 2026 ble Norsk AI-Etikkforening ble lansert til publikum via LinkedIn." },
  { year: "Feb 2026", title: "Kathinka Vik er offisielt med på styret i NAIE", description: "Foreningens styret har blitt utvided med Kathinka Vik, som jobber i LDO." },
  { year: "Sept 2025", title: "NAIE ble stiftet", description: "Norsk AI-Etikkforening ble offisielt etablert som en uavhengig, ideell forening for å fremme etisk AI i Norge. Foreningen ble stiftet av Wessel Braakman (Bouvet ASA), Alejandra Palacio Perez (Bouvet ASA) og Teresa Dalen Herland (REMA1000)" },
  { year: "Sept 2025", title: "Vi lanserer oppdatert NoBBQ benchmark", description: "Den oppdaterte versjonen av NoBBQ inkluderer 400 prompts og 3 AI systemer." },
  { year: "Mar 2025", title: "Vi deler første resultater om NoBBQ benchmark", description: "Vi deler de første resultatene basert på 40 prompts og svar." },
  { year: "Jan 2025", title: "Vi startet oversettelse av BBQ forskningen", description: "Vi kjører en PoC basert på 10 prompts i 4 kategorier (40 totalt)." },
  { year: "2023-2024", title: "Flere foredrag om BIAS i AI systemer", description: "Grunnen til forskningene våre starter tidlig i 2024." },
];

export default function HomePage() {
  // Show a random subset on each page load for readability
  const featuredQuestions = useMemo(() => {
    const copy = [...questions];
    // Fisher–Yates shuffle
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(6, copy.length));
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3D148A] via-[#3D148A] to-[#5A23C9] text-white">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/ad1ba338-c564-4323-8d62-62e122d7bb05.png"
            alt="AI Ethics"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D148A]/90 to-[#3D148A]/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-[#FF7A1A] rounded-full animate-pulse" />
              <span className="text-sm text-purple-200">Norsk AI-Etikkforening</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Etisk kunstig{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-[#E85E00]">
                intelligens
              </span>
            </h1>
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed mb-8 max-w-2xl">
              Uavhengig, ideell forening som leverer statistikk og innsikt om Bias, Bærekraft og Ansvarlig AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg px-6">
                <Link to="/resultater">
                  Se resultater
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg px-6">
                <Link to="/om-oss">Om oss</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-6 h-6 text-[#FF7A1A] mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-[#3D148A]">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Questions That Need Answering */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#ECE7FF] rounded-full px-4 py-1.5 mb-4">
              <HelpCircle className="w-4 h-4 text-[#5A23C9]" />
              <span className="text-sm font-medium text-[#5A23C9]">Hvorfor NAIE finnes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D148A] mb-4">
              Spørsmål som trenger svar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Disse spørsmålene driver vårt arbeid. De er grunnen til at NAIE ble grunnlagt – og de fortjener grundige, uavhengige svar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuestions.map((q, i) => (
              <Card
                key={i}
                className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${q.color}12`, color: q.color }}
                    >
                      {q.pillar}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-3 leading-snug group-hover:text-[#3D148A] transition-colors">
                    {q.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{q.context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-[#5A23C9] hover:bg-[#3D148A] text-white font-semibold rounded-lg">
              <Link to="/resultater">
                Se hva vi har funnet <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What Does NAIE Do - Pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D148A] mb-4">Hva gjør NAIE?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Vi arbeider med tre hovedpilarer for å fremme etisk og ansvarlig bruk av kunstig intelligens i Norge.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <Link key={pillar.title} to={pillar.path} className="group">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${pillar.color}15` }}
                      >
                        <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-[#0A0A0A]">{pillar.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: pillar.color }}>
                      Les mer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D148A] mb-4">Milepæler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vår reise mot mer etisk og ansvarlig AI i Norge.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7A1A] to-[#5A23C9] hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                    <Card className="inline-block border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <span className="text-sm font-semibold text-[#FF7A1A]">{milestone.year}</span>
                        <h3 className="text-lg font-bold text-[#3D148A] mt-1">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-[#FF7A1A] rounded-full border-4 border-white shadow-md z-10 shrink-0 hidden md:block" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vil du vite mer?</h2>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Utforsk våre resultater, ressurser og lær mer om hvordan NAIE arbeider for etisk AI i Norge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
              <Link to="/resultater">Se resultater</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg">
              <Link to="/kontakt">Kontakt oss</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
