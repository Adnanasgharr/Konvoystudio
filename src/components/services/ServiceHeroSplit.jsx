"use client";
import React from "react";
import Image from "next/image";

export default function ServiceHeroSplit({ 
  eyebrow, 
  heading, 
  paragraphs = [],
  heroImage = "/images/studio-hero-placeholder.jpg" 
}) {
  const sectionBgColor = "#121212";

  // Native smooth scroll handler targeting the capabilities ID anchor
  const handleScrollToCapabilities = () => {
    const targetElement = document.getElementById("capabilities");
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  return (
    <section className="w-full bg-[#121212] text-white pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 font-old-school relative z-10 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-10 lg:px-16">
        
        {/* UPPER PANEL: Responsive Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start mb-16 sm:mb-20 lg:mb-24">
          
          {/* LEFT PANEL - DYNAMIC HEADINGS */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {eyebrow && (
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm sm:text-base md:text-sm text-stone-300 font-normal tracking-tight">
                  {eyebrow}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-normal tracking-tight leading-[1.05] max-w-xl text-stone-100">
              {heading}
            </h1>
          </div>

          {/* RIGHT PANEL - NARRATIVE COPY BLOCKS */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pt-12 text-neutral-400">
            {Array.isArray(paragraphs) && paragraphs.map((text, index) => (
              <p 
                key={`hero-para-${index}`} 
                className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal ${
                  index === 0 ? "text-stone-300" : ""
                }`}
              >
                {text}
              </p>
            ))}
          </div>

        </div>

        {/* LOWER PANEL: Image Frame Wrapper */}
        <div className="relative w-full aspect-[21/9] min-h-[350px] sm:min-h-[450px] md:min-h-[550px] overflow-visible group">
          
          {/* Main Media Frame */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[1.5rem] bg-neutral-900 z-10">
            <Image
              src={heroImage}
              alt={heading || "Konvoy Studio Frame Execution"}
              fill
              priority
              sizes="(max-w-1600px) 100vw, 1600px"
              className="object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] filter brightness-[0.85] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Inverted Cutout Frame Panel Layout */}
          <div
            className="absolute top-0 left-0 pt-0 pl-0 pr-4 pb-4 flex items-center justify-center z-20 pointer-events-auto origin-top-left"
            style={{ 
              backgroundColor: sectionBgColor,
              borderBottomRightRadius: "1.8rem"
            }}
          >
            {/* Shallow Right Inverted Mask Curve */}
            <div 
              className="absolute right-[-12px] top-0 w-3 h-3 pointer-events-none"
              style={{
                borderTopLeftRadius: "0.5rem",
                boxShadow: `-3px -3px 0 3px ${sectionBgColor}`
              }}
            />

            {/* Shallow Bottom Inverted Mask Curve */}
            <div 
              className="absolute bottom-[-12px] top-auto left-0 w-3 h-3 pointer-events-none"
              style={{
                borderTopLeftRadius: "0.5rem",
                boxShadow: `-3px -3px 0 3px ${sectionBgColor}`
              }}
            />

            {/* Action Pill with trigger execution binding */}
            <div 
              onClick={handleScrollToCapabilities}
              className="flex items-center gap-3 bg-[#1e1e1e] hover:bg-neutral-800 transition-colors duration-300 px-6 py-3.5 rounded-full text-sm font-normal tracking-tight cursor-pointer border border-neutral-800/60 shadow-lg"
            >
              <span>Tell me more</span>
              <svg 
                className="w-3.5 h-3.5 text-neutral-400 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}