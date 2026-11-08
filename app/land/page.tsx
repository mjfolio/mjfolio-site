import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../site-header";
import { listings, money, photoSrc } from "./listings";

export const metadata = {
  title: "Land for Sale | MJFolio, LLC",
  description:
    "Affordable vacant land in Florida, sold directly by the owner. Pay cash or choose low monthly payments with no credit check.",
};

export default function LandPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <span className="mb-2.5 inline-block text-sm font-semibold uppercase tracking-wider text-amber-700">
          Owner-direct, no agents
        </span>
        <h1 className="mb-3 text-[clamp(30px,5vw,44px)] font-bold leading-tight tracking-tight">Land for sale</h1>
        <p className="mb-8 max-w-2xl text-lg text-stone-600">
          We own every property listed here and sell it directly to you. Pay cash, or choose owner financing
          with a small down payment and no credit check.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/land/${l.slug}`}
                className="block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photoSrc(l, l.photos[0])}
                    alt={l.photos[0].alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {l.status !== "available" && (
                    <span className="absolute left-3 top-3 rounded-full bg-amber-600 px-3 py-1 text-sm font-semibold uppercase text-white">
                      {l.status}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold">{l.title}</h2>
                  <p className="mb-3 text-stone-600">{l.location}</p>
                  <p className="text-xl font-bold text-green-800">{money(l.cashPrice)} cash</p>
                  <p className="text-stone-600">
                    or {money(l.terms.down)} down + {money(l.terms.monthly)}/mo<br />
                    <span className="text-sm">Plus {money(l.docFee)} doc fee</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
