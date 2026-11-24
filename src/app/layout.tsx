import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { memberships, passes } from "@/content/memberships";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "TKO Boxing & Performance Centre | Boxing Gym Glasgow",
    template: "%s | TKO Boxing & Performance Centre",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "boxing gym Glasgow",
    "boxing classes Glasgow",
    "beginners boxing Glasgow",
    "strength and conditioning Glasgow",
    "personal training Glasgow",
    "sparring Glasgow",
    "HYROX Glasgow",
    "East End Glasgow gym",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "TKO Boxing & Performance Centre — Glasgow",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

function JsonLd() {
  const url = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": ["ExerciseGym", "SportsActivityLocation"],
    "@id": `${url}/#gym`,
    name: site.name,
    url,
    description: site.description,
    image: `${url}/opengraph-image`,
    logo: `${url}/brand/tko-logo.jpg`,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    priceRange: "£10–£60",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "07:00", closes: "18:00" },
    ],
    sameAs: [site.social.instagram],
    makesOffer: [...memberships, ...passes].map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "GBP",
      url: p.href,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${inter.variable} ${mono.variable} antialiased`}>
      <body className="grain flex min-h-dvh flex-col">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
