import { Link, useParams } from "react-router-dom";
import { BarChart3, Shield, Leaf, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const activities = {
  overview: {
    title: "Activities",
    subtitle: "NAIE works with three main pillars to promote ethical and responsible AI in Norway.",
  },
  bias: {
    title: "Bias",
    icon: BarChart3,
    color: "#5A23C9",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/2c507247-45cd-446a-a931-cc2cf506b4f8.png",
    intro: "NAIE investigates and measures bias in AI systems through systematic testing and benchmarking.",
    sections: [
      {
        title: "NoBBQ – Norwegian Bias Benchmark for Question-answering",
        content:
          "NoBBQ is Norway’s first benchmark specifically designed to measure bias in large language models (LLMs) in Norwegian. The benchmark tests AI models for skew related to protected categories such as gender, ethnicity, religion, age, disability, and sexual orientation.",
      },
      {
        title: "How does NoBBQ work?",
        content:
          "NoBBQ consists of thousands of questions designed to uncover implicit and explicit bias in AI answers. Models are tested with contextual scenarios where the answer should not be influenced by stereotypes or prejudice. We analyze the responses systematically to identify patterns of skew.",
      },
      {
        title: "Results and findings",
        points: [
          "Over 1200 AI-generated answers have been analyzed",
          "Significant differences in bias levels between different models",
          "Norway’s first systematic bias indicator for AI",
          "Collaboration with LDO to connect findings to anti-discrimination legislation",
        ],
      },
    ],
  },
  "ansvarlig-ai": {
    title: "Responsible AI",
    icon: Shield,
    color: "#FF7A1A",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/9162907a-6407-4f58-908a-72c3fb328131.png",
    intro: "NAIE promotes responsible development and use of artificial intelligence through guidelines, best practices, and tools.",
    sections: [
      {
        title: "What is responsible AI?",
        content:
          "Responsible AI is about developing and using artificial intelligence in a way that is ethical, transparent, fair, and aligned with human rights and societal values. It involves considering potential negative consequences and actively working to minimize them.",
      },
      {
        title: "NAIE’s approach",
        content:
          "We work to develop practical tools and guidelines that organizations can use to implement responsible AI. This includes frameworks for ethical assessment, checklists for AI projects, and guidance on transparency and explainability.",
      },
      {
        title: "Focus areas",
        points: [
          "Transparency and explainability in AI systems",
          "Fairness and non-discrimination",
          "Privacy and data security",
          "Human control and override",
          "Accountability and traceability",
        ],
      },
    ],
  },
  baerekraft: {
    title: "Sustainability",
    icon: Leaf,
    color: "#10B981",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/974861/2026-02-17/5dbf5d3e-295f-427b-86d9-cfecd9b430b2.png",
    intro: "NAIE investigates the environmental impact of AI systems and works toward more sustainable AI development.",
    sections: [
      {
        title: "AI and environmental impact",
        content:
          "Training and operating large AI models requires enormous amounts of energy and computational resources. This has a significant environmental impact through carbon emissions, water consumption, and electronic waste. NAIE works to make this impact visible and reduce it.",
      },
      {
        title: "Our work",
        content:
          "We measure and report on energy consumption and carbon footprint related to AI systems used in Norway. Through research and collaboration, we develop recommendations for more sustainable AI practice.",
      },
      {
        title: "Key topics",
        points: [
          "Energy consumption when training AI models",
          "Carbon footprint from data centers",
          "Water use in cooling systems",
          "Sustainable alternatives and optimization techniques",
          "Reporting and transparency about environmental impact",
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
            <Link to="/en/aktiviteter">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to activities
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
          <h2 className="text-2xl font-bold text-[#3D148A] mb-4">Explore our results</h2>
          <p className="text-gray-600 mb-6">See what we have found through our research and analysis.</p>
          <Button asChild size="lg" className="bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg">
            <Link to="/en/resultater">
              View results <ArrowRight className="ml-2 w-4 h-4" />
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
                <Link key={key} to={`/en/aktiviteter/${key}`} className="group">
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
                        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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