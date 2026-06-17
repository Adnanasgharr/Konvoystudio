"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  { id: 1, url: "/images/gallery/hero-1.jpg" },
  { id: 2, url: "/images/gallery/hero-2.jpg" },
  { id: 3, url: "/images/gallery/hero-4.jpg" },
  { id: 4, url: "/images/gallery/hero-3.jpg" },
  { id: 5, url: "/images/gallery/hero-5.jpg" },
];

export default function AboutHero() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const starRef = useRef(null);
  const mobileTrackRef = useRef(null);
  
  const mobileImageRefs = useRef([]);
  const desktopImageRefs = useRef([]);

  mobileImageRefs.current = [];
  desktopImageRefs.current = [];

  const addToMobileRefs = (el) => {
    if (el && !mobileImageRefs.current.includes(el)) {
      mobileImageRefs.current.push(el);
    }
  };

  const addToDesktopRefs = (el) => {
    if (el && !desktopImageRefs.current.includes(el)) {
      desktopImageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const starElement = starRef.current;
    const mobileItems = mobileImageRefs.current;
    const desktopItems = desktopImageRefs.current;
    const mobileTrack = mobileTrackRef.current;

    if (!container || !line1 || !line2 || !starElement) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    
    let ctx = gsap.context(() => {
      // 🎯 THE FIX: Force the overall SVG wrapper container to pivot exactly from its true center point
      gsap.set(starElement, { transformOrigin: "50% 50%" });

      // ==========================================
      // 📱 MOBILE NATURAL DRIVEN SCROLL
      // ==========================================
      if (!isDesktop && mobileItems.length > 0) {
        mobileItems.forEach((item, index) => {
          gsap.set(item, { 
            opacity: index === 0 ? 1 : 0, 
            scale: index === 0 ? 1 : 0.95,
            zIndex: mobileItems.length - index 
          });
        });

        const mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: mobileTrack,
            start: "top 70%",
            end: "top 10%",
            scrub: true,
          }
        });

        mobileItems.forEach((currentItem, index) => {
          if (index === mobileItems.length - 1) return;
          const nextItem = mobileItems[index + 1];

          mobileTimeline
            .to(currentItem, { opacity: 0, scale: 1.05, duration: 1, ease: "power1.out" })
            .to(nextItem, { opacity: 1, scale: 1, duration: 1, ease: "power1.out" }, "<+=0.1");
        });

        return;
      }

      // ==========================================
      // 🖥️ DESKTOP HOVER MATRIX ENGINE
      // ==========================================
      if (isDesktop && desktopItems.length > 0) {
        const BASE_FLEX = 0.5;
        const BASE_HEIGHT = 60;
        const MAX_FLEX = 4.8;
        const MAX_HEIGHT = 100;

        gsap.set(desktopItems, { flexGrow: BASE_FLEX, height: `${BASE_HEIGHT}%` });
        gsap.set(desktopItems[0], { flexGrow: MAX_FLEX, height: `${MAX_HEIGHT}%` });

        const line1QuickX = gsap.quickTo(line1, "xPercent", { duration: 1.2, ease: "power3.out" });
        const line2QuickX = gsap.quickTo(line2, "xPercent", { duration: 2.2, ease: "power4.out" });
        
        // 🔄 Fast-performance interpolator targeting the overall SVG star container element
        const svgOverallRotate = gsap.quickTo(starElement, "rotation", { duration: 0.8, ease: "power2.out" });

        let containerWidth = container.offsetWidth;
        const resizeObserver = new ResizeObserver(() => {
          containerWidth = container.offsetWidth;
        });
        resizeObserver.observe(container);

        const handleMouseMove = (e) => {
          const containerRect = container.getBoundingClientRect();
          const relativeX = e.clientX - containerRect.left;
          const progress = relativeX / containerWidth;

          const line1W = line1.offsetWidth || 1;
          const line2W = line2.offsetWidth || 1;
          const maxDeltaX = (containerWidth - Math.max(line1W, line2W)) / 2;

          if (maxDeltaX > 0) {
            const actualTargetX = (progress - 0.5) * (maxDeltaX * 2);
            line1QuickX((actualTargetX / line1W) * 100);
            line2QuickX((actualTargetX / line2W) * 100);
          }

          // 🔄 Calculate total rotation value mapped directly from cursor coordinates
          const targetRotation = (e.clientX + e.clientY) * 0.15;
          svgOverallRotate(targetRotation);

          desktopItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(e.clientX - itemCenterX);

            const trackingRadius = 240;
            const isDirectlyOver = e.clientX >= rect.left && e.clientX <= rect.right;

            if (distance < trackingRadius || isDirectlyOver) {
              const currentDistance = Math.min(distance, trackingRadius);
              const closeness = 1 - currentDistance / trackingRadius;
              const smoothFactor = Math.sin(closeness * (Math.PI / 2));

              gsap.to(item, {
                flexGrow: BASE_FLEX + smoothFactor * (MAX_FLEX - BASE_FLEX),
                height: `${BASE_HEIGHT + smoothFactor * (MAX_HEIGHT - BASE_HEIGHT)}%`,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              gsap.to(item, {
                flexGrow: BASE_FLEX,
                height: `${BASE_HEIGHT}%`,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        };

        const handleMouseLeave = () => {
          line1QuickX(0);
          line2QuickX(0);
          
          // 🛑 Smoothly reset the entire SVG alignment back to 0 when mouse leaves
          svgOverallRotate(0);

          desktopItems.forEach((item, idx) => {
            gsap.to(item, {
              flexGrow: idx === 0 ? MAX_FLEX : BASE_FLEX,
              height: idx === 0 ? `${MAX_HEIGHT}%` : `${BASE_HEIGHT}%`,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          resizeObserver.disconnect();
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-[#F1F1F1] text-[#0F1011] flex flex-col justify-between md:justify-end p-4 sm:p-6 md:p-10 pb-12 sm:pb-16 overflow-hidden select-none"
    >
      <div className="hidden max-md:block h-12" />

      {/* TYPOGRAPHY AREA */}
      <div className="w-full max-w-9xl mx-auto text-center my-auto md:my-0 md:mb-12">
        <div className="flex flex-col items-center justify-center text-center overflow-visible">
          <h1
            ref={line1Ref}
            className="text-[8.5vw] md:text-[5vw] font-serif font-light tracking-tight leading-[1.05] md:leading-[0.85] flex flex-wrap items-center justify-center gap-x-[3vw] md:gap-x-[2.2vw] will-change-transform"
          >
            <span>A motion-first</span>
            <span
              ref={starRef}
              className="inline-block w-[7.5vw] h-[7.5vw] md:w-[6vw] md:h-[6vw] min-w-[36px] max-w-[90px] text-[#0F1011] shrink-0 fill-current will-change-transform translate-y-[0.6vw] md:translate-y-[0.4vw]"
            >
              <svg viewBox="0 0 480 480" className="w-full h-full overflow-visible">
                
                {/* 1st Blade Assembly */}
                <g>
                  <path d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z" transform="matrix(0.7744 -1.844 1.1363 0.4772 176.4 213.3)" />
                  <path d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z" transform="matrix(0.6699 1.8845 -1.8993 0.6752 346.3 202.2)" />
                  <path d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z" transform="matrix(-1.6919 1.0665 -0.5418 -0.8595 270.3 288.1)" />
                </g>
                
                {/* 2nd Blade Assembly */}
                <g>
                  <path d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z" transform="matrix(1.823 -0.8227 0.6359 1.4092 204.4 161.1)" />
                  <path d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z" transform="matrix(1.7251 1.012 -0.4942 0.8424 267.7 192.8)" />
                  <path d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z" transform="matrix(-1.7289 -1.0054 0.9496 -1.6329 186.8 331.4)" />
                </g>

                {/* Central Motor Node */}
                <path d="M40 0C40 0 40 0 40 0C40 22.1 22.1 40 0 40C0 40 0 40 0 40C-22.1 40 -40 22.1 -40 0C-40 0 -40 0 -40 0C-40 -22.1 -22.1 -40 0 -40C0 -40 0 -40 0 -40C22.1 -40 40 -22.1 40 0z" transform="matrix(1 0 0 1 240 240)" />
              </svg>
            </span>
            <span className="font-serif">digital studio</span>
          </h1>

          <h2
            ref={line2Ref}
            className="text-[8.5vw] md:text-[5vw] font-serif font-light tracking-tight leading-[1.05] md:leading-[0.85] mt-1 md:mt-0 will-change-transform"
          >
            that moves you forward.
          </h2>
        </div>
      </div>

      {/* GALLERY INTERFACE REGION */}
      <div className="w-full relative flex items-center justify-center">
        {/* MOBILE SLIDER RUNWAY */}
        <div className="md:hidden w-[85vw] sm:w-[70vw] h-[34vh] relative overflow-visible">
          <div ref={mobileTrackRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
          <div className="w-full h-full relative overflow-hidden bg-[#E4E2D9] z-10">
            {galleryImages.map((img) => (
              <div
                key={`mobile-${img.id}`}
                ref={addToMobileRefs}
                className="absolute inset-0 w-full h-full will-change-[opacity,transform]"
              >
                <img src={img.url} alt="Responsive active track item" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP GRID HOVER ASSY */}
        <div className="hidden md:flex items-end gap-5 w-full h-[36vh] max-h-[420px] justify-center">
          {galleryImages.map((img) => (
            <div
              key={`desktop-${img.id}`}
              ref={addToDesktopRefs}
              className="h-full relative bg-[#E4E2D9] transform origin-bottom overflow-hidden rounded-none min-w-[60px] will-change-[flex-grow,height]"
            >
              <img src={img.url} alt="Multi-column grid element" className="w-full h-full object-cover select-none pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}