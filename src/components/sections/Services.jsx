"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const fullServicesList = [
  {
    id: "01",
    slug: "brand-identity",
    title: "Brand Identity",
    image: "/images/brand.jpg",
    description: "Forging bulletproof creative systems that establish dominant market authority.",
    subServices: [
      { name: "Visual Strategy", href: "/services/brand-strategy" },
      { name: "Logo Marks", href: "/services/logo-design" },
      { name: "Brand Guidelines", href: "/services/guidelines" },
      { name: "Typography Systems", href: "/services/typography" },
    ]
  },
  {
    id: "02",
    slug: "websites",
    title: "Websites",
    image: "/images/websites.jpeg",
    description: "Bespoke, motion-first production platforms engineered using Next.js and Tailwind CSS.",
    subServices: [
      { name: "Corporate Websites", href: "/services/corporate-websites" },
      { name: "Business Websites", href: "/services/business-websites" },
      { name: "E-commerce Websites", href: "/services/ecommerce-websites" },
      { name: "Landing Pages", href: "/services/landing-pages" },
      { name: "WordPress Development", href: "/services/wordpress-development" },
      { name: "Web Applications", href: "/services/web-applications" },
      { name: "Website Redesign", href: "/services/website-redesign" },
      { name: "Website Maintenance", href: "/services/website-maintenance" },
    ]
  },
  {
    id: "03",
    slug: "video-editing",
    title: "Video Editing",
    image: "/images/video.jpg",
    description: "High-retention cinematic storytelling optimized to convert cold traffic on international stages.",
    subServices: [
      { name: "Corporate Video Production", href: "/services/corporate-video-production" },
      { name: "Event Video Production", href: "/services/event-video-production" },
      { name: "Promotional Videos", href: "/services/promotional-videos" },
      { name: "Post-Production & Editing", href: "/services/post-production-editing" },
    ]
  },
  {
    id: "04",
    slug: "digital-strategy",
    title: "Digital Strategy",
    image: "/images/brand.jpg",
    description: "Data-driven user tracking funnels designed to scale baseline business operations to the sky.",
    subServices: [
      { name: "Market Mapping", href: "/services/market-research" },
      { name: "Funnel Engineering", href: "/services/funnel-opt" },
      { name: "Conversion Rate Optimization", href: "/services/cro" },
    ]
  },
  {
    id: "05",
    slug: "ai-integrations",
    title: "AI Integrations",
    image: "/images/websites.jpeg",
    description: "Deploying production-grade custom conversational voice layers and automated database agents.",
    subServices: [
      { name: "RAG Systems", href: "/services/rag-pipelines" },
      { name: "Custom Voice Agents", href: "/services/voice-ai" },
      { name: "Automation Pipelines", href: "/services/ai-automation" },
    ]
  }
];

