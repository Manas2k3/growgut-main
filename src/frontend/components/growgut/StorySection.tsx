import React from "react";
import { motion, MotionValue } from "framer-motion";

interface StorySectionProps {
  storyRef: React.RefObject<HTMLElement>;
  storyInView: boolean;
  storyTintY: MotionValue<number>;
}

export function StorySection({
  storyRef,
  storyInView,
  storyTintY,
}: StorySectionProps) {
  return (
    <section
      ref={storyRef}
      className="relative overflow-hidden bg-[var(--offwhite)] py-24 md:py-32"
    >
      <motion.div
        style={{ y: storyTintY }}
        className="absolute left-1/2 top-16 hidden h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(200,216,180,0.35)_0%,_rgba(200,216,180,0)_72%)] blur-3xl md:block"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
            The Real Story
          </p>
          <h2 className="mt-5 font-['Playfair_Display'] text-4xl leading-tight md:text-6xl">
            The problem isn&apos;t your discipline.
            <span className="block italic text-[var(--green)]">
              It&apos;s your microbiome.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-8 text-[rgba(28,33,28,0.68)]">
            When your gut bacteria fall out of balance, everything gets
            louder: bloating, cravings, sluggish digestion, energy swings.
            GrowGut is designed like a daily reset ritual for that entire
            internal ecosystem.
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "A modern synbiotic, grounded in Indian ingredients.",
              copy:
                "Instead of a one-note probiotic, GrowGut pairs live cultures with fibers and botanicals your gut can actually feed on. It is more complete, more intelligent, and more sustainable over time.",
            },
            {
              step: "02",
              title: "What you feel first is lightness.",
              copy:
                "Meals stop sitting so heavily. Mornings feel cleaner. The afternoon fog softens. This is what happens when digestion starts working with you instead of against you.",
            },
            {
              step: "03",
              title: "What continues is deeper metabolic support.",
              copy:
                "The same formula that helps regularity also supports cholesterol health and steadier blood sugar. It is a gut ritual with benefits that extend far beyond the stomach.",
            },
          ].map((panel, index) => (
            <motion.article
              key={panel.step}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="rounded-[28px] border border-[rgba(58,107,58,0.08)] bg-white/90 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--gold)]">
                  {panel.step}
                </span>
                <span className="h-px flex-1 bg-[rgba(58,107,58,0.12)]" />
              </div>
              <h3 className="mt-5 font-['Playfair_Display'] text-3xl leading-tight text-[var(--charcoal)]">
                {panel.title}
              </h3>
              <p className="mt-4 max-w-xl text-[16px] leading-8 text-[rgba(28,33,28,0.7)]">
                {panel.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
