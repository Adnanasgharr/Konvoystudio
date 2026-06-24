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
    name: "Jeremy Bennett ",
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
    quote: "Architectural integrity was maintained through every phase of implementation. into elegant modules without bloat.",
  }
];

const AUTOPLAY_INTERVAL = 7000; 

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressTimerRef = useRef(null);
  
  const current = testimonialData[activeIndex];

  // Precision Progress Countdown Indicator
  useEffect(() => {
    if (isPlaying) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const startTime = Date.now() - (progress * AUTOPLAY_INTERVAL) / 100;

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      
      if (computedProgress >= 100) {
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % testimonialData.length);
      } else {
        setProgress(computedProgress);
      }
    }, 50);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeIndex, isPlaying, progress]);

  // Clean state resets and video autoplay logic when changing slides
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.play()
        .catch((error) => console.log("Muted autoplay initiated:", error));
    }
  }, [activeIndex]);

  const handleManualSelection = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const handlePlayToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.currentTime = 0; // Restart from the beginning as requested
      videoRef.current.muted = false;   // Unmute audio on user interaction
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Video playback interrupted:", error));
    }
  };

  // 100-based stroke length mapping for the rectangular loader track
  const strokeDashoffset = 100 - progress;

  return (
    // 🎯 Outermost section updated with bottom rounding and overflow cutoff
    <section 
      className="w-full rounded-b-3xl overflow-hidden bg-[#000000] text-white py-16 sm:py-24 lg:py-22"
      aria-labelledby="testimonial-heading"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 ">
        
        {/* ASYMMETRIC HEADING STRUCTURE */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-12 md:gap-x-8 lg:gap-x-12 items-start mb-16 sm:mb-20 md:mb-28">
          <div className="md:col-span-6 flex flex-col">
            <h1 className="font-abc-arizona text-white text-5xl sm:text-7xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.85]">
              Trusted by
            </h1>
            <h1 className="text-white text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-bold leading-[0.95] md:leading-[0.85] uppercase">
              founders.
            </h1>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            <p className="text-neutral-400 text-lg md:text-xl leading-tight font-old-school ">
              Here’s what our clients say about our collaboration. Their satisfaction and 
              meeting expectations are our top priorities, ensuring the best experience possible.
            </p>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="w-full bg-[#0F1011] text-[#ffffff] rounded-xl p-6 sm:p-10 md:p-10 flex flex-col-reverse md:flex-row justify-between gap-10 items-center min-h-[460px] relative overflow-hidden">
          
          {/* Left Layout Column */}
          <div className="flex flex-col justify-between self-stretch flex-1 md:max-w-[70%] lg:max-w-[74%] w-full">
            
            {/* Interactive Avatars Bar - Responsive size & strict single line layout */}
            <div className="flex flex-nowrap   mb-8 items-center w-full overflow-visible" role="tablist" aria-label="Client Testimonials">
              {testimonialData.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleManualSelection(index)}
                    role="tab"
                    aria-selected={isActive}
                    className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center group outline-none shrink-0"
                  >
                    {/* SVG Rectangular Progress Border Ring matching squircle bounding */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 64 64">
                      {/* Background Track Frame */}
                      <rect
                        x="5"
                        y="5"
                        width="54"
                        height="54"
                        rx="12"
                        fill="transparent"
                        stroke={isActive ? "rgba(36, 32, 33, 0.15)" : "transparent"}
                        strokeWidth="2.5"
                      />
                      {/* Active Filling Progress Frame Indicator */}
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
                          className="transition-all duration-75 ease-linear"
                        />
                      )}
                    </svg>

                    {/* Inner Avatar Frame - Clean Scalable Squircle */}
                    <div className={`relative w-[72%] h-[72%] rounded-md overflow-hidden transition-all duration-300 ${
                      isActive ? "scale-100" : "scale-95 opacity-50 group-hover:opacity-100"
                    }`}>
                      <Image
                        src={item.avatar}
                        alt={`Read testimonial from ${item.name}`}
                        fill
                        sizes="(max-width: 480px) 32px, (max-width: 768px) 46px, 46px"
                        className="object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* GPU-Accelerated Text Stack Area */}
            <div className="grid grid-cols-1 grid-rows-1 items-stretch h-full w-full">
              {testimonialData.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.id}
                    className={`col-start-1 row-start-1 flex flex-col justify-between w-full h-full transition-opacity duration-500 ease-out will-change-[opacity] ${
                      isActive 
                        ? "opacity-100 z-10 pointer-events-auto visible" 
                        : "opacity-0 z-0 pointer-events-none absolute invisible"
                    }`}
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <meta itemProp="itemReviewed" content="Organization" />
                    <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content="5" />
                    </div>

                    <div className="flex flex-col w-full">
                      <blockquote className="mb-6">
                        <p itemProp="reviewBody" className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-old-school text-[#ffffff] ">
                          <svg 
                            className="inline-block w-5 h-5 md:w-8 md:h-8 text-[#ffffff] fill-current mr-6 md:mr-10 -translate-y-[4px] md:-translate-y-[10px]" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 17 11" 
                            fill="none"
                          >
                            <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                          </svg>
                          {item.quote}
                        </p>
                      </blockquote>

                      {/* Meta Stack - Aligned cleanly to the far left with company names displayed */}
                      <div itemProp="author" itemScope itemType="https://schema.org/Person" className="mt-4 flex flex-col">
                        <h3 itemProp="name" className="text-sm sm:text-base font-bold leading-none mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                          {item.role} <span className="text-neutral-500 mx-1">—</span> {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Layout Column: Fixed Frame Image & Hybrid Video Container */}
          <div className="w-full sm:max-w-[300px] md:max-w-none md:w-[260px] md:h-[400px] aspect-[3/4] md:aspect-auto relative rounded-2xl overflow-hidden shadow-lg bg-neutral-900/10 shrink-0 mx-auto md:mx-0 grid grid-cols-1 grid-rows-1">
            {testimonialData.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`media-${item.id}`}
                  className={`col-start-1 row-start-1 w-full h-full relative transition-opacity duration-500 ease-out will-change-[opacity] ${
                    isActive ? "opacity-100 z-10 visible" : "opacity-0 z-0 invisible pointer-events-none"
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
                          aria-label={isPlaying ? "Pause video testimonial" : "Play video testimonial"}
                          className="absolute bottom-5 left-5 w-11 h-11 bg-[#c8f135] text-[#000000] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center shadow-md z-20 cursor-pointer"
                        >
                          {isPlaying ? (
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 fill-current translate-x-[1px]" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )
                  ) : (
                    <Image
                      src={item.mediaUrl}
                      alt={`Visual showcase for ${item.name}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 260px"
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
};

export default Testimonials;