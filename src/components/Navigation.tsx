import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/naie_logo_v1_with_text_purple.svg";

// Import your content arrays to dynamically translate asymmetric article slugs
import { BLOGS as BLOGS_NO } from "@/content/no/blog";
import { BLOGS as BLOGS_EN } from "@/content/en/blog";

type Lang = "no" | "en";

type NavItem = {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
};

const navItemsNo: NavItem[] = [
  { label: "Hjem", path: "/" },
  { label: "Om oss", path: "/om-oss" },
  {
    label: "Aktiviteter",
    path: "/aktiviteter",
    children: [
      { label: "Bias", path: "/aktiviteter/bias" },
      { label: "Ansvarlig AI", path: "/aktiviteter/ansvarlig-ai" },
      { label: "Bærekraft", path: "/aktiviteter/baerekraft" },
    ],
  },
  {
    label: "Innsikt",
    path: "/resultater",
    children: [
      { label: "Resultater", path: "/resultater" },
      { label: "Blogg", path: "/blogg" },
      { label: "Ressurser", path: "/ressurser" },
      { label: "Nyheter", path: "/nyheter" },
      { label: "Presse & Arrangementer", path: "/presse-og-arrangementer" },
    ],
  },
  { label: "For organisasjoner", path: "/for-organisasjoner" },
  { label: "Medlemskap", path: "/medlemskap" },
  { label: "Kontakt", path: "/kontakt" },
];

const navItemsEn: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about-us" },
  {
    label: "Activities",
    path: "/activities",
    children: [
      { label: "Bias", path: "/activities/bias" },
      { label: "Responsible AI", path: "/activities/ansvarlig-ai" },
      { label: "Sustainability", path: "/activities/baerekraft" },
    ],
  },
  {
    label: "Insights",
    path: "/results",
    children: [
      { label: "Results", path: "/results" },
      { label: "Blog", path: "/blog" },
      { label: "Resources", path: "/resources" },
      { label: "News", path: "/news" },
      { label: "Press & Events", path: "/press-and-events" },
    ],
  },
  { label: "For organisations", path: "/for-organisations" },
  { label: "Membership", path: "/membership" },
  { label: "Contact", path: "/contact" },
];

// Bidirectional lookup mapping table
const pathTranslations: Record<string, string> = {
  "/": "/",
  "/om-oss": "/about-us",
  "/about-us": "/om-oss",
  "/aktiviteter": "/activities",
  "/activities": "/aktiviteter",
  "/aktiviteter/bias": "/activities/bias",
  "/activities/bias": "/aktiviteter/bias",
  "/aktiviteter/ansvarlig-ai": "/activities/ansvarlig-ai",
  "/activities/ansvarlig-ai": "/aktiviteter/ansvarlig-ai",
  "/aktiviteter/baerekraft": "/activities/baerekraft",
  "/activities/baerekraft": "/aktiviteter/baerekraft",
  "/resultater": "/results",
  "/results": "/resultater",
  "/blogg": "/blog",
  "/blog": "/blogg",
  "/ressurser": "/resources",
  "/resources": "/ressurser",
  "/nyheter": "/news",
  "/news": "/nyheter",
  "/presse-og-arrangementer": "/press-and-events",
  "/press-and-events": "/presse-og-arrangementer",
  "/for-organisasjoner": "/for-organisations",
  "/for-organisations": "/for-organisasjoner",
  "/medlemskap": "/membership",
  "/membership": "/medlemskap",
  "/kontakt": "/contact",
  "/contact": "/kontakt",
};

function getLangFromPath(pathname: string): Lang {
  const first = pathname.split("/")[1];
  return first === "en" ? "en" : "no";
}

