import { Link } from "react-router-dom";
import { ArrowRight, Users, CheckCircle2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MembershipForm from "@/components/MembershipFormEn";

export default function Membership() {
  return (
    <div
      className="min-h-screen bg-[#F6F6F6] overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Membership</h1>
            <p className="text-lg text-purple-200 leading-relaxed">
              NAIE is an independent, non-profit association working for ethical and responsible use of artificial intelligence in Norway.
              Membership is open to individuals who wish to support our work or contribute professionally over time.
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
                      <h2 className="text-2xl font-bold text-[#3D148A] mb-2">
                        How does membership work?
                      </h2>
                      <div className="space-y-3 text-gray-600 leading-relaxed">
                        <p>
                          All members begin as{" "}
                          <span className="font-medium text-[#3D148A]">supporting members</span>.
                          As a supporting member, you support NAIE’s purpose and may follow our work, take part in activities, and contribute in the way that suits you.
                        </p>
                        <p>
                          After a period of active engagement (typically 6–12 months), supporting members may apply to become{" "}
                          <span className="font-medium text-[#3D148A]">voting members</span>.
                          Voting members have formal voting rights at the annual meeting and may be elected to the board or other positions of trust.
                        </p>
                        <p>
                          Membership does not automatically include voting rights. The board evaluates applications for voting membership based on
                          concrete contributions, engagement, and activity in the association.
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
                      <h2 className="text-2xl font-bold text-[#3D148A] mb-2">
                        What counts as active engagement?
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        Active engagement is about how you contribute to the association’s work and goals. This can, for example, be through:
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600">
                        {[
                          "professional input in working groups or projects",
                          "participation in events or meetings",
                          "contributions to insight, analysis, or methodology work",
                          "practical organisational support",
                        ].map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-[7px] w-2 h-2 rounded-full bg-[#FF7A1A] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        These are examples, not a fixed checklist. The board evaluates each case in light of the association’s purpose and practice.
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
                      <h2 className="text-2xl font-bold text-[#3D148A] mb-2">Privacy</h2>
                      <p className="text-gray-600 leading-relaxed">
                        The information you submit is used solely for membership administration and membership-related contact.
                        We do not publish member information without consent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="rounded-lg">
                  <Link to="/en/om-oss">Learn more about NAIE</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#5A23C9] hover:bg-[#3D148A] text-white font-semibold rounded-lg"
                >
                  <Link to="/en/kontakt">
                    Questions? Get in touch <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#3D148A] mb-2">
                    Apply for membership
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Fill in the form below to become a supporting member. If you would like to contribute actively, you can mention it in the motivation field.
                  </p>
                  <MembershipForm />
                </CardContent>
              </Card>

              <Card className="mt-6 border-0 shadow-md bg-[#ECE7FF]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#3D148A] mb-2">Note</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We use two membership categories to distinguish between support and formal responsibility.
                    Supporting membership is for anyone who wishes to be part of NAIE. Voting membership is for those who, over time,
                    want to take on a more formal role in the association.
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