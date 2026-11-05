"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Pic = { src: string; alt: string; w: number; h: number };

// Thumbnails swap the main photo; clicking the main photo opens a full-screen viewer.
export default function Gallery({ photos }: { photos: Pic[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const step = useCallback((d: number) => setActive((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const p = photos[active];
  const arrow =
    "absolute top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/50 text-2xl text-white hover:bg-black/70";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative mb-3 block aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl bg-stone-200"
        aria-label={`View larger: ${p.alt}`}
      >
        <Image
          src={p.src}
          alt={p.alt}
          fill
          priority
          sizes="(min-width: 1024px) 992px, 100vw"
          className={p.w / p.h < 1.3 ? "object-contain" : "object-cover"}
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white">
          {active + 1} / {photos.length} · Click to enlarge
        </span>
      </button>

      <ul className="mb-8 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7">
        {photos.map((t, i) => (
          <li key={t.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={t.alt}
              aria-current={i === active}
              className={`relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg ring-green-800 ring-offset-2 ${
                i === active ? "ring-[3px]" : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={t.src} alt="" fill sizes="(min-width: 768px) 140px, 25vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={p.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-6"
        >
          <Image
            src={p.src}
            alt={p.alt}
            width={p.w}
            height={p.h}
            sizes="100vw"
            loading="eager"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-auto max-w-full object-contain"
          />
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className={`${arrow} left-3`} aria-label="Previous photo">‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className={`${arrow} right-3`} aria-label="Next photo">›</button>
          <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black/50 text-2xl text-white hover:bg-black/70" aria-label="Close">×</button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">{active + 1} / {photos.length}</span>
        </div>
      )}
    </>
  );
}
