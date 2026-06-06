"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Button from "./Button";

const services = [
  { title: "Brand Identity", image: "/images/brand.jpg" },
  { title: "Websites", image: "/images/websites.jpeg" },
  { title: "Video Editing", image: "/images/video.jpg" },
];

const ServiceRow = ({ title, image }) => {
  const imgWrapRef = useRef(null);

  const handleMouseEnter = () => {
    // Check matchMedia so mouse animations only trigger on desktop screens
    if (window.matchMedia("(min-width: 768px)").matches) {
      gsap.killTweensOf(imgWrapRef.current);
      gsap.to(imgWrapRef.current, {
        width: 140,
        opacity: 1,
        duration: 0.35,
        ease: "expo.out",
      });
    }
  };

  const handleMouseLeave = () => {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="service"
      className="py-4 md:py-8 border-b-2 border-b-emerald-400 flex items-center gap-4 md:gap-6 cursor-none overflow-hidden"
    >
      {/* 
        IMAGE WRAPPER:
        - Mobile: Static width (60px) and visible right away.
        - Desktop (md:): Hidden width (0px) controlled strictly by GSAP hover.
      */}
      <div
        ref={imgWrapRef}
        className="relative shrink-0 h-[60px] w-[60px] md:h-[100px] md:w-0 md:opacity-0 overflow-hidden rounded-md transition-shadow duration-300"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 60px, 140px"
          className="object-cover"
        />
      </div>

      {/* Fluid responsive text scaling */}
      <h1 className="text-[#242021] text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold whitespace-nowrap tracking-tight">
        {title}
      </h1>
    </div>
  );
};

const Services = () => {
  return (
    <section className="w-full bg-[#F1F1F1] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* Main Section Header Grid: Stacks on mobile, forms a clean row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-12 md:gap-x-8 lg:gap-x-12 items-start mb-16 md:mb-24">

          {/* Core Title Block */}
          <div className="md:col-span-5 flex flex-col">
            <h1 className="font-abc-arizona text-[#242021] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9]">
              Our Core
            </h1>
            <h1 className="text-[#242021] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9]">
              SERVICES
            </h1>
          </div>

          {/* Value Prop Block */}
          <div className="md:col-span-4 md:pt-2">
            <h2 className="text-[#242021] text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-old-school font-bold leading-tight tracking-tight">
              How we take your business to the next level
            </h2>
          </div>

          {/* Description Paragraph & CTA Button Block */}
          <div className="md:col-span-3 flex flex-col items-start gap-6 md:pt-2">
            <p className="text-[#242021] text-base lg:text-lg font-old-school leading-tight text-neutral-700">
              We are a digital marketing agency with expertise, and we're on a
              mission to help you take the next step in your business.
            </p>
            <div className="w-full sm:w-auto">
              <Button
                text="See all Services"
                variant="primary"
                aria-label="View all services offered by Konvoy Studio"
              />
            </div>
          </div>

        </div>

        {/* 
          SERVICES ROWS CONTAINER: 
          Stacks directly below the header text on mobile, matches an offset alignment layout structure on desktop.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-start-6 md:col-span-7 border-t border-t-emerald-400/20 md:border-t-0">
            {services.map((service) => (
              <ServiceRow
                key={service.title}
                title={service.title}
                image={service.image}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;