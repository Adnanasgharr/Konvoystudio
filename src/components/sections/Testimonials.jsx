"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const testimonialData = [
  {
    id: 1,
    name: "Jo Edwards",
    role: "Developer",
    company: "Shape",
    avatar: "/images/testimonials/konvoy-studio-client-reviews.jpg", 
    mediaType: "video",
    mediaUrl: "/images/testimonials/testimonial-clip.mp4", 
    quote: "Working with Konvoy was smooth start to finish. They listened, understood what I wanted, and delivered better than I imagined.",
  },
  {
    id: 2,
    name: "Jeremy Bennett",
    role: "Podcaster",
    company: "Studio-X",
    avatar: "/images/testimonials/konvoy studio client review of video editing.jpeg",
    mediaType: "image",
    mediaUrl: "/images/testimonials/konvoy studio client review of video editing.jpeg",
    quote: "Working with Konvoy Studio was an absolute pleasure. Their creativity, attention to detail, and high quality work exceeded every expectation.",
  },
  {
    id: 3,
    name: "Mark Zicha",
    role: "Founder",
    company: "Wacky Puppies",
    avatar: "/images/testimonials/konvoy-studio-client-review (1).jpeg", 
    mediaType: "image",
    mediaUrl: "/images/testimonials/konvoy-studio-client-review (1).jpeg", 
    quote: "Working with Konvoy was smooth start to finish. They listened, understood what I wanted, and delivered better than I imagined.",
  },
  {
    id: 4,
    name: "Milan Patel",
    role: "Career & Life Design Coach",
    company: "",
    avatar: "/images/testimonials/konvoy-studio-client-review.jpeg",
    mediaType: "image",
    mediaUrl: "/images/testimonials/konvoy-studio-client-review.jpeg",
    quote: "Konvoy Studio delivered outstanding work with clear communication. The final product exceeded every expectation.",
  },
  {
    id: 5,
    name: "Mary Camacho",
    role: "Executive Director",
    company: "CEO at Holo",
    avatar: "/images/testimonials/konvoy studio client review (2).jpeg",
    mediaType: "image",
    mediaUrl: "/images/testimonials/konvoy studio client review (2).jpeg",
    quote: "Architectural integrity was maintained through every phase of implementation into elegant modules without bloat.",
  }
];

