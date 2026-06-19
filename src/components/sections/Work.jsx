"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Button from "../ui/Button";

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

const ProjectCard = ({ project, isVideoMuted, sectionBgColor }) => {
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
      className=" group w-full flex flex-col relative"
    >
      {/* CONTAINER WRAPPER */}
      <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] mb-4 bg-transparent  rounded-[1.5rem]">
        
        {/* ISOLATED MEDIA CONTAINER */}
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

        {/* THE NOTCH MASK LAYER - Retains original custom borders across all viewport sizes */}
        <div
          ref={notchMaskRef}
          className="absolute -top-[4px] -right-[4px] pt-2 pr-1 pl-3 pb-3 flex items-center gap-2 pointer-events-none z-20 origin-top-right transition-colors duration-1000 max-w-[calc(100%-12px)]"
          style={{ 
            backgroundColor: sectionBgColor,
            borderBottomLeftRadius: "1.5rem"
          }}
        >
          {/* Top-Left Inverted Notch Curve */}
          <div 
            className="absolute left-[-16px] top-[4px] w-4 h-4 transition-colors duration-1000"
            style={{
              borderTopRightRadius: "1rem",
              boxShadow: `4px -4px 0 4px ${sectionBgColor}`
            }}
          />

          {/* Bottom-Right Inverted Notch Curve */}
          <div 
            className="absolute bottom-[-16px] right-[4px] w-4 h-4 transition-colors duration-1000"
            style={{
              borderTopRightRadius: "1rem",
              boxShadow: `4px -4px 0 4px ${sectionBgColor}`
            }}
          />

          {/* Inner Content Wrapper - Scaled down padding for seamless mobile responsiveness */}
          <div 
            ref={tagsRef} 
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none" 
          >
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

const Work = () => {
  const sectionRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isBlackBg, setIsBlackBg] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBlackBg(true);
        } else if (entry.boundingClientRect.top > 0) {
          setIsBlackBg(false);
        }
      },
      { root: null, threshold: 0.1 }
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

  const currentBgColor = isBlackBg ? "#000000" : "#F1F1F1";

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden   transition-colors duration-1000 ease-out"
      style={{ backgroundColor: currentBgColor }}
      onClick={handleGlobalClick}
    >
      <div className="mx-auto pt-12 md:pt-20 max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-1000">
        
       {/* ASYMMETRIC HEADING STRUCTURE */}
        <div className="w-full flex flex-col gap-6 md:gap-10 mb-16 md:mb-0">
          <div>
            <h1 className="font-abc-arizona text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9]">
              Featured 
            </h1>
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.95] md:leading-[0.9]">
              Projects
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start ">
            <div className="md:col-start-5 md:col-span-3 text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-mono pt-1">
              (WORKS)
            </div>
            <p className="md:col-span-5 text-neutral-400 text-sm sm:text-base lg:text-lg font-old-school leading-relaxed max-w-[42ch]">
            A curated selection of featured projects, each meticulously crafted with passion and intention, designed to drive measurable results and create meaningful impact for the people we build for.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-0 sm:gap-x-6 md:gap-x-8 gap-y-10 sm:gap-y-12 md:gap-y-16 mb-24 md:mb-32">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-10 sm:gap-12 md:gap-16">
            <ProjectCard project={projects[0]} isVideoMuted={isVideoMuted} sectionBgColor={currentBgColor} />
            <ProjectCard project={projects[2]} isVideoMuted={isVideoMuted} sectionBgColor={currentBgColor} />
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-10 sm:gap-12 md:gap-16 md:mt-32">
            <ProjectCard project={projects[1]} isVideoMuted={isVideoMuted} sectionBgColor={currentBgColor} />
            <ProjectCard project={projects[3]} isVideoMuted={isVideoMuted} sectionBgColor={currentBgColor} />
          </div>
          
          <div className="col-span-12 md:col-start-3 md:col-span-6 flex flex-col items-start gap-4 sm:gap-6 md:-mt-25 mt-4 mix-blend-difference">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-old-school leading-[1.1] tracking-tight">
              Like what<br />you see?
            </h1>
            <Button text="Let's Talk" 
            variant="primary"
            aria-label="Contact us" />  
          </div>
        </div>

      </div>
    </section>
  );
};

export default Work;