import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Springfield Special Products | Premium Custom Heavy-Duty Vinyl Products",
    template: "%s | Springfield Special Products",
  },
  description:
    "Manufacturer of premium custom heavy-duty vinyl products including ratchet straps, RV skirts, trailer covers, and tarps. Located in Springfield, MO.",
  keywords: [
    "ratchet straps",
    "RV skirts",
    "trailer covers",
    "vinyl products",
    "Springfield MO",
    "custom tarps",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Springfield Special Products",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://cdn.snipcart.com"
        />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* Snipcart */}
        <div
          hidden
          id="snipcart"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY || "YOUR_SNIPCART_API_KEY"}
          data-config-modal-style="side"
        ></div>
        <Script
          src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
