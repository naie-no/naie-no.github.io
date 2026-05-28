import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop";

// Auth (kept non-localized for now)
import AuthCallback from "@/pages/AuthCallback";
import AuthError from "@/pages/AuthError";

import NotFound from "@/pages/NotFound";

// Blog pages (separate per language)
import { Blogg as BloggNo, BloggPost as BloggPostNo } from "@/pages/no/Blogg";
import { Blog as BlogEn, BlogPost as BlogPostEn } from "@/pages/en/Blog";

// Norwegian pages
import IndexNo from "@/pages/no/Index";
import OmOssNo from "@/pages/no/OmOss";
import AktiviteterNo from "@/pages/no/Aktiviteter";
import ResultaterNo from "@/pages/no/Resultater";
import MedlemskapNo from "@/pages/no/Medlemskap";
import {
  Ressurser as RessurserNo,
  Nyheter as NyheterNo,
  PresseOgArrangementer as PresseOgArrangementerNo,
  ForOrganisasjoner as ForOrganisasjonerNo,
  Kontakt as KontaktNo,
} from "@/pages/no/SecondaryPages";
import PersonsvernNo from "@/pages/no/Personsvern";

// English pages
import IndexEn from "@/pages/en/Index";
import AboutUsEn from "@/pages/en/AboutUs";
import AktivitiesEn from "@/pages/en/Activities";
import ResultsEn from "@/pages/en/Results";
import MembershipEn from "@/pages/en/Membership";
import {
  Resources as ResourcesEn,
  News as NewsEn,
  PressAndEvents as PressAndEventsEn,
  ForOrganisations as ForOrganisationsEn,
  Contact as ContactEn,
} from "@/pages/en/SecondaryPages";
import PrivacyEn from "@/pages/en/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          {/* Root -> default language */}
          <Route path="/" element={<Navigate to="/no" replace />} />

          {/* ===========================
              Norwegian routes (/no)
          =========================== */}
          <Route path="/no" element={<IndexNo />} />
          <Route path="/no/om-oss" element={<OmOssNo />} />
          <Route path="/no/aktiviteter" element={<AktiviteterNo />} />
          <Route path="/no/aktiviteter/:slug" element={<AktiviteterNo />} />
          <Route path="/no/resultater" element={<ResultaterNo />} />
          <Route path="/no/ressurser" element={<RessurserNo />} />
          <Route path="/no/nyheter" element={<NyheterNo />} />
          <Route
            path="/no/presse-og-arrangementer"
            element={<PresseOgArrangementerNo />}
          />
          <Route path="/no/for-organisasjoner" element={<ForOrganisasjonerNo />} />
          <Route path="/no/medlemskap" element={<MedlemskapNo />} />
          <Route path="/no/kontakt" element={<KontaktNo />} />
          <Route path="/no/personsvern" element={<PersonsvernNo />} />

          {/* Blog under /no */}
          <Route path="/no/blogg" element={<BloggNo />} />
          <Route path="/no/blogg/:slug" element={<BloggPostNo />} />

          {/* ===========================
              English routes (/en)
          =========================== */}
          <Route path="/en" element={<IndexEn />} />
          <Route path="/en/about-us" element={<AboutUsEn />} />
          <Route path="/en/activities" element={<AktivitiesEn />} />
          <Route path="/en/activities/:slug" element={<AktivitiesEn />} />
          <Route path="/en/results" element={<ResultsEn />} />
          <Route path="/en/resources" element={<ResourcesEn />} />
          <Route path="/en/news" element={<NewsEn />} />
          <Route
            path="/en/press-and-events"
            element={<PressAndEventsEn />}
          />
          <Route path="/en/for-organisations" element={<ForOrganisationsEn />} />
          <Route path="/en/membership" element={<MembershipEn />} />
          <Route path="/en/contact" element={<ContactEn />} />
          <Route path="/en/privacy" element={<PrivacyEn />} />
          
          {/* Blog under /en */}
          <Route path="/en/blog" element={<BlogEn />} />
          <Route path="/en/blog/:slug" element={<BlogPostEn />} />

          {/* Auth routes */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/error" element={<AuthError />} />

          {/* Backward compatibility redirects (Norwegian) */}
          <Route path="/om-oss" element={<Navigate to="/no/om-oss" replace />} />
          <Route path="/aktiviteter" element={<Navigate to="/no/aktiviteter" replace />} />
          <Route
            path="/aktiviteter/:slug"
            element={<Navigate to="/no/aktiviteter/:slug" replace />}
          />
          <Route path="/resultater" element={<Navigate to="/no/resultater" replace />} />
          <Route path="/ressurser" element={<Navigate to="/no/ressurser" replace />} />
          <Route path="/nyheter" element={<Navigate to="/no/nyheter" replace />} />
          <Route
            path="/presse-og-arrangementer"
            element={<Navigate to="/no/presse-og-arrangementer" replace />}
          />
          <Route
            path="/for-organisasjoner"
            element={<Navigate to="/no/for-organisasjoner" replace />}
          />
          <Route path="/kontakt" element={<Navigate to="/no/kontakt" replace />} />
          <Route path="/blogg" element={<Navigate to="/no/blogg" replace />} />
          <Route path="/blogg/:slug" element={<Navigate to="/no/blogg/:slug" replace />} />
          
          {/* Backward compatibility redirects (English) */}
          <Route path="/about-us" element={<Navigate to="/en/about-us" replace />} />
          <Route path="/activities" element={<Navigate to="/en/activities" replace />} />
          <Route
            path="/activities/:slug"
            element={<Navigate to="/en/activities/:slug" replace />}
          />
          <Route path="/results" element={<Navigate to="/en/results" replace />} />
          <Route path="/resources" element={<Navigate to="/en/resources" replace />} />
          <Route path="/news" element={<Navigate to="/en/news" replace />} />
          <Route
            path="/press-and-events"
            element={<Navigate to="/en/press-and-events" replace />}
          />
          <Route
            path="/for-organisations"
            element={<Navigate to="/en/for-organisations" replace />}
          />
          <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
          <Route path="/blog" element={<Navigate to="/en/blog" replace />} />
          <Route path="/blog/:slug" element={<Navigate to="/en/blog/:slug" replace />} />

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;