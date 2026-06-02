"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const CreativeButton = ({ 
  text = "Studio", 
  onClick, 
  className = "" 
}) => {
  const buttonRef = useRef(null);
  const fillBgRef = useRef(null);
  const textPrimaryRef = useRef(null);
  const textSecondaryRef = useRef(null);
  const arrowIconRef = useRef(null);
  const arrowBgRef = useRef(null);
  
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      tlRef.current = gsap.timeline({ 
        paused: true,
        defaults: { duration: 0.45, ease: "power3.out" }
      });

      tlRef.current
        // 1. Explode the clipPath circle background over the whole layout
        .to(fillBgRef.current, {
          clipPath: "circle(150% at calc(100% - 28px) 50%)",
          duration: 0.55
        }, 0)
        
        // 2. Roll up the text track lines
        .to([textPrimaryRef.current, textSecondaryRef.current], {
          yPercent: -100
        }, 0)
        
        // 3. Reveal white text variant color layer
        .to(textSecondaryRef.current, {
          color: "#ffffff",
          duration: 0.2
        }, 0)
        
        // 4. Arrow Flying EXIT (Moves top-right, fades out while remaining white)
        .to(arrowIconRef.current, {
          x: 18,
          y: -18,
          opacity: 0,
          color: "#ffffff", 
          duration: 0.2,
          ease: "power2.in"
        }, 0)
        
        // 5. Arrow State Swapping (Teleport down-left, ready to return)
        .set(arrowIconRef.current, {
          x: -18,
          y: 18,
          color: "#ffffff" // Keeps the icon white since the background stays black
        })
        
        // 6. Arrow Flying RE-ENTRY (Slides cleanly back into view as a sharp white icon)
        .to(arrowIconRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          color: "#ffffff", 
          duration: 0.25,
          ease: "power3.out"
        }, ">"); 

    }, buttonRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tlRef.current) tlRef.current.play();
  };

  const handleMouseLeave = () => {
    if (tlRef.current) tlRef.current.reverse();
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`
        group relative flex items-center justify-between 
        pl-8 pr-[7px] py-2.5 min-w-[190px] h-[58px]
        bg-[#c8f135] border border-neutral-200 text-black 
        rounded-full overflow-hidden select-none cursor-pointer will-change-transform ${className}
      `}
    >
      {/* Mask Window Container for Text Layer Rollup Transitions */}
      <div className="relative h-[24px] overflow-hidden flex flex-col items-start z-20 pointer-events-none">
        <span
          ref={textPrimaryRef}
          className="text-lg font-medium tracking-tight text-black block leading-[24px]"
        >
          {text}
        </span>
        <span
          ref={textSecondaryRef}
          className="text-lg font-medium tracking-tight text-transparent block leading-[24px]"
        >
          {text}
        </span>
      </div>

      {/* THE COMPOSITED RADIAL MASK LAYER */}
      <div
        ref={fillBgRef}
        className="absolute inset-0 bg-[#111111] z-0 pointer-events-none will-change-[clip-path]"
        style={{ clipPath: "circle(21px at calc(100% - 28px) 50%)" }}
      />

      {/* STATIC ANCHORED ACTION BADGE ELEMENT (Stays black seamlessly) */}
      <div 
        ref={arrowBgRef}
        className="relative w-[42px] h-[42px] rounded-full bg-[#111111] flex items-center justify-center shrink-0 z-10 pointer-events-none"
      >
        <svg
          ref={arrowIconRef}
          className="w-3.5 h-3.5 text-white will-change-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </button>
  );
};

export default CreativeButton;