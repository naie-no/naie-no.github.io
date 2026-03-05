import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div
      className="min-h-screen bg-[#F6F6F6] overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3D148A] to-[#5A23C9] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy</h1>
          <p className="text-lg text-purple-200 leading-relaxed">
            The Norwegian AI Ethics Association (NAIE) processes personal data in a responsible and transparent manner.
            This page explains how we handle data related to membership and contact.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Who is the data controller?</h2>
            <p>
              The Norwegian AI Ethics Association (NAIE) is the data controller for personal data collected through our website and in connection with membership.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">What information do we collect?</h2>
            <p>
              In connection with membership and contact, we may process the following information:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Affiliation (if provided)</li>
              <li>Membership category and status</li>
              <li>Date of registration and any changes in membership status</li>
            </ul>
            <p className="mt-4">
              We do not collect sensitive personal data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Purpose of processing</h2>
            <p>
              The information is used solely for:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Administration of membership</li>
              <li>Communication with members</li>
              <li>Assessment of membership status in accordance with the association’s statutes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Storage and security</h2>
            <p>
              NAIE uses external service providers for the secure storage of membership data.
              Processing is carried out in accordance with applicable data protection regulations.
            </p>
            <p className="mt-4">
              Access to membership data is limited to the board and is used solely for association administration.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Retention period</h2>
            <p>
              Information about active members is stored as long as the membership remains active.
              Information about former members is normally deleted within 12 months after membership has ended,
              unless there is a legitimate reason for continued storage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#3D148A] mb-3">Your rights</h2>
            <p>
              You have the right to access the information we have stored about you and may request correction or deletion.
              Requests can be submitted via our contact page.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}