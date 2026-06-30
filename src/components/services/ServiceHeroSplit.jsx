"use client";
import React from "react";
import Image from "next/image";

export default function ServiceHeroSplit({
  eyebrow,
  heading,
  paragraphs = [],
  heroImage = "/images/studio-hero-placeholder.jpg",
  heroType = "standard", // "standard" (for gifs/simple images) or "longshot"
}) {
  const sectionBgColor = "#121212";

  const handleScrollToCapabilities = () => {
    const targetElement = document.getElementById("capabilities");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const isLongshot = heroType === "longshot";

  return (
    <section className="w-full bg-[#121212] text-white pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 font-old-school relative z-10 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-10 lg:px-16">
        {/* UPPER PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start mb-16 sm:mb-20 lg:mb-24">
          {/* LEFT */}
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

          {/* RIGHT */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pt-12 text-neutral-400">
            {Array.isArray(paragraphs) &&
              paragraphs.map((text, index) => (
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

        {/* LOWER PANEL */}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-visible group">
          {/* Image Frame */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-neutral-900 z-10 [container-type:size]">
            <Image
              src={heroImage}
              alt={heading || "Konvoy Studio Frame Execution"}
              // If it's standard/GIF, fill the box. If it's longshot, preserve natural vertical height
              width={isLongshot ? 1600 : 1920}
              height={isLongshot ? 5000 : 1080}
              priority
              unoptimized={heroImage.endsWith(".gif")} // Crucial for performance if you use GIFs
              className={
                isLongshot
                  ? "w-full h-auto transition-transform duration-[16000ms] [transition-timing-function:cubic-bezier(0.4,0,0.6,1)] group-hover:[transform:translateY(calc(-100%+100cqh))]"
                  : "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" // Nice clean static/GIF transition instead
              }
            />
            <div className="absolute inset-0 pointer-events-none" />
          </div>

          {/* Cutout Corner Panel */}
          <div
            className="absolute pt-0 pl-0 pr-2 pb-2 md:pr-4 md:pb-4 flex items-center justify-center z-20 pointer-events-auto origin-top-left rounded-br-[1.3rem] sm:rounded-br-[2.5rem]"
            style={{
              backgroundColor: sectionBgColor,
              boxShadow: `-9px -9px 9px 9px ${sectionBgColor}`,
            }}
          >
            {/* Right Curve */}
            <div
              className="absolute right-[-20px] top-0 w-5 h-5 pointer-events-none "
              style={{
                borderTopLeftRadius: "30rem",
                boxShadow: `-5px -3px 0 3px ${sectionBgColor}`,
              }}
            />

            {/* Bottom Curve */}
            <div
              className="absolute bottom-[-20px] top-auto left-0 w-5 h-5 pointer-events-none "
              style={{
                borderTopLeftRadius: "5rem",
                boxShadow: `-5px -3px 0 3px ${sectionBgColor}`,
              }}
            />

            {/* Pill Button */}
            <div
              onClick={handleScrollToCapabilities}
              className="group/btn flex items-center md:gap-3 gap-2 bg-[#1e1e1e] hover:bg-neutral-800 transition-colors duration-300 md:px-6 md:py-3.5 px-2 py-2 rounded-full text-sm font-normal tracking-tight cursor-pointer border border-neutral-800/60 shadow-lg"
            >
              <span className="text-xs sm:text-xs md:text-sm text-stone-300 font-normal tracking-tight">
                Tell me more
              </span>

              <svg
                className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-neutral-400 rotate-[90deg] transition-transform duration-300 ease-out group-hover/btn:rotate-[135deg]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}