import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader, { PHONE, TEL } from "../../site-header";
import BuyerForm from "../buyer-form";
import Gallery from "../gallery";
import { listings, money, photoSrc } from "../listings";

export const dynamicParams = false;

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

const find = (slug: string) => listings.find((l) => l.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const l = find((await params).slug);
  if (!l) return {};
  return {
    title: `${l.title}, ${l.location} | MJFolio, LLC`,
    description: `${l.summary} ${money(l.cashPrice)} cash or ${money(l.terms.down)} down + ${money(l.terms.monthly)}/mo.`,
    openGraph: { images: [photoSrc(l, l.photos[0])] },
  };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const l = find((await params).slug);
  if (!l) notFound();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6">
        <Link href="/land" className="text-sm font-semibold text-green-800">← All land for sale</Link>

        <h1 className="mb-1 mt-3 text-[clamp(28px,4.5vw,40px)] font-bold leading-tight tracking-tight">{l.title}</h1>
        <p className="mb-5 text-lg text-stone-600">
          {l.location} · {l.county} County · {l.acres} acres
        </p>

        <Gallery photos={l.photos.map((p) => ({ src: photoSrc(l, p), alt: p.alt, w: p.w, h: p.h }))} />

        <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <div>
            <div className="mb-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">Cash price</p>
                <p className="text-3xl font-bold text-green-800">{money(l.cashPrice)}</p>
                <p className="text-stone-600">We cover closing costs</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">Owner financing</p>
                <p className="text-3xl font-bold text-green-800">
                  {money(l.terms.monthly)}<span className="text-lg font-semibold">/mo</span>
                </p>
                <p className="text-stone-600">
                  {money(l.terms.down)} down, {l.terms.months} months. No credit check.
                </p>
              </div>
            </div>

            <h2 className="mb-3 text-2xl font-bold tracking-tight">About this property</h2>
            <div className="mb-7 space-y-3 text-stone-700">
              {l.description.map((p) => <p key={p}>{p}</p>)}
            </div>

            <h2 className="mb-3 text-2xl font-bold tracking-tight">Property details</h2>
            <dl className="mb-4 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
              {l.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-2.5">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="text-stone-700">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={mapUrl} target="_blank" className="font-semibold text-green-800 underline">
              Open location in Google Maps
            </a>
            <p className="mt-6 text-sm text-stone-500">
              Information is believed accurate but not guaranteed. Buyers should verify zoning, utilities, and
              intended use with the county before purchase.
            </p>
          </div>

          <div className="space-y-4 md:sticky md:top-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <BuyerForm property={`${l.title}, ${l.location}`} apn={l.apn} county={l.county} state={l.state} />
            </div>
            <a href={TEL} className="block rounded-xl border-2 border-green-800 px-5 py-3.5 text-center font-semibold text-green-800 hover:bg-green-50">
              Call or text {PHONE}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
