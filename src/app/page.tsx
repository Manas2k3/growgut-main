"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { IngredientsSection } from "@/frontend/components/growgut/IngredientsSection";
import { HeroSection } from "@/frontend/components/growgut/HeroSection";
import { BenefitsSection } from "@/frontend/components/growgut/BenefitsSection";
import { PRODUCT } from "@/shared/constants/product";

const CHAPTERS = [
  {
    eyebrow: "THE FORMULA",
    heading: "Ancient botanicals. Modern probiotic science.",
    body:
      "Every sachet combines Lactobacillus acidophilus a clinically proven probiotic strain with prebiotic botanicals that Indian Ayurveda has trusted for centuries.",
    image: PRODUCT.images[0],
  },
  {
    eyebrow: "THE RITUAL",
    heading: "One sachet. Every morning. That's all.",
    body:
      "Mix in 150ml of lukewarm water. Drink before breakfast. In two to three weeks, your gut begins to rebalance quietly, naturally, consistently.",
    image: PRODUCT.images[4],
  },
  {
    eyebrow: "THE RESULT",
    heading: "The gut you forgot was possible.",
    body:
      "Less bloating. More regular. Clearer skin. Energy that doesn't spike and crash. A gut microbiome that actually works all from one small sachet a day.",
    image: PRODUCT.images[3],
  },
] as const;

const REVIEW_CARDS = [
  { name: "Ray Saisoubhagya", text: "GrowGut feels like a high-quality product. The formulation and overall experience make it comfortable for daily use." },
  { name: "Arpan Ghosh", text: "The taste is balanced and not overpowering. It doesn't feel artificial, which makes it easy to consume regularly." },
  { name: "Subhashish", text: "The product feels light and gentle. Compared to other probiotics, this one feels more natural." },
  { name: "Jayalaxmi Dash", text: "I found GrowGut easy to mix and consume daily. The aftertaste is mild and acceptable." },
  { name: "Adrija Chowdhury", text: "The packaging and quality give confidence. It feels like a thoughtfully made gut-health product." },
  { name: "Tamanna Lopamudra", text: "The taste is good and manageable. I didn't experience any discomfort after consuming it." },
  { name: "Jyotsna", text: "It feels suitable for daily intake. Not harsh or medicinal like some other gut supplements." },
  { name: "Swaraj Parida", text: "The product quality is impressive. I'd be comfortable continuing it as part of my routine." },
  { name: "Prajna Ritaparna", text: "GrowGut feels balanced and well-formulated. The experience has been smooth so far." },
  { name: "Debashis Tripathy", text: "Taste-wise it's fine, and overall it feels lighter compared to similar products I've tried." },
  { name: "Glorina Senapati", text: "The smell and texture are pleasant. Nothing overwhelming, which is a positive for daily use." },
  { name: "Raj Kishore Patra", text: "It seems like a reliable product. The quality stands out compared to regular supplements." },
  { name: "Praduman Singh", text: "GrowGut feels easy on the system. I didn't face any difficulty including it in my day." },
  { name: "MD Asif Saikh", text: "The taste is acceptable and not too sweet. Overall, it feels comfortable to consume." },
  { name: "Sudhir Jha", text: "The product appears premium and thoughtfully designed. I'd be open to using it long-term." },
  { name: "Chikesh Mishra", text: "It feels smoother and less harsh than other probiotics I've used earlier." },
  { name: "Tandin Dorji", text: "The experience has been good so far. It's something I can continue without hesitation." },
  { name: "Anurag Garnaik", text: "GrowGut feels balanced and easy to consume. A good option for daily gut care." },
  { name: "Sambit Jena", text: "The product quality is strong. Taste and after-feel are both manageable." },
  { name: "Ash", text: "It doesn't feel heavy or medicinal. That makes it easier to take regularly." },
  { name: "Salivan Pattnaik", text: "I liked the overall formulation. With slight taste refinement, it could be even better." },
  { name: "Trishna Ray", text: "GrowGut feels gentle and consistent. I'd consider continuing it as part of my routine." },
  { name: "Kriti Chaturvedi", text: "The quality and packaging build trust. It feels like a well-researched product." },
  { name: "Sansthita Das", text: "Taste and texture are comfortable. No unpleasant aftertaste." },
  { name: "Sanghamitra Sarkar", text: "The product feels natural and easy to consume daily." },
  { name: "Subhashree Rath", text: "I found GrowGut better balanced than many gut-health products in the market." },
  { name: "Sohni Ghosh", text: "It feels light and suitable for regular use. Overall experience has been positive." },
  { name: "Bidisha Dutta", text: "The product quality is good, and it fits well into a daily routine." },
  { name: "Subrata Sahoo", text: "GrowGut feels reliable and easy on the stomach." },
  { name: "Soumya Parida", text: "The taste is mild and acceptable. I didn't face any issues consuming it." },
  { name: "Amiya Biswal", text: "The formulation feels premium. It doesn't feel like a generic supplement." }
] as const;

