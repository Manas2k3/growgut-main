import type { Metadata } from "next";
import { PolicyLayout, Section, Ul, InfoBox } from "@/frontend/components/growgut/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of Service | GrowGut",
  description:
    "GrowGut's Terms of Service — the rules, disclaimers, and agreements that govern your use of our website and products.",
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our website or placing an order."
      lastUpdated="30 March 2025"
    >
      <InfoBox>
        By placing an order on the GrowGut website, you confirm that you have
        read, understood, and agreed to these Terms of Service. If you do not
        agree, please do not proceed with a purchase.
      </InfoBox>

      <Section heading="1. About GrowGut">
        <p>
          GrowGut ("we," "us," or "our") is an Indian dietary supplement brand
          offering a synbiotic gut-health product. Our products are manufactured
          in a FSSAI-licensed facility (License No.{" "}
          <strong>12025999000201</strong>) and are sold directly to consumers
          across India via this website.
        </p>
        <p>
          Our manufacturer is{" "}
          <strong>Balextra Lifescience Pvt. Ltd.</strong>, 239-240, Shiv Bhakti
          Industry, Sanki, Palsana, Surat — 394305. Manufacturing FSSAI License:
          10723998000348.
        </p>
      </Section>

      <Section heading="2. Eligibility">
        <p>By using this website and placing an order, you confirm that you:</p>
        <Ul
          items={[
            "Are at least 18 years of age",
            "Are a resident of India",
            "Are placing the order for personal, non-commercial use",
            "Have the legal authority to enter into a binding agreement",
          ]}
        />
      </Section>

      <Section heading="3. Product Use & Medical Disclaimer">
        <p>
          GrowGut is a <strong>dietary supplement</strong> and not a medicine,
          drug, or medical device. It is not intended to diagnose, treat, cure,
          or prevent any disease or medical condition.
        </p>
        <Ul
          items={[
            "Do not use this product as a substitute for medical treatment",
            "Consult a qualified healthcare professional before use if you are pregnant, nursing, have a chronic illness, or are taking prescription medication",
            "Individual results may vary — GrowGut does not claim guaranteed outcomes",
            "Discontinue use and consult a doctor if you experience any adverse reaction",
            "Not recommended for children under 12 without medical guidance",
            "Store the product in a cool, dry place, away from direct sunlight",
          ]}
        />
      </Section>

      <Section heading="4. Ordering & Payment">
        <p>
          By placing an order on our website, you are making an offer to
          purchase the product at the listed price. We reserve the right to
          accept or decline any order.
        </p>
        <Ul
          items={[
            "Prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes",
            "We accept online payment (cards, UPI, net banking) and Cash on Delivery",
            "A ₹50 handling fee applies to all COD orders",
            "Promo codes are single-use and cannot be combined unless explicitly stated",
            "We reserve the right to modify prices at any time without prior notice",
            "Payment confirmation does not guarantee product availability; we will notify you if an item is out of stock",
          ]}
        />
      </Section>

      <Section heading="5. Accuracy of Information">
        <p>
          We make every effort to ensure that product descriptions, images,
          ingredient lists, and nutritional information on this website are
          accurate and up to date. However, minor discrepancies may occasionally
          occur. If you believe there is an error, please contact us.
        </p>
        <p>
          Product images are for representational purposes only. The actual
          product may differ slightly in appearance due to screen colour
          calibration, manufacturing batch variations, or packaging updates.
        </p>
      </Section>

      <Section heading="6. Intellectual Property">
        <p>
          All content on this website — including but not limited to the
          GrowGut brand name, logo, product names, photography, copy, design,
          and graphics — is the exclusive property of GrowGut and is protected
          under applicable Indian intellectual property laws.
        </p>
        <Ul
          items={[
            "You may not reproduce, distribute, or use any of our content without prior written permission",
            "Unauthorised use of our trademarks or brand assets may result in legal action",
          ]}
        />
      </Section>

      <Section heading="7. User Conduct">
        <p>When using our website, you agree not to:</p>
        <Ul
          items={[
            "Provide false or misleading information when placing an order",
            "Use automated tools (bots, scrapers) to access or collect data from our site",
            "Attempt to gain unauthorised access to any part of our website or backend systems",
            "Use the website for any unlawful, fraudulent, or harmful purpose",
            "Reverse-engineer or attempt to copy any part of our website or product formulation",
          ]}
        />
      </Section>

      <Section heading="8. Third-Party Links">
        <p>
          Our website may contain links to third-party websites (e.g., WhatsApp,
          payment gateways). We are not responsible for the content, privacy
          practices, or services of any third-party site. Accessing such links
          is at your own risk.
        </p>
      </Section>

      <Section heading="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, GrowGut shall not
          be liable for:
        </p>
        <Ul
          items={[
            "Indirect, incidental, or consequential damages arising from the use of our products",
            "Losses resulting from your failure to follow product usage instructions",
            "Delays in delivery due to courier or external factors beyond our control",
            "Technical issues, downtime, or errors on our website",
          ]}
        />
        <p>
          Our maximum liability in any case shall not exceed the amount paid by
          you for the specific order in question.
        </p>
      </Section>

      <Section heading="10. Governing Law & Dispute Resolution">
        <p>
          These Terms of Service are governed by and construed in accordance
          with the laws of the <strong>Republic of India</strong>. Any disputes
          arising from these terms or your use of our website shall be subject
          to the exclusive jurisdiction of the courts in{" "}
          <strong>Bhubaneswar, Odisha</strong>.
        </p>
        <p>
          We encourage customers to first reach out to us directly to resolve
          any disputes amicably before pursuing legal action.
        </p>
      </Section>

      <Section heading="11. Changes to These Terms">
        <p>
          We reserve the right to update or modify these Terms of Service at any
          time. Changes will be effective immediately upon posting on this page.
          We encourage users to review these terms periodically. Continued use
          of the website after changes constitutes acceptance of the revised
          terms.
        </p>
      </Section>

      <Section heading="12. Contact Us">
        <p>
          For any questions related to these Terms of Service, please contact us:
        </p>
        <Ul
          items={[
            "Email: growgut26@gmail.com",
            "WhatsApp: +91 99999 99999",
            "Support hours: Monday – Saturday, 10 AM – 7 PM IST",
          ]}
        />
      </Section>
    </PolicyLayout>
  );
}
