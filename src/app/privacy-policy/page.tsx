import type { Metadata } from "next";
import { PolicyLayout, Section, Ul, InfoBox } from "@/frontend/components/growgut/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | GrowGut",
  description:
    "Learn how GrowGut collects, uses, and protects your personal information when you shop with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="30 March 2025"
    >
      <InfoBox>
        <strong>TL;DR:</strong> We only collect the information needed to process
        your order and deliver it to you. We never sell your data to third
        parties. You can request deletion of your data at any time by writing to
        us at{" "}
        <a
          href="mailto:growgut26@gmail.com"
          className="text-[var(--green)] underline"
        >
          growgut26@gmail.com
        </a>
        .
      </InfoBox>

      <Section heading="1. Who We Are">
        <p>
          GrowGut is a dietary supplement brand operated under Indian law,
          offering a premium synbiotic product (probiotic + prebiotic sachet)
          to consumers across India. Our FSSAI license number is{" "}
          <strong>12025999000201</strong>.
        </p>
        <p>
          For any privacy-related queries, please contact us at{" "}
          <a
            href="mailto:growgut26@gmail.com"
            className="text-[var(--green)] underline"
          >
            growgut26@gmail.com
          </a>{" "}
          or via WhatsApp at{" "}
          <a
            href="https://wa.me/919999999999"
            className="text-[var(--green)] underline"
          >
            +91 99999 99999
          </a>
          .
        </p>
      </Section>

      <Section heading="2. Information We Collect">
        <p>
          When you place an order on our website, we collect the following
          information:
        </p>
        <Ul
          items={[
            "Full name",
            "Mobile phone number",
            "Email address (optional)",
            "Delivery address, city, state, and pincode",
            "Payment method preference (Online / Cash on Delivery)",
            "Promo or referral code used (if any)",
          ]}
        />
        <p>
          We may also collect technical data automatically, such as your IP
          address, browser type, device type, pages visited, and time spent on
          site. This is collected via cookies and analytics tools to improve your
          experience.
        </p>
      </Section>

      <Section heading="3. How We Use Your Information">
        <Ul
          items={[
            "To process and fulfil your order",
            "To send order confirmation and delivery updates via WhatsApp or SMS",
            "To respond to customer support queries",
            "To improve our website and product offerings",
            "To send promotional messages (only if you have opted in)",
            "To comply with applicable laws and regulations",
          ]}
        />
        <p>
          We do <strong>not</strong> use your personal data for automated
          decision-making or profiling that produces legal or similarly
          significant effects.
        </p>
      </Section>

      <Section heading="4. Cookies & Tracking">
        <p>
          Our website uses cookies and similar tracking technologies to
          understand usage patterns and improve your experience. Cookies we use
          include:
        </p>
        <Ul
          items={[
            "Essential cookies — required for the website to function correctly",
            "Analytics cookies — help us understand how visitors interact with the site (e.g., Google Analytics)",
            "Preference cookies — remember your settings and choices",
          ]}
        />
        <p>
          You can disable cookies in your browser settings at any time. Some
          features of the website may not function correctly if you do so.
        </p>
      </Section>

      <Section heading="5. Data Sharing & Third Parties">
        <p>
          We share your information only with trusted parties who help us operate
          our business:
        </p>
        <Ul
          items={[
            "Logistics / courier partners — for order delivery (your name and address are shared)",
            "Payment gateways — for secure payment processing (we do not store card details)",
            "Analytics providers — anonymised usage data only",
            "Legal authorities — when required by law",
          ]}
        />
        <p>
          We do <strong>not</strong> sell, rent, or trade your personal
          information to any third party for marketing purposes.
        </p>
      </Section>

      <Section heading="6. Data Retention">
        <p>
          We retain your order data for a period of <strong>3 years</strong> for
          accounting and legal compliance purposes, after which it is securely
          deleted. You may request earlier deletion by contacting us, subject to
          our legal obligations.
        </p>
      </Section>

      <Section heading="7. Your Rights">
        <p>You have the right to:</p>
        <Ul
          items={[
            "Access the personal data we hold about you",
            "Request correction of inaccurate data",
            "Request deletion of your personal data",
            "Opt out of marketing communications at any time",
            "Withdraw consent where processing is based on consent",
          ]}
        />
        <p>
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:growgut26@gmail.com"
            className="text-[var(--green)] underline"
          >
            growgut26@gmail.com
          </a>
          . We will respond within 30 days.
        </p>
      </Section>

      <Section heading="8. Data Security">
        <p>
          We implement appropriate technical and organisational measures to
          protect your personal information against unauthorised access, loss,
          or misuse. However, no transmission over the internet is 100% secure,
          and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section heading="9. Children's Privacy">
        <p>
          Our products and website are not directed at children under 18 years
          of age. We do not knowingly collect personal data from children. If you
          believe a child has provided us with personal data, please contact us
          immediately.
        </p>
      </Section>

      <Section heading="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will update the "Last Updated" date at the top of this page. We
          encourage you to review this policy periodically.
        </p>
      </Section>

      <Section heading="11. Contact Us">
        <p>
          For any questions, concerns, or requests related to this Privacy
          Policy, please reach out to us:
        </p>
        <Ul
          items={[
            "Email: growgut26@gmail.com",
            "WhatsApp: +91 99999 99999",
          ]}
        />
      </Section>
    </PolicyLayout>
  );
}