const PRODUCT_INFO = [
  {
    title: "Packaging & Storage",
    body:
      "Sachet: 100x5x40mm · Box: 110x50x220mm · Premium matte paper · Store at room temperature",
  },
  {
    title: "Manufacturing",
    body:
      "Manufactured by: Balextra Lifescience Pvt. Ltd · 239-240, Shiv Bhakti Industry, Sanki, Palsana, Surat-394305 · FSSAI Mfg License: 10723998000348 · Country of Origin: India",
  },
  {
    title: "Safety & Regulatory",
    body:
      'FSSAI License: 12025999000201 · No artificial preservatives · Food category: 13.6 · Disclaimer: This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },
] as const;

const BENEFIT_POWERED_BY = [
  "Lactobacillus acidophilus",
  "Bael Powder",
  "Sprouted Ragi",
] as const;

const BASE_PRICE = 1499;
const COD_CHARGE = 50;
const ease = [0.16, 1, 0.3, 1] as const;

type PaymentMethod = "online" | "cod";
type PaymentStatus = "idle" | "loading" | "success" | "failed";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
};

const initialFormState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  pincode: "",
  city: "",
  state: "",
};

// Declare the Razorpay global injected by checkout.js
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

/** Dynamically loads the Razorpay checkout.js script (once). */
async function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export default function Page() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const benefitsRef = useRef<HTMLElement | null>(null);
  const ritualRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);
  const buyRef = useRef<HTMLElement | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const [activeIngredient, setActiveIngredient] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [failureReason, setFailureReason] = useState("");
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<FormState>(initialFormState);
  // Keep submitted for backward compat (drives same overlay logic)
  const submitted = paymentStatus === "success";

  const storyInView = useInView(storyRef, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });
  const benefitsInView = useInView(benefitsRef, {
    once: true,
    amount: 0.25,
  });
  const ritualInView = useInView(ritualRef, {
    once: true,
    amount: 0.2,
  });
  const reviewsInView = useInView(reviewsRef, {
    once: true,
    amount: 0.2,
  });
  const faqInView = useInView(faqRef, {
    once: true,
    amount: 0.2,
  });
  const buyInView = useInView(buyRef, {
    once: true,
    amount: 0.15,
  });

  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const smoothSpotlightX = useSpring(spotlightX, {
    stiffness: 110,
    damping: 18,
    mass: 0.45,
  });
  const smoothSpotlightY = useSpring(spotlightY, {
    stiffness: 110,
    damping: 18,
    mass: 0.45,
  });

  const { scrollYProgress: pageScrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useSpring(pageScrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, -40]);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, 56]);
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0.52]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const chapterImageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);

  const discountedPrice = Math.round(BASE_PRICE * (1 - discount / 100));
  const finalAmount = paymentMethod === "cod" ? discountedPrice + COD_CHARGE : discountedPrice;

  useEffect(() => {
    const existing = document.querySelector("[data-growgut-fonts='true']");
    if (existing) {
      return;
    }

    const preconnectGoogle = document.createElement("link");
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";
    preconnectGoogle.setAttribute("data-growgut-fonts", "true");

    const preconnectStatic = document.createElement("link");
    preconnectStatic.rel = "preconnect";
    preconnectStatic.href = "https://fonts.gstatic.com";
    preconnectStatic.crossOrigin = "anonymous";
    preconnectStatic.setAttribute("data-growgut-fonts", "true");

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Sans:wght@400;500;700&display=swap";
    stylesheet.setAttribute("data-growgut-fonts", "true");

    document.head.append(preconnectGoogle, preconnectStatic, stylesheet);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value < 0.33) {
        setActiveChapter(0);
        return;
      }

      if (value < 0.66) {
        setActiveChapter(1);
        return;
      }

      setActiveChapter(2);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const target = heroRef.current?.getBoundingClientRect();
    if (!target) {
      return;
    }

    spotlightX.set(target.width * 0.55);
    spotlightY.set(target.height * 0.32);
  }, [spotlightX, spotlightY]);

  const scrollToBuy = () => {
    document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    spotlightX.set(event.clientX - bounds.left - 180);
    spotlightY.set(event.clientY - bounds.top - 180);
  };

  const resetHeroGlow = () => {
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    spotlightX.set(bounds.width * 0.55);
    spotlightY.set(bounds.height * 0.32);
  };

  const handlePromoApply = () => {
    const normalizedCode = promoCode.trim().toUpperCase();
    const matchedOffer = PRODUCT.offers.find((offer) => offer.code === normalizedCode);

    if (!normalizedCode) {
      setPromoError("Enter a promo code to apply.");
      setDiscount(0);
      return;
    }

    if (!matchedOffer) {
      setPromoError("That code doesn't look valid. Try GUT20 or GUT50.");
      setDiscount(0);
      return;
    }

    setDiscount(matchedOffer.discount);
    setPromoError("");
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /** Client-side pre-validation (mirrors server validation for fast feedback). */
  const validateForm = useCallback((): string | null => {
    if (!formState.fullName.trim()) return "Please enter your full name.";
    if (!/^[6-9][0-9]{9}$/.test(formState.phone.trim()))
      return "Please enter a valid 10-digit Indian mobile number.";
    if (!formState.address.trim()) return "Please add your delivery address.";
    if (!/^[1-9][0-9]{5}$/.test(formState.pincode.trim()))
      return "Please enter a valid 6-digit pincode.";
    if (!formState.city.trim() || !formState.state.trim())
      return "Please complete your city and state.";
    return null;
  }, [formState]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setFormError("");

    // ── COD path ──────────────────────────────────────────────────────────────
    if (paymentMethod === "cod") {
      setPaymentStatus("loading");
      try {
        const res = await fetch("/api/orders/save-cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: {
              name: formState.fullName,
              email: formState.email,
              phone: formState.phone,
              address: formState.address,
              city: formState.city,
              state: formState.state,
              pincode: formState.pincode,
            },
            orderDetails: {
              quantity: 1,
              pricePerBox: BASE_PRICE,
              totalAmount: discountedPrice,
              ...(discount > 0 ? { promoCode: promoCode.trim().toUpperCase(), discount } : {}),
            },
            finalAmount,
          }),
        });
        const data = await res.json() as { success?: boolean; orderId?: string; error?: string };
        if (!res.ok || !data.success) {
          throw new Error(data.error ?? "Failed to place COD order.");
        }
        setConfirmedOrderId(data.orderId ?? "");
        setPaymentStatus("success");
      } catch (err) {
        console.error("[COD] Error:", err);
        setFailureReason(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        setPaymentStatus("failed");
      }
      return;
    }

    // ── Online payment path ───────────────────────────────────────────────────
    setPaymentStatus("loading");

    try {
      // Step 1: Create Razorpay order on the server
      const createRes = await fetch("/api/orders/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formState.fullName,
            email: formState.email,
            phone: formState.phone,
            address: formState.address,
            city: formState.city,
            state: formState.state,
            pincode: formState.pincode,
          },
          amountInPaise: finalAmount * 100,
        }),
      });

      const createData = await createRes.json() as {
        razorpayOrderId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        error?: string;
      };

      if (!createRes.ok || !createData.razorpayOrderId) {
        throw new Error(createData.error ?? "Could not initiate payment.");
      }

      // Step 2: Load Razorpay checkout script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Payment gateway could not load. Check your internet connection and try again.");
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error("Payment gateway is not configured.");
      }

      // Step 3: Open Razorpay modal
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: keyId,
          amount: createData.amount,
          currency: createData.currency ?? "INR",
          name: "GrowGut",
          description: "GrowGut Synbiotic — 15 Day Box",
          image: "/images/logo.png",
          order_id: createData.razorpayOrderId,
          prefill: {
            name: formState.fullName,
            email: formState.email,
            contact: formState.phone,
          },
          notes: {
            address: formState.address,
            growgut_order_id: createData.orderId,
          },
          theme: { color: "#3a6b3a" },
          modal: {
            ondismiss: () => {
              // User closed the modal without paying
              reject(new Error("Payment was cancelled. You can try again anytime."));
            },
          },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            // Step 4: Verify signature and save order on the server
            try {
              const verifyRes = await fetch("/api/orders/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  orderId: createData.orderId,
                  customer: {
                    name: formState.fullName,
                    email: formState.email,
                    phone: formState.phone,
                    address: formState.address,
                    city: formState.city,
                    state: formState.state,
                    pincode: formState.pincode,
                  },
                  orderDetails: {
                    quantity: 1,
                    pricePerBox: BASE_PRICE,
                    totalAmount: discountedPrice,
                    paymentMethod: "online",
                    ...(discount > 0 ? { promoCode: promoCode.trim().toUpperCase(), discount } : {}),
                  },
                  amountPaidInPaise: createData.amount,
                }),
              });

              const verifyData = await verifyRes.json() as { success?: boolean; orderId?: string; error?: string };

              if (!verifyRes.ok || !verifyData.success) {
                reject(new Error(verifyData.error ?? "Payment verification failed."));
                return;
              }

              setConfirmedOrderId(verifyData.orderId ?? "");
              resolve();
            } catch (verifyErr) {
              reject(verifyErr);
            }
          },
        });

        rzp.open();
      });

      setPaymentStatus("success");
    } catch (err) {
      console.error("[payment] Error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFailureReason(message);
      setPaymentStatus("failed");
    }
  };

  const scrollToChapter = (index: number) => {
    const container = sectionRef.current;
    if (!container) {
      return;
    }

    const start = container.offsetTop;
    const targetProgress = index / (CHAPTERS.length - 1);
    const scrollOffset =
      start + targetProgress * (container.offsetHeight - window.innerHeight);

    window.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --cream: #f5f2ec;
          --green: #3a6b3a;
          --sage: #c8d8b4;
          --charcoal: #1c211c;
          --gold: #c49a3c;
          --muted: #6b8f5e;
          --offwhite: #faf8f4;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--cream);
          color: var(--charcoal);
          font-family: "DM Sans", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: rgba(196, 154, 60, 0.22);
          color: var(--charcoal);
        }

        @keyframes leafDriftA {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(16px, -18px, 0) rotate(8deg);
          }
        }

        @keyframes leafDriftB {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-18px, 14px, 0) rotate(-12deg);
          }
        }

        @keyframes leafDriftC {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(12px, 20px, 0) rotate(10deg);
          }
        }

        @keyframes leafDriftD {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-12px, -22px, 0) rotate(-8deg);
          }
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .leaf-a {
          animation: leafDriftA 25s ease-in-out infinite;
        }

        .leaf-b {
          animation: leafDriftB 32s ease-in-out infinite 2s;
        }

        .leaf-c {
          animation: leafDriftC 18s ease-in-out infinite 1s;
        }

        .leaf-d {
          animation: leafDriftD 40s ease-in-out infinite 4s;
        }

        .ticker-track {
          width: max-content;
          animation: ticker 18s linear infinite;
        }
      `}</style>

      <div ref={pageRef} className="bg-[var(--cream)] text-[var(--charcoal)]">
        <div className="fixed left-0 right-0 top-0 z-40 h-0.5 bg-transparent">
          <motion.div
            style={{ scaleX: progressScale }}
            className="h-full origin-left bg-[var(--green)]"
          />
        </div>

        <nav
          className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${scrolled
              ? "border-b border-[rgba(58,107,58,0.1)] bg-[rgba(245,242,236,0.85)] backdrop-blur-md"
              : "bg-transparent"
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
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <button
                    type="button"
                    onClick={scrollToBuy}
                    className="rounded-full bg-[var(--green)] px-5 py-2 text-sm text-white transition duration-300 hover:scale-105 hover:brightness-110"
                  >
                    Buy Now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <main>
          <HeroSection
            heroRef={heroRef}
            handleHeroMove={handleHeroMove}
            resetHeroGlow={resetHeroGlow}
            smoothSpotlightX={smoothSpotlightX}
            smoothSpotlightY={smoothSpotlightY}
            heroTextY={heroTextY}
            heroTextOpacity={heroTextOpacity}
            imageParallaxY={heroImageY}
            scrollToBuy={scrollToBuy}
          />

          <section className="overflow-hidden bg-[var(--green)] py-3">
            <div className="ticker-track flex w-max">
              {[0, 1].map((block) => (
                <div
                  key={block}
                  className="flex shrink-0 items-center gap-8 pr-8 text-[13px] text-white"
                >
                  {[
                    "🌿 1 Billion Live Cultures",
                    "✓ FSSAI Licensed",
                    "🇮🇳 Made in India",
                    "🌱 100% Vegan",
                    // "⭐ 4.8 Rating",
                    "📦 Free Shipping",
                    "🚫 No GMO",
                    "✨ Clean Label",
                  ].map((item, index, items) => (
                    <span key={`${block}-${item}`} className="flex items-center gap-8">
                      <span className="whitespace-nowrap">{item}</span>
                      {index < items.length - 1 && (
                        <span className="text-[10px] text-white/40">·</span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section ref={storyRef} className="bg-[var(--offwhite)] py-32">
            <div className="mx-auto max-w-2xl px-6 text-center">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.65, ease }}
                className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]"
              >
                THE SILENT PROBLEM
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, ease, delay: 0.08 }}
                className="mt-6 font-['Playfair_Display'] text-[28px] leading-[1.2] text-[var(--charcoal)] md:text-[42px]"
              >
                70% of your immune system lives in your gut.
              </motion.h2>

              <div className="mt-8 space-y-6 text-left">
                {[
                  "Your gut microbiome trillions of bacteria living in your digestive tract is the control center for your digestion, immunity, metabolism, and even your mood. When it's out of balance, everything feels off.",
                  "Bloating. Brain fog. Erratic energy after meals. Poor sleep. Skin that acts up. These aren't random. They're signals from a gut that needs attention.",
                ].map((paragraph, index) => (
                  <motion.div
                    key={paragraph}
                    initial={{ opacity: 0, y: 24 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.7, ease, delay: 0.16 + index * 0.12 }}
                    className="text-[17px] leading-[1.8] text-[rgba(28,33,28,0.7)]"
                  >
                    {paragraph}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.7, ease, delay: 0.42 }}
                  className="font-['Playfair_Display'] text-[24px] italic leading-[1.55] text-[var(--green)] md:text-[28px]"
                >
                  Most Indians are unknowingly living with gut dysbiosis a
                  microbial imbalance caused by processed food, stress,
                  antibiotics, and poor dietary fiber. GrowGut was formulated
                  to fix exactly this.
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={
                  storyInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.8 }
                }
                transition={{ duration: 0.7, ease, delay: 0.55 }}
                className="mx-auto mt-16 h-px w-[60%] bg-[rgba(200,216,180,0.9)]"
              />

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  { value: "10⁹", label: "CFU per sachet" },
                  { value: "15", label: "Daily sachets per box" },
                  { value: "2–3", label: "Weeks to feel the difference" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.7, ease, delay: 0.65 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="font-['Playfair_Display'] text-[44px] text-[var(--green)]">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-[13px] text-[rgba(28,33,28,0.6)]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section ref={sectionRef} className="relative h-[300vh] bg-[var(--cream)]">
            <div className="sticky top-0 h-screen overflow-hidden">
              <div className="mx-auto grid h-full max-w-7xl grid-rows-[minmax(220px,34svh)_minmax(0,1fr)] content-start gap-6 px-5 py-4 md:grid-rows-[minmax(280px,40svh)_minmax(0,1fr)] md:px-8 md:py-6 lg:grid-cols-[1fr_minmax(0,560px)] lg:grid-rows-1 lg:items-center lg:gap-12 lg:py-0 xl:grid-cols-[1fr_minmax(0,640px)]">
                <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-[28px] bg-[rgba(255,255,255,0.34)] sm:rounded-[32px] lg:h-full lg:rounded-none lg:bg-transparent">
                  <motion.div
                    style={{ scale: chapterImageScale }}
                    className="relative flex h-full w-full items-center justify-center"
                  >
                    <div className="absolute inset-x-6 bottom-4 top-8 rounded-full bg-[radial-gradient(circle,_rgba(200,216,180,0.48)_0%,_rgba(200,216,180,0)_72%)] blur-3xl lg:inset-x-10 lg:bottom-20 lg:top-20" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeChapter}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 flex h-full w-full items-center justify-center p-4 lg:p-8"
                      >
                        <motion.div
                          animate={{ y: [0, -12, 0] }}
                          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                          className="relative rounded-[2rem] border border-emerald-900/10 bg-white/5 p-4 shadow-[0_22px_70px_rgba(28,25,23,0.18)] backdrop-blur-[2px]"
                        >
                          <div className="absolute inset-x-12 -bottom-2 h-16 rounded-[100%] bg-black/25 blur-[35px]" />
                          <div className="absolute inset-x-24 bottom-2 h-8 rounded-[100%] bg-black/30 blur-[16px]" />

                          <div className="overflow-hidden rounded-[1.6rem]">
                            <Image
                              src={CHAPTERS[activeChapter].image}
                              alt={CHAPTERS[activeChapter].heading}
                              width={720}
                              height={820}
                              className="relative z-10 h-full w-full max-h-[34svh] object-contain mix-blend-multiply sm:max-h-[40svh] lg:h-auto lg:max-h-none lg:max-w-[620px]"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="relative z-10 min-w-0 pb-4 lg:pb-0 lg:pr-36">
                  <div className="relative max-w-[34rem]">
                    <div className="relative min-h-[330px] sm:min-h-[360px] lg:min-h-[380px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeChapter}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                        >
                          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">
                            {CHAPTERS[activeChapter].eyebrow}
                          </p>
                          <h2 className="mt-4 max-w-[11ch] font-['Playfair_Display'] text-[30px] leading-[1.06] sm:text-[34px] md:text-[42px] xl:text-[54px]">
                            {CHAPTERS[activeChapter].heading}
                          </h2>
                          <p className="mt-4 max-w-[30rem] text-[15px] leading-[1.75] text-[rgba(28,33,28,0.72)] sm:text-[16px] lg:mt-6 lg:text-[17px] xl:text-[18px]">
                            {CHAPTERS[activeChapter].body}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col">
                    {CHAPTERS.map((chapter, index) => (
                      <button
                        key={chapter.eyebrow}
                        type="button"
                        onClick={() => scrollToChapter(index)}
                        className="flex items-center justify-center rounded-full p-1.5 transition-transform duration-300"
                        aria-label={`Go to ${chapter.eyebrow}`}
                      >
                        <span
                          className={`block rounded-full border-[var(--green)] transition-all duration-300 ${index === activeChapter
                              ? "h-2.5 w-2.5 scale-110 bg-[var(--green)]"
                              : "h-2 w-2 border"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <BenefitsSection
            benefitsRef={benefitsRef}
            benefitsInView={benefitsInView}
          />

          <IngredientsSection
            activeIngredient={activeIngredient}
            setActiveIngredient={setActiveIngredient}
          />

          <section ref={ritualRef} className="bg-[var(--green)] py-28 text-white">
            <div className="mx-auto max-w-6xl px-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={ritualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.75, ease }}
                className="text-center font-['Playfair_Display'] text-[36px] md:text-[48px]"
              >
                Your 60-second morning ritual
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={ritualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.75, ease, delay: 0.08 }}
                className="mt-3 text-center text-[16px] text-white/60"
              >
                That's all it takes. Every single day.
              </motion.p>

              <div className="mt-16 grid gap-8 md:grid-cols-4">
                {[
                  {
                    icon: "",
                    title: "Morning, before food",
                    body: "Start on an empty stomach for maximum absorption.",
                  },
                  {
                    icon: "",
                    title: "Tear open one sachet",
                    body: "Each sachet contains your full daily dose of 8g, pre-measured.",
                  },
                  {
                    icon: "",
                    title: "Mix in 150ml lukewarm water",
                    body: "Pour 1 sachet into 150ml of lukewarm water not hot, not cold. Stir for 10 seconds and drink immediately. Do not let it sit.",
                  },
                  {
                    icon: "",
                    title: "Repeat daily",
                    body: "Consistency is everything. Your microbiome rebuilds over weeks, not days.",
                  },
                ].map((step, index, collection) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={ritualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.75, ease, delay: index * 0.12 }}
                    className="relative text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 font-['Playfair_Display'] text-2xl text-[var(--gold)]">
                      {index + 1}
                    </div>
                    {index < collection.length - 1 && (
                      <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] border-t border-dashed border-white/25 md:block" />
                    )}
                    <div className="mt-5 text-3xl">{step.icon}</div>
                    <h3 className="mt-4 font-['Playfair_Display'] text-[26px] leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.75] text-white/70">
                      {step.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={ritualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease, delay: 0.45 }}
                className="mx-auto mt-16 max-w-xl rounded-2xl border border-white/20 bg-white/10 p-8"
              >
                <h3 className="font-['Playfair_Display'] text-[30px] italic text-white">
                  What to Expect
                </h3>
                <div className="mt-5 space-y-3 text-[15px] leading-[1.8] text-white/80">
                  <p>
                    <span className="font-medium text-white">Day 1–5:</span> Your gut begins
                    adjusting. Most users notice less bloating and improved digestion within the first 5–10 days. By day 15, your gut feels noticeably different. Continue with a second box to maintain and deepen the benefits over time.
                  </p>
                  <p>
                    <span className="font-medium text-white">Day 6–10:</span> Digestion feels
                    more settled. Energy after meals becomes more consistent. Less of that
                    heavy, foggy feeling.
                  </p>
                  <p>
                    <span className="font-medium text-white">Day 11–15:</span> Noticeable
                    improvement in regularity and gut comfort. Your microbiome has begun
                    rebalancing.
                  </p>
                  <p>
                    <span className="font-medium text-white">Beyond day 15:</span> Continue
                    with a second box to maintain and deepen the benefits a balanced gut
                    is built over time, not overnight.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section ref={reviewsRef} className="bg-[var(--cream)] py-28">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.75, ease }}
                className="mb-16 text-center"
              >
                <h2 className="font-['Playfair_Display'] text-[42px] lg:text-[56px] leading-none text-[var(--green)]">
                  What Our Users Say
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {REVIEW_CARDS.slice(reviewPage * 3, reviewPage * 3 + 3).map((review, index) => (
                  <motion.article
                    key={review.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={reviewsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.75, ease, delay: index * 0.15 }}
                    className="relative rounded-2xl border border-[rgba(200,216,180,0.4)] bg-white p-7"
                  >
                    <div className="pointer-events-none absolute left-5 top-5 font-['Playfair_Display'] text-[80px] leading-[0.5] text-[rgba(200,216,180,0.4)]">
                      “
                    </div>
                    <p className="relative z-10 pt-6 font-['Playfair_Display'] text-[17px] italic leading-[1.7] text-[var(--charcoal)]">
                      {review.text}
                    </p>
                    <div className="mt-8 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[14px] font-semibold text-[var(--charcoal)]">
                          {review.name}
                        </p>
                        {/* <p className="text-[13px] text-[var(--muted)]">Verified Buyer</p> */}
                      </div>
                      {/* <p className="text-sm text-[var(--gold)]">★★★★★</p> */}
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setReviewPage((prev) => (prev + 1) * 3 >= REVIEW_CARDS.length ? 0 : prev + 1)}
                  className="rounded-full border border-[var(--green)] bg-transparent px-8 py-3 text-[14px] font-medium text-[var(--green)] transition-all hover:bg-[var(--green)] hover:text-white"
                >
                  Show more reviews →
                </button>
              </div>
            </div>
          </section>

          <section ref={faqRef} className="bg-[var(--offwhite)] py-28">
            <div className="mx-auto max-w-2xl px-6">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.75, ease }}
                className="text-center font-['Playfair_Display'] text-[34px] md:text-[42px]"
              >
                Everything you're wondering about
              </motion.h2>

              <div className="mt-12">
                {PRODUCT.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={faq.q}
                      className="border-b border-[rgba(200,216,180,0.5)] py-5"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex((current) => (current === index ? null : index))
                        }
                        className="flex w-full items-center justify-between gap-5 text-left transition hover:text-[var(--green)]"
                      >
                        <span className="text-[16px] font-semibold text-[var(--charcoal)]">
                          {faq.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-2xl text-[var(--green)]"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pt-4 text-[15px] leading-[1.7] text-[rgba(28,33,28,0.65)]">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="buy" ref={buyRef} className="bg-[var(--cream)] py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={buyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.75, ease }}
                className="text-center font-['Playfair_Display'] text-[36px] md:text-[48px]"
              >
                Start your gut reset today
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={buyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.75, ease, delay: 0.08 }}
                className="mt-3 text-center text-[16px] text-[rgba(28,33,28,0.6)]"
              >
                One box. 15 days. Results you can feel.
              </motion.p>

              <div className="mt-14 grid gap-12 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={buyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, ease }}
                  className="rounded-3xl bg-white p-8 shadow-lg"
                >
                  <div className="overflow-hidden rounded-2xl bg-[var(--offwhite)]">
                    <Image
                      src={PRODUCT.images[2]}
                      alt="GrowGut sachet and box"
                      width={640}
                      height={440}
                      className="h-[300px] w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <h3 className="mt-6 font-['Playfair_Display'] text-[28px] text-[var(--charcoal)]">
                    {PRODUCT.name}
                  </h3>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="font-['Playfair_Display'] text-[44px] leading-none text-[var(--charcoal)]">
                        ₹{PRODUCT.price}
                      </div>
                      {discount > 0 && (
                        <div className="mt-2 text-[15px] text-[var(--green)]">
                          <span className="mr-2 text-[rgba(28,33,28,0.45)] line-through">
                            ₹{BASE_PRICE.toLocaleString("en-IN")}
                          </span>
                          ₹{discountedPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>
                    <p className="text-[16px] text-[var(--gold)]">₹99.9/day</p>
                  </div>

                  <div className="mt-5 space-y-2 text-[14px] leading-[1.7] text-[rgba(28,33,28,0.7)]">
                    <p>✓ 15 Sachets per box</p>
                    <p>✓ 1 Billion CFU per sachet</p>
                    <p>✓ Vegan · No GMO · FSSAI Licensed</p>
                    <p>✓ Free pan-India shipping</p>
                  </div>

                  <div className="mt-6 rounded-xl bg-[rgba(200,216,180,0.2)] p-4">
                    <div className="flex gap-3">
                      <input
                        value={promoCode}
                        onChange={(event) => setPromoCode(event.target.value)}
                        placeholder="Enter promo code (if you have one)"
                        className="w-full rounded-lg border border-[rgba(200,216,180,0.8)] bg-white px-4 py-2 text-[14px] text-[var(--charcoal)] outline-none transition focus:border-[var(--green)]"
                      />
                      <button
                        type="button"
                        onClick={handlePromoApply}
                        className="rounded-lg bg-[var(--green)] px-4 py-2 text-sm text-white"
                      >
                        Apply
                      </button>
                    </div>

                    {discount > 0 && !promoError && (
                      <p className="mt-3 text-[13px] text-[var(--green)]">
                        ✓ {promoCode.trim().toUpperCase()} applied — {discount}% off!
                      </p>
                    )}

                    {promoError && (
                      <p className="mt-3 text-[13px] text-red-500">{promoError}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={buyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, ease, delay: 0.08 }}
                  className="relative rounded-3xl bg-white p-8 shadow-lg"
                >
                  <AnimatePresence>
                    {/* ── Loading overlay ── */}
                    {paymentStatus === "loading" && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-[rgba(250,248,244,0.97)] px-8 text-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="h-12 w-12 rounded-full border-4 border-[rgba(58,107,58,0.15)] border-t-[var(--green)]"
                        />
                        <p className="mt-5 text-[15px] font-medium text-[var(--charcoal)]">
                          Processing your order…
                        </p>
                        <p className="mt-1 text-[13px] text-[rgba(28,33,28,0.5)]">
                          Please don't close this page.
                        </p>
                      </motion.div>
                    )}

                    {/* ── Success overlay ── */}
                    {paymentStatus === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-[rgba(250,248,244,0.97)] px-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 220, damping: 16 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)] text-3xl text-white shadow-lg"
                        >
                          ✓
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="mt-6 font-['Playfair_Display'] text-[34px] text-[var(--green)]"
                        >
                          {paymentMethod === "cod" ? "Order placed!" : "Payment confirmed!"}
                        </motion.h3>
                        {confirmedOrderId && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 rounded-lg bg-[rgba(200,216,180,0.3)] px-4 py-1.5 text-[13px] font-medium text-[var(--green)]"
                          >
                            Order ID: {confirmedOrderId}
                          </motion.p>
                        )}
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35, duration: 0.4 }}
                          className="mt-4 max-w-sm text-[15px] leading-[1.8] text-[rgba(28,33,28,0.68)]"
                        >
                          {paymentMethod === "cod"
                            ? "Your COD order is confirmed. We'll WhatsApp you the tracking details once shipped."
                            : "Your gut reset starts now. We'll WhatsApp you the tracking details once your box ships. 🌿"}
                        </motion.p>
                        <motion.a
                          href="https://wa.me/919999999999"
                          target="_blank"
                          rel="noreferrer"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-[14px] font-medium text-white shadow-md transition-opacity hover:opacity-90"
                        >
                          <svg viewBox="0 0 32 32" className="h-4 w-4 fill-white" aria-hidden="true">
                            <path d="M19.11 17.26c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.66.15-.19.29-.76.95-.93 1.14-.17.19-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.44-1.69-1.61-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.03.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34zM16.01 3.2c-7.02 0-12.7 5.68-12.7 12.7 0 2.25.59 4.36 1.62 6.19L3 29l7.1-1.86c1.76.96 3.79 1.5 5.91 1.5h.01c7.01 0 12.69-5.68 12.69-12.7S23.03 3.2 16.01 3.2zm0 23.3h-.01c-1.9 0-3.76-.51-5.39-1.48l-.39-.23-4.21 1.1 1.12-4.11-.25-.42a10.47 10.47 0 0 1-1.6-5.55c0-5.79 4.72-10.5 10.53-10.5 2.81 0 5.45 1.09 7.44 3.08a10.42 10.42 0 0 1 3.08 7.42c0 5.8-4.72 10.51-10.52 10.51z" />
                          </svg>
                          Chat with us on WhatsApp
                        </motion.a>
                      </motion.div>
                    )}

                    {/* ── Failed overlay ── */}
                    {paymentStatus === "failed" && (
                      <motion.div
                        key="failed"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-[rgba(250,248,244,0.97)] px-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 220, damping: 16 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-3xl text-white shadow-lg"
                        >
                          ✕
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="mt-6 font-['Playfair_Display'] text-[30px] text-[var(--charcoal)]"
                        >
                          Payment not completed
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          className="mt-3 max-w-sm text-[14px] leading-[1.75] text-[rgba(28,33,28,0.62)]"
                        >
                          {failureReason}
                        </motion.p>
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPaymentStatus("idle")}
                          className="mt-8 rounded-xl bg-[var(--green)] px-8 py-3 font-['Playfair_Display'] text-[18px] italic text-white shadow-md"
                        >
                          Try again →
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Field
                      label="Full Name"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleChange}
                      required
                    />

                    <Field
                      label="Phone Number"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      required
                      pattern="[6-9][0-9]{9}"
                    />

                    <Field
                      label="Email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      type="email"
                    />

                    <Field
                      label="Delivery Address"
                      name="address"
                      value={formState.address}
                      onChange={handleChange}
                      textarea
                      rows={3}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Pincode"
                        name="pincode"
                        value={formState.pincode}
                        onChange={handleChange}
                      />
                      <Field
                        label="City"
                        name="city"
                        value={formState.city}
                        onChange={handleChange}
                      />
                    </div>

                    <Field
                      label="State"
                      name="state"
                      value={formState.state}
                      onChange={handleChange}
                    />

                    <div className="pt-2">
                      <p className="mb-3 text-[14px] font-medium text-[var(--charcoal)]">
                        Payment Method
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { key: "online", label: "💳 Online Payment" },
                          // { key: "cod", label: "🏠 Cash on Delivery" },
                        ].map((option) => {
                          const active = paymentMethod === option.key;

                          return (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() =>
                                setPaymentMethod(option.key as PaymentMethod)
                              }
                              className={`rounded-xl border px-4 py-3 text-sm transition ${active
                                  ? "border-[var(--green)] bg-[var(--green)] text-white"
                                  : "border-[rgba(58,107,58,0.2)] bg-[rgba(200,216,180,0.3)] text-[var(--green)]"
                                }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      {paymentMethod === "cod" && (
                        <p className="mt-3 text-[13px] text-[var(--muted)]">
                          ₹50 COD handling charge applies. Final amount: ₹
                          {finalAmount.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    {formError && (
                      <p className="text-[13px] text-red-500">{formError}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={paymentStatus === "loading"}
                      whileHover={paymentStatus !== "loading" ? {
                        scale: 1.02,
                        boxShadow: "0 8px 30px rgba(58,107,58,0.25)",
                      } : {}}
                      whileTap={paymentStatus !== "loading" ? { scale: 0.98 } : {}}
                      className="mt-2 w-full rounded-xl bg-[var(--green)] py-4 font-['Playfair_Display'] text-[20px] italic text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {paymentStatus === "loading"
                        ? "Processing…"
                        : paymentMethod === "cod"
                          ? "Place COD Order →"
                          : "Pay Securely →"}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="bg-[var(--offwhite)] py-16">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-[18px] font-semibold text-[var(--charcoal)]">
                Product Information
              </h2>

              <div className="mt-6">
                {PRODUCT_INFO.map((item, index) => {
                  const isOpen = openDetailIndex === index;

                  return (
                    <div
                      key={item.title}
                      className="border-b border-[rgba(200,216,180,0.45)] py-4"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDetailIndex((current) =>
                            current === index ? null : index,
                          )
                        }
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="text-[15px] font-medium text-[var(--charcoal)]">
                          {item.title}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xl text-[var(--green)]"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3 pt-3 text-[14px] leading-[1.8] text-[rgba(28,33,28,0.65)]">
                              {item.body}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[var(--charcoal)] px-8 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap justify-between gap-12">
              <div className="max-w-sm">
                <h3 className="font-['Playfair_Display'] text-[28px] italic text-[var(--gold)]">
                  GrowGut
                </h3>
                <p className="mt-2 text-[14px] text-white/50">
                  Grow your gut with science and nature.
                </p>
                <p className="mt-4 text-[12px] text-white/30">
                  FSSAI: 12025999000201
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">Support</h4>
                <div className="mt-4 space-y-3 text-[14px] text-white/60">
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                    className="block transition hover:text-white"
                  >
                    💬 Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:growgut26@gmail.com"
                    className="block transition hover:text-white"
                  >
                    growgut26@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white">Policies</h4>
                <div className="mt-4 space-y-3 text-[14px] text-white/60">
                  {[
                    { label: "Privacy Policy", href: "/privacy-policy" },
                    { label: "Refund Policy", href: "/refund-policy" },
                    { label: "Shipping Policy", href: "/shipping-policy" },
                    { label: "Terms of Service", href: "/terms-of-service" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} className="block transition hover:text-white">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[12px] text-white/30">
              <p>© 2025 GrowGut. All rights reserved. Made with ❤️ in India.</p>
              <p className="text-[11px] text-white/20">
                Disclaimer: Dietary supplement. Not a medicine.
              </p>
            </div>
          </div>
        </footer>

        <motion.a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 180, damping: 15 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg"
          aria-label="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7 fill-white"
            aria-hidden="true"
          >
            <path d="M19.11 17.26c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.66.15-.19.29-.76.95-.93 1.14-.17.19-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.44-1.69-1.61-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.03.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34zM16.01 3.2c-7.02 0-12.7 5.68-12.7 12.7 0 2.25.59 4.36 1.62 6.19L3 29l7.1-1.86c1.76.96 3.79 1.5 5.91 1.5h.01c7.01 0 12.69-5.68 12.69-12.7S23.03 3.2 16.01 3.2zm0 23.3h-.01c-1.9 0-3.76-.51-5.39-1.48l-.39-.23-4.21 1.1 1.12-4.11-.25-.42a10.47 10.47 0 0 1-1.6-5.55c0-5.79 4.72-10.5 10.53-10.5 2.81 0 5.45 1.09 7.44 3.08a10.42 10.42 0 0 1 3.08 7.42c0 5.8-4.72 10.51-10.52 10.51z" />
          </svg>
        </motion.a>
      </div>
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
  rows = 3,
  required = false,
  pattern,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
  pattern?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium text-[var(--charcoal)]">
        {label}
        {required ? " *" : ""}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full rounded-lg border border-[rgba(200,216,180,0.6)] px-4 py-3 text-[15px] text-[var(--charcoal)] outline-none transition focus:border-[var(--green)]"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          pattern={pattern}
          className="w-full rounded-lg border border-[rgba(200,216,180,0.6)] px-4 py-3 text-[15px] text-[var(--charcoal)] outline-none transition focus:border-[var(--green)]"
        />
      )}
    </label>
  );
}

function LeafShape({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`pointer-events-none absolute text-[rgba(58,107,58,0.06)] ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M87.987 15.334c28.772 12.314 47.713 42.957 42.49 74.182-4.675 27.963-27.848 48.751-52.488 56.984-16.174 5.406-33.823 3.666-47.396-6.953-16.406-12.832-22.346-35.465-19.19-56.076 4.22-27.546 23.889-53.214 49.432-64.984 8.414-3.879 18.082-6.539 27.152-3.153Z"
        fill="currentColor"
      />
      <path
        d="M55.42 119.842c21.314-24.799 41.533-51.685 49.927-84.387M58.928 93.62c14.731-5.463 30.88-7.024 46.366-4.481"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}