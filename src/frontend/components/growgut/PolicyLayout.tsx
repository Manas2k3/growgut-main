"use client";

import Link from "next/link";

export function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        "--green": "#3a6b3a",
        "--gold": "#b8872a",
        "--cream": "#faf7f0",
        "--charcoal": "#1c211c",
        "--offwhite": "#f5f2ec",
        "--muted": "rgba(28,33,28,0.55)",
      } as React.CSSProperties}
      className="min-h-screen bg-[var(--cream)]"
    >
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-[rgba(58,107,58,0.12)] bg-[rgba(250,247,240,0.94)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-['Playfair_Display'] text-[22px] italic text-[var(--green)] no-underline"
          >
            GrowGut
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-[rgba(58,107,58,0.25)] px-4 py-2 text-[13px] text-[var(--green)] transition hover:bg-[var(--green)] hover:text-white"
          >
            ← Back to store
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[var(--green)] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
            Legal
          </p>
          <h1 className="mt-3 font-['Playfair_Display'] text-[38px] leading-tight md:text-[52px]">
            {title}
          </h1>
          <p className="mt-3 text-[15px] text-white/70">{subtitle}</p>
          <p className="mt-5 inline-block rounded-full bg-white/10 px-4 py-1 text-[12px] text-white/50">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[rgba(58,107,58,0.1)] bg-[var(--charcoal)] px-6 py-10 text-center text-[13px] text-white/40">
        <p>
          © {new Date().getFullYear()} GrowGut. All rights reserved. · Made
          with ❤️ in India · FSSAI: 12025999000201
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          {[
            ["Privacy Policy", "/privacy-policy"],
            ["Refund Policy", "/refund-policy"],
            ["Shipping Policy", "/shipping-policy"],
            ["Terms of Service", "/terms-of-service"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="transition hover:text-white/80"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

/* ── Reusable prose helpers ───────────────────────────── */

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-['Playfair_Display'] text-[22px] text-[var(--green)]">
        {heading}
      </h2>
      <div className="space-y-3 text-[15px] leading-[1.85] text-[rgba(28,33,28,0.72)]">
        {children}
      </div>
    </section>
  );
}

export function Ul({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-[rgba(58,107,58,0.18)] bg-[rgba(200,216,180,0.18)] p-6 text-[14px] leading-[1.8] text-[var(--charcoal)]">
      {children}
    </div>
  );
}
