"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const Button = ({ 
  text = "Studio", 
  href, 
  onClick,
  target,
  variant = "primary", // Accepts 'primary' or 'secondary'
  className = "" 
}) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const arrowRef = useRef(null);
  const textTrack1Ref = useRef(null);
  const textTrack2Ref = useRef(null);
  
  const tlRef = useRef(null);

  // Determine styles dynamically based on the variant prop
  const isPrimary = variant === "primary";
  const bgStyles = isPrimary 
    ? "bg-[#c8f135] border-transparent" 
    : "bg-transparent border-neutral-800 hover:border-white";
  
  const text1Styles = isPrimary ? "text-black" : "text-white";
  const text2Styles = isPrimary ? "text-white" : "text-black";
  const circleBgStyles = isPrimary ? "bg-[#111111]" : "bg-white";
  const arrowColorStyles = isPrimary ? "text-white" : "text-black";

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      tlRef.current = gsap.timeline({ 
        paused: true,
        defaults: { duration: 0.35, ease: "power3.inOut" } 
      });

      tlRef.current
        // 1. Expand the background circle to fill the button container dynamically
        .to(circleRef.current, {
          scale: 30, 
        }, 0)

        // 2. Roll up the double-layered text tracks perfectly in sync
        .to([textTrack1Ref.current, textTrack2Ref.current], {
          y: "-100%",
        }, 0)

        // 3. ⚡ INSTANT MECHANICAL ARROW LOOP (Zero-delay frame-perfect timing)
        .to(arrowRef.current, {
          x: 24,
          y: -24,
          opacity: 0,
          duration: 0.08, // Ultra-fast escape velocity
          ease: "power2.in"
        }, 0)
        .set(arrowRef.current, {
          x: -24,
          y: 24,
        }) // Teleports to the bottom-left position instantly on the exact same frame
        .to(arrowRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.12, // Snaps into home position immediately
          ease: "power2.out"
        }, "<+=0.01"); // Forced to overlap with the exit frame for zero dead-air delay

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tlRef.current) tlRef.current.play();
  };

  const handleMouseLeave = () => {
    if (tlRef.current) tlRef.current.reverse();
  };

  const renderInnerContent = () => (
    <>
      {/* Text Split Container */}
      <div className="relative z-10 h-5 overflow-hidden pointer-events-none flex flex-col justify-start flex-1 pr-12 whitespace-nowrap">
        {/* Track 1: Base State Text */}
        <span
          ref={textTrack1Ref}
          className={`block text-sm font-semibold h-5 leading-5 tracking-wide transform-gpu transition-colors duration-300 ${text1Styles}`}
        >
          {text}
        </span>
        {/* Track 2: Hover Revealed Text */}
        <span
          ref={textTrack2Ref}
          className={`block text-sm font-semibold h-5 leading-5 tracking-wide transform-gpu ${text2Styles}`}
        >
          {text}
        </span>
      </div>

      {/* The Expanding Background Circle */}
      <div
        ref={circleRef}
        className={`absolute right-2 z-0 w-[30px] h-[30px] rounded-full pointer-events-none transform-gpu will-change-transform ${circleBgStyles}`}
        style={{ transformOrigin: "center center" }}
      />

      {/* 🏹 Enlarged Arrow Frame Mask Window */}
      <div className="absolute right-2 z-10 w-[30px] h-[30px] flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          ref={arrowRef}
          className={`w-[17px] h-[17px] will-change-transform transition-colors duration-300 ${arrowColorStyles}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4" 
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </>
  );

  const sharedStyles = `relative z-0 inline-flex items-center justify-between h-[46px] pl-6 pr-2 border rounded-full cursor-pointer overflow-hidden select-none decoration-transparent transition-all duration-300 ${bgStyles} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target={target}
        className={sharedStyles}
      >
        {renderInnerContent()}
      </Link>
    );
  }

  return (
    <button
      type="button"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={sharedStyles}
    >
      {renderInnerContent()}
    </button>
  );
};

export default Button;