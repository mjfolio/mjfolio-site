"use client";

import { useState, type FormEvent } from "react";

const input =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-base text-stone-900 focus:border-green-800 focus:outline-2 focus:outline-offset-1 focus:outline-green-800";
const label = "mb-1.5 block text-sm font-semibold";
const hint = "font-normal text-stone-500";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "optout">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (!data.name.trim()) return setError("Please enter your name.");
    if (!data.phone.trim() && !data.email.trim())
      return setError("Please give us a phone number or email so we can reach you.");
    if (!data.intent) return setError("Please choose what you would like to do.");

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || "send failed");
      setStatus(data.intent.startsWith("Not interested") ? "optout" : "sent");
    } catch {
      setStatus("idle");
      setError("Something went wrong sending that. Please call us at (561) 283-7648.");
    }
  }

  if (status === "sent" || status === "optout") {
    return (
      <div className="rounded-xl bg-green-50 p-5">
        <h3 className="mb-1.5 text-lg font-semibold">
          {status === "optout" ? "Got it." : "Thanks, we got it!"}
        </h3>
        <p>
          {status === "optout" ? (
            "We'll remove you from our mailing list."
          ) : (
            <>
              We&apos;ll reach out within one business day. If you&apos;d rather talk now, call{" "}
              <a href="tel:+15612837648" className="text-green-800 underline">
                (561) 283-7648
              </a>
              .
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h2 className="text-2xl font-bold">Respond to your offer</h2>
      <p className="mb-5 mt-1 text-[15px] text-stone-600">
        Takes a minute. We&apos;ll get back to you within one business day.
      </p>

      <div className="mb-3.5">
        <label htmlFor="name" className={label}>Your name</label>
        <input id="name" name="name" autoComplete="name" className={input} />
      </div>
      <div className="grid gap-x-3 sm:grid-cols-2">
        <div className="mb-3.5">
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={input} />
        </div>
        <div className="mb-3.5">
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={input} />
        </div>
      </div>
      <div className="mb-3.5">
        <label htmlFor="apn" className={label}>
          Parcel number (APN) <span className={hint}>from your letter, if handy</span>
        </label>
        <input id="apn" name="apn" className={input} />
      </div>
      <div className="grid gap-x-3 sm:grid-cols-2">
        <div className="mb-3.5">
          <label htmlFor="county" className={label}>County</label>
          <input id="county" name="county" className={input} />
        </div>
        <div className="mb-3.5">
          <label htmlFor="state" className={label}>State</label>
          <input id="state" name="state" maxLength={20} className={input} />
        </div>
      </div>
      <div className="mb-3.5">
        <label htmlFor="intent" className={label}>What would you like to do?</label>
        <select id="intent" name="intent" defaultValue="" className={input}>
          <option value="">Choose one…</option>
          <option>I&apos;d like to accept the offer</option>
          <option>I&apos;m interested but have questions</option>
          <option>I&apos;d consider a different price</option>
          <option>Not interested, please stop mailing me</option>
        </select>
      </div>
      <div className="mb-3.5">
        <label htmlFor="message" className={label}>
          Anything else? <span className={hint}>optional</span>
        </label>
        <textarea id="message" name="message" className={`${input} min-h-20`} />
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full cursor-pointer rounded-xl bg-green-800 px-5 py-3.5 font-semibold text-white hover:bg-green-700 disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      <p className="mt-3 text-[15px] text-red-700" role="status" aria-live="polite">{error}</p>
      <p className="mt-1 text-[13px] text-stone-500">
        We only use your information to contact you about your property. We never sell it.{" "}
        <a href="#privacy" className="underline">Privacy policy</a>.
      </p>
    </form>
  );
}
