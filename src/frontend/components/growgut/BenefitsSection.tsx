import React from "react";
import { motion } from "framer-motion";
import { PRODUCT } from "@/shared/constants/product";

interface BenefitsSectionProps {
  benefitsRef: React.RefObject<HTMLElement>;
  benefitsInView: boolean;
}

export function BenefitsSection({
  benefitsRef,
  benefitsInView,
}: BenefitsSectionProps) {
  return (
    <section
      ref={benefitsRef}
      className="bg-[var(--cream)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          animate={
            benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
            What Changes
          </p>
          <h2 className="mt-5 font-['Playfair_Display'] text-4xl leading-tight md:text-6xl">
            The kind of benefits you can feel,
            <span className="block italic text-[var(--green)]">
              then measure.
            </span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRODUCT.benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="group rounded-[30px] border border-[rgba(58,107,58,0.1)] bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.04)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(58,107,58,0.1)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{benefit.icon}</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[rgba(58,107,58,0.45)]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-8 font-['Playfair_Display'] text-3xl leading-tight">
                {benefit.title}
              </h3>
              <p className="mt-4 text-[16px] leading-8 text-[rgba(28,33,28,0.7)]">
                {benefit.plain}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
