import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { siteName, siteUrl } from "./site";

// Fonts aren't preloaded: text paints at once in next/font's size-matched fallback (display: swap), so the
// font files needn't compete with the first paint.
const poppins = Poppins({ preload: false, subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins", display: "swap" });
const openSans = Open_Sans({ preload: false, subsets: ["latin"], weight: ["400"], variable: "--font-open-sans", display: "swap" });

const title = "Huddle landing page | Royer Adames";
const description = "Huddle's single-section landing page, built for the Frontend Mentor Huddle landing page challenge.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName, title, description },
};

const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
