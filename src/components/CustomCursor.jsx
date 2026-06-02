"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  // Keep track of the active element we are currently hovering over
  const currentTargetRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textSpan = textRef.current;
    if (!cursor) return;

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
        textSpan.innerText = "↗";
        gsap.to(cursor, {
          width: 100,
          height: 100,
          backgroundColor: "#4ade80",
          mixBlendMode: "normal",
          color: "#000000",
          fontSize: "24px",
          duration: 0.3,
        });
      } 
      else if (type === "video") {
        // Reads live, fresh mute attributes off the target element instantly
        const isMuted = target.getAttribute("data-video-muted") === "true";
        textSpan.innerText = isMuted ? "UNMUTE" : "MUTE";
        
        gsap.to(cursor, {
          width: 96,
          height: 96,
          backgroundColor: "#ffffff",
          mixBlendMode: "normal",
          color: "#000000",
          fontSize: "12px",
          letterSpacing: "0.1em",
          duration: 0.3,
        });
      } 
      else if (type === "website") {
        textSpan.innerText = "↗";
        gsap.to(cursor, {
          width: 96,
          height: 96,
          backgroundColor: "#c8f135",
          mixBlendMode: "normal",
          color: "#000000",
          fontSize: "24px",
          duration: 0.3,
        });
      }
    };

    // 2. Global Hover Detector
    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;

      currentTargetRef.current = target; // Store reference to the element
      updateCursorVisuals(target);
    };

    // 3. Global Mouse Leave Reset
    const handleMouseOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;

      currentTargetRef.current = null; // Clear active reference
      textSpan.innerText = "";
      gsap.killTweensOf(cursor);
      gsap.to(cursor, {
        width: 16,
        height: 16,
        backgroundColor: "#ffffff",
        mixBlendMode: "difference",
        duration: 0.3,
      });
    };

    // NEW: Global Click Listener to update strings instantly on tap
    const handleGlobalClick = () => {
      if (currentTargetRef.current) {
        // Force the text update immediately using the new state values
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
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center font-bold text-center select-none uppercase tracking-wider overflow-hidden"
      style={{ width: 16, height: 16, mixBlendMode: "difference" }}
    >
      <span ref={textRef} className="flex items-center justify-center w-full h-full" />
    </div>
  );
}