import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/content/services";
import ServiceHeroSplit from "@/components/services/ServiceHeroSplit";
import ServiceCapabilitiesGrid from "@/components/services/ServiceCapabilitiesGrid";
import ServicePartnershipCore from "@/components/services/ServicePartnershipCore";
import ClientWorldMap from "@/components/about/ClientWorldMap";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Service Not Found | Konvoy Studio" };

  return {
    title: `${service.title} | Premium Studio Solutions`,
    description: service.description,
  };
}

export default async function DynamicServicePage(props) {
  const params = await props.params;
  const slug = params.slug;
  const serviceData = getServiceBySlug(slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="w-full bg-[#121212] min-h-screen selection:bg-[#CCFF00] selection:text-black">

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
        ctaText="Let's build together"
        ctaHref={`/contact?service=${slug}`}
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
          ctaHref={`/contact?service=${slug}`}
        />
      )}

      
      <ClientWorldMap />
      <Testimonials />
<Faq faqs={serviceData.faqs} />
    </main>
  );
}