const AUTOPLAY_INTERVAL = 7000; 

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress * AUTOPLAY_INTERVAL) / 100;

    const updateTimer = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);

      if (currentProgress >= 100) {
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % testimonialData.length);
      } else {
        setProgress(currentProgress);
        timerRef.current = requestAnimationFrame(updateTimer);
      }
    };

    timerRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      if (!isPlaying) {
        videoRef.current.play()
          .catch((err) => console.log("Muted automated playback pass caught:", err));
      }
    }
  }, [activeIndex]);

  const handleManualSelection = (index) => {
    if (index === activeIndex) return;
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    
    setIsPlaying(false);
    setProgress(0);
    setActiveIndex(index);
  };

  const handlePlayToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = false;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Video source initialization halted:", err));
    }
  };

  const strokeDashoffset = 100 - progress;

  return (
    <section 
      className="w-full rounded-b-3xl overflow-hidden bg-black text-white"
      aria-labelledby="testimonials-section-title"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-32">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-5 md:gap-y-12 md:gap-x-8 lg:gap-x-12 items-start mb-8 sm:mb-14 md:mb-24">
          <div className="md:col-span-6 flex flex-col">
            <h2 id="testimonials-section-title" className="text-white text-5xl sm:text-6xl xl:text-8xl font-black leading-[0.9] uppercase tracking-tight">
              <span className="block font-abc-arizona font-normal normal-case text-white">Trusted by</span>
              founders.
            </h2>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-2 sm:gap-4">
            <p className="text-neutral-400 text-lg md:text-xl leading-tight font-old-school">
              Here's what our clients say about our collaboration. Their satisfaction and 
              meeting expectations are our top priorities, ensuring the best experience possible.
            </p>
          </div>
        </div>

        {/* Unified Layout Stack Card */}
        <div className="w-full bg-[#0F1011] text-white rounded-xl p-4 sm:p-6 md:p-8 flex flex-col-reverse md:flex-row justify-between gap-6 sm:gap-10 items-center min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[460px] relative overflow-hidden">
          
          {/* Left Column Stack */}
          <div className="flex flex-col justify-between self-stretch flex-1 md:max-w-[65%] lg:max-w-[74%] xl:flex-[0_0_58%] xl:max-w-[58%] w-full">
            
            {/* Interactive Tabbed Navigation */}
            <div className="flex flex-wrap md:flex-nowrap mb-4 sm:mb-6 md:mb-8 items-center w-full gap-1 sm:gap-2" role="tablist" aria-label="Client Testimonials Dashboard">
              {testimonialData.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleManualSelection(index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View review panel from ${item.name}`}
                    className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-14 lg:w-16 lg:h-16 flex items-center justify-center group outline-none shrink-0 cursor-pointer"
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 64 64">
                      <rect
                        x="5"
                        y="5"
                        width="54"
                        height="54"
                        rx="12"
                        fill="transparent"
                        stroke={isActive ? "rgba(255, 255, 255, 0.15)" : "transparent"}
                        strokeWidth="2.5"
                      />
                      {isActive && (
                        <rect
                          x="5"
                          y="5"
                          width="54"
                          height="54"
                          rx="12"
                          fill="transparent"
                          stroke="#ffffff"
                          strokeWidth="1.2"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      )}
                    </svg>

                    <div className={`relative w-[72%] h-[72%] rounded-md overflow-hidden transition-all duration-300 ${
                      isActive ? "scale-100" : "scale-95 opacity-50 group-hover:opacity-100"
                    }`}>
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="(max-width: 480px) 28px, (max-width: 768px) 34px, 46px"
                        className="object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Premium CSS Grid Stack */}
            <div className="grid grid-cols-1 grid-rows-1 items-start w-full relative h-full overflow-hidden">
              {testimonialData.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.id}
                    className={`col-start-1 row-start-1 flex flex-col justify-between w-full h-full transition-all duration-700 ease-[0.76,0,0.24,1] will-change-[transform,opacity] ${
                      isActive 
                        ? "opacity-100 z-10 pointer-events-auto translate-y-0 filter blur-0" 
                        : "opacity-0 z-0 pointer-events-none translate-y-6 filter blur-sm absolute"
                    }`}
                  >
                    <div className="flex flex-col w-full pb-4">
                      <blockquote className="mb-3 sm:mb-5 md:mb-6">
                        <p className="text-[1.4rem] sm:text-lg md:text-xl lg:text-4xl font-old-school text-white leading-tight">
                          <svg 
                            className="inline-block w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8  fill-current mr-2 sm:mr-4 lg:mr-10 -translate-y-[2px] sm:-translate-y-[3px] md:-translate-y-[10px]" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 17 11" 
                            fill="none"
                          >
                            <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                          </svg>
                          {item.quote}
                        </p>
                      </blockquote>

                      <div className="mt-1 sm:mt-3 flex flex-col">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold leading-none mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400 font-medium">
                          {item.role} {item.company && <><span className="text-neutral-500 mx-1">—</span> {item.company}</>}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column Showcase Stack (Restored to Exact Dimensions) */}
          <div className="w-full sm:max-w-[180px] md:w-[200px] md:h-[300px] lg:w-[260px] lg:h-[400px] xl:w-[340px] xl:h-[400px] xl:max-w-[340px] aspect-[3/4] md:aspect-auto relative rounded-2xl overflow-hidden shadow-lg bg-neutral-900/10 shrink-0 mx-auto md:mx-0 grid grid-cols-1 grid-rows-1">
            {testimonialData.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`media-${item.id}`}
                  className={`col-start-1 row-start-1 w-full h-full relative transition-all duration-700 ease-[0.76,0,0.24,1] will-change-[transform,opacity] ${
                    isActive ? "opacity-100 z-10 scale-100 filter blur-0 visible" : "opacity-0 z-0 scale-95 filter blur-md invisible pointer-events-none absolute"
                  }`}
                >
                  {item.mediaType === "video" ? (
                    isActive && (
                      <div className="w-full h-full relative">
                        <video
                          ref={videoRef}
                          src={item.mediaUrl}
                          loop
                          autoPlay
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={handlePlayToggle}
                          aria-label={isPlaying ? "Pause client review video playback" : "Play client review video playback"}
                          className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-9 h-9 sm:w-11 sm:h-11 bg-[#CCFF00] text-black hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center shadow-md z-20 cursor-pointer"
                        >
                          {isPlaying ? (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current translate-x-[1px]" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )
                  ) : (
                    <Image
                      src={item.mediaUrl}
                      alt={`Visual project design reference for client ${item.name}`}
                      fill
                      priority={index === activeIndex}
                      sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, (max-width: 1280px) 260px, 340px"
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;