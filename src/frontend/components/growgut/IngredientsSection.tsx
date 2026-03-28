import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT } from "@/shared/constants/product";

interface IngredientsSectionProps {
  activeIngredient: number;
  setActiveIngredient: (index: number) => void;
}

const passthroughLoader = ({ src }: { src: string }) => src;

export function IngredientsSection({
  activeIngredient,
  setActiveIngredient,
}: IngredientsSectionProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="bg-[var(--charcoal)] py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(200,216,180,0.7)]">
              Formula Atlas
            </p>
            <h2 className="mt-5 font-['Playfair_Display'] text-4xl leading-tight md:text-6xl">
              Every ingredient has
              <span className="block italic text-[var(--sage)]">
                a job to do.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-8 text-[rgba(255,255,255,0.7)]">
              Click through the formula and see how probiotics,
              prebiotics, and botanicals work together like a layered
              system instead of a single magic ingredient.
            </p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-4">
              <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(250,248,244,1)_0%,rgba(232,238,225,1)_100%)] p-5">
                {PRODUCT.ingredients.map((ingredient, index) => {
                  const isCurrent = activeIngredient === index;
                  const isLoaded = loadedImages[ingredient.image];

                  return (
                    <motion.div
                      key={ingredient.name}
                      initial={false}
                      animate={{
                        opacity: isCurrent ? 1 : 0,
                        scale: isCurrent ? 1 : 0.96,
                        y: isCurrent ? 0 : 20,
                        zIndex: isCurrent ? 10 : 0,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute inset-5 flex items-center justify-center"
                    >
                      {!isLoaded && isCurrent && (
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
                          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.25)_80%)] opacity-80" />
                          <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[shimmer_1.6s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]" />
                        </div>
                      )}
                      <Image
                        loader={passthroughLoader}
                        unoptimized
                        src={ingredient.image}
                        alt={ingredient.name}
                        width={520}
                        height={520}
                        priority={index === 0}
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [ingredient.image]: true,
                          }))
                        }
                        className={`h-full w-full object-contain transition-opacity duration-500 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[22px] bg-white/5 p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(200,216,180,0.75)]">
                  Active Focus
                </p>
                <h3 className="mt-3 font-['Playfair_Display'] text-3xl leading-tight text-white">
                  {PRODUCT.ingredients[activeIngredient].name}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
                  {PRODUCT.ingredients[activeIngredient].type}
                </p>
                <p className="mt-4 text-[15px] leading-7 text-[rgba(255,255,255,0.76)]">
                  {PRODUCT.ingredients[activeIngredient].note}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {PRODUCT.ingredients.map((ingredient, index) => (
              <button
                key={ingredient.name}
                type="button"
                onMouseEnter={() => setActiveIngredient(index)}
                onFocus={() => setActiveIngredient(index)}
                onClick={() => setActiveIngredient(index)}
                className={`w-full rounded-[28px] border px-6 py-6 text-left transition duration-300 ${
                  activeIngredient === index
                    ? "border-[rgba(200,216,180,0.5)] bg-[rgba(250,248,244,0.08)]"
                    : "border-white/10 bg-white/[0.03] hover:border-[rgba(200,216,180,0.24)] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-['Playfair_Display'] text-3xl leading-tight text-white">
                    {ingredient.name}
                  </h3>
                  <span className="rounded-full border border-[rgba(200,216,180,0.28)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[rgba(200,216,180,0.88)]">
                    {ingredient.type}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-[16px] leading-8 text-[rgba(255,255,255,0.72)]">
                  {ingredient.note}
                </p>
              </button>
            ))}

            <div className="grid gap-4 pt-6 sm:grid-cols-3">
              {[
                { label: "Sachets", value: `${PRODUCT.sachets}` },
                { label: "Shelf Life", value: PRODUCT.shelf_life },
                { label: "Live Cultures", value: PRODUCT.cfu },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(200,216,180,0.7)]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-['Playfair_Display'] text-3xl text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
