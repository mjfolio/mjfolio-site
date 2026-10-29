export const metadata = {
  title: "MJFolio, LLC | We Buy Land",
  description: "MJFolio, LLC buys vacant land directly from owners. Simple, fair cash offers.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl font-bold">MJFolio, LLC</h1>
        <p className="mt-2 text-lg text-gray-600">We buy vacant land.</p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">What we do</h2>
          <p>
            MJFolio, LLC is a Florida real estate company that purchases vacant land
            directly from property owners. If you received a letter from us, we&apos;re
            interested in your property and would be glad to talk.
          </p>
          <p>
            No agents, no commissions, and no obligation. We handle the paperwork and
            closing costs so the process is simple for you.
          </p>
        </section>

        <section className="mt-10 space-y-2">
          <h2 className="text-2xl font-semibold">Contact us</h2>
          <p>
            Phone:{" "}
            <a href="tel:+15612837648" className="text-blue-600 underline">
              (561) 283-7648
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:YOUR-EMAIL-HERE" className="text-blue-600 underline">
              mjfoliollc@gmail.com
            </a>
          </p>
        </section>

        <section className="mt-10 space-y-4 text-sm text-gray-600">
          <h2 className="text-2xl font-semibold text-gray-900">Privacy Policy</h2>
          <p>
            MJFolio, LLC collects only the information you choose to give us, such as
            your name, phone number, email, and property details, so we can respond to
            your inquiry and discuss a potential purchase.
          </p>
          <p>
            We do not sell, rent, or share your personal information with third parties
            for marketing purposes. Phone numbers and text message opt-in information
            are never shared with third parties or affiliates for marketing.
          </p>
          <p>
            If you receive text messages from us, message and data rates may apply.
            Reply STOP to opt out at any time, or HELP for assistance.
          </p>
          <p>
            To ask that we delete your information, contact us using the details above.
          </p>
        </section>

        <footer className="mt-16 border-t pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} MJFolio, LLC. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
