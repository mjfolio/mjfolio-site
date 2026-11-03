import LeadForm from "./lead-form";
import SiteHeader, { PHONE, TEL } from "./site-header";

export const metadata = {
  title: "MJFolio, LLC | We Buy Land",
  description:
    "Got a letter from MJFolio? Respond to your cash offer for your vacant land. No agents, no commissions, and we cover closing costs.",
};

const perks = [
  "No real estate agents and no commissions",
  "We handle the paperwork and cover closing costs",
  "Closing handled by a licensed title company",
  "Sign your paperwork from home, wherever you live",
];

const steps = [
  ["Let us know", "Fill out the form or call us. We'll confirm the property details and answer any questions."],
  ["Sign the agreement", "We send a simple purchase agreement you can sign electronically. A title company opens escrow."],
  ["Get paid", "The title company handles the deed and pays you at closing by check or wire."],
];

const faqs = [
  ["Is this offer real?", `Yes. MJFolio, LLC is a Florida real estate company that buys vacant land directly from owners. You can call us at ${PHONE} and talk with a real person.`],
  ["How did you come up with the offer?", "We look at recent land sales nearby, the size of the lot, access, and any issues like wetlands or back taxes. We're happy to walk you through how we got to the number."],
  ["Do I need to travel to close?", "No. Most of our sellers live out of state. Documents can be signed from home, and a mobile notary can come to you if one is needed."],
  ["What if I owe back taxes on the land?", "That's common and usually not a problem. Unpaid taxes can typically be paid out of the sale proceeds at closing. Let us know and we'll sort it out."],
  ["I'm not interested. How do I stop the letters?", `Choose "Not interested" in the form above or call us, and we'll take you off our mailing list.`],
];

const btn = "inline-block rounded-xl px-5 py-3.5 font-semibold";
const primary = `${btn} bg-green-800 text-white hover:bg-green-700`;
const ghost = `${btn} border-2 border-green-800 text-green-800 hover:bg-green-50`;

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <main>
        <div className="mx-auto grid max-w-5xl items-start gap-8 px-4 pb-8 pt-7 md:grid-cols-[1.1fr_1fr] md:gap-10 md:pt-12">
          <div>
            <span className="mb-2.5 inline-block text-sm font-semibold uppercase tracking-wider text-amber-700">
              Got a letter from us?
            </span>
            <h1 className="mb-4 text-[clamp(30px,5vw,44px)] font-bold leading-tight tracking-tight">
              Sell your land for cash, without the hassle.
            </h1>
            <p className="mb-6 text-lg text-stone-600">
              We buy vacant land directly from owners. If you received an offer from MJFolio,
              you&apos;re in the right place. Tell us you&apos;re interested and we&apos;ll handle the rest.
            </p>
            <ul className="mb-7 space-y-2.5">
              {perks.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-green-800 text-[11px] text-white">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="#respond" className={primary}>Respond to my offer</a>
              <a href={TEL} className={ghost}>Call {PHONE}</a>
            </div>
          </div>

          <div id="respond" className="scroll-mt-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <LeadForm />
          </div>
        </div>

        <section className="border-y border-stone-200 bg-white py-11">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">How it works</h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {steps.map(([title, body], i) => (
                <li key={title}>
                  <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-full bg-green-800 font-bold text-white">{i + 1}</span>
                  <h3 className="mb-1.5 text-lg font-semibold">{title}</h3>
                  <p className="text-stone-600">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-11">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Common questions</h2>
            {faqs.map(([q, a]) => (
              <details key={q} className="border-b border-stone-200 py-3.5">
                <summary className="cursor-pointer text-lg font-semibold">{q}</summary>
                <p className="mt-2.5 text-stone-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white py-11 text-center">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">Ready to talk about your land?</h2>
            <p className="mb-5 text-stone-600">No pressure and no obligation. Just a straightforward conversation.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#respond" className={primary}>Respond to my offer</a>
              <a href={TEL} className={ghost}>Call {PHONE}</a>
            </div>
          </div>
        </section>

        <section id="privacy" className="py-11">
          <div className="mx-auto max-w-5xl space-y-3 px-4 text-sm text-stone-600">
            <h2 className="text-xl font-semibold text-stone-900">Privacy Policy</h2>
            <p>
              MJFolio, LLC collects only the information you choose to give us, such as your name,
              phone number, email, and property details, so we can respond to your inquiry and discuss
              a potential purchase.
            </p>
            <p>
              We do not sell, rent, or share your personal information with third parties for marketing
              purposes. Phone numbers and text message opt-in information are never shared with third
              parties or affiliates for marketing.
            </p>
            <p>
              If you receive text messages from us, message and data rates may apply. Reply STOP to opt
              out at any time, or HELP for assistance.
            </p>
            <p>To ask that we delete your information, contact us using the details below.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-7 text-sm text-stone-500">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2.5 px-4">
          <span>© {new Date().getFullYear()} MJFolio, LLC. All rights reserved.</span>
          <span>
            <a href={TEL} className="text-green-800">{PHONE}</a> ·{" "}
            <a href="mailto:mjfoliollc@gmail.com" className="text-green-800">mjfoliollc@gmail.com</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
