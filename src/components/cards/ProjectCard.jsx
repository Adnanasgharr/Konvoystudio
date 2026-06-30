"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export const ProjectCard = ({ project, isVideoMuted, isBlackBg = true }) => {
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
      if (window.innerWidth < 1280) {
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

  const handleMouseEnter = () => {
    if (window.innerWidth < 1280) return;
    gsap.killTweensOf([notchMaskRef.current, tagsRef.current]);
    gsap.to(notchMaskRef.current, { scaleX: 1, scaleY: 1, duration: 0.35, ease: "power2.out" });
    gsap.to(tagsRef.current, { opacity: 1, y: 0, duration: 0.35, delay: 0.05, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1280) return;
    gsap.killTweensOf([notchMaskRef.current, tagsRef.current]);
    gsap.to(notchMaskRef.current, { scaleX: 0, scaleY: 0, duration: 0.3, ease: "power2.inOut" });
    gsap.to(tagsRef.current, { opacity: 0, y: -10, duration: 0.25, ease: "power2.inOut" });
  };

  if (!project) return null;

  // Intercept category properties to assign correct unified custom cursor triggers
  const getCursorType = (slug, hasVideo) => {
    if (hasVideo) return "video";
    if (slug === "websites" || slug === "ai-integrations") return "website";
    if (slug === "brand-identity") return "brand";
    return "default";
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={getCursorType(project.serviceSlug, !!project.video)}
      data-video-muted={project.video ? (isVideoMuted ? "true" : "false") : undefined}
      data-url={project.projectUrl || ""}
      data-gallery={project.gallery ? JSON.stringify(project.gallery) : ""}
      className="group w-full flex flex-col relative cursor-none"
    >
      <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[420px] mb-4 bg-transparent rounded-[1.5rem]">
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[1.5rem] z-10 bg-neutral-900/10">
          {project.video ? (
            <video
              ref={videoElementRef}
              src={project.video}
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 xl:group-hover:scale-105"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 xl:group-hover:scale-105"
            />
          )}
        </div>

        <div
          ref={notchMaskRef}
          className={`absolute -top-[4px] -right-[4px] pt-2 pr-1 pl-3 pb-3 flex items-center gap-2 pointer-events-none z-20 origin-top-right transition-colors duration-1000 max-w-[calc(100%-12px)] rounded-bl-[1.5rem] ${
            isBlackBg ? "bg-black" : "bg-[#F1F1F1]"
          }`}
        >
          <div className={`absolute left-[-16px] top-[4px] w-4 h-4 rounded-tr-[1rem] transition-colors duration-1000 ${
            isBlackBg ? "shadow-[4px_-4px_0_4px_#000000]" : "shadow-[4px_-4px_0_4px_#F1F1F1]"
          }`} />
          <div className={`absolute bottom-[-16px] right-[4px] w-4 h-4 rounded-tr-[1rem] transition-colors duration-1000 ${
            isBlackBg ? "shadow-[4px_-4px_0_4px_#000000]" : "shadow-[4px_-4px_0_4px_#F1F1F1]"
          }`} />

          <div ref={tagsRef} className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pointer-events-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#1c1c1e] text-white text-[10px] xl:text-xs px-2.5 md:px-4 py-1 md:py-1.5 rounded-full font-medium tracking-wide shadow-sm flex items-center justify-center whitespace-nowrap h-[26px] xl:h-[32px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm mb-2 font-mono mix-blend-difference">
        <span>{project.year}</span>
        <span>•</span>
        <span>{project.client}</span>
      </div>
      <h3 className="text-white text-xl sm:text-2xl xl:text-3xl font-old-school leading-tight xl:group-hover:text-zinc-400 transition-colors duration-300 mix-blend-difference">
        {project.title}
      </h3>
    </div>
  );
};

export default ProjectCard;