import React from "react";

export function TickerSection() {
  return (
    <section className="overflow-hidden bg-[var(--green)] py-3">
      <div className="ticker-track flex">
        {[0, 1].map((idx) => (
          <div
            key={idx}
            className="flex shrink-0 items-center gap-8 px-4 text-[13px] text-white"
          >
            {[
              "🌿 1 Billion Live Cultures",
              "✓ FSSAI Licensed",
              "🇮🇳 Made in India",
              "🌱 100% Vegan",
              "⭐ 4.8 Rating",
              "📦 Free Shipping",
              "🚫 No GMO",
            ].map((item) => (
              <span key={`${idx}-${item}`} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
