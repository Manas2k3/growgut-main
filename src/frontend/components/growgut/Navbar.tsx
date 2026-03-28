import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  scrolled: boolean;
  scrollToBuy: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar({ scrolled, scrollToBuy }: NavbarProps) {
  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[rgba(58,107,58,0.1)] bg-[rgba(245,242,236,0.85)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-['Playfair_Display'] text-[22px] italic text-[var(--green)]"
        >
          GrowGut
        </button>

        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease }}
            >
              <button
                type="button"
                onClick={scrollToBuy}
                className="rounded-full bg-[var(--green)] px-5 py-2 text-sm font-medium text-white transition duration-300 hover:scale-105 hover:brightness-110"
              >
                Buy Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
