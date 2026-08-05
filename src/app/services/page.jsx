import React from "react";
import Services from "@/components/sections/Services";

const SITE_URL = "https://www.konvoystudio.com";

export const metadata = {
  title: "Our Services",
  description:
    "Explore Konvoy Studio's full range of services: custom web development, WordPress, e-commerce, video editing, graphic design, branding, and AI integrations — all under one studio.",

  alternates: {
    canonical: `${SITE_URL}/services`,
  },

  openGraph: {
    title: "Our Services | Konvoy Studio",
    description:
      "Web development, video editing, graphic design, branding, and AI integrations — everything your business needs from one studio.",
    url: `${SITE_URL}/services`,
    siteName: "Konvoy Studio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Services | Konvoy Studio",
    description:
      "Web development, video editing, graphic design, branding, and AI integrations — everything your business needs from one studio.",
  },
};

// Tells Google this page is a curated list of services — can help it
// understand the page structure and surface it for broader "services" queries.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Konvoy Studio Services",
  description:
    "Full range of web development, video, design, and AI services offered by Konvoy Studio.",
  url: `${SITE_URL}/services`,
  isPartOf: {
    "@type": "WebSite",
    name: "Konvoy Studio",
    url: SITE_URL,
  },
};

const services = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Services />
    </div>
  );
};

export default services;