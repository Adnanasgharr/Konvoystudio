"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/cards/ProjectCard";
import Lightbox from "@/components/ui/Lightbox";
import { studioProjects, filterCategories } from "@/content/portfolio/data.js";

export default function DedicatedWorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeGallery, setActiveGallery] = useState(null);
  const gridContainerRef = useRef(null);

  const getProjectCount = (slug) => {
    if (slug === "all") return studioProjects.length;
    return studioProjects.filter((p) => p.serviceSlug === slug).length;
  };

  const filteredProjects = activeFilter === "all"
    ? studioProjects
    : studioProjects.filter((p) => p.serviceSlug === activeFilter);

  const leftColumnProjects = filteredProjects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = filteredProjects.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cards = gridContainerRef.current.querySelectorAll('[data-cursor]');
    if (cards.length === 0) return;

    gsap.fromTo(cards, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", clearProps: "all" }
    );
  }, [activeFilter]);

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
        className="w-full min-h-screen bg-black text-white py-16 sm:py-24 xl:py-32 relative overflow-hidden"
        onClick={handleGlobalClick}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 xl:px-16">
          
          <div className="w-full flex flex-col xl:flex-row xl:items-end justify-between gap-6 xl:gap-10 mt-12 mb-16 sm:mb-24">
            <div className="flex items-center gap-3 shrink-0 pb-1 xl:pb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Our Work</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 max-w-5xl">
              {filterCategories.map((category) => {
                const isActive = activeFilter === category.slug;
                return (
                  <button
                    key={category.slug}
                    onClick={() => setActiveFilter(category.slug)}
                    className="group flex items-baseline gap-1.5 select-none focus:outline-none cursor-pointer"
                  >
                    <span className={`text-2xl sm:text-4xl xl:text-5xl font-old-school tracking-tight transition-all duration-300 ${
                      isActive 
                        ? "text-white xl:underline decoration-emerald-400 decoration-2 underline-offset-8" 
                        : "text-neutral-600 hover:text-neutral-300"
                    }`}>
                      {category.name.toLowerCase()}
                    </span>
                    <span className={`font-mono text-xs sm:text-sm transition-colors duration-300 ${
                      isActive ? "text-emerald-400 font-bold" : "text-neutral-700 group-hover:text-neutral-500"
                    }`}>
                      {getProjectCount(category.slug)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full" ref={gridContainerRef}>
            <div className="flex flex-col gap-12 sm:gap-16 md:hidden">
              {filteredProjects.map((project) => (
                <ProjectCard key={`dir-mob-${project.id}`} project={project} isVideoMuted={isVideoMuted} isBlackBg={true} />
              ))}
            </div>

            <div className="hidden md:grid grid-cols-12 md:gap-x-6 lg:gap-x-10 gap-y-0">
              <div className="col-span-6 flex flex-col gap-12 sm:gap-16 xl:gap-24">
                {leftColumnProjects.map((project) => (
                  <ProjectCard key={`dir-desk-l-${project.id}`} project={project} isVideoMuted={isVideoMuted} isBlackBg={true} />
                ))}
              </div>

              <div className={`col-span-6 flex flex-col gap-12 sm:gap-16 xl:gap-24 ${
                rightColumnProjects.length > 0 ? "md:mt-28 lg:mt-36 xl:mt-44" : ""
              }`}>
                {rightColumnProjects.map((project) => (
                  <ProjectCard key={`dir-desk-r-${project.id}`} project={project} isVideoMuted={isVideoMuted} isBlackBg={true} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-0 md:gap-x-8">
              <div className="col-span-12 flex flex-col items-start gap-5 sm:gap-6 mt-16 sm:mt-24 md:mt-32 xl:mt-40 mix-blend-difference">
                <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-old-school leading-[1.1] tracking-tight max-w-2xl">
                  Ready to construct<br />your system?
                </h1>
                <div className="pt-2">
                  <Button text="Let's Talk" variant="primary" aria-label="Contact us" />  
                </div>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 && (
            <div className="w-full py-32 flex flex-col items-center justify-center text-center">
              <span className="text-4xl text-neutral-600 mb-4">⚙️</span>
              <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
                No custom production models deployed for this specification.
              </p>
            </div>
          )}

        </div>
      </section>

      {activeGallery && (
        <Lightbox images={activeGallery} onClose={() => setActiveGallery(null)} />
      )}
    </>
  );
}