const ExpandedServiceRow = ({ id, title, image, description, subServices, isExpanded, onToggle, onMouseEnter, onMouseLeave }) => {
  const imgWrapRef = useRef(null);

  const handleRowEnter = () => {
    onMouseEnter(); // Triggers parent accordion expansion
    if (window.matchMedia("(min-width: 768px)").matches) {
      gsap.killTweensOf(imgWrapRef.current);
      gsap.to(imgWrapRef.current, {
        width: 100,
        opacity: 1,
        duration: 0.35,
        ease: "expo.out",
      });
    }
  };

  const handleRowLeave = () => {
    onMouseLeave(); // Triggers parent accordion collapse
    if (window.matchMedia("(min-width: 768px)").matches) {
      gsap.killTweensOf(imgWrapRef.current);
      gsap.to(imgWrapRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
      onClick={onToggle}
      className="w-full relative border-b-2 border-b-emerald-400 select-none group cursor-pointer scroll-mt-24 sm:scroll-mt-32"
    >
      <div
        className={`w-full h-[1.5px] absolute top-0 left-0 transition-all duration-500 ease-out origin-left z-20 ${
          isExpanded ? "bg-[#242021] scale-x-100 opacity-100" : "bg-transparent scale-x-0 opacity-0"
        }`}
      />

      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 lg:gap-12 pt-5 pb-5 sm:pt-8 sm:pb-8 lg:py-12 items-start w-full">

        <div className="w-full md:col-span-4 lg:col-span-5 hidden md:block mt-2 md:mt-0">
          <div
            className={`transition-all duration-500 ease-out transform ${
              isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <p className="text-sm lg:text-base leading-relaxed text-neutral-600 font-old-school max-w-sm">
              {description}
            </p>
          </div>
        </div>

        <div className="w-full md:col-span-8 lg:col-span-7 flex flex-col pl-0 md:pl-4">

          <div className="flex items-center w-full justify-between md:justify-start">
            <div className="flex items-center">
              <span
                className={`font-abc-arizona italic text-xs sm:text-sm md:text-lg mr-3 sm:mr-4 md:mr-8 transition-all duration-500 transform pt-0.5 ${
                  isExpanded ? "text-[#242021] opacity-100 translate-x-0" : "text-neutral-400/60 opacity-60 -translate-x-1"
                }`}
              >
                {id}
              </span>

              <div
                ref={imgWrapRef}
                className="relative shrink-0 h-[45px] w-[45px] sm:h-[55px] sm:w-[55px] md:h-[70px] md:w-0 md:opacity-0 overflow-hidden rounded-md mr-3 md:mr-0 transition-all duration-300"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 55px, 140px"
                  className="object-cover"
                />
              </div>

              <h1
                className={`text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight lg:leading-none transition-all duration-500 ${
                  isExpanded ? "text-[#242021] translate-x-1 md:translate-x-2" : "text-[#242021]/40 group-hover:text-[#242021]/70"
                }`}
              >
                {title}
              </h1>
            </div>

            <div className="block md:hidden text-lg text-neutral-400 transition-transform duration-300">
              {isExpanded ? "—" : "+"}
            </div>
          </div>

          <div
            className={`grid md:hidden transition-all duration-500 ease-out overflow-hidden w-full ${
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden pl-7 sm:pl-10">
              <p className="text-xs sm:text-sm text-neutral-600 font-old-school leading-relaxed max-w-xl">
                {description}
              </p>
            </div>
          </div>

          <div
            className={`grid transition-all duration-500 ease-out overflow-hidden w-full ${
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-4 sm:mt-6 md:mt-8" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden pl-7 sm:pl-10 md:pl-12">
              <ul className="flex flex-col gap-2.5 sm:gap-3 md:gap-4 pb-4">
                {subServices.map((sub, sIdx) => (
                  <li key={`${title}-sub-${sIdx}`} className="block" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={sub.href}
                      data-cursor="service"
                      className="inline-flex items-center group/link text-neutral-800 hover:text-emerald-500 text-sm sm:text-base md:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-200"
                    >
                      <span>{sub.name}</span>
                      <span className="ml-1.5 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0 text-emerald-500 font-normal text-xs sm:text-sm md:text-base">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

function Services() {
  const [activeIndex, setActiveIndex] = useState(0); 

  const handleToggle = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full bg-[#F1F1F1] py-16 sm:py-24 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-y-12 md:gap-x-8 lg:gap-x-12 items-start mb-12 sm:mb-20 md:mb-28">
          <div className="md:col-span-7 flex flex-col">
           
            <h1 className="font-abc-arizona text-[#242021] text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.85]">
              Our Core
            </h1>
            <h1 className="text-[#242021] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] md:leading-[0.85] uppercase">
              SERVICES.
            </h1>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          <div className="md:col-span-5 lg:col-span-4 md:pt-8 lg:pt-12 flex flex-col gap-3 sm:gap-5">
            <h3 className="text-[#242021] text-lg sm:text-2xl md:text-2xl lg:text-3xl font-old-school font-bold leading-tight tracking-tight">
              How we take your business to the next level
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base font-old-school leading-relaxed">
              We are a creative engineering platform with expertise, on a mission to map out structural growth models for your setup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-12 border-t border-t-emerald-400">
            {fullServicesList.map((service, idx) => (
              <ExpandedServiceRow
                key={service.id}
                id={service.id}
                title={service.title}
                image={service.image}
                description={service.description}
                subServices={service.subServices}
                isExpanded={idx === activeIndex}
                onToggle={() => handleToggle(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;