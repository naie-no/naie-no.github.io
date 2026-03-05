import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Personvern() {
  return (
    <div
      className="min-h-screen bg-[#F6F6F6] overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Personvern</h1>
          <p className="text-lg text-purple-200 leading-relaxed">
            Norsk AI-Etikkforening (NAIE) behandler personopplysninger på en ansvarlig og transparent måte.
            Denne siden beskriver hvordan vi håndterer data knyttet til medlemskap og kontakt.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Hvem er behandlingsansvarlig?</h2>
            <p>
              Norsk AI-Etikkforening (NAIE) er behandlingsansvarlig for personopplysninger som samles inn gjennom våre nettsider og i forbindelse med medlemskap.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Hvilke opplysninger samler vi inn?</h2>
            <p>
              I forbindelse med medlemskap og kontakt kan vi behandle følgende opplysninger:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Navn</li>
              <li>E-postadresse</li>
              <li>Eventuell tilknytning (dersom oppgitt)</li>
              <li>Medlemskategori og medlemsstatus</li>
              <li>Dato for innmelding og eventuelle endringer i medlemsstatus</li>
            </ul>
            <p className="mt-4">
              Vi samler ikke inn sensitive personopplysninger.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Formål med behandlingen</h2>
            <p>
              Opplysningene brukes utelukkende til:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Administrasjon av medlemskap</li>
              <li>Kommunikasjon med medlemmer</li>
              <li>Vurdering av medlemsstatus i henhold til vedtektene</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Lagring og sikkerhet</h2>
            <p>
              NAIE benytter eksterne tjenesteleverandører for sikker lagring av medlemsdata.
              Behandlingen skjer i tråd med gjeldende personvernregelverk.
            </p>
            <p className="mt-4">
              Tilgang til medlemsdata er begrenset til styret og brukes kun til foreningsadministrasjon.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Lagringstid</h2>
            <p>
              Opplysninger om aktive medlemmer lagres så lenge medlemskapet er aktivt.
              Opplysninger om tidligere medlemmer slettes normalt innen 12 måneder etter avsluttet medlemskap,
              med mindre det foreligger et saklig behov for videre lagring.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Dine rettigheter</h2>
            <p>
              Du har rett til innsyn i hvilke opplysninger vi har lagret om deg, og kan be om retting eller sletting.
              Henvendelser kan sendes til oss via kontaktsiden.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}