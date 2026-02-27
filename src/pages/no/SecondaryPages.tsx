import { Link } from "react-router-dom";
import {
  BookOpen, ExternalLink, Newspaper, Calendar, Building2, Mail,
  Phone, MapPin, ArrowRight, FileText, Video, Mic
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GitHubRepoCard from "@/components/GitHubRepoCard";

/* ===================== RESSURSER ===================== */
export function Ressurser() {
  const resources = [
    {
      icon: FileText,
      title: "NoBBQ Benchmark",
      description: "Vår benchmark for å måle bias i store språkmodeller på norsk. Tilgjengelig som åpen kildekode.",
      link: "/no/aktiviteter/bias",
      linkText: "Les mer",
    },
    {
      icon: BookOpen,
      title: "Rapporter og publikasjoner",
      description: "Forskningsrapporter, analyser og publikasjoner fra NAIEs arbeid med AI-etikk.",
      link: "/no/resultater",
      linkText: "Se resultater",
    },
    {
      icon: Video,
      title: "Presentasjoner",
      description: "Opptak og materiale fra konferanser, webinarer og foredrag om AI-etikk.",
      link: "/no/presse-og-arrangementer",
      linkText: "Se arrangementer",
    },
    {
      icon: ExternalLink,
      title: "Eksterne ressurser",
      description: "Nyttige lenker til internasjonale standarder, rammeverk og verktøy for ansvarlig AI.",
      link: "#",
      linkText: "Kommer snart",
    },
  ];

  return (
    <PageWrapper
      title="Ressurser"
      subtitle="Utforsk våre ressurser, rapporter og verktøy for etisk AI."
    >
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <Card
                key={res.title}
                className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0">
                      <res.icon className="w-6 h-6 text-[#5A23C9]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#3D148A] mb-1">
                        {res.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {res.description}
                      </p>
                      <Link
                        to={res.link}
                        className="text-[#FF7A1A] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        {res.linkText} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          
            {/* GitHub repo preview */}
            <GitHubRepoCard owner="naie-no" repo="NoBBQ" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

/* ===================== NYHETER ===================== */
export function Nyheter() {
  const news = [
    {
      date: "Feb 2026",
      title: "NAIE er blitt lansert til publikum",
      summary: "Den 2. februar har NAIE blitt lansert til publikum via LinkedIn.",
    },
    {
      date: "Feb 2026",
      title: "Kathinka Vik er offisielt med på styret i NAIE",
      summary: "Kathinka har blitt med som styremedlem i foreningen.",
    },
    {
      date: "Sept 2025",
      title: "NAIE ble stiftet",
	  summary: "Norsk AI-Etikkforening ble offisielt etablert som en uavhengig, ideell forening for å fremme etisk AI i Norge. Foreningen ble stiftet av Wessel Braakman, Alejandra Palacio Perez og Teresa Dalen Herland",
    },
    {
      date: "Sept 2025",
      title: "Vi lanserer oppdatert NoBBQ benchmark",
      summary: "Den oppdaterte versjonen av NoBBQ inkluderer 400 prompts mot 3 AI systemer.",
    },
    {
      date: "Mar 2025",
      title: "Vi deler første resultater om NoBBQ benchmark",
      summary: "Vi deler de første resultatene basert på 40 prompts og svar.",
    },
    {
      date: "Jan 2025",
      title: "Vi startet oversettelse av BBQ forskningen",
      summary: "Vi prøver oss på 10 prompts i 4 kategorier (40 totalt) for å se om prosjektet kan gi mening.",
    },
    {
      date: "2023-2024",
      title: "Flere foredrag om BIAS i AI systemer",
      summary: "Grunnen til forskningene våre starter tidlig i 2024.",
    },
  ];

  return (
    <PageWrapper title="Nyheter" subtitle="Siste nytt fra Norsk AI-Etikkforening.">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {news.map((item, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <Newspaper className="w-5 h-5 text-[#5A23C9] mt-1" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#FF7A1A] uppercase tracking-wider">{item.date}</span>
                      <h3 className="text-lg font-bold text-[#3D148A] mt-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

/* ===================== PRESSE OG ARRANGEMENTER ===================== */
export function PresseOgArrangementer() {
  const pressItems = [
    {
      type: "Arrangement",
      icon: Calendar,
      title: "Juni 2026 - EuroSTAR",
      description: "Vi deler våre siste NoBBQ-resultater på en av Europas største test konferanser.",
      link: "https://conference.eurostarsoftwaretesting.com/event/2026/can-we-measure-local-bias-in-ai-systems/",
    },
    {
      type: "Presse",
      icon: Mic,
      title: "Januar 2026 - Podcast Fordommer i AI systemer",
      description: "Vi snakker med Simen Sommerfeldt fra Bouvet om fordommer i AI systemer.",
      link: "https://www.bouvet.no/podcasts/fordommer-i-ai",
    },
    {
      type: "Arrangement",
      icon: Calendar,
      title: "September 2025: GoForIt: KI i offentlig sektor konferansen",
      description: "Vi presenterer våre funn på GoForIt konferansen.",
      link: "https://tankesmiengoforit.no/event/program-ki-i-offentlig-sektor-2025/",
    },
    {
      type: "Arrangement",
      icon: Calendar,
      title: "September 2025 - ODIN",
      description: "Vi deler våre nyeste funn på norges største testkonferanse.",
      link: "https://event.checkin.no/104532/testkonferansen-odin-2025",
    },
  ];

  return (
    <PageWrapper title="Presse & Arrangementer" subtitle="Følg med på NAIEs arrangementer og medieomtaler.">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {pressItems.map((item, i) => {
			  const isExternal = item.link.startsWith("http");

			  const Wrapper = isExternal ? "a" : Link;
			  const wrapperProps = isExternal
				? {
					href: item.link,
					target: "_blank",
					rel: "noopener noreferrer",
				  }
				: {
					to: item.link,
				  };

			  return (
				<Wrapper
				  key={i}
				  {...wrapperProps}
				  className="block group"
				>
				  <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
					<CardContent className="p-6">
					  <div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#E0D8FF] transition-colors">
						  <item.icon className="w-6 h-6 text-[#5A23C9]" />
						</div>
						<div>
						  <span className="text-xs font-semibold text-[#FF7A1A] uppercase tracking-wider">
							{item.type}
						  </span>
						  <h3 className="text-lg font-bold text-[#3D148A] mt-1 group-hover:text-[#5A23C9] transition-colors">
							{item.title}
						  </h3>
						  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
							{item.description}
						  </p>
						</div>
					  </div>
					</CardContent>
				  </Card>
				</Wrapper>
			  );
			})}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

/* ===================== FOR ORGANISASJONER ===================== */
export function ForOrganisasjoner() {
  const offerings = [
    {
      title: "Faglige foredrag og presentasjoner",
      icon: Mic,
      description:
        "Presentasjoner om skjevhet og etiske utfordringer i generativ AI, med særlig vekt på norsk språk, kultur og samfunn.",
      bullets: [
        "Hva er bias i generativ AI, og hvorfor er det relevant i Norge",
        "Risiko ved bruk av KI i offentlig sektor og samfunnskritiske tjenester",
        "Innsikt og læringspunkter fra NAIEs pågående forskningsarbeid",
      ],
    },
    {
      title: "Forsknings- og innsiktsgjennomganger",
      icon: FileText,
      description:
        "Kunnskapsbaserte gjennomganger av metode, funn og begrensninger i vårt forskningsarbeid. Dette er ikke løsningssalg, men faglig dialog basert på åpne data og kritisk refleksjon.",
      bullets: [
        "Metodikk og tolkning av resultater",
        "Begrensninger og usikkerhet i målinger",
        "Beslutningsstøtte og kompetanseheving",
      ],
    },
    {
      title: "Workshops og bevisstgjøring",
      icon: Video,
      description:
        "Interaktive workshops som gjør skjevhet i KI konkret, forståelig og diskuterbar – tilpasset deltakergruppe og tilgjengelig tid.",
      bullets: [
        "Analyse av KI-genererte svar og identifisering av skjevhet",
        "Diskusjon av realistiske bruksscenarier",
        "Refleksjon rundt ansvar, risiko og etiske avveininger",
      ],
    },
  ];

  return (
    <PageWrapper
      title="For organisasjoner"
      subtitle="Faglige bidrag for økt forståelse av skjevhet (bias), etikk og samfunnseffekter av kunstig intelligens i en norsk kontekst."
    >
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#3D148A] mb-6">Hva vi tilbyr</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Norsk AI-Etikkforening (NAIE) er en ideell organisasjon som arbeider for økt forståelse av skjevhet (bias),
                  etikk og samfunnseffekter av kunstig intelligens i en norsk kontekst.
                </p>
                <p>
                  I tillegg til å dele åpen forskning og innsikt, tilbyr vi faglige bidrag til organisasjoner som ønsker å
                  styrke sin forståelse av risiko, ansvar og konsekvenser knyttet til bruk av KI.
                </p>
                <p>
                  Våre tilbud er forankret i pågående forskning og faglig arbeid. Inntekter brukes til å dekke drift,
                  forberedelser og videreutvikling av NAIEs arbeid.
                </p>
              </div>

              <Card className="border-0 shadow-md mt-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-[#3D148A] mb-2">Praktisk informasjon</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    NAIE er en ideell organisasjon. Når vi tar betalt for faglige bidrag som foredrag, workshops eller
                    gjennomganger, er dette for å dekke arbeid knyttet til foreningens formål. Pris avhenger av omfang,
                    varighet og grad av tilpasning. Vi gir gjerne et uforpliktende estimat etter dialog. Alle inntekter
                    reinvesteres i NAIEs arbeid.
                  </p>
                </CardContent>
              </Card>

              <Button asChild className="mt-6 bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
                <Link to="/kontakt">
                  Ta kontakt <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {offerings.map((o) => (
                <Card key={o.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#3D148A]/10 flex items-center justify-center shrink-0">
                        <o.icon className="w-6 h-6 text-[#3D148A]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[#3D148A] mb-1">{o.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{o.description}</p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                          {o.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-[7px] w-2 h-2 rounded-full bg-[#FF7A1A] shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}



/* ===================== KONTAKT ===================== */
export function Kontakt() {
  return (
    <PageWrapper title="Kontakt" subtitle="Ta kontakt med oss for spørsmål, samarbeid eller medlemskap.">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#3D148A] mb-6">Kontaktinformasjon</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "E-post", value: "kontakt@naie.no" },
                  { icon: MapPin, label: "Adresse", value: "Rud-ødegutua 19\n2030 Nannestad" },
                  { icon: Phone, label: "Org.nr", value: "932 552 728" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#5A23C9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium text-[#3D148A] whitespace-pre-line">
					  {item.value}
					  </p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-8 border-0 shadow-md bg-[#ECE7FF]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#3D148A] mb-2">For organisasjoner</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Ønsker du samarbeid eller tjenester fra NAIE? Se vår side for organisasjoner.
                  </p>
                  <Link to="/for-organisasjoner" className="text-[#FF7A1A] text-sm font-medium inline-flex items-center gap-1">
                    Les mer <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#3D148A] mb-6">Send oss en melding</h2>
					<form
					  className="space-y-5"
					  action="https://formspree.io/f/mdalyoko"
					  method="POST"
					>
					  {/* Honeypot (enkelt spamfilter) */}
					  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

					  {/* Optional: subject som vises i e-postemnet hos deg */}
					  <input type="hidden" name="_subject" value="Ny melding fra naie.no" />

					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Navn</label>
						<input
						  name="name"
						  type="text"
						  required
						  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
						  placeholder="Ditt navn"
						/>
					  </div>

					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
						<input
						  name="email"
						  type="email"
						  required
						  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
						  placeholder="din@epost.no"
						/>
					  </div>

					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Emne</label>
						<select
						  name="topic"
						  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm bg-white"
						  defaultValue="Generell henvendelse"
						>
						  <option>Generell henvendelse</option>
						  <option>Samarbeid</option>
						  <option>Medlemskap</option>
						  <option>Presse</option>
						  <option>Annet</option>
						</select>
					  </div>

					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Melding</label>
						<textarea
						  name="message"
						  rows={4}
						  required
						  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm resize-none"
						  placeholder="Skriv din melding her..."
						/>
					  </div>

					  <Button type="submit" className="w-full bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
						Send melding
					  </Button>
					</form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

/* ===================== SHARED WRAPPER ===================== */
function PageWrapper({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F6F6]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-purple-200 max-w-2xl">{subtitle}</p>
        </div>
      </section>
      {children}
      <Footer />
    </div>
  );
}