"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactButton = () => {
  const svgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  
  const rotationData = useRef({
    base: 0,       
    modifier: 0,   
    scrollScale: 1 
  });

  useEffect(() => {
    const homeSection = document.querySelector('[data-hide-contact="true"]');
    if (!homeSection) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svgNode = svgRef.current;
    if (!svgNode) return;

    const updateRotation = () => {
      rotationData.current.base += 0.3 * rotationData.current.scrollScale;
      const finalRotation = rotationData.current.base + rotationData.current.modifier;
      
      gsap.set(svgNode, {
        rotation: finalRotation,
        transformOrigin: "center center"
      });
    };

    gsap.ticker.add(updateRotation);

    const scrollTracker = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (velocity !== 0) {
          const modifier = velocity / 120;
          const targetScale = modifier > 0 ? 1 + modifier : modifier;

          gsap.to(rotationData.current, {
            scrollScale: targetScale,
            duration: 0.2,
            overwrite: "auto",
          });

          gsap.to(rotationData.current, {
            scrollScale: 1,
            duration: 0.5,
            delay: 0.05,
            overwrite: "auto",
          });
        }
      },
    });

    return () => {
      gsap.ticker.remove(updateRotation);
      scrollTracker.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(rotationData.current, {
      modifier: "+=180",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(rotationData.current, {
      modifier: "-=180",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <a
      href="#contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed bottom-6 right-6 z-[90] w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#c8f135] flex items-center justify-center shadow-xl select-none group transition-all duration-500 active:scale-95 cursor-pointer
        ${visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"}
      `}
    >
      <svg
        ref={svgRef}
        className="absolute w-full h-full p-1 overflow-visible"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="textCirclePath"
            d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
          />
        </defs>
        
        <text className="fill-black text-[14px] font-bold uppercase tracking-[0.055em]">
          <textPath href="#textCirclePath" startOffset="0%">
            • Let's talk branding • Let's talk website • Let's talk Video&nbsp;
          </textPath>
        </text>
      </svg>

      <div className="relative flex gap-0.5 items-center justify-center pointer-events-none transform group-hover:scale-105 transition-transform duration-300">
        <div className="w-5 h-9 bg-white border-[2px] border-black rounded-full flex items-end justify-center pb-1 relative overflow-hidden shadow-sm">
          <div className="w-2.5 h-2.5 bg-black rounded-full mb-0.5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
        </div>
        <div className="w-5 h-9 bg-white border-[2px] border-black rounded-full flex items-end justify-center pb-1 relative overflow-hidden shadow-sm">
          <div className="w-2.5 h-2.5 bg-black rounded-full mb-0.5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
        </div>
      </div>
    </a>
  );
};

export default ContactButton;