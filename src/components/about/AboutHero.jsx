"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
  },
];

export default function AboutHero() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const starRef = useRef(null);
  const imageRefs = useRef([]);

  imageRefs.current = [];
  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const starElement = starRef.current;
    const items = imageRefs.current;

    if (!container || !line1 || !line2 || !starElement || items.length === 0)
      return;

    const BASE_FLEX = 0.5;
    const BASE_HEIGHT = 60;
    const MAX_FLEX = 4.8;
    const MAX_HEIGHT = 100;

    gsap.set(items, { flexGrow: BASE_FLEX, height: `${BASE_HEIGHT}%` });
    gsap.set(items[0], { flexGrow: MAX_FLEX, height: `${MAX_HEIGHT}%` });

    const line1QuickX = gsap.quickTo(line1, "xPercent", {
      duration: 1.2,
      ease: "power3.out",
    });
    const line2QuickX = gsap.quickTo(line2, "xPercent", {
      duration: 2.2,
      ease: "power4.out",
    });
    const starQuickRotate = gsap.quickTo(starElement, "rotation", {
      duration: 0.7,
      ease: "power1.out",
    });

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

      starQuickRotate((e.clientX + e.clientY) * 0.18);

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(e.clientX - itemCenterX);

        const trackingRadius = 240;
        const isDirectlyOver =
          e.clientX >= rect.left && e.clientX <= rect.right;

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

      items.forEach((item, idx) => {
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
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-[#FDFCF7] text-[#0F1011] flex flex-col justify-end p-6 md:p-10 pb-16 overflow-hidden select-none"
    >
      {/* TYPOGRAPHY AREA */}
      <div className="w-full max-w-9xl mx-auto text-center mb-10">
        <div className="flex flex-col items-center justify-center text-center overflow-visible space-y-0">
          <h1
            ref={line1Ref}
            className="text-[7.5vw] md:text-[5vw] font-serif font-light tracking-tight leading-[0.85] flex flex-wrap items-center justify-center gap-x-[2.2vw] whitespace-nowrap will-change-transform"
          >
            <span>A motion-first</span>
            <span
              ref={starRef}
              className="inline-block w-[6vw] h-[6vw] min-w-[40px] max-w-[90px] text-[#0F1011] shrink-0 fill-current will-change-transform translate-y-[0.4vw]"
            >
              <svg viewBox="0 0 480 480" className="w-full h-full">
                <path
                  d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z"
                  transform="matrix(0.7744 -1.844 1.1363 0.4772 176.4 213.3)"
                />
                <path
                  d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z"
                  transform="matrix(0.6699 1.8845 -1.8993 0.6752 346.3 202.2)"
                />
                <path
                  d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z"
                  transform="matrix(-1.6919 1.0665 -0.5418 -0.8595 270.3 288.1)"
                />
                <path
                  d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z"
                  transform="matrix(1.823 -0.8227 0.6359 1.4092 204.4 161.1)"
                />
                <path
                  d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z"
                  transform="matrix(1.7251 1.012 -0.4942 0.8424 267.7 192.8)"
                />
                <path
                  d="M-20.4 56C-20.4 56 20.4 56 20.4 56C20.4 56 8.1-56 8.1-56C8.1-56 -8.2-56 -8.2-56C-8.2-56 -20.4 56 -20.4 56z"
                  transform="matrix(-1.7289 -1.0054 0.9496 -1.6329 186.8 331.4)"
                />
                <path
                  d="M40 0C40 0 40 0 40 0C40 22.1 22.1 40 0 40C0 40 0 40 0 40C-22.1 40 -40 22.1 -40 0C-40 0 -40 0 -40 0C-40 -22.1 -22.1 -40 0 -40C0 -40 0 -40 0 -40C22.1 -40 40 -22.1 40 0z"
                  transform="matrix(1 0 0 1 240 240)"
                />
              </svg>
            </span>
            <span className="font-serif">digital studio</span>
          </h1>

          <h2
            ref={line2Ref}
            className="text-[7.5vw] md:text-[5vw] font-serif font-light tracking-tight leading-[0.85] mt-0 whitespace-nowrap will-change-transform"
          >
            that moves you forward.
          </h2>
        </div>
      </div>

      {/* FULL-WIDTH RESPONSIVE RECTANGULAR TRACK */}
      <div className="w-full">
        <div className="flex items-end gap-3 md:gap-5 w-full h-[36vh] max-h-[420px] justify-center">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              ref={addToRefs}
              className="h-full relative bg-[#E4E2D9] transform origin-bottom overflow-hidden rounded-none min-w-[60px] will-change-[flex-grow,height]"
            >
              <img
                src={img.url}
                alt="Bespoke studio layout rectangular asset"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}