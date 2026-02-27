import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/naie_logo_v1_white.svg";

type Lang = "no" | "en";

function getLangFromPath(pathname: string): Lang {
  const first = pathname.split("/")[1];
  return first === "en" ? "en" : "no";
}

function withLang(lang: Lang, path: string) {
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

export default function Footer() {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname);

  const content =
    lang === "en"
      ? {
          about: "About NAIE",
          activities: "Activities",
          results: "Results",
          blog: "Blog",
          resources: "Resources",
          contact: "Contact",
          organisations: "For organisations",
          copyright:
            "Norwegian AI Ethics Association (NAIE). All rights reserved.",
        }
      : {
          about: "Om NAIE",
          activities: "Aktiviteter",
          results: "Resultater",
          blog: "Blogg",
          resources: "Ressurser",
          contact: "Kontakt",
          organisations: "For organisasjoner",
          copyright:
            "Norsk AI-Etikkforening (NAIE). Alle rettigheter reservert.",
        };

  return (
    <footer className="bg-[#3D148A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Column 1 */}
          <div>
			<img
			  src={logo}
			  alt="NAIE logo"
			  className="h-10 w-auto mb-4 object-contain"
			/>
            <p className="text-sm text-purple-200 leading-relaxed">
              {content.copyright}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">
              {lang === "en" ? "Navigation" : "Navigasjon"}
            </h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <Link to={withLang(lang, "/om-oss")} className="hover:text-white">
                  {content.about}
                </Link>
              </li>
              <li>
                <Link
                  to={withLang(lang, "/aktiviteter")}
                  className="hover:text-white"
                >
                  {content.activities}
                </Link>
              </li>
              <li>
                <Link
                  to={withLang(lang, "/resultater")}
                  className="hover:text-white"
                >
                  {content.results}
                </Link>
              </li>
              <li>
                <Link to={withLang(lang, "/blogg")} className="hover:text-white">
                  {content.blog}
                </Link>
              </li>
              <li>
                <Link
                  to={withLang(lang, "/ressurser")}
                  className="hover:text-white"
                >
                  {content.resources}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-4">
              {lang === "en" ? "Get in touch" : "Ta kontakt"}
            </h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <Link
                  to={withLang(lang, "/for-organisasjoner")}
                  className="hover:text-white"
                >
                  {content.organisations}
                </Link>
              </li>
              <li>
                <Link to={withLang(lang, "/kontakt")} className="hover:text-white">
                  {content.contact}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:kontakt@naie.no"
                  className="hover:text-white"
                >
                  kontakt@naie.no
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#2E0F66] text-center text-xs py-4 text-purple-200">
        © {new Date().getFullYear()} NAIE
      </div>
    </footer>
  );
}