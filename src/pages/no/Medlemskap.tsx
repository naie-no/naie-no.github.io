import { Link } from "react-router-dom";
import { ArrowRight, Users, CheckCircle2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MembershipForm from "@/components/MembershipFormNo";

export default function Medlemskap() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Medlemskap</h1>
            <p className="text-lg text-purple-200 leading-relaxed">
              NAIE er en uavhengig, ideell forening som arbeider for etisk og ansvarlig bruk av kunstig intelligens i Norge.
              Medlemskap er åpent for enkeltpersoner som ønsker å støtte arbeidet vårt eller bidra faglig over tid.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Explanation */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-[#5A23C9]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#3D148A] mb-2">Hvordan fungerer medlemskap?</h2>
                      <div className="space-y-3 text-gray-600 leading-relaxed">
                        <p>
                          Alle medlemmer starter som <span className="font-medium text-[#3D148A]">støttemedlem</span>.
                          Som støttemedlem støtter du NAIEs formål og kan følge arbeidet vårt, delta på aktiviteter og bidra på den måten du ønsker.
                        </p>
                        <p>
                          Etter en periode med aktiv deltakelse (vanligvis 6–12 måneder) kan støttemedlemmer søke om å bli
                          <span className="font-medium text-[#3D148A]"> stemmeberettiget medlem</span>.
                          Stemmeberettigede medlemmer har formell stemmerett på årsmøtet og kan velges til styret eller andre tillitsverv.
                        </p>
                        <p>
                          Medlemskap gir ikke automatisk stemmerett. Styret vurderer søknad om stemmeberettigelse basert på
                          konkrete bidrag, engasjement og aktivitet i foreningen.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-[#5A23C9]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#3D148A] mb-2">Hva regnes som aktiv deltakelse?</h2>
                      <p className="text-gray-600 leading-relaxed">
                        Aktiv deltakelse handler om hvordan du bidrar til foreningens arbeid og mål. Det kan for eksempel være gjennom:
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600">
                        {[
                          "faglige innspill i arbeidsgrupper eller prosjekter",
                          "deltakelse på arrangementer eller møter",
                          "bidrag til innsikt, analyser eller metodearbeid",
                          "praktisk organisasjonsarbeid",
                        ].map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-[7px] w-2 h-2 rounded-full bg-[#FF7A1A] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        Dette er eksempler, ikke et kravsett. Styret vurderer hvert tilfelle i lys av foreningens formål og praksis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-[#5A23C9]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#3D148A] mb-2">Personvern og behandling av medlemsdata</h2>
                      <p className="text-gray-600 leading-relaxed">
                        NAIE behandler personopplysninger i forbindelse med medlemskap. Opplysningene brukes utelukkende til medlemsadministrasjon, kommunikasjon og vurdering av medlemsstatus.
                        Vi lagrer kun nødvendige opplysninger som navn, e-postadresse, tilknytning (dersom oppgitt) og medlemskategori.
                        NAIE benytter eksterne tjenesteleverandører for sikker lagring av data. Behandlingen skjer i tråd med gjeldende personvernregelverk.
                        Du kan når som helst be om innsyn i, retting eller sletting av dine opplysninger ved å kontakte oss.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="rounded-lg">
                  <Link to="/om-oss">Les mer om NAIE</Link>
                </Button>
                <Button asChild className="bg-[#5A23C9] hover:bg-[#3D148A] text-white font-semibold rounded-lg">
                  <Link to="/kontakt">
                    Spørsmål? Kontakt oss <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#3D148A] mb-2">Søk medlemskap</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Fyll ut skjemaet under for å bli støttemedlem. Dersom du ønsker å bidra aktivt, kan du skrive litt om det i feltet for motivasjon.
                  </p>
                  <MembershipForm />
                </CardContent>
              </Card>

              <Card className="mt-6 border-0 shadow-md bg-[#ECE7FF]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#3D148A] mb-2">Merk</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Vi bruker to medlemskategorier for å skille mellom støtte og formelt ansvar.
                    Støttemedlemskap er for alle som ønsker å være med. Stemmeberettigelse er for de som over tid ønsker å ta et mer formelt ansvar i foreningen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}