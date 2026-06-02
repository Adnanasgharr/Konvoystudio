"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
// Swapped out ElasticPillButton for your high-end CreativeButton component
import CreativeButton from "./CreativeButton";

const projects = [
  {
    year: "2024",
    client: "Neon Labs",
    title: "Building a bold brand identity from scratch",
    tags: ["Branding", "Website Element Creation"], 
    image: "/images/brand.jpg", 
  },
  {
    year: "2024",
    client: "Vertex Studio",
    title: "Redesigning the digital experience",
    tags: ["UI/UX"], 
    image: "/images/video.jpg", 
  },
  {
    year: "2023",
    client: "Pulse Media",
    title: "Video campaign that drove 2x engagement",
    tags: ["Video Editing"],
    video: "/cover2.mp4", 
    image: "/images/websites.jpeg", 
  },
  {
    year: "2023",
    client: "Drift Co.",
    title: "E-commerce overhaul with conversion focus",
    tags: ["Website", "Shopify"],
    image: "/images/video.jpg", 
  },
];

const ProjectCard = ({ project, id, isVideoMuted }) => {
  const cardRef = useRef(null);
  const tagsRef = useRef(null);
  const videoElementRef = useRef(null);
  const [paths, setPaths] = useState({ target: "", base: "" });

  useEffect(() => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if (!project) return null;

  const clipPathId = `card-clip-${id}`;
  const R = 0.057;

  useEffect(() => {
    if (!tagsRef.current || !cardRef.current) return;

    const calculatePaths = () => {
      const cardWidth = cardRef.current.offsetWidth;
      const tagsWidth = tagsRef.current.getBoundingClientRect().width;
      const rightPaddingPct = 12 / cardWidth;
      const horizontalBufferPct = 14 / cardWidth;
      const tagsPct = (tagsWidth / cardWidth) + horizontalBufferPct;
      const rightCornerStart = 1.0 - rightPaddingPct;
      const leftDropX = rightCornerStart - tagsPct;
      const startX = leftDropX - R;
      const leftPushX = leftDropX + R;

      const target = `M 0,0 L ${startX},0 Q ${leftDropX},0 ${leftDropX},${R} L ${leftDropX},${0.11 - R} Q ${leftDropX},0.11 ${leftPushX},0.11 L ${rightCornerStart},0.11 Q 1,0.11 1,${0.11 + R} L 1,1 L 0,1 Z`;
      const base = `M 0,0 L ${startX},0 Q ${leftDropX},0 ${leftDropX},0    L ${leftDropX},0        Q ${leftDropX},0    ${leftPushX},0    L ${rightCornerStart},0    Q 1,0 1,0        L 1,1 L 0,1 Z`;

      setPaths({ target, base });
    };

    calculatePaths();
    const observer = new ResizeObserver(calculatePaths);
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [project.tags]);

  const handleMouseEnter = () => {
    if (!paths.target) return;
    gsap.to(`#${clipPathId} path`, { attr: { d: paths.target }, duration: 0.25, ease: "expo.out" });
    gsap.to(tagsRef.current, { opacity: 1, y: "0%", duration: 0.25, ease: "expo.out" });
  };

  const handleMouseLeave = () => {
    if (!paths.base) return;
    gsap.to(`#${clipPathId} path`, { attr: { d: paths.base }, duration: 0.2, ease: "expo.inOut" });
    gsap.to(tagsRef.current, { opacity: 0, y: "-15%", duration: 0.2, ease: "expo.inOut" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={project.video ? "video" : "website"}
      data-video-muted={isVideoMuted}
      className="cursor-none group w-full flex flex-col relative"
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d={paths.base || "M 0,0 L 1,0 L 1,1 L 0,1 Z"} fill="black" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative w-full h-[420px] mb-4 bg-transparent">
        <div
          className="absolute inset-0 w-full h-full overflow-hidden rounded-[1.5rem]"
          style={{ clipPath: `url(#${clipPathId})`, WebkitClipPath: `url(#${clipPathId})` }}
        >
          {project.video ? (
            <video
              ref={videoElementRef}
              src={project.video}
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={id < 2}
            />
          )}
        </div>

        <div
          ref={tagsRef}
          className="absolute -top-[1px] right-[13px] h-[34px] flex items-center gap-2 pointer-events-none z-10 opacity-0 w-max max-w-[calc(100%-26px)]"
          style={{ transform: "translateY(-15%)" }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#1c1c1e] text-white text-sm px-4 py-2 rounded-full border border-white/10 font-medium tracking-wide shadow-sm flex items-center justify-center whitespace-nowrap h-[34px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-white/50 text-sm mb-2 mix-blend-difference">
        <span>{project.year}</span>
        <span>•</span>
        <span>{project.client}</span>
      </div>
      <h3 className="text-white text-3xl font-old-school leading-tight group-hover:text-zinc-400 transition-colors duration-300 mix-blend-difference">
        {project.title}
      </h3>
    </div>
  );
};

const Work = () => {
  const sectionRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isBlackBg, setIsBlackBg] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Triggers true as soon as the top edge of the section rolls into view
        if (entry.isIntersecting) {
          setIsBlackBg(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Reverts back to white if scrolling backward upwards away from the section
          setIsBlackBg(false);
        }
      },
      {
        root: null,
        // Fires early when 10% of the section header area enters the window frame
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGlobalClick = (e) => {
    const activeCard = e.target.closest('[data-cursor="video"]');
    if (activeCard) {
      setIsVideoMuted((prev) => !prev);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`w-full min-h-screen relative overflow-hidden select-none cursor-none transition-colors duration-1000 ease-out ${
        isBlackBg ? "bg-black" : "bg-[#F1F1F1]"
      }`}
      onClick={handleGlobalClick}
    >
      {/* Container elements transition color text automatically via mix-blend-difference mapping */}
      <div className="mx-auto pt-20 max-w-[1600px] px-6 md:px-10 lg:px-16 transition-colors duration-1000">
        
        <div className="grid grid-cols-12 gap-8 mb-16 mix-blend-difference">
          <div className="col-span-12 md:col-span-5">
            <h1 className="text-white text-6xl md:text-8xl font-abc-arizona leading-[0.9]">
              Featured
            </h1>
            <h1 className="text-white text-6xl md:text-8xl font-bold leading-[0.9]">
              Work
            </h1>
          </div>

          <div className="col-span-12 md:col-start-7 md:col-span-4 flex items-end">
            <h2 className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed">
              Featured projects meticulously crafted to drive results and impact.
            </h2>
          </div>
        </div>

        {/* Project Matrix Columns Grid */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-16 mb-32">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-16">
            <ProjectCard project={projects[0]} id={0} isVideoMuted={isVideoMuted} />
            <ProjectCard project={projects[2]} id={2} isVideoMuted={isVideoMuted} />
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-16 md:mt-32">
            <ProjectCard project={projects[1]} id={1} isVideoMuted={isVideoMuted} />
            <ProjectCard project={projects[3]} id={3} isVideoMuted={isVideoMuted} />
          </div>
          
          {/* 🎯 CTA FOOTER BLOCK LAYER */}
          <div className="col-span-12 md:col-start-3 md:col-span-6 flex flex-col items-start gap-6 md:-mt-25 mt-4 mix-blend-difference">
            <h1 className="text-white text-5xl md:text-5xl font-old-school leading-[1.1] tracking-tight">
              Like what<br />you see?
            </h1>
            
            {/* Integrated custom creative action button */}
            <CreativeButton 
              text="Let's Talk" 
              onClick={() => console.log("CTA button clicked")} 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Work;