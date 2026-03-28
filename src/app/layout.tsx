import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "GrowGut | Premium Synbiotic Supplement",
  description:
    "GrowGut is a premium synbiotic supplement crafted to support everyday gut harmony with probiotics and prebiotics."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-canvas text-stone-900 antialiased">{children}</body>
    </html>
  );
}
