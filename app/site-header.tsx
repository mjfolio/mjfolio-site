import Link from "next/link";

export const PHONE = "(561) 283-7648";
export const TEL = "tel:+15612837648";

export default function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5">
        <Link href="/" className="text-lg font-bold tracking-tight">
          MJ<span className="text-green-800">Folio</span>, LLC
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link href="/land" className="whitespace-nowrap font-semibold text-stone-700 hover:text-green-800">
            <span className="sm:hidden">Buy land</span>
            <span className="hidden sm:inline">Land for sale</span>
          </Link>
          <a href={TEL} className="whitespace-nowrap font-semibold text-green-800">
            <span className="hidden sm:inline">Call </span>{PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}
