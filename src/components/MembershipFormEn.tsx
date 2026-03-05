import { Button } from "@/components/ui/button";

export default function MembershipFormEn() {
  return (
    <form
      className="space-y-5"
      action="https://formspree.io/f/mdalyoko"
      method="POST"
    >
      {/* Honeypot (simple spam filter) */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Subject line in the email you receive */}
      <input type="hidden" name="_subject" value="New membership request from naie.no" />

      {/* Ensures clear categorisation in your inbox */}
      <input type="hidden" name="topic" value="Membership" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organisation / affiliation <span className="text-gray-400">(optional)</span>
        </label>
        <input
          name="affiliation"
          type="text"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm"
          placeholder="E.g. public sector, academia, private sector"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you primarily wish to support or contribute actively?
        </label>
        <select
          name="intent"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm bg-white"
          defaultValue="Support"
          required
        >
          <option>Support</option>
          <option>Contribute actively</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short motivation
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A23C9]/30 focus:border-[#5A23C9] transition-colors text-sm resize-none"
          placeholder="What motivates you to become a member, and how would you like to contribute?"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#FF7A1A] hover:bg-[#E85E00] text-white font-semibold rounded-lg"
      >
        Submit membership request
      </Button>

      <p className="text-xs text-gray-500 leading-relaxed">
        The information you provide is used solely for membership administration. We do not publish member information without consent.
      </p>
    </form>
  );
}