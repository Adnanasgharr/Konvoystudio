"use client";
import React, { useState } from "react";

const valuesData = [
  {
    id: "01",
    title: "Creatively Curious",
    description:
      "We push past the obvious and chase ideas worth getting excited about. Curiosity is built into everything we do and keeps our work fresh, our thinking sharp, and our designs from looking like everyone else's.",
  },
  {
    id: "02",
    title: "Freedom to Lead",
    description:
      "We take ownership of our work and trust each other to get things done right. Every person on the team knows their role, owns their decisions, and holds themselves to a standard they are proud of.",
  },
  {
    id: "03",
    title: "Design Excellence",
    description:
      "We are dedicated to our craft and committed to delivering exceptional results in every project we take on. Good enough has never been an option for us and it never will be.",
  },
  {
    id: "04",
    title: "Collective Success",
    description:
      "We win together and we learn together. Every project, every result, every lesson belongs to the whole team. No single person takes the credit and no single person takes the blame.",
  },
];

export default function MissionValues() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 bg-[#F1F1F1] text-[#0F1011] relative z-10 select-none">
      
      {/* =====================
          MISSION BLOCK
         ===================== */}
      <div className="w-full mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 border-b-2 border-[#dbd9d1] pb-16 sm:pb-24 lg:pb-18">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-28 items-start">
          
          {/* Core Title Block */}
          <div className="col-span-1 lg:col-span-7 flex flex-col">
            <h1 className="font-abc-arizona text-[#0F1011] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9]">
              Studio
            </h1>
            <h1 className="text-[#0F1011] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9] uppercase">
              Mission.
            </h1>
          </div>

          {/* Right: Paragraph */}
          <div className="col-span-1 lg:col-span-5 space-y-6 text-neutral-700 text-base sm:text-lg leading-relaxed font-old-school mt-4 lg:mt-0">
            <p>
              Konvoy Studio was built on a simple but uncompromising belief —
              that quality creative work should not be gatekept by large
              agencies with bloated processes and impersonal teams.
            </p>
            <p>
              We show up fully on every project, whether it is a brand
              identity for a first-time founder or a full-stack web platform
              for a growing business. The size of the brief does not change
              the standard of our work.
            </p>
            <p>
              Every deliverable that leaves our studio is something we are
              proud to put our name on.
            </p>
          </div>

        </div>
      </div>

      {/* =====================
          VALUES BLOCK
         ===================== */}
      <div className="w-full pt-16 sm:pt-24 lg:pt-18">
        <div className="w-full mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
          
          {/* Core Title Grid Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-28 items-start mb-12 sm:mb-16">
            <div className="col-span-1 lg:col-span-12 flex flex-col">
              <h1 className="font-abc-arizona text-[#0F1011] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9]">
                Our
              </h1>
              <h1 className="text-[#0F1011] text-5xl sm:text-6xl md:text-7xl uppercase lg:text-8xl leading-[0.95] md:leading-[0.9]">
                Values.
              </h1>
            </div>
          </div>

          {/* Accordion List Container */}
          <div className="w-full flex flex-col border-t border-neutral-300/60 ">
            {valuesData.map((val, idx) => {
              const isHovered = idx === hoveredIndex;

              return (
                <div
                  key={val.id}
                  className="w-full relative cursor-pointer group"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  
                  {/* Animated Top Border Line */}
                  <div
                    className={`w-full h-[1px] absolute top-0 left-0 transition-all duration-500 ease-out origin-left z-20 ${
                      isHovered
                        ? "bg-[#0F1011] scale-x-100 opacity-100"
                        : "bg-neutral-300 scale-x-0 opacity-0"
                    }`}
                  />

                  {/* Accordion Row Structure */}
                  <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:py-12 items-start w-full">
                    
                    {/* DESKTOP ONLY LEFT COLUMN: Side-by-Side Paragraph */}
                    <div className="hidden lg:block lg:col-span-4">
                      <div
                        className={`transition-all duration-500 ease-out transform ${
                          isHovered
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        <p className="text-base leading-relaxed text-neutral-600 font-sans max-w-sm">
                          {val.description}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Number layout + Heading */}
                    <div className="w-full lg:col-span-8 flex items-start pl-0 lg:pl-8">
                      
                      {/* Number Counter */}
                      <span
                        className={`font-abc-arizona italic text-sm md:text-lg mr-6 md:mr-12 transition-all duration-500 transform pt-0.5 sm:pt-1 lg:pt-0 ${
                          isHovered
                            ? "text-[#0F1011] opacity-100 translate-x-0"
                            : "text-neutral-300 opacity-60 -translate-x-2"
                        }`}
                      >
                        {val.id}
                      </span>

                      <div className="flex flex-col flex-1">
                        
                        {/* Heading Title */}
                        <h3
                          className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight lg:leading-none transition-all duration-500 ${
                            isHovered
                              ? "text-[#0F1011]"
                              : "text-[#0F1011]/40 group-hover:text-[#0F1011]/70"
                          }`}
                        >
                          {val.title}
                        </h3>

                        {/* MOBILE ONLY DROPDOWN: Inline Dynamic Slide down */}
                        <div
                          className={`grid lg:hidden transition-all duration-500 ease-out overflow-hidden ${
                            isHovered
                              ? "grid-rows-[1fr] opacity-100 mt-3 sm:mt-4"
                              : "grid-rows-[0fr] opacity-0 mt-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-sm sm:text-base text-neutral-600 font-old-school pb-2 leading-relaxed max-w-xl">
                              {val.description}
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Base Divider line */}
                  <div className="w-full h-[1px] bg-neutral-300/60 absolute bottom-0 left-0" />

                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}