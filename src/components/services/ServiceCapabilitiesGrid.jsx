"use client";
import React from "react";
import Button from "@/components/ui/Button";

const DefaultBoxIcon = () => (
  <div className="w-7 h-7 rounded-md bg-[#CCFF00] flex items-center justify-center text-[#121212] shrink-0">
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  </div>
);

export default function ServiceCapabilitiesGrid({ 
  eyebrow = "What we can help you with", 
  mainHeading, 
  ctaText = "See all Services", 
  ctaHref = "/services", 
  items = [] 
}) {
  return (
    <section id="capabilities" className="w-full bg-[#121212] text-white py-12 sm:py-16 lg:py-20 font-old-school">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-10 lg:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span className="text-sm sm:text-base md:text-sm text-stone-300 font-normal tracking-tight">
                {eyebrow}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-3xl md:text-6xl lg:text-5xl font-old-school tracking-tight leading-[1.05] max-w-xl text-stone-100">
              {mainHeading}
            </h2>
          </div>

          <div className="shrink-0">
            <Button
              text={ctaText}
              variant="primary"
              href={ctaHref}
              aria-label="View all services offered by Konvoy Studio"
            />
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-16 gap-y-8 sm:gap-y-10">
          {items.map((item, index) => (
            <div 
              key={`capability-${index}`} 
              className="flex flex-col items-start w-full border-b border-neutral-800 pb-6 sm:pb-8"
            >
              <div className="flex items-center gap-3 mb-3 w-full">
                {item.icon ? item.icon : <DefaultBoxIcon />}
                <h4 className="text-xl sm:text-3xl font-old-school tracking-tight text-white truncate">
                  {item.title}
                </h4>
              </div> 

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm font-old-school">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}