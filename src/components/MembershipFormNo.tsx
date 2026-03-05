import { Button } from "@/components/ui/button";

export default function MembershipForm() {
  return (
    <form
      className="space-y-5"
      action="https://formspree.io/f/mdalyoko"
      method="POST"
    >
      {/* Honeypot (enkelt spamfilter) */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Subject i e-posten du mottar */}
      <input type="hidden" name="_subject" value="Ny medlemsforespørsel fra naie.no" />

      {/* Sikrer tydelig kategorisering i innboksen */}
      <input type="hidden" name="topic" value="Medlemskap" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Navn</label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
          placeholder="Ditt navn"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
          placeholder="din@epost.no"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Arbeidssted / tilknytning <span className="text-gray-400">(valgfritt)</span>
        </label>
        <input
          name="affiliation"
          type="text"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
          placeholder="F.eks. offentlig sektor, akademia, privat næringsliv"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ønsker du primært å støtte eller bidra aktivt?
        </label>
        <select
          name="intent"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm bg-white"
          defaultValue="Støtte"
          required
        >
          <option>Støtte</option>
          <option>Bidra aktivt</option>
          <option>Usikker</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kort om motivasjon</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm resize-none"
          placeholder="Hva motiverer deg til å bli medlem, og hvordan ønsker du eventuelt å bidra?"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg"
      >
        Send medlemsforespørsel
      </Button>

      <p className="text-xs text-gray-500 leading-relaxed">
        Informasjonen brukes kun til medlemsadministrasjon. Vi publiserer ikke medlemsinformasjon offentlig uten samtykke.
      </p>
    </form>
  );
}