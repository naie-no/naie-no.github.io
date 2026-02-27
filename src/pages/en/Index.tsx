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
      "We examine and measure bias in AI systems. Through the NoBBQ benchmark, we test large language models for bias related to gender, ethnicity, religion, and other protected categories.",
    icon: BarChart3,
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/2c507247-45cd-446a-a931-cc2cf506b4f8.png",
    path: "/en/aktiviteter/bias",
    color: "#5A23C9",
  },
  {
    title: "Responsible AI",
    description:
      "We promote responsible development and use of artificial intelligence in Norway. Our work includes guidelines, best practices, and tools for ethical AI implementation.",
    icon: Shield,
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/9162907a-6407-4f58-908a-72c3fb328131.png",
    path: "/en/aktiviteter/ansvarlig-ai",
    color: "#FF7A1A",
  },
  {
    title: "Sustainability",
    description:
      "We investigate the environmental impact of AI systems and work toward more sustainable AI development. We measure and report energy usage and carbon footprint.",
    icon: Leaf,
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/5dbf5d3e-295f-427b-86d9-cfecd9b430b2.png",
    path: "/en/aktiviteter/baerekraft",
    color: "#10B981",
  },
];

const stats = [
  { value: "3", label: "Pillars", icon: TrendingUp },
  { value: "1200+", label: "AI responses analyzed", icon: BarChart3 },
  { value: "Norway’s first", label: "Bias indicator", icon: Award },
  { value: "Collaboration", label: "with LDO", icon: Users },
];

const questions = [
{
  question: "How do we know whether an AI system treats people of different ages, genders, or nationalities fairly?",
  context: "We analyze whether language models provide systematically different answers based on protected or vulnerable groups in a Norwegian context.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "If AI quietly excludes certain groups from job opportunities, who detects it — and who is responsible?",
  context: "We examine whether automated recommendations or evaluations lead to unintended discrimination.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "What happens when AI recommendations in healthcare or welfare are based on biased historical data?",
  context: "Historical datasets may contain systematic bias. We test how this affects modern AI systems.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "How do we prevent AI from reinforcing stereotypes instead of challenging them?",
  context: "We analyze whether AI repeats or amplifies established stereotypes in language and decision support.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "If an AI system misrepresents Norwegian people, culture, or identity — who corrects it?",
  context: "We examine how global models handle Norwegian language, culture, and social conditions.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "How can we ensure AI does not overlook minorities or vulnerable groups?",
  context: "We test whether models systematically underrepresent or misinterpret certain societal groups.",
  pillar: "Bias",
  color: "#5A23C9",
},
{
  question: "Would you trust a decision that affects your life if you don’t understand how the algorithm reached it?",
  context: "We work toward greater transparency and explainability in AI systems that impact individuals.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "When AI systems make mistakes, who should be held accountable — and how?",
  context: "We analyze responsibility lines between developers, vendors, and organizations that adopt AI.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "How transparent should public institutions be when using AI in child welfare, HR, or taxation?",
  context: "We examine transparency and documentation requirements when AI is implemented in the public sector.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "How do we ensure AI solutions don’t create more problems than they solve?",
  context: "We assess risks, unintended consequences, and the need for continuous evaluation of AI systems.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "Should AI be involved in deciding who receives financial support, employment, or housing?",
  context: "We discuss where the boundary should lie between automated recommendations and human judgment.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "What safeguards are necessary before schools or municipalities begin trusting AI systems?",
  context: "We map requirements for testing, documentation, and risk assessment before AI is deployed in sensitive areas.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "How should organizations test AI systems to ensure they do not unintentionally discriminate?",
  context: "We develop and adapt methodologies for systematic evaluation of bias and fairness.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "If AI advises a leader in a sensitive HR case, how do we ensure the advice is lawful and fair?",
  context: "We analyze legal and ethical implications of using AI in decision support.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "Where should the boundary lie between machine recommendations and human judgment?",
  context: "We examine how human–machine interaction can be structured responsibly.",
  pillar: "Responsible AI",
  color: "#FF7A1A",
},
{
  question: "How much energy should we allow AI systems to consume — and who decides what is ‘worth it’?",
  context: "We highlight the environmental impact of training and operating large language models.",
  pillar: "Sustainability",
  color: "#10B981",
},
{
  question: "Is it responsible to train ever larger models when the environmental impact is unknown?",
  context: "We examine energy use, resource consumption, and the need for greater transparency around AI climate impact.",
  pillar: "Sustainability",
  color: "#10B981",
},
];

const milestones = [
  { year: "Feb 2026", title: "NAIE launched publicly", description: "On February 2, 2026, Norsk AI-Etikkforening was officially launched to the public via LinkedIn." },
  { year: "Feb 2026", title: "Kathinka Vik joins the board", description: "Kathinka became an official board member of the association." },
  { year: "Sept 2025", title: "NAIE founded", description: "Norsk AI-Etikkforening was officially established as an independent, non-profit association to promote ethical AI in Norway. Founded by Wessel Braakman, Alejandra Palacio Perez and Teresa Dalen Herland." },
  { year: "Sept 2025", title: "Updated NoBBQ benchmark released", description: "The updated version of NoBBQ includes 400 prompts tested against 3 AI systems." },
  { year: "Mar 2025", title: "First NoBBQ results shared", description: "We shared the first results based on 40 prompts and responses." },
  { year: "Jan 2025", title: "BBQ research translation started", description: "We ran a PoC based on 10 prompts across 4 categories (40 total)." },
  { year: "2023-2024", title: "Multiple talks on AI bias", description: "The foundation for our research began in early 2024." },
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
              <span className="text-sm text-purple-200">Norwegian AI Ethics Association</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Ethical artificial{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-[#E85E00]">
                intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed mb-8 max-w-2xl">
              An independent, non-profit association delivering statistics and insights on Bias, Sustainability, and Responsible AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg px-6">
                <Link to="/en/resultater">
                  View results
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg px-6">
                <Link to="/en/om-oss">About us</Link>
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
              <span className="text-sm font-medium text-[#5A23C9]">Why NAIE exists</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D148A] mb-4">
              Questions that need answers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These questions drive our work. They are the reason NAIE was founded — and they deserve thorough, independent answers.
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
              <Link to="/en/resultater">
                See what we’ve found <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What Does NAIE Do - Pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D148A] mb-4">What does NAIE do?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We work across three core pillars to promote ethical and responsible use of artificial intelligence in Norway.
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
                      Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D148A] mb-4">Milestones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our journey toward more ethical and responsible AI in Norway.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to learn more?</h2>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Explore our results and resources, and learn more about how NAIE works toward ethical AI in Norway.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
              <Link to="/en/resultater">View results</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 !bg-transparent rounded-lg">
              <Link to="/en/kontakt">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
