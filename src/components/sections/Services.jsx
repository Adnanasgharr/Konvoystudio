"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const fullServicesList = [
  {
    id: "01",
    slug: "websites",
    title: "Websites",
    image: "/images/ui/konvoystudio-webdite-development-services.webp",
    description: "We build websites for businesses that want more than just an online presence. Fast, custom, and built to turn visitors into clients.",
    subServices: [
      { name: "Corporate Websites", href: "/services/corporate-websites" },
      { name: "Business Websites", href: "/services/business-websites" },
      { name: "E-commerce Websites", href: "/services/ecommerce-websites" },
      { name: "Landing Pages", href: "/services/landing-pages" },
      { name: "WordPress Development", href: "/services/wordpress-development" },
      { name: "Website Redesign", href: "/services/website-redesign" },
      { name: "Website Maintenance", href: "/services/website-maintenance" },
    ]
  },
  {
    id: "02",
    slug: "video-editing",
    title: "Video Editing",
    image: "/images/video.jpg",
    description: "High-retention cinematic storytelling optimized to convert cold traffic on international stages.",
    subServices: [
      { name: "Social Media Videos", href: "/services/social-media-videos" },
      { name: "Promotional Ads", href: "/services/promotional-ads" },
       { name: "Post Production Editing", href: "/services/post-production-editing" },
      { name: "Ai Filmmaking", href: "/services/ai-filmmaking" },
     
    ]
  },
  {
    id: "03",
    slug: "graphic-design",
    title: "Graphic Design",
    image: "/images/ui/graphic-design-services.webp",
    description: "Forging bulletproof creative systems that establish dominant market authority.",
    subServices: [
      { name: "Logo & Branding", href: "/services/logo-and-branding" },
      { name: "Marketing Materials", href: "/services/marketing-materials" },
      { name: "Social Media Graphics", href: "/services/social-media-graphics" },
    ]
  },
  {
    id: "04",
    slug: "ai-integrations",
    title: "AI Integrations",
    image: "/images/services/ai-voice-agents-development.webp",
    description: "Deploying production-grade custom conversational voice layers and automated database agents.",
    subServices: [
      { name: "AI Chatbot Development", href: "/services/ai-chatbot-development" },
      { name: "RAG Systems", href: "/services/rag-systems" },
      { name: "Custom AI Voice Agents", href: "/services/ai-voice-agents" },
    ]
  }
];

