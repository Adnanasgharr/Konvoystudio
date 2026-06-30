"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  { id: 1, url: "/images/gallery/about konvoy (1).jpg" },
  { id: 2, url: "/images/gallery/about konvoy (2).jpg" },
  { id: 3, url: "/images/gallery/about konvoy (7).jpg" },
  { id: 4, url: "/images/gallery/about konvoy (4).jpg" },
  { id: 5, url: "/images/gallery/about konvoy (5).jpg" },
];

export default function AboutHero() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const starRef = useRef(null);
  
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

    if (!container || !line1 || !line2 || !starWrapper) return;

    const actualSvg = starWrapper.querySelector("svg");
    if (!actualSvg) return;

    let mm = gsap.matchMedia();

    mm.add({
      isMobileAndTablet: "(max-width: 1279px)",
      isDesktop: "(min-width: 1280px)"
    }, (context) => {
      const { isMobileAndTablet, isDesktop } = context.conditions;
      gsap.set(actualSvg, { transformOrigin: "50% 50%" });

      // ==========================================
      // 📱 MOBILE & TABLET RUN ENGINE
      // ==========================================
      if (isMobileAndTablet && mobileItems.length > 0) {
        mobileItems.forEach((item, index) => {
          const innerImg = item.querySelector("img");
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0,
            clipPath: index === 0 ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            zIndex: mobileItems.length - index
          });
          if (innerImg) {
            gsap.set(innerImg, { scale: index === 0 ? 1 : 1.2, yPercent: index === 0 ? 0 : -10 });
          }
        });

        // ⚡ SPEED CONTROL FOR MOBILE SCROLL:
        // By changing `end` from "bottom top" to "center top", all images switch twice as fast.
        // If you want it even faster, try "top+=300px top" or "top+=40% top"
        const sliderTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "center top", 
            scrub: 0.5, // Reduced from 1.2 for snappier, more instantaneous finger tracking
            invalidateOnRefresh: true,
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
              opacity: 0,
              duration: 1,
              ease: "power2.inOut"
            }, stepLabel)
            .to(currentImg, {
              yPercent: 10,
              duration: 1,
              ease: "power2.inOut"
            }, stepLabel)
            .to(nextItem, {
              opacity: 1,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1,
              ease: "power2.inOut"
            }, stepLabel)
            .to(nextImg, {
              scale: 1,
              yPercent: 0,
              duration: 1,
              ease: "power2.inOut"
            }, stepLabel);
        });

        gsap.to(actualSvg, {
          rotation: 720,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top", 
            end: "center top", // Matched with slider timeline end
            scrub: true,         
          }
        });
      }

      // ==========================================
      // 🖥️ DESKTOP INTERACTIVE MATRIX ENGINE
      // ==========================================
      if (isDesktop && desktopItems.length > 0) {
        const BASE_FLEX = 0.5;
        const BASE_HEIGHT = 60;
        const MAX_FLEX = 4.8;
        const MAX_HEIGHT = 100;
        const SENSITIVITY = 2.5; 

        gsap.set(desktopItems, { flexGrow: BASE_FLEX, height: `${BASE_HEIGHT}%` });
        gsap.set(desktopItems[0], { flexGrow: MAX_FLEX, height: `${MAX_HEIGHT}%` });

        const line1QuickX = gsap.quickTo(line1, "x", { duration: 0.8, ease: "power2.out" });
        const line2QuickX = gsap.quickTo(line2, "x", { duration: 1.4, ease: "power3.out" });
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
          const normalizedProgress = (progress - 0.5) * 2; 

          const line1W = line1.getBoundingClientRect().width || 1;
          const line2W = line2.getBoundingClientRect().width || 1;

          const maxLeftRight1 = Math.max(0, (window.innerWidth - line1W) / 2);
          const maxLeftRight2 = Math.max(0, (window.innerWidth - line2W) / 2);

          let targetX1 = normalizedProgress * maxLeftRight1 * SENSITIVITY;
          let targetX2 = normalizedProgress * maxLeftRight2 * SENSITIVITY;

          targetX1 = Math.max(-maxLeftRight1, Math.min(maxLeftRight1, targetX1));
          targetX2 = Math.max(-maxLeftRight2, Math.min(maxLeftRight2, targetX2));

          line1QuickX(targetX1);
          line2QuickX(targetX2);

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
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-svh xl:h-screen bg-[#F1F1F1] text-[#0F1011] flex flex-col justify-between xl:justify-end p-4 sm:p-6 md:p-8 xl:p-10 overflow-hidden select-none"
    >
      <h1 className="sr-only">A motion-first digital studio that moves you forward.</h1>

      <div className="hidden max-xl:block h-6 sm:h-8" />

      {/* TYPOGRAPHY AREA */}
      <div className="w-full text-center my-auto xl:my-0 xl:mb-12 xl:mx-auto" aria-hidden="true">
        <div className="relative flex flex-col items-center justify-center text-center overflow-visible w-full">
          
          <div
            ref={line1Ref}
            className="text-[11vw] sm:text-[9vw] md:text-[8vw] xl:text-[5vw] font-serif font-light tracking-tight leading-[1.05] xl:leading-[0.85] flex flex-col xl:flex-row items-center justify-center will-change-transform whitespace-nowrap"
          >
            <span
              ref={starRef}
              className="order-1 xl:order-2 inline-flex items-center justify-center w-[15vw] h-[15vw] sm:w-[11vw] sm:h-[11vw] md:w-[9vw] md:h-[9vw] xl:w-[6vw] xl:h-[6vw] min-w-[36px] max-w-[90px] text-[#0F1011] shrink-0 mb-4 xl:mb-0 xl:mx-[2.2vw] will-change-transform translate-y-0 xl:translate-y-[0.4vw]"
            >
              <svg 
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 378.56 359.64" 
                className="w-full h-full fill-current will-change-transform"
              >
                <polygon points="237.64,172.59 315.2,137.36 291.08,95.58 191.55,161.2 207.2,134.33 215.47,49.54 167.22,49.54 174.29,168.54 158.84,141.55 89.55,92 65.43,133.78 172.02,187.16 140.92,187.05 63.36,222.28 87.48,264.06 187.01,198.44 171.36,225.31 163.09,310.1 211.34,310.1 204.27,191.1 219.72,218.09 289.01,267.64 313.13,225.86 206.54,172.48 "/>
              </svg>
            </span>

            <span className="order-2 xl:order-1 block">A motion-first</span>
            <span className="order-3 xl:order-3 block font-serif mt-1 xl:mt-0">&nbsp;digital studio</span>
          </div>

          <div
            ref={line2Ref}
            className="text-[11vw] sm:text-[9vw] md:text-[8vw] xl:text-[5vw] font-serif font-light tracking-tight leading-[1.05] xl:leading-[0.85] mt-1 xl:mt-0 will-change-transform whitespace-nowrap"
          >
            <span className="block xl:inline">that moves you</span>
            <span className="block xl:inline mt-1 xl:mt-0">&nbsp;forward.</span>
          </div>
        </div>
      </div>

      {/* GALLERY INTERFACE REGION */}
      <div className="w-full relative flex items-center justify-center">
        {/* MOBILE SLIDER */}
        <div className="xl:hidden w-full h-[36vh] sm:h-[40vh] md:h-[46vh] relative overflow-hidden rounded-md sm:rounded-lg bg-[#E4E2D9]">
          {galleryImages.map((img, i) => (
            <div
              key={`mobile-${img.id}`}
              ref={addToMobileRefs}
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity,clip-path]"
            >
              <Image 
                src={img.url} 
                alt="Responsive active track item" 
                width={1200}
                height={1600}
                priority={i === 0}
                className="w-full h-full object-cover will-change-transform" 
              />
            </div>
          ))}
        </div>

        {/* DESKTOP HOVER ASSY */}
        <div className="hidden xl:flex items-end gap-5 w-full h-[36vh] max-h-[420px] justify-center">
          {galleryImages.map((img, i) => (
            <div
              key={`desktop-${img.id}`}
              ref={addToDesktopRefs}
              className="h-full relative bg-[#E4E2D9] transform origin-bottom overflow-hidden rounded-none min-w-[60px] will-change-[flex-grow,height]"
            >
              <Image 
                src={img.url} 
                alt="Multi-column grid element" 
                width={500}
                height={700}
                priority={i === 0}
                className="w-full h-full object-cover select-none pointer-events-none" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}