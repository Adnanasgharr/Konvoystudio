"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookCallButton from "../ui/BookCallButton";

export function Footer() {
  const footerRef = useRef(null);
  const movingLineRef = useRef(null);

  useGSAP(
    () => {
      // Safely register plugin within the client-side mounting lifecycle hook context
      gsap.registerPlugin(ScrollTrigger);

      if (!footerRef.current || !movingLineRef.current) return;

      gsap.to(movingLineRef.current, {
        x: "10vw",
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full bg-[#f1f1f1] text-white flex flex-col justify-between px-4 sm:px-8 md:px-10 lg:px-16 pt-12 lg:pt-12 pb-[12vw] overflow-hidden"
    >
      {/* 1. TOP BLOCK: Action Heading & Direct Access Channel */}
    <div className="bg-black p-3 md:py-20 pt-12 w-full z-10 flex items-center justify-center flex-col relative">
  {/* CENTER CONTENT */}
  <div className="lg:col-span-7 h-full xl:col-span-8 flex flex-col items-center text-center">
    <p className="text-xs sm:text-sm font-old-school tracking-widest text-neutral-300 mb-4">
      (Need an unfair advantage?)
    </p>
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight leading-[1.05] uppercase flex flex-col items-center">
      <span className="block">Let's build</span>
      <span className="block">an experience</span>
      <span className="block">That moves</span>

      <span
        ref={movingLineRef}
        className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-5 will-change-transform"
      >
        <svg
          className="w-8 h-8 md:w-20 md:h-20 fill-current rotate-45"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          aria-hidden="true"
        >
          <path d="M328 96h24v288h-48V177.9L81 401l-17 17-33.9-34 17-17 223-223H64V96h264z"></path>
        </svg>
        People
      </span>
    </h2>
  </div>

  <div className="mt-8 md:mt-10 mb-12 md:mb-0">
    <BookCallButton
      text="Tell us your story"
      ariaLabel="Schedule a discovery call with our consulting team"
    />
  </div>

  {/* RESPONSIVE INQUIRY SECTION */}
  <div className="md:absolute md:right-0 md:bottom-0 flex items-center md:items-end flex-col pt-6 md:pt-0 pb-6 md:pb-10 text-[#A29E9A] px-4 md:px-10 text-center md:text-right">
    <p className="font-semibold uppercase text-xs sm:text-sm md:text-md">
      For further inquiries
    </p>
    <div className="flex items-center justify-center md:justify-end gap-2 mt-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 sm:h-4 flex-shrink-0"
      >
        <path d="M4.99989 13.9999L4.99976 5L6.99976 4.99997L6.99986 11.9999L17.1717 12L13.222 8.05024L14.6362 6.63603L21.0001 13L14.6362 19.364L13.222 17.9497L17.1717 14L4.99989 13.9999Z"></path>
      </svg>

      <div className="flex items-center gap-2 font-bold font-montmono text-xs sm:text-sm md:text-base">
        <a
          href="mailto:hello@konvoystudio.com"
          className="hover:text-white hover:underline transition-colors duration-200 break-all"
        >
          hello@konvoystudio.com
        </a>
      </div>
    </div>
  </div>
</div>

      {/* 2. MIDDLE BLOCK: Categorized Directories & System Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-6 w-full mt-16 lg:mt-auto z-10 pb-12 border-t border-neutral-900 pt-12">
        {/* Navigation Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 font-old-school">
          <span className="text-[12px] tracking-[0.2em] text-neutral-900 uppercase">
            Navigation
          </span>
          <ul className="flex flex-col gap-2 text-sm text-neutral-900 items-start">
            <li>
              <a
                href="/"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>Home</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>About</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>Services</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
            <li>
              <a
                href="/work"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>Our Work</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
          </ul>
        </div>

        {/* Social Framework Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 font-old-school">
          <span className="text-[12px] tracking-[0.2em] text-neutral-900 uppercase">
            Socials
          </span>
          <ul className="flex flex-col gap-2 text-sm text-neutral-900 items-start">
            <li>
              <a
                href="https://www.instagram.com/konvoystudio"
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>Instagram</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>LinkedIn</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>X / Twitter</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center py-0.5 group cursor-pointer text-neutral-700 hover:text-neutral-950 transition-colors duration-300"
              >
                <span>Dribbble</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            </li>
          </ul>
        </div>

        {/* Studio Coordinates Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 font-old-school">
          <span className="text-[12px] tracking-[0.2em] text-neutral-900 uppercase">
            Location
          </span>
          <p className="text-sm text-neutral-900 leading-relaxed font-old-school">
            Digital Agency <br />
            Operating Globally <br />
            <span className="text-neutral-600">Based in PK</span>
          </p>
        </div>

        {/* System Time / Rights Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 md:items-start lg:items-end lg:text-right font-old-school">
          <span className="text-[12px] tracking-[0.2em] text-neutral-900 uppercase">
            Copyright
          </span>
          <p className="text-sm text-neutral-900 leading-relaxed mt-auto">
            &copy; {new Date().getFullYear()} Konvoy Studio. <br />
            All rights reserved.
          </p>
        </div>
      </div>

      {/* BACKGROUND BRANDING LOGO VECTOR MARQUEE */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0 overflow-hidden select-none -translate-x-[1%]">
        <svg
          viewBox="0 0 1000 160"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="xMinYMax meet"
        >
          <text
            x="50%"
            y="200"
            dominantBaseline="auto"
            textAnchor="middle"
            fill="#121212"
            fontSize="234"
            fontWeight="900"
            letterSpacing="-8"
            className="font-old-school"
          >
            KONVOY
          </text>
        </svg>
      </div>
    </footer>
  );
}

export default Footer;