"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const fullServicesList = [
  {
    id: "01",
    slug: "websites",
    title: "Websites",
    image: "/images/websites.jpeg",
    description: "We build websites for businesses that want more than just an online presence. Fast, custom, and built to turn visitors into clients.",
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
    id: "02",
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
    id: "03",
    slug: "graphic-design",
    title: "Graphic Design",
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
    id: "04",
    slug: "ai-integrations",
    title: "AI Integrations",
    image: "/images/websites.jpeg",
    description: "Deploying production-grade custom conversational voice layers and automated database agents.",
    subServices: [
      { name: "RAG Systems", href: "/services/rag-pipelines" },
      { name: "Custom Voice Agents", href: "/services/voice-ai" },
      { name: "Automation Pipelines", href: "/services/ai-automation" },
    ]
  },
  {
    id: "05",
    slug: "digital-strategy",
    title: "Digital Strategy",
    image: "/images/brand.jpg",
    description: "Data-driven user tracking funnels designed to scale baseline business operations to the sky.",
    subServices: [
      { name: "Market Mapping", href: "/services/market-research" },
      { name: "Funnel Engineering", href: "/services/funnel-opt" },
      { name: "Conversion Rate Optimization", href: "/services/cro" },
    ]
  }
];

const ExpandedServiceRow = ({ id, title, image, description, subServices, isExpanded, onToggle, onMouseEnter, onMouseLeave }) => {
  const imgWrapRef = useRef(null);

  const handleRowEnter = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      onMouseEnter();
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
    if (window.matchMedia("(min-width: 768px)").matches) {
      onMouseLeave();
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
      className="w-full relative border-b-2 border-b-emerald-400 select-none group cursor-pointer scroll-mt-24 sm:scroll-mt-32 transition-colors duration-300 "
    >
      <div
        className={`w-full h-[1.5px] absolute top-0 left-0 transition-all duration-500 ease-out origin-left z-20 ${
          isExpanded ? "bg-[#242021] scale-x-100 opacity-100" : "bg-transparent scale-x-0 opacity-0"
        }`}
      />

      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 lg:gap-12 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:py-12  w-full pr-2 md:pr-8 relative">

        {/* DESKTOP SIDE PANEL */}
        <div className="w-full md:col-span-4 lg:col-span-5 hidden md:block mt-2 md:mt-0">
          <div
            className={`transition-all duration-500 ease-out transform ${
              isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <p className="text-base lg:text-lg leading-relaxed text-neutral-600 font-old-school max-w-sm">
              {description}
            </p>
          </div>
        </div>

        {/* CORE CONTENT ROW CONTAINER */}
        <div className="w-full md:col-span-8 lg:col-span-7 flex flex-col pl-0 md:pl-4">

          <div className="flex items-center w-full justify-between">
            <div className="flex items-center flex-1 min-w-0">
              
              {/* HIDDEN ON MOBILE */}
              <span
                className={`font-abc-arizona italic text-sm sm:text-base md:text-xl mr-3 sm:mr-4 md:mr-8 transition-all duration-500 transform pt-0.5 hidden md:inline-block ${
                  isExpanded ? "text-[#242021] opacity-100 translate-x-0" : "text-neutral-400/60 opacity-60 -translate-x-1"
                }`}
              >
                {id}
              </span>

              <div
                ref={imgWrapRef}
                className="relative shrink-0 h-[70px] w-[80px] sm:h-[65px] sm:w-[65px] md:h-[70px] md:w-0 md:opacity-0 overflow-hidden rounded-xl mr-4 md:mr-0 transition-all duration-300"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 65px, 140px"
                  className="object-cover"
                />
              </div>

              <h1
                className={`text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-old-school tracking-tight leading-tight lg:leading-none transition-all duration-500 ${
                  isExpanded ? "text-[#242021] translate-x-1 md:translate-x-2" : "text-[#000000] "
                }`}
              >
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-0 shrink-0 ml-2 md:hidden">
              <div className="text-xl font-bold text-neutral-500 transition-transform duration-300">
                {isExpanded ? "—" : "+"}
              </div>
            </div>
          </div>

          {/* MOBILE DESCRIPTION ACCORDION */}
          <div
            className={`grid md:hidden transition-all duration-500 ease-out overflow-hidden w-full ${
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
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-5 sm:mt-6 md:mt-8" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden pl-0 md:pl-12 w-full">
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
                      className="flex items-center justify-between w-full py-3 px-4 rounded-md
                                 text-emerald-900 bg-neutral-200/80
                                 text-base sm:text-xl md:text-xl lg:text-2xl font-old-school tracking-tight
                                 transition-all duration-300 hover:text-[#000000] group/link"
                    >
                      <span>{sub.name}</span>

                      <span className="inline-block overflow-hidden h-7 w-7 shrink-0 ml-4 relative">
                        {/* Modified classes below: default is text-[#000000] (mobile layout) and md scales it back to text-emerald-800 */}
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#000000] md:text-emerald-800
                                     transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] 
                                     group-hover/link:scale-125 group-hover/link:text-[#000000]"
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

function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full bg-[#F1F1F1] py-16 sm:py-24 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-12 md:gap-x-8 lg:gap-x-12 items-start mb-16 sm:mb-20 md:mb-28">
          <div className="md:col-span-6 flex flex-col">
            <h1 className="font-abc-arizona text-[#242021] text-5xl sm:text-7xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.85]">
              Our Core
            </h1>
            <h1 className="text-[#242021] text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-bold leading-[0.95] md:leading-[0.85] uppercase">
              SERVICES.
            </h1>
          </div>

          

          <div className="hidden lg:block lg:col-span-1" />

          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            <h3 className="text-[#242021] text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-old-school font-bold leading-tight tracking-tight">
              How we take your <br/> business to the next level
            </h3>
            <p className="text-neutral-700 text-lg md:text-xl leading-tight font-old-school ">
              We build websites, produce videos, and design brands. One team handles everything from start to finish, with no outsourcing and no shortcuts.
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