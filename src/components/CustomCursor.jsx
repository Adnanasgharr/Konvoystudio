"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Raw SVG markup string formatted with responsive sizing utility classes
const arrowSVG = `
  <svg class="w-10 h-10 fill-current transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M328 96h24v288h-48V177.9L81 401l-17 17-33.9-34 17-17 223-223H64V96h264z"></path>
  </svg>
`;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const currentTargetRef = useRef(null);

  useEffect(() => {
    // Check if screen is wider than mobile (tablet/desktop)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return; // Completely bail out on mobile viewports

    const cursor = cursorRef.current;
    const textSpan = textRef.current;
    if (!cursor || !textSpan) return;

    // 1. Single Global Position Engine
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Helper to render layout states accurately based on data attributes
    const updateCursorVisuals = (target) => {
      if (!target) return;
      const type = target.getAttribute("data-cursor");
      
      gsap.killTweensOf(cursor);
      
      if (type === "service") {
        textSpan.innerHTML = arrowSVG;
        gsap.to(cursor, {
          width: 100,
          height: 100,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          color: "#000000",
          duration: 0.3,
        });
      } 
      else if (type === "video") {
        const isMuted = target.getAttribute("data-video-muted") === "true";
        textSpan.innerHTML = isMuted ? "UNMUTE" : "MUTE";
        
        gsap.to(cursor, {
          width: 96,
          height: 96,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          color: "#000000",
          fontSize: "12px",
          letterSpacing: "0.1em",
          duration: 0.3,
        });
      } 
      else if (type === "website") {
        textSpan.innerHTML = arrowSVG;
        gsap.to(cursor, {
          width: 96,
          height: 96,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          color: "#000000",
          duration: 0.3,
        });
      }
    };

    // 2. Global Hover Detector
    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;

      currentTargetRef.current = target;
      updateCursorVisuals(target);
    };

    // 3. Global Mouse Leave Reset
    const handleMouseOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;

      currentTargetRef.current = null;
      textSpan.innerHTML = "";
      gsap.killTweensOf(cursor);
      gsap.to(cursor, {
        width: 16,
        height: 16,
        backgroundColor: "#ffffff",
        mixBlendMode: "difference",
        duration: 0.3,
      });
    };

    // Global Click Listener to update strings instantly on tap
    const handleGlobalClick = () => {
      if (currentTargetRef.current) {
        updateCursorVisuals(currentTargetRef.current);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-white hidden md:flex items-center justify-center font-bold text-center select-none uppercase tracking-wider overflow-hidden"
      style={{ width: 16, height: 16, mixBlendMode: "difference" }}
    >
      <span ref={textRef} className="flex items-center justify-center w-full h-full" />
    </div>
  );
}