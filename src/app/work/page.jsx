import React from "react";
import WorkPageClient from "@/components/work/WorkPageClient";

const SITE_URL = "https://www.konvoystudio.com";

export const metadata = {
  title: "Our Work",
  description:
    "See the websites, e-commerce stores, videos, and brand identities Konvoy Studio has built for clients — real projects, real results.",

  alternates: {
    canonical: `${SITE_URL}/work`,
  },

  openGraph: {
    title: "Our Work | Konvoy Studio",
    description:
      "See the websites, e-commerce stores, videos, and brand identities Konvoy Studio has built for clients.",
    url: `${SITE_URL}/work`,
    siteName: "Konvoy Studio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Work | Konvoy Studio",
    description:
      "See the websites, e-commerce stores, videos, and brand identities Konvoy Studio has built for clients.",
  },
};

export default function DedicatedWorkPage() {
  return <WorkPageClient />;
}