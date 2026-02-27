import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BLOGS } from "@/content/en/blog";

function PageWrapper({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24">
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-[#3D148A]">{title}</h1>
            {subtitle && <p className="mt-3 text-gray-600 max-w-3xl">{subtitle}</p>}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

/* ===================== BLOG LIST ===================== */
export function Blogg() {
  return (
    <PageWrapper title="Blog" subtitle="All blog posts from NAIE.">
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {BLOGS
              .slice()
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((post) => (
                <Card key={post.slug} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <FileText className="w-5 h-5 text-[#5A23C9] mt-1 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-[#FF7A1A] uppercase tracking-wider">
                          {post.date}
                        </span>
                        <h3 className="text-lg font-bold text-[#3D148A] mt-1">{post.title}</h3>
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">{post.excerpt}</p>

                        {"externalUrl" in post && post.externalUrl ? (
                          <a
                            href={post.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 text-[#FF7A1A] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Read on naie.no <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            to={`/en/blogg/${post.slug}`}
                            className="mt-3 text-[#FF7A1A] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Read more <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
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

/* ===================== SINGLE BLOG POST ===================== */
export function BloggPost() {
  const { slug } = useParams();
  const meta = useMemo(() => BLOGS.find((p) => p.slug === slug), [slug]);

  const [md, setMd] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!meta) return;
      const mod = await meta.file();
      if (alive) setMd(mod.default);
    })();
    return () => {
      alive = false;
    };
  }, [meta]);

  if (!meta) {
    return (
      <PageWrapper title="Could not find the blog post">
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-600">This page does not exist.</p>
            <Link to="/blogg" className="text-[#FF7A1A] font-medium inline-flex items-center gap-1 mt-4">
              Back to blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={meta.title} subtitle={meta.date}>
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-slate max-w-none prose-h1:text-[#3D148A] prose-h2:text-[#3D148A] prose-a:text-[#FF7A1A] prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {md}
            </ReactMarkdown>
          </article>

          <Link to="/blogg" className="text-[#FF7A1A] font-medium inline-flex items-center gap-1 mt-8">
            Back to blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}