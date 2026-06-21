"use client";
import React from "react";
import Button from "@/components/ui/Button";

export default function ServicePartnershipCore({
  serviceTitle = "WordPress",
  visualLabel = "WordPress",
  heading,
  paragraphOne,
  paragraphTwo,
  paragraphThree,
  ctaText = "Talk to our experts",
  ctaHref = "/contact"
}) {
  const fallbackHeading = `Why ${serviceTitle} and Konvoy Studio Are the Best Choice for Your Website`;

  return (
    <section className="w-full bg-[#121212] text-white py-5 sm:py-14 lg:py-32 border-t border-neutral-900 relative z-10 select-none font-old-school">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        
        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-28 items-start">
          
          {/* Left Side: col-span-7 (Heading + Slimmer Image Panel) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-10 w-full">
            <h2 className="text-3xl sm:text-3xl md:text-6xl lg:text-5xl font-old-school tracking-tight leading-[1.15] md:leading-[1.1] text-stone-100">
              {heading || fallbackHeading}
            </h2>

            {/* Adjusted mobile aspect ratio to 21/12 to safely prevent overflow height pinching */}
            <div className="relative w-full aspect-[21/12] sm:aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-white border border-neutral-200/80 flex flex-col justify-between p-5 sm:p-8 group selection:bg-[#CCFF00] selection:text-[#121212]">
              
              {/* Top Panel: Service Context (Optimized for Mobile Wrapping) */}
              <div className="relative z-10 flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between w-full border-b border-neutral-200/60 pb-3">
                <span className="text-[10px] sm:text-xs tracking-[0.15em] text-neutral-500 font-normal uppercase truncate max-w-full">
                  {visualLabel} EXPERTS
                </span>
            
              </div>

              {/* Central Identity Matrix with Stylized Editorial Cross */}
              <div className="relative z-10 my-auto py-4 flex items-center justify-center w-full">
                <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 w-full">
                  <span className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-[#121212] uppercase">
                    Konvoy
                  </span>
                  
                  {/* Stylish typographic '×' connection */}
                  <span className="text-3xl sm:text-5xl md:text-6xl font-light text-[#A3D900] scale-x-110 select-none">
                    ×
                  </span>
                  
                  <span className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-[#A3D900] uppercase truncate">
                    {visualLabel}
                  </span>
                </div>
              </div>

              {/* Bottom Panel: Service Metrics */}
              <div className="relative z-10 flex items-center justify-between border-t border-neutral-200/60 pt-3 w-full">
                <div>
                  <div className="text-[9px] sm:text-[10px] tracking-wider uppercase text-neutral-400 mb-0.5">EXPERTISE</div>
                  <div className="text-[11px] sm:text-xs font-normal text-neutral-700 tracking-tight">5+ Years Active</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] sm:text-[10px] tracking-wider uppercase text-neutral-400 mb-0.5">QUALITY</div>
                  <div className="text-[11px] sm:text-xs font-normal text-neutral-700 tracking-tight">Zero Compromise</div>
                </div>
              </div>

              {/* Clean Subtle Radial Ambient Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#CCFF00] opacity-[0.1] blur-[50px] pointer-events-none" />
            </div>
          </div>

          {/* Right Side: col-span-5 (Paragraph Blocks + Button CTA) */}
          <div className="col-span-1 lg:col-span-5 space-y-6 sm:space-y-8 text-neutral-400 text-base sm:text-lg leading-relaxed lg:mt-2">
            
            {paragraphOne && (
              <p className="text-stone-300 font-normal">
                {paragraphOne}
              </p>
            )}
            
            {paragraphTwo && (
              <p className="font-normal">
                {paragraphTwo}
              </p>
            )}

            {paragraphThree && (
              <p className="font-normal">
                {paragraphThree}
              </p>
            )}

            <div className="pt-4">
              <Button
                text={ctaText}
                variant="primary"
                href={ctaHref}
                className="font-normal"
                aria-label={`Get in touch regarding any ${serviceTitle} solutions`}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}