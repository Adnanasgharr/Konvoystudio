"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Button from "./Button";
import BookCallButton from "./BookCallButton";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const heroRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoInnerRef = useRef(null);
  const spacerRef = useRef(null);
  
  const videoElRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Mask tracking hooks
  const videoContainerMobileRef = useRef(null);
  const intersectingTextRef = useRef(null);
  const [mobileMaskStyles, setMobileMaskStyles] = useState({});

  useEffect(() => {
    if (videoElRef.current) {
      videoElRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Tracks intersection to slice the notch out dynamically
  useEffect(() => {
    if (!intersectingTextRef.current || !videoContainerMobileRef.current) return;

    const calculateIntersectionNotch = () => {
      const vBox = videoContainerMobileRef.current.getBoundingClientRect();
      const tBox = intersectingTextRef.current.getBoundingClientRect();

      const overlapWidth = Math.max(0, tBox.right - vBox.left);
      const overlapHeight = Math.max(0, vBox.bottom - tBox.top);

      if (overlapWidth > 0 && overlapHeight > 0) {
        const r = 20; // Corner radius curve smoothness
        
        const maskString = `
          radial-gradient(circle at calc(${overlapWidth}px + ${r}px) calc(100% - ${overlapHeight}px - ${r}px), transparent ${r}px, black calc(${r}px + 0.5px)),
          linear-gradient(black, black),
          linear-gradient(black, black),
          radial-gradient(circle at ${r}px calc(100% - ${overlapHeight}px + ${r}px), black ${r}px, transparent calc(${r}px + 0.5px))
        `;

        setMobileMaskStyles({
          maskImage: maskString,
          WebkitMaskImage: maskString,
          maskPosition: `0 0, calc(${overlapWidth}px + ${r}px) 0, 0 0, 0 0`,
          WebkitMaskPosition: `0 0, calc(${overlapWidth}px + ${r}px) 0, 0 0, 0 0`,
          maskSize: `100% 100%, 100% 100%, 100% calc(100% - ${overlapHeight}px), calc(${overlapWidth}px + ${r}px) calc(${overlapHeight}px + ${r}px)`,
          WebkitMaskSize: `100% 100%, 100% 100%, 100% calc(100% - ${overlapHeight}px), calc(${overlapWidth}px + ${r}px) calc(${overlapHeight}px + ${r}px)`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        });
      } else {
        setMobileMaskStyles({});
      }
    };

    calculateIntersectionNotch();
    const observer = new ResizeObserver(calculateIntersectionNotch);
    observer.observe(videoContainerMobileRef.current);
    observer.observe(intersectingTextRef.current);

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(videoWrapperRef.current, {
        width: "100vw",
        height: "100vh",
        top: 0,
        right: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(videoInnerRef.current, {
        borderRadius: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(videoWrapperRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "bottom 80%",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  });

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div data-hide-contact="true" className="bg-black text-white w-full overflow-hidden">
      
      {/* Semantic Main Container Header Wrapper for SEO Crawlers */}
      <header>
        <div 
          ref={heroRef} 
          className="relative h-dvh w-full flex items-center bg-black px-6 md:px-10 overflow-hidden"
        >
          
          {/* Main Content Container */}
          <div className="w-full z-10 md:grid md:h-2/3 md:grid-cols-[4fr_2fr_2fr]">
            <div className="w-full">
              
              {/* Unified Semantic H1 Element */}
              <h1 className="text-white font-old-school tracking-tight leading-[1] md:leading-tight">
                
                {/* Desktop Layout presentation view */}
                <span className="hidden md:block text-6xl pb-4">
                  Make Your Presence Standout Online
                </span>

                {/* Mobile Screen presentation view */}
                <span className="block md:hidden w-full pb-3">
                  <span className="relative block w-full">
                    
                    {/* Visual Text Block Segments */}
                    <span className="text-[11vw] xs:text-5xl font-old-school flex flex-col pr-[45vw]">
                      <span>Make</span>
                      <span>Your</span>
                      <span className="pt-1">
                        <span 
                          ref={intersectingTextRef} 
                          className="z-20 w-fit inline-block relative bg-black pr-2 rounded-tr-2xl whitespace-nowrap"
                        >
                          Presence
                        </span>
                      </span>
                    </span>

                    {/* Integrated Mobile Video Mask Interaction Viewport */}
                    <span className="absolute right-0 top-0 w-[55vw] aspect-video z-10 flex justify-end pointer-events-none">
                      <span 
                        ref={videoContainerMobileRef}
                        onClick={toggleMute}
                        style={mobileMaskStyles}
                        data-cursor="video"
                        data-video-muted={isMuted.toString()}
                        className="w-full h-full bg-neutral-950 border border-neutral-900 shadow-xl overflow-hidden rounded-2xl rounded-bl-none pointer-events-auto block cursor-none"
                      >
                        <span className="sr-only">Konvoy Studio Showreel - Digital Agency Creative Work Samples</span>
                        <video 
                          ref={videoElRef}
                          src="/cover.mp4" 
                          autoPlay 
                          loop 
                          muted={isMuted} 
                          playsInline 
                          className="h-full w-full object-cover" 
                        />
                      </span>
                    </span>

                  </span>

                  <span className="text-[11vw] xs:text-5xl block pt-1">
                    Standout Online
                  </span>
                </span>
              </h1>

              {/* Keyword-Rich Semantic Summary Paragraph */}
              <p className="text-lg md:text-xl leading-tight font-old-school text-neutral-400 py-8 md:py-0 md:pb-4 max-w-xl md:max-w-none">
                Konvoy Studio delivers custom websites, creative graphic design,
                and high-quality video editing services for startups, businesses,
                and personal brands.
              </p>

              {/* Action Link Blocks */}
              <div className="flex gap-4">
                <BookCallButton aria-label="Book a strategic discovery consultation call" />
                <Button text="Our Work" variant="secondary" aria-label="Browse portfolio and case studies" />
              </div>
            </div>
          </div>

          {/* BACKGROUND BRANDING LOGO VECTOR MARQUEE */}
          <div className="hidden md:block absolute bottom-0 left-0 w-full pointer-events-none select-none">
            <svg viewBox="0 0 1000 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="130" fontWeight="600" letterSpacing="-5">
                KONVOY STUDIO
              </text>
            </svg>
          </div>

          {/* DESKTOP ZOOMING EXPANSION REVEAL RECTANGLE */}
          <div
            ref={videoWrapperRef}
            className="hidden md:block md:fixed md:right-10 z-40"
            style={{ width: "220px", height: "146px", top: "16.66vh" }}
          >
            <div 
              ref={videoInnerRef} 
              onClick={toggleMute}
              data-cursor="video"
              data-video-muted={isMuted.toString()}
              className="h-full w-full overflow-hidden rounded-2xl cursor-none"
            >
              <span className="sr-only">Konvoy Studio Design Showreel Portfolio Video</span>
              <video 
                src="/cover.mp4" 
                autoPlay 
                loop 
                muted={isMuted} 
                playsInline 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>

        </div>
      </header>

      {/* GSAP TRIGGER TRACK SPACER BLOCK */}
      <div ref={spacerRef} className="hidden md:block h-[200vh] bg-black" aria-hidden="true">
        <div className="sticky top-0 h-screen" />
      </div>
    </div>
  );
};

export default Page;