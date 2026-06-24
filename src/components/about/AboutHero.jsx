"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  { id: 1, url: "/images/gallery/Hero-1.jpg" },
  { id: 2, url: "/images/gallery/Hero-2.jpg" },
  { id: 3, url: "/images/gallery/Hero-4.jpg" },
  { id: 4, url: "/images/gallery/Hero-3.jpg" },
  { id: 5, url: "/images/gallery/Hero-5.jpg" },
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
    const starWrapper = starRef.current;
    const mobileItems = mobileImageRefs.current;
    const desktopItems = desktopImageRefs.current;
    const mobileTrack = mobileTrackRef.current;

    if (!container || !line1 || !line2 || !starWrapper) return;

    const actualSvg = starWrapper.querySelector("svg");
    if (!actualSvg) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    
    let ctx = gsap.context(() => {
      gsap.set(actualSvg, { transformOrigin: "50% 50%" });

      // ==========================================
      // 📱 MOBILE SCROLL SUITE
      // ==========================================
      if (!isDesktop) {
        // 1. Image Slider Reveal Control
        if (mobileItems.length > 0) {
          mobileItems.forEach((item, index) => {
            const innerImg = item.querySelector("img");
            gsap.set(item, {
              opacity: index === 0 ? 1 : 0,
              clipPath: index === 0 ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              zIndex: mobileItems.length - index
            });
            if (innerImg) {
              gsap.set(innerImg, { scale: index === 0 ? 1 : 1.25, yPercent: index === 0 ? 0 : -10 });
            }
          });

          const sliderTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: mobileTrack,
              start: "top 55%",
              end: "bottom 60%",
              scrub: 1, 
            }
          });

          mobileItems.forEach((currentItem, index) => {
            if (index === mobileItems.length - 1) return;

            const nextItem = mobileItems[index + 1];
            const currentImg = currentItem.querySelector("img");
            const nextImg = nextItem.querySelector("img");
            const stepLabel = `step-${index}`;

            sliderTimeline
              .to(currentItem, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                opacity: 0.7,
                duration: 1,
                ease: "power1.inOut"
              }, stepLabel)
              .to(currentImg, {
                scale: 1.1,
                yPercent: 8,
                duration: 1,
                ease: "power1.inOut"
              }, stepLabel)
              
              .to(nextItem, {
                opacity: 1,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "power1.inOut"
              }, stepLabel)
              .to(nextImg, {
                scale: 1,
                yPercent: 0,
                duration: 1,
                ease: "power1.inOut"
              }, stepLabel);
          });
        }

        // 2. ⚡ HIGH-SPEED WINDOW SCROLL ROTATION
        gsap.to(actualSvg, {
          rotation: 1440, // Increased to 4 full rotations for aggressive speed
          ease: "none",
          scrollTrigger: {
            trigger: typeof document !== "undefined" ? document.documentElement : "body",
            start: "top top", 
            end: "bottom center", // Pinched end point closer so the speed matches immediate action
            scrub: true,         
          }
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
        const svgOverallRotate = gsap.quickTo(actualSvg, "rotation", { duration: 0.8, ease: "power2.out" });

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
      className="w-full min-h-svh md:h-screen bg-[#F1F1F1] text-[#0F1011] flex flex-col justify-between md:justify-end p-4 sm:p-6 md:p-10 pb-12 sm:pb-16 overflow-hidden select-none"
    >
      <div className="hidden max-md:block h-12" />

      {/* TYPOGRAPHY AREA */}
      <div className="w-full max-w-9xl mx-auto text-center my-auto md:my-0 md:mb-12">
        <div className="flex flex-col items-center justify-center text-center overflow-visible">
          
          <h1
            ref={line1Ref}
            className="text-[12vw] md:text-[5vw] font-serif font-light tracking-tight leading-[1] md:leading-[0.85] flex flex-col md:flex-row items-center justify-center will-change-transform"
          >
            {/* LINE 1: SVG Star */}
            <span
              ref={starRef}
              className="order-1 md:order-2 inline-flex items-center justify-center w-[19vw] h-[19vw] md:w-[6vw] md:h-[6vw] min-w-[45px] max-w-[90px] text-[#0F1011] shrink-0 mb-6 md:mb-0 md:mx-[2.2vw] will-change-transform translate-y-0 md:translate-y-[0.4vw]"
            >
              <svg 
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                x="0px" 
                y="0px"
                viewBox="0 0 378.56 359.64" 
                className="w-full h-full fill-current will-change-transform"
                style={{ enableBackground: "new 0 0 378.56 359.64" }} 
                xmlSpace="preserve"
              >
                <polygon points="237.64,172.59 315.2,137.36 291.08,95.58 191.55,161.2 207.2,134.33 215.47,49.54 167.22,49.54 174.29,168.54 158.84,141.55 89.55,92 65.43,133.78 172.02,187.16 140.92,187.05 63.36,222.28 87.48,264.06 187.01,198.44 171.36,225.31 163.09,310.1 211.34,310.1 204.27,191.1 219.72,218.09 289.01,267.64 313.13,225.86 206.54,172.48 "/>
              </svg>
            </span>

            {/* LINE 2: "A motion-first" */}
            <span className="order-2 md:order-1 block w-full md:w-auto">A motion-first</span>
            
            {/* LINE 3: "digital studio" */}
            <span className="order-3 md:order-3 block w-full md:w-auto font-serif mt-2 md:mt-0">&nbsp;digital studio</span>
          </h1>

          <h2
            ref={line2Ref}
            className="text-[12vw] md:text-[5vw] font-serif font-light tracking-tight leading-[1] md:leading-[0.85] mt-2 md:mt-0 will-change-transform"
          >
            {/* LINE 4: "that moves you" */}
            <span className="block md:inline">that moves you</span>
            {/* LINE 5: "forward." */}
            <span className="block md:inline mt-2 md:mt-0">&nbsp;forward.</span>
          </h2>
        </div>
      </div>

      {/* GALLERY INTERFACE REGION */}
      <div className="w-full relative flex items-center justify-center">
        {/* MOBILE SLIDER RUNWAY */}
        <div className="md:hidden w-[85vw] sm:w-[70vw] h-[34vh] relative overflow-visible">
          <div ref={mobileTrackRef} className="absolute top-0 left-0 w-full h-[160%] pointer-events-none z-0" />
          <div className="w-full h-full relative overflow-hidden bg-[#E4E2D9] z-10 rounded-xl">
            {galleryImages.map((img) => (
              <div
                key={`mobile-${img.id}`}
                ref={addToMobileRefs}
                className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity,clip-path]"
              >
                <img 
                  src={img.url} 
                  alt="Responsive active track item" 
                  className="w-full h-full object-cover will-change-transform" 
                />
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