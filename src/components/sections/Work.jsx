"use client";
import React, { useRef, useState, useEffect } from "react";
import Button from "../ui/Button";
import ProjectCard from "../cards/ProjectCard";
import Lightbox from "../ui/Lightbox";
import { studioProjects } from "@/content/portfolio/data.js";

export function Work() {
  const sectionRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isBlackBg, setIsBlackBg] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);

  const featured = studioProjects.filter(p => p.featured);
  
  // High-Fidelity Dynamic Column Distributing Arrays
  const leftColumnFeatured = featured.filter((_, i) => i % 2 === 0);
  const rightColumnFeatured = featured.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsBlackBg(true);
        else if (entry.boundingClientRect.top > 0) setIsBlackBg(false);
      },
      { root: null, threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleGlobalClick = (e) => {
    const card = e.target.closest('[data-cursor]');
    if (!card) return;

    const cursorMode = card.getAttribute('data-cursor');

    if (cursorMode === 'video') {
      setIsVideoMuted((prev) => !prev);
    } 
    else if (cursorMode === 'website') {
      const targetUrl = card.getAttribute('data-url');
      if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } 
    else if (cursorMode === 'brand') {
      const rawData = card.getAttribute('data-gallery');
      if (rawData) setActiveGallery(JSON.parse(rawData));
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`w-full min-h-screen relative overflow-hidden transition-colors duration-1000 ease-out ${
          isBlackBg ? "bg-black" : "bg-[#F1F1F1]"
        }`}
        onClick={handleGlobalClick}
      >
        <div className="mx-auto pt-12 xl:pt-20 max-w-[1600px] px-4 sm:px-6 xl:px-16">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 xl:gap-y-12 xl:gap-x-12 items-start mb-16 sm:mb-20 xl:mb-28">
            <div className="xl:col-span-6 flex flex-col">
              <h2 className="text-white text-5xl sm:text-6xl xl:text-8xl font-black leading-[0.9] uppercase tracking-tight">
                <span className="block font-abc-arizona font-normal normal-case">Featured</span>
                Projects.
              </h2>
            </div>
            <div className="hidden xl:block xl:col-span-1" />
            <div className="xl:col-span-5 flex flex-col gap-4 sm:gap-5">
              <h3 className="text-white text-2xl sm:text-2xl xl:text-3xl font-old-school font-bold leading-tight tracking-tight">
                Work we're proud to <br /> put our name on
              </h3>
              <p className="text-neutral-400 text-lg md:text-xl leading-tight font-old-school">
                A curated selection of featured projects, each meticulously crafted with passion and intention.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-0">
            {/* Left Masonry Column */}
            <div className="col-span-1 flex flex-col gap-8 md:gap-10 xl:gap-12">
              {leftColumnFeatured.map((project) => (
                <ProjectCard key={`feat-l-${project.id}`} project={project} isVideoMuted={isVideoMuted} isBlackBg={isBlackBg} />
              ))}
            </div>

            {/* Right Masonry Column (With Stagger Offset Guard) */}
            <div className={`col-span-1 flex flex-col gap-8 md:gap-10 xl:gap-12 ${
              rightColumnFeatured.length > 0 ? "mt-12 md:mt-36 xl:mt-32" : ""
            }`}>
              {rightColumnFeatured.map((project) => (
                <ProjectCard key={`feat-r-${project.id}`} project={project} isVideoMuted={isVideoMuted} isBlackBg={isBlackBg} />
              ))}
            </div>

            {/* Dynamic Footing Action Link block */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-start gap-4 sm:gap-6 my-14 md:mt-16 mix-blend-difference">
              <h3 className="text-white text-3xl sm:text-4xl xl:text-5xl font-old-school leading-[1.1] tracking-tight">
                Like what<br />you see?
              </h3>
              <Button text="Let's Talk" variant="primary" aria-label="Contact Konvoy Studio" />
            </div>
          </div>
        </div>
      </section>

      {activeGallery && (
        <Lightbox images={activeGallery} onClose={() => setActiveGallery(null)} />
      )}
    </>
  );
}

export default Work;