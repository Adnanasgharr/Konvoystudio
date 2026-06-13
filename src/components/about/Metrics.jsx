"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const metricData = [
  {
    id: 1,
    label: "Clients",
    value: 250,
    suffix: "+",
    description: "With over a decade of experience, our studio is an energetic, fresh and vibrant team offering creative talent and industry knowledge.",
  },
  {
    id: 2,
    label: "Referrals",
    value: 55,
    suffix: "%",
    description: "Over 55% of our projects are referrals from clients already with us. Our clients love to spread the love far and wide.",
  },
  {
    id: 3,
    label: "Global Partners",
    value: 14,
    suffix: "+",
    description: "Operating across continents, we seamlessly integrate with cross-functional design networks to execute fluid products at global scale.",
  },
  {
    id: 4,
    label: "Finished Projects",
    value: 480,
    suffix: "+",
    description: "Delivering exceptional, high-fidelity digital platforms and custom motion frameworks crafted precisely to survive fast tech cycles.",
  },
];

export default function AboutValues() {
  const sectionRef = useRef(null);
  const targetsRef = useRef([]);

  targetsRef.current = [];
  const addToRefs = (el) => {
    if (el && !targetsRef.current.includes(el)) {
      targetsRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const elements = targetsRef.current;

    if (!section || elements.length === 0) return;

    let ctx = gsap.context(() => {
      elements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute("data-target"), 10);
        const countObj = { val: 0 };

        gsap.to(countObj, {
          val: targetValue,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%", // Trigger slightly earlier for better mobile viewing flow
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.ceil(countObj.val);
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#0F1011] text-[#FDFCF7] py-20 sm:py-24 lg:py-32 relative z-10 select-none"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        
        {/* Core Layout Split — Optimized from 1 column up to a clean 4 column row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-12 gap-y-12 sm:gap-y-16 items-start">
          {metricData.map((item) => (
            <div key={item.id} className="w-full flex flex-col">
              
              {/* Metric Label Header */}
              <span className="block font-sans text-sm sm:text-base md:text-lg uppercase tracking-tight text-[#FDFCF7]/90 mb-3 sm:mb-4">
                {item.label}
              </span>
              
              {/* Divider line */}
              <div className="w-full h-[1px] bg-[#E4E2D9]/10 mb-6 sm:mb-8" />
              
              {/* Massive Metric Display Typography */}
              <h3 className="text-4xl sm:text-6xl md:text-[7vw] lg:text-[5.5vw] font-old-school tracking-tight leading-none mb-4 sm:mb-6 text-[#FDFCF7]">
                <span 
                  ref={addToRefs} 
                  data-target={item.value}
                >
                  0
                </span>
                <span >{item.suffix}</span>
              </h3>
              
              {/* Informational description copy */}
              <p className="text-xs sm:text-sm md:text-base font-old-school leading-relaxed text-neutral-400 max-w-full">
                {item.description}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}