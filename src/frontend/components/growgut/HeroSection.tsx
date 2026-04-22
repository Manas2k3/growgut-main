import React from "react";
import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { LeafShape } from "./LeafShape";
import { PRODUCT } from "@/shared/constants/product";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  handleHeroMove: (event: React.MouseEvent<HTMLElement>) => void;
  resetHeroGlow: () => void;
  smoothSpotlightX: MotionValue<number>;
  smoothSpotlightY: MotionValue<number>;
  heroTextY: MotionValue<number>;
  heroTextOpacity: MotionValue<number>;
  imageParallaxY: MotionValue<number>;
  scrollToBuy: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const passthroughLoader = ({ src }: { src: string }) => src;

export function HeroSection({
  heroRef,
  handleHeroMove,
  resetHeroGlow,
  smoothSpotlightX,
  smoothSpotlightY,
  heroTextY,
  heroTextOpacity,
  imageParallaxY,
  scrollToBuy,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      onMouseMove={handleHeroMove}
      onMouseLeave={resetHeroGlow}
  className="relative min-h-screen overflow-hidden pt-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(200,216,180,0.4)_0%,transparent_60%)]" />

      <LeafShape className="leaf-a left-[-6rem] top-[5rem] h-[8.5rem] w-[8.5rem] md:h-48 md:w-48" />
      <LeafShape className="leaf-b right-[-5rem] top-[7rem] h-[7.75rem] w-[7.75rem] md:h-44 md:w-44" />
      <LeafShape className="leaf-c bottom-[7rem] left-[4%] h-[6.75rem] w-[6.75rem] md:h-[9.25rem] md:w-[9.25rem]" />
      <LeafShape className="leaf-d bottom-[-2rem] right-[8%] h-[9.25rem] w-[9.25rem] md:h-[13rem] md:w-[13rem]" />

      <motion.div
        style={{ x: smoothSpotlightX, y: smoothSpotlightY }}
        className="pointer-events-none absolute top-0 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(196,154,60,0.22)_0%,_rgba(196,154,60,0)_72%)] blur-2xl md:block"
      />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-16 px-5 pb-16 md:px-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 max-w-2xl"
        >
            <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0 }}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]"
            >
            Ancient Wisdom. Modern Science.
            </motion.p>

          <div className="mt-6 space-y-1">
            {["Your gut has been", "trying to tell you"].map((line, index) => (
              <motion.h1
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 + index * 0.1 }}
                className="font-['Playfair_Display'] text-[44px] font-medium leading-[1.1] text-stone-900 md:text-[64px]"
              >
                {line}
              </motion.h1>
            ))}

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="font-['Playfair_Display'] text-[42px] font-medium leading-[1.1] text-stone-900 md:text-[62px]"
            >
              why you feel <span className="italic font-semibold text-[#2c522c]">bloated, tired, and foggy.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="mt-6 max-w-[480px] font-sans text-[17px] font-medium leading-[1.6] text-stone-700 md:text-[18px]"
          >
            A daily synbiotic blend of probiotics, prebiotics, and botanicals designed to restore your gut microbiome and improve digestion, energy, and clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-10"
          >
            <div className="flex flex-col gap-1">
              <p className="font-sans text-4xl font-semibold text-stone-900 md:text-5xl">
                ₹{PRODUCT.price}
              </p>
              <p className="font-sans text-[14px] font-normal text-stone-600">
                Just ₹99.9/day for better digestion
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.65 }}
            className="mt-6 flex flex-col items-start gap-3"
          >
            <motion.button
              type="button"
              onClick={scrollToBuy}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 40px rgba(44,82,44,0.35)",
              }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-gradient-to-b from-[#3a6b3a] to-[#2c522c] px-10 py-4 font-sans text-[18px] font-medium tracking-wide text-white shadow-[0_12px_24px_rgba(44,82,44,0.25)] transition-all"
            >
              Fix Your Gut in 14 Days →
            </motion.button>
            <p className="ml-4 font-sans text-[13px] font-medium text-stone-500">
              See noticeable improvements in digestion within 7–14 days
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[12px] font-medium uppercase tracking-[0.05em] text-stone-500">
              <span className="flex items-center gap-1.5"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3a6b3a]/15 text-[10px] text-[#3a6b3a]">✓</span> FSSAI Approved</span>
              <span className="flex items-center gap-1.5"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3a6b3a]/15 text-[10px] text-[#3a6b3a]">✓</span> Vegan &amp; No GMO</span>
              <span className="flex items-center gap-1.5"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3a6b3a]/15 text-[10px] text-[#3a6b3a]">✓</span> No Preservatives</span>
              <span className="flex items-center gap-1.5"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3a6b3a]/15 text-[10px] text-[#3a6b3a]">✓</span> Clinically Backed</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageParallaxY }}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative z-10 mt-12 flex items-center justify-center pointer-events-none lg:mt-0 lg:justify-self-end"
        >
          {/* Subtle glow / highlight to separate from background */}
          <div className="absolute inset-x-4 bottom-12 top-16 rounded-full bg-[radial-gradient(circle,_rgba(200,216,180,0.7)_0%,_rgba(200,216,180,0)_70%)] blur-[70px]" />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative rounded-[2rem] border border-emerald-900/10 bg-white/5 p-4 shadow-[0_22px_70px_rgba(28,25,23,0.18)] backdrop-blur-[2px]"
          >
            {/* Soft but stronger shadow beneath product faked manually to avoid square drop-shadow issues on white bg images */}
            <div className="absolute inset-x-12 -bottom-2 h-16 rounded-[100%] bg-black/25 blur-[35px]" />
            <div className="absolute inset-x-24 bottom-2 h-8 rounded-[100%] bg-black/30 blur-[16px]" />

            <div className="overflow-hidden rounded-[1.6rem]">
            <Image
              loader={passthroughLoader}
              unoptimized
              src={PRODUCT.images[0]}
              alt="GrowGut product box"
              width={800}
              height={920}
              priority
              className="relative z-10 h-auto w-full max-w-[650px] object-contain mix-blend-multiply md:max-w-[750px]"
            />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
