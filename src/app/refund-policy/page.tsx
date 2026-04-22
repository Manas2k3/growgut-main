import type { Metadata } from "next";
import { PolicyLayout, Section, Ul, InfoBox } from "@/frontend/components/growgut/PolicyLayout";

export const metadata: Metadata = {
  title: "Refund Policy | GrowGut",
  description:
    "GrowGut's refund policy — learn about our return process, eligibility criteria, and how to raise a request.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund Policy"
      subtitle="We stand behind the quality of GrowGut. Here's everything you need to know about returns and refunds."
      lastUpdated="30 March 2025"
    >
      <InfoBox>
        <strong>Our Promise:</strong> If your order arrives damaged, defective,
        or is significantly different from what was advertised, we will replace
        it or issue a full refund — no questions asked. Contact us within{" "}
        <strong>48 hours</strong> of delivery with a photo/video of the issue.
      </InfoBox>

      <Section heading="1. Our Refund Commitment">
        <p>
          GrowGut is a perishable dietary supplement. To maintain product
          integrity and safety for all customers, we follow a structured
          returns policy. We encourage all customers to read this policy before
          placing an order.
        </p>
        <p>
          We are committed to ensuring you are fully satisfied with your
          purchase. If something goes wrong on our end, we will make it right.
        </p>
      </Section>

      <Section heading="2. Eligible Refund Cases">
        <p>You are eligible for a full refund or replacement if:</p>
        <Ul
          items={[
            "The product arrives physically damaged (crushed, torn, or leaking sachets)",
            "The product is expired at the time of delivery",
            "You received the wrong product or an incorrect quantity",
            "The product was not delivered within 10 business days of the expected delivery date",
            "The outer packaging is tampered with or unsealed",
          ]}
        />
        <p>
          All claims must be raised within <strong>48 hours of delivery</strong>{" "}
          via WhatsApp or email. Claims raised after this window may not be
          accepted.
        </p>
      </Section>

      <Section heading="3. Non-Refundable Cases">
        <p>Refunds will <strong>not</strong> be issued for:</p>
        <Ul
          items={[
            "Change of mind after placing an order",
            "Disliking the taste or texture (subjective preferences)",
            "Adverse reactions in individuals with pre-existing conditions (please consult a doctor before use)",
            "Orders partially consumed — opened sachets cannot be returned",
            "Delays caused by incorrect delivery address provided at checkout",
            "Delays due to natural calamities, strikes, or other force majeure events",
          ]}
        />
      </Section>

      <Section heading="4. How to Raise a Refund Request">
        <p>Follow these simple steps to initiate a return or refund:</p>
        <Ul
          items={[
            "Step 1: Take clear photos or a short video showing the issue (damaged product, wrong item, etc.)",
            "Step 2: WhatsApp us at +91 99999 99999 or email growgut26@gmail.com within 48 hours of delivery",
            "Step 3: Share your order details — full name, phone number, and order date",
            "Step 4: Our team will review your claim within 2 business days and respond with next steps",
          ]}
        />
      </Section>

      <Section heading="5. Refund Processing Time">
        <p>
          Once your refund request is approved:
        </p>
        <Ul
          items={[
            "Online payments: Refund credited to the original payment method within 5–7 business days",
            "UPI payments: Refund processed within 3–5 business days",
            "COD orders: Refund processed via bank transfer (NEFT/IMPS) within 5–7 business days — please share your bank details",
          ]}
        />
        <p>
          We will notify you via WhatsApp or email once the refund has been
          initiated.
        </p>
      </Section>

      <Section heading="6. Order Cancellations">
        <p>
          Orders can be cancelled <strong>before dispatch only</strong>. Once
          the product is handed over to the courier partner, cancellations will
          not be possible. To cancel an order before dispatch, contact us
          immediately via WhatsApp at +91 99999 99999.
        </p>
        <p>
          If cancellation is successful, the full amount (excluding any payment
          gateway fees, if applicable) will be refunded within 3–5 business
          days.
        </p>
      </Section>

      <Section heading="7. Replacement Policy">
        <p>
          For eligible cases, we may offer a free replacement shipment instead
          of a refund (e.g., wrong item or damaged product). The replacement
          will be dispatched within 2–3 business days of approval.
        </p>
      </Section>

      <Section heading="8. Contact for Refunds">
        <p>
          Reach out to our customer support team:
        </p>
        <Ul
          items={[
            "WhatsApp: +91 99999 99999 (preferred, faster response)",
            "Email: growgut26@gmail.com",
            "Support hours: Monday – Saturday, 10 AM – 7 PM IST",
          ]}
        />
      </Section>
    </PolicyLayout>
  );
}
