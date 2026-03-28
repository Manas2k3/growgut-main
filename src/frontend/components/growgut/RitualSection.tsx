import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCT } from "@/shared/constants/product";

interface RitualSectionProps {
  ritualRef: React.RefObject<HTMLElement>;
  ritualInView: boolean;
}

const passthroughLoader = ({ src }: { src: string }) => src;

export function RitualSection({
  ritualRef,
  ritualInView,
}: RitualSectionProps) {
  return (
    <section
      ref={ritualRef}
      className="bg-[linear-gradient(180deg,rgba(245,242,236,1)_0%,rgba(240,246,233,1)_100%)] py-24 md:py-32"
    >
  <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <motion.div
            animate={
              ritualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
            }
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
              Daily Ritual
            </p>
            <h2 className="mt-5 font-['Playfair_Display'] text-4xl leading-tight md:text-6xl">
              Beautifully simple.
              <span className="block italic text-[var(--green)]">
                Built to stick.
              </span>
            </h2>
          </motion.div>

          <div className="mt-10 space-y-5">
            {[
              {
                step: "01",
                title: "Open one sachet at sunrise.",
                text: "A tiny ritual that signals consistency. One sachet, once a day, before food.",
              },
              {
                step: "02",
                title: "Mix with 150ml lukewarm water.",
                text: "No blender, no shaker, no complexity. Stir and drink in under a minute.",
              },
              {
                step: "03",
                title: "Let your mornings get lighter.",
                text: "Over the next few weeks, notice the shift: easier digestion, calmer energy, less heaviness.",
              },
            ].map((ritual, index) => (
              <motion.article
                key={ritual.step}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="flex gap-5 rounded-[28px] border border-[rgba(58,107,58,0.08)] bg-white/90 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-sm uppercase tracking-[0.18em] text-white">
                  {ritual.step}
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-3xl leading-tight">
                    {ritual.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-8 text-[rgba(28,33,28,0.72)]">
                    {ritual.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:self-start"
        >
          <div className="absolute inset-x-10 top-10 h-80 rounded-full bg-[radial-gradient(circle,_rgba(58,107,58,0.16)_0%,_rgba(58,107,58,0)_72%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-[rgba(58,107,58,0.08)] bg-white p-5 shadow-[0_24px_90px_rgba(0,0,0,0.06)]">
            <div className="overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,rgba(250,248,244,1)_0%,rgba(235,242,227,1)_100%)]">
              <Image
                loader={passthroughLoader}
                unoptimized
                src={PRODUCT.images[5]}
                alt="How to use GrowGut"
                width={540}
                height={680}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="grid gap-4 px-2 pb-2 pt-6 sm:grid-cols-2">

              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