const ExpandedServiceRow = ({ 
  id, 
  title, 
  image, 
  description, 
  subServices, 
  isExpanded, 
  onToggle, 
  onMouseEnter, 
  onMouseLeave 
}) => {

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className="w-full relative border-b-2 border-b-emerald-400 select-none group cursor-pointer scroll-mt-24 sm:scroll-mt-32 transition-colors duration-300 focus:outline-none focus:bg-neutral-200/50"
    >
      <div
        className={`w-full h-[1.5px] absolute top-0 left-0 transition-all duration-500 ease-out origin-left z-20 ${
          isExpanded ? "bg-[#242021] scale-x-100 opacity-100" : "bg-transparent scale-x-0 opacity-0"
        }`}
      />

      <div className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-12 pt-6 pb-6 sm:pt-8 sm:pb-8 xl:py-12 w-full pr-2 relative">
        
        {/* DESKTOP SIDE PANEL */}
        <div className="w-full xl:col-span-5 hidden xl:block mt-2 xl:mt-0">
          <div
            className={`transition-all duration-500 ease-out transform ${
              isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <p className="text-base xl:text-lg leading-relaxed text-neutral-600 font-old-school max-w-sm">
              {description}
            </p>
          </div>
        </div>

        {/* CORE CONTENT ROW CONTAINER */}
        <div className="w-full xl:col-span-7 flex flex-col pl-0 xl:pl-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center flex-1 min-w-0">
              
              <span
                className={`font-abc-arizona italic text-sm sm:text-base xl:text-xl mr-3 sm:mr-4 xl:mr-8 transition-all duration-500 transform pt-0.5 hidden xl:inline-block ${
                  isExpanded ? "text-[#242021] opacity-100 translate-x-0" : "text-neutral-400/60 opacity-60 -translate-x-1"
                }`}
              >
                {id}
              </span>

              {/* Hardware-accelerated CSS matching your breakpoints */}
              <div
                className="relative shrink-0 h-[70px] w-[80px] sm:h-[65px] sm:w-[65px] xl:h-[70px] xl:w-0 xl:opacity-0 xl:group-hover:w-[100px] xl:group-hover:opacity-100 overflow-hidden rounded-xl mr-4 xl:mr-0 xl:group-hover:mr-6 transition-all duration-300 ease-out"
              >
                <Image
                  src={image}
                  alt={`Konvoy Studio premium ${title} client solutions preview`}
                  fill
                  sizes="(max-width: 1280px) 65px, 100px"
                  className="object-cover"
                />
              </div>

              {/* SEO Hierarchy Fix: H2 instead of duplicate H1 elements */}
              <h2
                className={`text-3xl sm:text-5xl xl:text-7xl 2xl:text-7xl font-old-school tracking-tight leading-tight xl:leading-none transition-all duration-500 ${
                  isExpanded ? "text-[#242021] translate-x-1 xl:translate-x-2" : "text-[#000000]"
                }`}
              >
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-0 shrink-0 ml-2 xl:hidden">
              <div className="text-xl font-bold text-neutral-500 transition-transform duration-300">
                {isExpanded ? "—" : "+"}
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET DESCRIPTION ACCORDION */}
          <div
            className={`grid xl:hidden transition-all duration-500 ease-out overflow-hidden w-full ${
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden pl-0 w-full">
              <p className="text-lg md:text-xl leading-tight font-old-school text-neutral-400 max-w-xl">
                {description}
              </p>
            </div>
          </div>

          {/* SUBSERVICES DRAWER LIST */}
          <div
            className={`grid transition-all duration-500 ease-out overflow-hidden w-full ${
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-5 sm:mt-6 xl:mt-8" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden pl-0 xl:pl-12 w-full">
              <ul className="flex flex-col gap-2 pb-4 w-full">
                {subServices.map((sub, sIdx) => (
                  <li
                    key={`${title}-sub-${sIdx}`}
                    className="block w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href={sub.href}
                      data-cursor="service"
                      className="flex items-center justify-between w-full py-3 px-4 rounded-md text-emerald-900 bg-neutral-200/80 text-base sm:text-xl xl:text-2xl font-old-school tracking-tight transition-all duration-300 hover:text-[#000000] group/link"
                    >
                      <span>{sub.name}</span>
                      <span className="inline-block overflow-hidden h-7 w-7 shrink-0 ml-4 relative">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 text-[#000000] xl:text-emerald-800 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:scale-125 group-hover/link:text-[#000000]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M328 96h24v288h-48V177.9L81 401l-17 17-33.9-34 17-17 223-223H64V96h264z"></path>
                        </svg>
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

export function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full bg-[#F1F1F1] py-16 sm:py-24 xl:py-36">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 xl:px-16">

        {/* Clean semantic header grid with diagnostic styling background classes stripped */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 xl:gap-y-12 xl:gap-x-12 items-start mb-16 sm:mb-20 xl:mb-28">
          <div className="xl:col-span-6 flex flex-col">
            <h1 className="text-[#242021] text-5xl sm:text-6xl xl:text-8xl font-black leading-[0.9] uppercase tracking-tight">
              <span className="block font-abc-arizona  font-normal normal-case ">Our Core</span>
              Services.
            </h1>
          </div>

          <div className="hidden xl:block xl:col-span-1" />

          <div className="xl:col-span-5 flex flex-col gap-4 sm:gap-5">
            <h3 className="text-[#242021] text-2xl sm:text-2xl xl:text-3xl font-old-school font-bold leading-tight tracking-tight">
              How we take your <br/> business to the next level
            </h3>
            <p className="text-neutral-700 text-lg md:text-xl leading-tight font-old-school">
              We build websites, produce videos, and design brands. One team handles everything from start to finish, with no outsourcing and no shortcuts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12">
          <div className="xl:col-span-12 border-t border-t-emerald-400">
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
                onMouseEnter={() => {
                  if (window.matchMedia("(min-width: 1280px)").matches) {
                    setActiveIndex(idx);
                  }
                }}
                onMouseLeave={() => {
                  if (window.matchMedia("(min-width: 1280px)").matches) {
                    setActiveIndex(null);
                  }
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;