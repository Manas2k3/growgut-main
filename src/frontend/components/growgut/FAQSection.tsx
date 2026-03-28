import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT } from "@/shared/constants/product";

interface FAQSectionProps {
  faqRef: React.RefObject<HTMLElement>;
  faqInView: boolean;
  activeFaq: number | null;
  setActiveFaq: React.Dispatch<React.SetStateAction<number | null>>;
  scrollToBuy: () => void;
}

export function FAQSection({
  faqRef,
  faqInView,
  activeFaq,
  setActiveFaq,
  scrollToBuy,
}: FAQSectionProps) {
  return (
    <section
      id="faq"
      ref={faqRef}
      className="bg-[var(--offwhite)] py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
            Ready To Begin
          </p>
          <h2 className="mt-5 font-['Playfair_Display'] text-4xl leading-tight md:text-6xl">
            Build a lighter,
            <span className="block italic text-[var(--green)]">
              calmer morning.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-8 text-[rgba(28,33,28,0.7)]">
            One sachet a day. Fifteen sachets per box. Premium fibers,
            probiotics, and botanicals designed for the Indian gut and a
            modern daily rhythm.
          </p>

          <div id="buy" className="mt-8 rounded-[30px] border border-[rgba(58,107,58,0.08)] bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.04)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">
              GrowGut Essentials
            </p>
            <div className="mt-4 flex items-end gap-3">
              <h3 className="font-['Playfair_Display'] text-5xl leading-none">
                ₹{PRODUCT.price}
              </h3>
              <span className="pb-1 text-sm text-[var(--muted)]">
                / box
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-7 text-[rgba(28,33,28,0.68)]">
              Pan-India shipping, WhatsApp confirmation, and clean-label
              formulation with no preservatives.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {PRODUCT.offers.map((offer) => (
                <span
                  key={offer.code}
                  className="rounded-full border border-[rgba(58,107,58,0.16)] bg-[rgba(200,216,180,0.35)] px-3 py-1 text-[12px] text-[var(--green)]"
                >
                  {offer.code} gives you {offer.discount}% off
                </span>
              ))}
            </div>

            <motion.button
              type="button"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 14px 34px rgba(58,107,58,0.24)",
              }}
              whileTap={{ scale: 0.98 }}
              className="mt-7 w-full rounded-full bg-[var(--green)] px-6 py-4 font-['Playfair_Display'] text-[20px] italic text-white"
            >
              Claim My Box →
            </motion.button>

            <div className="mt-5 space-y-2 text-sm text-[rgba(28,33,28,0.58)]">
              <p>✓ FSSAI licensed and clean label certified</p>
              <p>✓ Vegan, non-GMO, no artificial preservatives</p>
              <p>✓ Replacement guarantee for damaged shipments</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
              Questions, Answered
            </p>
            <h3 className="mt-4 font-['Playfair_Display'] text-3xl leading-tight md:text-5xl">
              Everything you&apos;d ask before
              <span className="block italic text-[var(--green)]">
                making it a ritual.
              </span>
            </h3>
          </motion.div>

          {PRODUCT.faqs.map((faq, index) => {
            const isOpen = activeFaq === index;

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="overflow-hidden rounded-[26px] border border-[rgba(58,107,58,0.08)] bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveFaq((current) => (current === index ? null : index))
                  }
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="font-['Playfair_Display'] text-[27px] leading-tight text-[var(--charcoal)]">
                    {faq.q}
                  </span>
                  <span className="text-2xl text-[var(--green)]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[rgba(58,107,58,0.08)] px-6 py-5 text-[15px] leading-8 text-[rgba(28,33,28,0.7)]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
