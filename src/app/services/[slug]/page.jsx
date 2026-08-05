import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/content/services";
import ServiceHeroSplit from "@/components/services/ServiceHeroSplit";
import ServiceCapabilitiesGrid from "@/components/services/ServiceCapabilitiesGrid";
import ServicePartnershipCore from "@/components/services/ServicePartnershipCore";
import ClientWorldMap from "@/components/about/ClientWorldMap";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";

const SITE_URL = "https://www.konvoystudio.com";

// Pre-renders all 17 service pages at build time instead of on-demand.
// Static pages load faster, and speed is a real Google ranking factor.
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const url = `${SITE_URL}/services/${slug}`;

  return {
    // layout.tsx's title template automatically appends "| Konvoy Studio"
    title: service.title,
    description: service.description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: service.title,
      description: service.description,
      url,
      siteName: "Konvoy Studio",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.heroImage],
    },
  };
}

export default async function DynamicServicePage(props) {
  const params = await props.params;
  const slug = params.slug;
  const serviceData = getServiceBySlug(slug);

  if (!serviceData) {
    notFound();
  }

  // JSON-LD structured data — helps Google understand and potentially
  // show rich results (service details, FAQ dropdowns) in search listings.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceData.title,
    description: serviceData.description,
    provider: {
      "@type": "Organization",
      name: "Konvoy Studio",
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    serviceType: serviceData.category,
    url: `${SITE_URL}/services/${slug}`,
  };

  const faqJsonLd =
    serviceData.faqs && serviceData.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: serviceData.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <main className="w-full bg-[#121212] min-h-screen selection:bg-[#CCFF00] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <ServiceHeroSplit
        eyebrow={serviceData.category}
        heading={serviceData.heroHeading}
        paragraphs={serviceData.heroParagraphs}
        heroImage={serviceData.heroImage}
        heroType={serviceData.heroType || "standard"} // Defaults gracefully to standard image/gif handling
      />

      <ServiceCapabilitiesGrid
        eyebrow="What we bring to the table"
        mainHeading={serviceData.philosophyTitle || `Elite ${serviceData.title} Executions`}
        items={serviceData.features || []}
      />

      {serviceData.partnership && (
        <ServicePartnershipCore
          serviceTitle={serviceData.title}
          visualLabel={serviceData.partnership.visualLabel}
          heading={serviceData.partnership.heading}
          paragraphOne={serviceData.partnership.p1}
          paragraphTwo={serviceData.partnership.p2}
          paragraphThree={serviceData.partnership.p3}
        />
      )}

      <ClientWorldMap />
      <Testimonials />
      <Faq faqs={serviceData.faqs} />
    </main>
  );
}