"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function Lightbox({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const totalImages = images?.length || 0;

  // Drag and Swipe Tracking Anchors
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentTranslationRef = useRef(0);

  // 1. Lock Background Page Scroll & Run Cinematic Entry
  useEffect(() => {
    if (!images || totalImages === 0) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [images, totalImages]);

  // 2. Linear Index Snap Logic
  useEffect(() => {
    if (!imageContainerRef.current) return;
    
    currentTranslationRef.current = -currentIndex * window.innerWidth;
    gsap.to(imageContainerRef.current, {
      x: currentTranslationRef.current,
      duration: 0.55,
      ease: "power3.out"
    });
  }, [currentIndex]);

  // 3. Navigation Controls
  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalImages]);

  // 4. Unified Pointer Drag & Swipe Gestures
  const getClientX = (e) => {
    return e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleDragStart = (e) => {
    // Allow closing via buttons seamlessly without dragging interference
    if (e.target.closest('button')) return;
    
    isDraggingRef.current = true;
    startXRef.current = getClientX(e);
    
    // Stop ongoing transitions instantly for accurate manual feedback tracking
    gsap.killTweensOf(imageContainerRef.current);
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const currentX = getClientX(e);
    const deltaX = currentX - startXRef.current;
    
    // Virtual Base Translation
    const baseOffset = -currentIndex * window.innerWidth;
    
    // Apply micro elastic rubber-banding on out-of-bound edge pulls
    let activeX = baseOffset + deltaX;
    if ((currentIndex === 0 && deltaX > 0) || (currentIndex === totalImages - 1 && deltaX < 0)) {
      activeX = baseOffset + deltaX * 0.3; 
    }

    gsap.set(imageContainerRef.current, { x: activeX });
  };

  const handleDragEnd = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const swipeDistance = endX - startXRef.current;
    const threshold = window.innerWidth * 0.15; // Requires 15% viewport width movement to flip

    if (swipeDistance < -threshold && currentIndex < totalImages - 1) {
      handleNext();
    } else if (swipeDistance > threshold && currentIndex > 0) {
      handlePrev();
    } else {
      // Bounce back smoothly if threshold parameters aren't satisfied
      gsap.to(imageContainerRef.current, {
        x: -currentIndex * window.innerWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  };

  if (!images || totalImages === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/98 z-[99999] w-full h-screen overflow-hidden flex flex-col justify-between p-4 sm:p-8 xl:p-12 select-none"
      style={{ cursor: "auto" }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* TOP META BAR HEADER */}
      <header className="w-full flex justify-between items-center z-50 mix-blend-difference select-none pointer-events-auto">
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400">
          <span>Project Presentation Deck</span>
          <span className="text-neutral-600">•</span>
          <span className="text-emerald-400 font-bold">
            {(currentIndex + 1).toString().padStart(2, "0")} / {totalImages.toString().padStart(2, "0")}
          </span>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-xs sm:text-sm uppercase tracking-widest text-white hover:text-neutral-400 transition-colors duration-200 cursor-pointer focus:outline-none"
        >
          [ Close × ]
        </button>
      </header>

      {/* CENTER IMMERSIVE SLIDER VIEWPORT */}
      <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden my-4 sm:my-8">
        
        {/* Navigation Action Zones (Hidden on Mobile Touch Panels, Functional on Desktop) */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-30 group hidden sm:flex items-center justify-start text-white/20 hover:text-white transition-colors focus:outline-none"
          aria-label="Previous slide"
        >
          <span className="font-mono text-2xl pl-2 select-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">←</span>
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-30 group hidden sm:flex items-center justify-end text-white/20 hover:text-white transition-colors focus:outline-none"
          aria-label="Next slide"
        >
          <span className="font-mono text-2xl pr-2 select-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
        </button>

        {/* Dynamic Linear Content Strip */}
        <div 
          ref={imageContainerRef}
          className="w-full h-full flex items-center will-change-transform active:cursor-grabbing"
          style={{ cursor: "grab" }}
        >
          {images.map((src, index) => (
            <div 
              key={index} 
              className="w-full h-full flex-shrink-0 relative flex items-center justify-center px-4 sm:px-24"
            >
              <div className="relative w-full h-full max-w-[90vw] max-h-[70vh] aspect-video rounded-xl overflow-hidden shadow-2xl bg-neutral-900/30">
                <Image
                  src={src}
                  alt={`Portfolio design module ${index + 1}`}
                  fill
                  className="object-contain p-2 sm:p-4 md:p-8 select-none pointer-events-none"
                  sizes="90vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER TIMELINE SCATTER TRACKER */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 z-50 mix-blend-difference select-none pointer-events-auto">
        <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 hidden sm:block">
          Swipe, drag, or use keyboard arrows to explore assets.
        </div>

        {/* Multi-segment Pagination Dot Array */}
        <div className="flex items-center gap-2 max-w-md w-full sm:w-auto px-4 justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-[3px] transition-all duration-300 rounded-full focus:outline-none ${
                index === currentIndex ? "w-8 bg-white" : "w-3 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          Konvoy Studio © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default Lightbox;