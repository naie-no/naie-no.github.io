import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Star,
  GitFork,
  Scale,
  Clock,
  Code,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type RepoData = {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  license: { spdx_id: string | null } | null;
  updated_at: string;
};

type Labels = {
  title: string;
  blurb: string;
  stars: string;
  forks: string;
  updated: string;
  viewRepo: string;
  loading: string;
  noLicense: string;
  errorMessage: string;
};

function formatDate(iso: string, locale?: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function compact(n: number, locale?: string) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export default function GitHubRepoCard({
  owner = "naie-no",
  repo = "NoBBQ",
}: {
  owner?: string;
  repo?: string;
}) {
  const location = useLocation();
  const isNorwegian = location.pathname.startsWith("/no");

  const locale = isNorwegian ? "nb-NO" : undefined;

  const labels: Labels = isNorwegian
    ? {
        title: "Åpen kildekode på GitHub",
        blurb:
          "Datastruktur og evalueringsskript for NoBBQ er offentlig tilgjengelig. Åpenhet og etterprøvbarhet er viktig når vi måler bias.",
        stars: "stjerner",
        forks: "forks",
        updated: "Oppdatert",
        viewRepo: "Se repository",
        loading: "Laster…",
        noLicense: "Ingen lisens",
        errorMessage:
          "Forhåndsvisning utilgjengelig akkurat nå, men lenken fungerer.",
      }
    : {
        title: "Open source on GitHub",
        blurb:
          "Full dataset structure and scoring scripts are available publicly. Transparency and reproducibility matter when measuring bias.",
        stars: "stars",
        forks: "forks",
        updated: "Updated",
        viewRepo: "View repository",
        loading: "Loading…",
        noLicense: "No license",
        errorMessage:
          "Repo preview unavailable right now, but the link still works.",
      };

  const [data, setData] = React.useState<RepoData | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  React.useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setStatus("loading");
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!res.ok) throw new Error();

        const json = (await res.json()) as RepoData;
        if (!alive) return;

        setData(json);
        setStatus("ready");
      } catch {
        if (!alive) return;
        setStatus("error");
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [owner, repo]);

  const url = data?.html_url ?? `https://github.com/${owner}/${repo}`;

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#ECE7FF] rounded-lg flex items-center justify-center shrink-0">
            <Github className="w-6 h-6 text-[#5A23C9]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-[#3D148A] mb-1">
              {labels.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {data?.description ?? labels.blurb}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
              <span className="inline-flex items-center gap-1">
                <Star className="w-4 h-4 text-[#5A23C9]" />
                {status === "ready"
                  ? compact(data!.stargazers_count, locale)
                  : "—"}{" "}
                {labels.stars}
              </span>

              <span className="inline-flex items-center gap-1">
                <GitFork className="w-4 h-4 text-[#5A23C9]" />
                {status === "ready"
                  ? compact(data!.forks_count, locale)
                  : "—"}{" "}
                {labels.forks}
              </span>

              <span className="inline-flex items-center gap-1">
                <Code className="w-4 h-4 text-[#5A23C9]" />
                {status === "ready" ? data!.language ?? "—" : "—"}
              </span>

              <span className="inline-flex items-center gap-1">
                <Scale className="w-4 h-4 text-[#5A23C9]" />
                {status === "ready"
                  ? data!.license?.spdx_id || labels.noLicense
                  : "—"}
              </span>

              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#5A23C9]" />
                {status === "ready"
                  ? `${labels.updated} ${formatDate(
                      data!.updated_at,
                      locale
                    )}`
                  : labels.loading}
              </span>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF7A1A] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              {labels.viewRepo} <ArrowRight className="w-4 h-4" />
            </a>

            {status === "error" && (
              <p className="mt-2 text-xs text-gray-500">
                {labels.errorMessage}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}