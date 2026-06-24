"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Button from "../ui/Button";
import BookCallButton from "../ui/BookCallButton";

gsap.registerPlugin(ScrollTrigger);

// Row 1: Focuses on core capabilities (Moves Left)
const marqueeRow1 = [
  "Websites", "•", "Video Production", "•", "Graphic Design", "•", "AI Integrations", "•", "E-Commerce", "•", "Landing Pages", "•", "Website Redesign", "•",
  "Websites", "•", "Video Production", "•", "Graphic Design", "•", "AI Integrations", "•", "E-Commerce", "•", "Landing Pages", "•", "Website Redesign", "•"
];

// Row 2: Focuses on stack & philosophy (Moves Right)
const marqueeRow2 = [
  "Next.js", "•", "React", "•", "Tailwind CSS", "•", "GSAP", "•", "WordPress", "•", "WooCommerce", "•", "Figma", "•", "After Effects", "•", "Adobe Illustrator", "•",
  "Next.js", "•", "React", "•", "Tailwind CSS", "•", "GSAP", "•", "WordPress", "•", "WooCommerce", "•", "Figma", "•", "After Effects", "•", "Adobe Illustrator", "•"
];

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
    if (!intersectingTextRef.current || !videoContainerMobileRef.current)
      return;

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
    <div
      data-hide-contact="true"
      className="bg-black text-white w-full overflow-hidden"
    >
      {/* Dynamic Keyframes for Intersecting Counter-Movement Marquees */}
      <style jsx global>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        /* 🎯 Durations increased here to slow down the speed */
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 45s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 55s linear infinite;
        }
      `}</style>

      {/* Semantic Main Container Header Wrapper for SEO Crawlers */}
      <header>
        <div
          ref={heroRef}
          className="relative min-h-svh md:h-screen w-full flex flex-col justify-between bg-black px-6 md:px-10 pt-12 pb-6 md:py-0 overflow-hidden"
        >
          {/* Main Content Container (Centered alignment via standard layout flow) */}
          <div className="w-full z-10 my-auto md:grid md:h-2/3 md:grid-cols-[4fr_2fr_2fr]">
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
                        <span className="sr-only">
                          Konvoy Studio Showreel - Digital Agency Creative Work
                          Samples
                        </span>
                        <video
                          ref={videoElRef}
                          src="/konvoy-studio-cover.mp4"
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
                and high-quality video editing services for startups,
                businesses, and personal brands.
              </p>

              {/* Action Link Blocks */}
              <div className="flex gap-4">
                <BookCallButton aria-label="Book a strategic discovery consultation call" />
                <Button
                  text="Our Work"
                  variant="secondary"
                  aria-label="Browse portfolio and case studies"
                />
              </div>
            </div>
          </div>

          {/* HIGH-IMPACT DOUBLE OVERLAPPED CROSSED MARQUEES */}
          <div className="w-[105vw] -ml-6 relative overflow-hidden bg-neutral-950/40 py-6 md:hidden select-none pointer-events-none flex flex-col gap-3 -rotate-2 mt-auto border-y border-neutral-900/60 z-20">
            {/* Visual Ambient Edge Fades */}
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-black to-transparent z-10" />

            {/* Row 1: Left Movement */}
            <div className="animate-marquee-left flex items-center whitespace-nowrap gap-6">
              {marqueeRow1.map((item, idx) => (
                <span 
                  key={idx} 
                  className={`text-[13px] uppercase font-bold tracking-[0.15em] ${
                    item === "•" ? "text-[#c8f135]" : "text-white"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Row 2: Right Movement */}
            <div className="animate-marquee-right flex items-center whitespace-nowrap gap-6 opacity-50">
              {marqueeRow2.map((item, idx) => (
                <span 
                  key={idx} 
                  className={`text-[11px] uppercase font-semibold tracking-[0.2em] ${
                    item === "•" ? "text-[#c8f135]" : "text-neutral-300"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* BACKGROUND BRANDING LOGO VECTOR MARQUEE */}
          <div className="hidden md:block absolute -bottom-5 left-0 w-full pointer-events-none select-none">
            <svg
              viewBox="0 0 1000 160"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
              preserveAspectRatio="xMinYMid meet"
              aria-hidden="true"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="115"
                fontWeight="600"
                letterSpacing="-2"
                className="font-old-school "
              >
                KONVOY STUDIO
                <tspan
                  dx="10"
                  dy="-20"
                  fontSize="70"
                  fontWeight="400"
                  letterSpacing="0"
                  className="font-montreal"
                >
                  ©
                </tspan>
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
              <span className="sr-only">
                Konvoy Studio Design Showreel Portfolio Video
              </span>
              <video
                src="/konvoy-studio-cover.mp4"
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
      <div
        ref={spacerRef}
        className="hidden md:block h-[200vh] bg-black"
        aria-hidden="true"
      >
        <div className="sticky top-0 h-screen" />
      </div>
    </div>
  );
};

export default Page;