"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const testimonialData = [
  {
    id: 1,
    name: "Jo Edwards",
    role: "Developer",
    company: "Shape",
    avatar: "/images/avatar1.jpg", 
    mediaType: "image",
    mediaUrl: "/images/avatar1.jpg", 
    quote: "Everyone at Shape works hard and produce excellent work and are super friendly and make you feel really welcome and valued.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "Studio-X",
    avatar: "/images/avatar2.jpg",
    mediaType: "image",
    mediaUrl: "/images/avatar2.jpg",
    quote: "Working with this team has completely transformed our workflow. Their attention to detail and fast delivery exceeded our expectations.",
  },
  {
    id: 3,
    name: "Alex Rivera",
    role: "Founder",
    company: "Apex Digital",
    avatar: "/images/avatar3.jpg",
    mediaType: "video",
    mediaUrl: "/videos/testimonial-clip.mp4", 
    quote: "Working with Konvoy Studio was smooth from start to finish. They listened, understood what I wanted, and delivered — maybe even better than I imagined.",
  }
];

const AUTOPLAY_INTERVAL = 7000; 

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Autoplay loop running safely alongside static/video logic
  useEffect(() => {
    if (isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialData.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Clean playstates instantly on switch
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex]);

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
        .catch((error) => console.log("Video playback interrupted:", error));
    }
  };

  return (
    <section 
      className="w-full bg-[#111111] text-white py-16 sm:py-24 lg:py-32"
      aria-labelledby="testimonial-heading"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* ASYMMETRIC HEADING STRUCTURE */}
        <div className="w-full flex flex-col gap-6 md:gap-10 mb-16 md:mb-24">
          <div>
            <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-abc-arizona leading-[0.9]">
              Don't take my
            </h1>
            <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.9]">
              Word for it
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-start-5 md:col-span-3 text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-mono pt-1">
              (TESTIMONIALS)
            </div>
            <p className="md:col-span-5 text-neutral-400 text-sm sm:text-base lg:text-lg font-old-school leading-relaxed max-w-[42ch]">
              Here’s what my clients say about our collaboration. Their satisfaction and 
              meeting expectations are my top priorities, ensuring the best experience possible.
            </p>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="w-full bg-[#c8f135] text-[#242021] rounded-[28px] p-6 sm:p-10 md:p-14 flex flex-col md:flex-row justify-between gap-10 items-center min-h-[460px] relative overflow-hidden">
          
          {/* Left Layout Column */}
          <div className="flex flex-col justify-between self-stretch flex-1 md:max-w-[70%] lg:max-w-[74%]">
            
            {/* Interactive Avatars Bar */}
            <div className="flex flex-wrap gap-3 mb-8" role="tablist" aria-label="Client Testimonials">
              {testimonialData.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    role="tab                    aria-selected={isActive}"
                    className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 transition-all duration-300 transform active:scale-95 ${
                      isActive 
                        ? "border-[#242021] scale-105 shadow-sm" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.avatar}
                      alt={`Read testimonial from ${item.name}`}
                      fill
                      sizes="52px"
                      className="object-cover"
                    />
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
                        <p itemProp="reviewBody" className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-old-school text-[#242021] ">
                          <svg 
                            className="inline-block w-5 h-5 md:w-8 md:h-8 text-[#242021] fill-current mr-6 md:mr-10 -translate-y-[4px] md:-translate-y-[10px]" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 17 11" 
                            fill="none"
                          >
                            <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                          </svg>
                          {item.quote}
                        </p>
                      </blockquote>

                      <div itemProp="author" itemScope itemType="https://schema.org/Person" className="mt-4 flex flex-col">
                        <h3 itemProp="name" className="text-sm sm:text-base font-bold leading-none mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-700 font-medium">
                          {item.role}
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
                    /* Only load the heavy video DOM element if this specific slide is active */
                    isActive && (
                      <div className="w-full h-full relative">
                        <video
                          ref={videoRef}
                          src={item.mediaUrl}
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={handlePlayToggle}
                          aria-label={isPlaying ? "Pause video testimonial" : "Play video testimonial"}
                          className="absolute bottom-5 left-5 w-11 h-11 bg-white/95 text-[#242021] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center shadow-md z-20 cursor-pointer"
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