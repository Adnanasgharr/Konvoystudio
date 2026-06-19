"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Button from "@/components/ui/Button";

// Import cleanly from your new local data module
import { studioProjects, filterCategories } from "@/content/portfolio/data.js";

const ProjectCard = ({ project, isVideoMuted }) => {
  const cardRef = useRef(null);
  const notchMaskRef = useRef(null);
  const tagsRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        gsap.set(notchMaskRef.current, { scaleX: 1, scaleY: 1 });
        gsap.set(tagsRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.set(notchMaskRef.current, { scaleX: 0, scaleY: 0 });
        gsap.set(tagsRef.current, { opacity: 0, y: -10 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!project) return null;

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;

    gsap.to(notchMaskRef.current, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(tagsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      delay: 0.05,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;

    gsap.to(notchMaskRef.current, {
      scaleX: 0,
      scaleY: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(tagsRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={project.video ? "video" : "website"}
      data-video-muted={isVideoMuted}
      className="group w-full flex flex-col relative"
    >
      <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] mb-4 bg-transparent rounded-[1.5rem]">
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[1.5rem] z-10">
          {project.video ? (
            <video
              ref={videoElementRef}
              src={project.video}
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 md:group-hover:scale-105"
            />
          )}
        </div>

        {/* Clean container background token fallback (#000000 matches your page bg) */}
        <div
          ref={notchMaskRef}
          className="absolute -top-[4px] -right-[4px] pt-2 pr-1 pl-3 pb-3 flex items-center gap-2 pointer-events-none z-20 origin-top-right transition-colors duration-1000 max-w-[calc(100%-12px)] bg-black rounded-bl-[1.5rem]"
        >
          <div className="absolute left-[-16px] top-[4px] w-4 h-4 rounded-tr-[1rem] shadow-[4px_-4px_0_4px_#000000] transition-colors duration-1000" />
          <div className="absolute bottom-[-16px] right-[4px] w-4 h-4 rounded-tr-[1rem] shadow-[4px_-4px_0_4px_#000000] transition-colors duration-1000" />

          <div ref={tagsRef} className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#1c1c1e] text-white text-[10px] md:text-xs px-2.5 md:px-4 py-1 md:py-1.5 rounded-full font-medium tracking-wide shadow-sm flex items-center justify-center whitespace-nowrap h-[26px] md:h-[32px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm mb-2 mix-blend-difference">
        <span>{project.year}</span>
        <span>•</span>
        <span>{project.client}</span>
      </div>
      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-old-school leading-tight md:group-hover:text-zinc-400 transition-colors duration-300 mix-blend-difference">
        {project.title}
      </h3>
    </div>
  );
};

export default function DedicatedWorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const getProjectCount = (slug) => {
    if (slug === "all") return studioProjects.length;
    return studioProjects.filter((p) => p.serviceSlug === slug).length;
  };

  const filteredProjects = activeFilter === "all"
    ? studioProjects
    : studioProjects.filter((p) => p.serviceSlug === activeFilter);

  const leftColumnProjects = filteredProjects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = filteredProjects.filter((_, i) => i % 2 !== 0);

  const handleGlobalClick = (e) => {
    const activeCard = e.target.closest('[data-cursor="video"]');
    if (activeCard) {
      setIsVideoMuted((prev) => !prev);
    }
  };

  return (
    <section 
      className="w-full min-h-screen bg-black text-white py-16 sm:py-24 lg:py-36 relative overflow-hidden"
      onClick={handleGlobalClick}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16">
        
        <div className="w-full flex flex-col gap-10 mb-20 md:mb-28">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Our Work</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-4 max-w-5xl">
            {filterCategories.map((category) => {
              const isActive = activeFilter === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => setActiveFilter(category.slug)}
                  className="group flex items-baseline gap-2 select-none focus:outline-none"
                >
                  <span className={`text-3xl sm:text-5xl md:text-5xl font-bold tracking-tight transform transition-all duration-300 ${
                    isActive 
                      ? "text-white underline decoration-emerald-400 decoration-2 underline-offset-8 scale-102" 
                      : "text-neutral-600 hover:text-neutral-300"
                  }`}>
                    {category.name.toLowerCase()}
                  </span>
                  <span className={`font-mono text-xs sm:text-sm ${
                    isActive ? "text-emerald-400 font-bold" : "text-neutral-700 group-hover:text-neutral-500"
                  }`}>
                    {getProjectCount(category.slug)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-0 sm:gap-x-6 md:gap-x-8 gap-y-10 sm:gap-y-12 md:gap-y-16 mb-24 md:mb-32">
          
          <div className="col-span-12 md:col-span-6 flex flex-col gap-10 sm:gap-12 md:gap-16">
            {leftColumnProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isVideoMuted={isVideoMuted} 
              />
            ))}
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-10 sm:gap-12 md:gap-16 md:mt-32">
            {rightColumnProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isVideoMuted={isVideoMuted} 
              />
            ))}
          </div>
          
          <div className="col-span-12 md:col-start-3 md:col-span-6 flex flex-col items-start gap-4 sm:gap-6 mt-12 mix-blend-difference">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-old-school leading-[1.1] tracking-tight">
              Ready to construct<br />your system?
            </h1>
            <Button 
              text="Let's Talk" 
              variant="primary" 
              aria-label="Contact us" 
            />  
          </div>
        </div>

        {filteredProjects.length === 0 && (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-4xl text-neutral-700">⚙️</span>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              No custom production models deployed for this specification layer yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}