function withLang(lang: Lang, path: string): string {
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const lang = useMemo(() => getLangFromPath(pathname), [pathname]);
  const base = `/${lang}`;

  const items = useMemo(() => (lang === "en" ? navItemsEn : navItemsNo), [lang]);

  // Safely extract the component path without the language parameter
  const currentPathNoLang = useMemo(() => {
    const parts = pathname.split("/");
    const maybeLang = parts[1];

    if (maybeLang === "no" || maybeLang === "en") {
      const rest = "/" + parts.slice(2).join("/");
      // Keep root as "/" and strip training slashes safely
      return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
    }
    return pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/";
  }, [pathname]);

  const isActive = (rawPath: string) => {
    const normalize = (p: string) => (p === "/" ? "/" : p.replace(/\/$/, ""));
    return normalize(currentPathNoLang) === normalize(rawPath);
  };

  const isChildActive = (children?: { path: string }[]) =>
    children?.some((c) => isActive(c.path)) ?? false;

  const switchLang = (next: Lang) => {
    if (lang === next) return;

    const cleanPath = currentPathNoLang;

    // 1. Direct translation mapping check for static pages
    if (pathTranslations[cleanPath]) {
      navigate(`/${next}${pathTranslations[cleanPath]}`);
      return;
    }

    // 2. Handle paths with unique / translated blog slugs dynamically
    if (cleanPath.startsWith("/blogg/")) {
      const noSlug = cleanPath.substring(7);
      // Find the index position of the current Norwegian post
      const postIndex = BLOGS_NO.findIndex((p) => p.slug === noSlug);
      
      // If found and the English post exists at that same list position, route there
      if (postIndex !== -1 && BLOGS_EN[postIndex]) {
        navigate(`/${next}/blog/${BLOGS_EN[postIndex].slug}`);
      } else {
        navigate(`/${next}/blog`);
      }
      return;
    }

    if (cleanPath.startsWith("/blog/")) {
      const enSlug = cleanPath.substring(6);
      // Find the index position of the current English post
      const postIndex = BLOGS_EN.findIndex((p) => p.slug === enSlug);
      
      // Map it back to the exact Norwegian post at that index
      if (postIndex !== -1 && BLOGS_NO[postIndex]) {
        navigate(`/${next}/blogg/${BLOGS_NO[postIndex].slug}`);
      } else {
        navigate(`/${next}/blogg`);
      }
      return;
    }

    // 3. Handle sub-activities fallback safely if you configure them dynamically later
    if (cleanPath.startsWith("/aktiviteter/")) {
      navigate(`/${next}/activities/${cleanPath.substring(13)}`);
      return;
    }
    if (cleanPath.startsWith("/activities/")) {
      navigate(`/${next}/aktiviteter/${cleanPath.substring(12)}`);
      return;
    }

    // 4. Complete fallback safety valve
    navigate(`/${next}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={base} className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="NAIE logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {items.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isChildActive(item.children)
                        ? "text-[#FF7A1A] bg-[#FF7A1A]/10"
                        : "text-gray-700 hover:text-[#5A23C9] hover:bg-[#ECE7FF]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={withLang(lang, child.path)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.path)
                              ? "text-[#FF7A1A] bg-[#FF7A1A]/5"
                              : "text-gray-700 hover:text-[#5A23C9] hover:bg-[#ECE7FF]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={withLang(lang, item.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? "text-[#FF7A1A] bg-[#FF7A1A]/10"
                      : "text-gray-700 hover:text-[#5A23C9] hover:bg-[#ECE7FF]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Language Switcher + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#F6F6F6] rounded-lg p-0.5">
              <button
                onClick={() => switchLang("no")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  lang === "no"
                    ? "bg-white text-[#3D148A] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="text-base leading-none">🇳🇴</span>
                <span className="hidden sm:inline">NB</span>
              </button>
              <button
                onClick={() => switchLang("en")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  lang === "en"
                    ? "bg-white text-[#3D148A] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="text-base leading-none">🇬🇧</span>
                <span className="hidden sm:inline">EN</span>
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {items.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={withLang(lang, child.path)}
                        onClick={() => setMobileOpen(false)}
                        className={`block pl-6 pr-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(child.path)
                            ? "text-[#FF7A1A] bg-[#FF7A1A]/5"
                            : "text-gray-600 hover:text-[#5A23C9] hover:bg-[#ECE7FF]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={withLang(lang, item.path)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
                        ? "text-[#FF7A1A] bg-[#FF7A1A]/10"
                        : "text-gray-700 hover:text-[#5A23C9] hover:bg-[#ECE7FF]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}