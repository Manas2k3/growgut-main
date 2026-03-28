"use client";

import { motion } from "framer-motion";

import type { GrowGutProduct } from "@/shared/types/product";

type GrowGutPageProps = {
  product: GrowGutProduct;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function GrowGutPage({ product }: GrowGutPageProps) {
  const {
    basic,
    benefits,
    composition,
    images,
    manufacturing,
    offers,
    packaging,
    safety,
    usage,
  } = product;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f6f0e8_0%,_#fbf8f2_42%,_#ffffff_100%)] text-stone-900">
      <section className="mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-flex rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800 backdrop-blur">
            {basic.brand} Synbiotic
          </span>

          <div className="space-y-5">
            <h1 className="max-w-2xl font-serif text-5xl leading-tight tracking-tight text-stone-950 md:text-7xl">
              {basic.product_name}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-stone-600 md:text-xl">
              A premium {basic.category.toLowerCase()} built for everyday gut
              harmony with {composition.probiotic_strains.toLowerCase()} and{" "}
              {composition.prebiotic_ingredients.toLowerCase()}.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div className="rounded-3xl bg-stone-950 px-6 py-4 text-white shadow-[0_24px_80px_rgba(28,25,23,0.24)]">
              <p className="text-sm uppercase tracking-[0.24em] text-stone-300">
                Launch Price
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-semibold">
                  Rs. {basic.discounted_price}
                </span>
                <span className="text-lg text-stone-400 line-through">
                  Rs. {basic.price}
                </span>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-900/10 bg-emerald-50 px-5 py-4 text-emerald-900">
              <p className="text-sm uppercase tracking-[0.24em]">
                You Save
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {basic.discount_percentage}% off
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <FeatureCard label="CFU Strength" value={composition.cfu_count} />
            <FeatureCard label="Form" value={basic.item_form} />
            <FeatureCard label="Shelf Life" value={basic.shelf_life} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-x-8 bottom-8 top-12 rounded-[2rem] bg-gradient-to-b from-emerald-200/70 to-stone-200/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-transparent p-4 shadow-[0_30px_120px_rgba(38,34,28,0.16)]">
            <div className="overflow-hidden rounded-[1.5rem] bg-transparent">
              {images[0] ? (
                <img
                  src={images[0]}
                  alt={basic.product_name}
                  className="h-full min-h-[460px] w-full object-cover mix-blend-multiply"
                />
              ) : (
                <div className="flex min-h-[460px] items-center justify-center bg-gradient-to-br from-emerald-100 via-lime-50 to-stone-100 p-10 text-center text-stone-500">
                  Product imagery will appear here once the Firestore image URL
                  is available.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 pb-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Why GrowGut"
            items={benefits}
            accent="from-emerald-100 to-white"
          />
          <InfoCard
            title="Usage"
            items={[
              `Dosage: ${usage.dosage}`,
              `Best time: ${usage.best_time_to_consume}`,
              `Target age group: ${usage.target_age_group}`,
              `Daily use suitable: ${usage.daily_use_suitable ? "Yes" : "No"}`,
            ]}
            accent="from-amber-100 to-white"
          />
          <InfoCard
            title="Safety"
            items={[
              `FSSAI License: ${safety.fssai_license}`,
              `Contains preservatives: ${
                safety.contains_preservatives ? "Yes" : "No"
              }`,
              ...safety.warnings,
            ]}
            accent="from-rose-100 to-white"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
              Composition
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <DetailBlock
                label="Probiotic strains"
                value={composition.probiotic_strains}
              />
              <DetailBlock
                label="Prebiotic ingredients"
                value={composition.prebiotic_ingredients}
              />
              <DetailBlock
                label="Active ingredients"
                value={composition.active_ingredients}
              />
              <DetailBlock label="Excipients" value={composition.excipients} />
              <DetailBlock
                label="Allergen info"
                value={composition.allergen_info}
              />
              <DetailBlock label="Net quantity" value={basic.net_quantity} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Packaging & Origin
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">
                <p>{packaging.packaging_type}</p>
                <p>{packaging.dimensions}</p>
                <p>{packaging.storage_instructions}</p>
                <p>Made in {manufacturing.country_of_origin}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
                Active Offers
              </p>
              <div className="mt-5 space-y-3">
                {offers.offers.map((offer) => (
                  <div
                    key={offer.code}
                    className="flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-stone-900">
                        {offer.code}
                      </p>
                      <p className="text-sm text-stone-500">{offer.type}</p>
                    </div>
                    <span className="text-lg font-semibold text-emerald-800">
                      {offer.discount_percentage}% off
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
            Manufactured By
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DetailBlock
              label="Manufacturer"
              value={manufacturing.manufacturer_name}
            />
            <DetailBlock
              label="License"
              value={manufacturing.manufacturing_license}
            />
            <DetailBlock
              label="Address"
              value={manufacturing.manufacturer_address}
            />
            <DetailBlock label="Country" value={manufacturing.country_of_origin} />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
        {label}
      </p>
      <p className="mt-3 text-xl font-semibold text-stone-950">{value}</p>
    </div>
  );
}

function InfoCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-stone-200 bg-gradient-to-br ${accent} p-8 shadow-sm`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-700">
        {title}
      </p>
      <div className="mt-5 space-y-3 text-sm leading-7 text-stone-700">
        {items.map((item) => (
          <p key={item} className="rounded-2xl bg-white/80 px-4 py-3">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function DetailBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-stone-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-stone-700">{value}</p>
    </div>
  );
}
