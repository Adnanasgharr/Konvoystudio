import React from "react";
import AboutHero from "@/components/about/AboutHero"; // Adjust this path based on where you saved your file
import AboutStory from "@/components/about/AboutStory";
import Metrics from "@/components/about/Metrics";
import MissionValues from "@/components/about/MissionValues";
import ClientWorldMap from "@/components/about/ClientWorldMap";

const SITE_URL = "https://www.konvoystudio.com";

export const metadata = {
  title: "About Us",
  description:
    "Konvoy Studio is an independent creative agency built by developers and designers who care about craft. Learn about our team, values, and the work we've delivered for clients worldwide.",

  alternates: {
    canonical: `${SITE_URL}/about`,
  },

  openGraph: {
    title: "About Konvoy Studio",
    description:
      "Meet the studio behind the work — an independent creative agency delivering web development, design, and video for clients worldwide.",
    url: `${SITE_URL}/about`,
    siteName: "Konvoy Studio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Konvoy Studio",
    description:
      "Meet the studio behind the work — an independent creative agency delivering web development, design, and video for clients worldwide.",
  },
};

// Organization schema — helps Google associate this page with your brand
// entity directly, which can support knowledge panel and brand search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Konvoy Studio",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "Konvoy Studio",
    url: SITE_URL,
  },
};

export default function AboutPage() {
  return (
    <main className="w-full relative bg-[#FDFCF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Dynamic Image Track Hero Section */}
      <AboutHero />

      <AboutStory />
      <Metrics />
      <MissionValues />
      <ClientWorldMap />
    </main>
  );
}