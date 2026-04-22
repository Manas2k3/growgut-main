import type { Metadata } from "next";
import { PolicyLayout, Section, Ul, InfoBox } from "@/frontend/components/growgut/PolicyLayout";

export const metadata: Metadata = {
  title: "Shipping Policy | GrowGut",
  description:
    "GrowGut's shipping policy — delivery timelines, free shipping details, tracking, and support.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Fast, reliable delivery across India. Here's what to expect after you place your order."
      lastUpdated="30 March 2025"
    >
      <InfoBox>
        <strong>Free pan-India shipping</strong> on all orders. Orders are
        typically dispatched within <strong>1–2 business days</strong>{" "}
        and delivered within <strong>4–7 business days</strong> depending on
        your location.
      </InfoBox>

      <Section heading="1. Shipping Coverage">
        <p>
          We ship across <strong>all serviceable pin codes in India</strong>. We
          currently do not offer international shipping. If you are unsure
          whether we deliver to your location, please contact us before placing
          an order.
        </p>
      </Section>

      <Section heading="2. Shipping Charges">
        <Ul
          items={[
            "Standard Delivery (Prepaid): FREE on all orders",
            "Cash on Delivery (COD): ₹50 handling fee applies — this will be reflected at checkout",
            "Expedited / Express Shipping: Not currently available",
          ]}
        />
        <p>
          The free shipping offer applies to all prepaid orders regardless of
          order value.
        </p>
      </Section>

      <Section heading="3. Order Processing Time">
        <p>
          Orders are processed on <strong>Monday through Saturday</strong> (
          excluding public holidays):
        </p>
        <Ul
          items={[
            "Orders placed before 2 PM IST are processed the same day",
            "Orders placed after 2 PM IST or on Sundays/holidays are processed the next business day",
            "You will receive a WhatsApp confirmation with a tracking link once the order is dispatched",
          ]}
        />
      </Section>

      <Section heading="4. Estimated Delivery Timelines">
        <p>
          Delivery timelines depend on your delivery location:
        </p>
        <Ul
          items={[
            "Metro cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune): 2–4 business days",
            "Tier-2 cities (Bhubaneswar, Jaipur, Lucknow, Nagpur, etc.): 3–5 business days",
            "Tier-3 cities and rural areas: 5–8 business days",
            "North-East India & J&K: 6–10 business days",
          ]}
        />
        <p>
          These are estimated timelines. Actual delivery may vary based on
          courier availability, weather, and other external factors.
        </p>
      </Section>

      <Section heading="5. Order Tracking">
        <p>
          Once your order is dispatched, you will receive:
        </p>
        <Ul
          items={[
            "A WhatsApp message with the courier tracking number and link",
            "You can also reach out to us directly for a status update",
          ]}
        />
        <p>
          Our logistics partners include Delhivery, Shiprocket, and XpressBees.
          Tracking is available 24–48 hours after dispatch.
        </p>
      </Section>

      <Section heading="6. Cash on Delivery (COD)">
        <p>
          We offer Cash on Delivery across most pin codes in India. Key notes:
        </p>
        <Ul
          items={[
            "A handling charge of ₹50 applies to all COD orders",
            "Please keep the exact amount ready at the time of delivery",
            "COD returns: If you wish to reject a COD delivery, please contact us first — unaccepted returns may affect future COD eligibility",
            "Certain remote pin codes may not be eligible for COD — we will notify you at checkout",
          ]}
        />
      </Section>

      <Section heading="7. Incorrect or Incomplete Address">
        <p>
          It is the customer's responsibility to provide a complete and accurate
          delivery address at the time of checkout. GrowGut is not responsible
          for delays or failed deliveries caused by:
        </p>
        <Ul
          items={[
            "Incomplete, incorrect, or misspelled address",
            "Incorrect pincode or city",
            "Recipient unavailable at the time of delivery",
          ]}
        />
        <p>
          If a package is returned to us due to an incorrect address, we will
          contact you to reship. Re-shipping charges may apply.
        </p>
      </Section>

      <Section heading="8. Lost or Undelivered Orders">
        <p>
          If your order has not arrived within the estimated delivery window,
          please:
        </p>
        <Ul
          items={[
            "Check the tracking link provided via WhatsApp",
            "Contact us at growgut26@gmail.com or WhatsApp +91 99999 99999",
            "We will coordinate with the logistics partner and resolve within 3–5 business days",
          ]}
        />
        <p>
          In the rare event of a confirmed lost shipment, we will dispatch a
          replacement free of charge.
        </p>
      </Section>

      <Section heading="9. Damaged Packages">
        <p>
          If your package arrives physically damaged, please do the following:
        </p>
        <Ul
          items={[
            "Do not accept a severely damaged package from the courier",
            "If accepted, take photos immediately and contact us within 48 hours",
            "We will arrange a replacement at no additional cost",
          ]}
        />
      </Section>

      <Section heading="10. Contact for Shipping Queries">
        <Ul
          items={[
            "WhatsApp: +91 99999 99999 (preferred)",
            "Email: growgut26@gmail.com",
            "Support hours: Monday – Saturday, 10 AM – 7 PM IST",
          ]}
        />
      </Section>
    </PolicyLayout>
  );
}
