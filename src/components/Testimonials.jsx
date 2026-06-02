"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import CreativeButton from "./CreativeButton";

const testimonials = [
  {
    name: "Ashley Sinclair",
    company: "MAAS Marketing",
    review: "Shape were so friendly, personable, and nothing was too much for them. They went above and beyond to ensure what we got was something we were happy with.",
    avatar: "/images/brand.jpg",
    video: "/cover2.mp4",
  },
  {
    name: "Johnathan Doe",
    company: "Apex Tech Labs",
    review: "The execution, speed, and creative vision exceeded everything we anticipated. An absolute elite-tier partnership.",
    avatar: "/images/video.jpg",
    video: null,
    image: "/images/websites.jpeg",
  },
  {
    name: "Sarah Jenkins",
    company: "Lumina Studio",
    review: "They managed to completely overhaul our visual footprint in record time. The asset delivery pipelines and communication were flawlessly tight.",
    avatar: "/images/brand.jpg",
    video: null,
    image: "/images/video.jpg",
  }
];

const TestimonialCard = ({ testimonial }) => {
  const cardRef = useRef(null);
  const metaRef = useRef(null);
  const [maskStyles, setMaskStyles] = useState({});

  useEffect(() => {
    if (!metaRef.current || !cardRef.current) return;

    const calculatePerfectMask = () => {
      const metaBox = metaRef.current.getBoundingClientRect();
      const nw = metaBox.width;
      const nh = metaBox.height;
      const r = 32; 

      const maskString = `
        radial-gradient(circle at calc(${nw}px + ${r}px) calc(100% - ${nh}px - ${r}px), transparent ${r}px, black calc(${r}px + 0.5px)),
        linear-gradient(black, black),
        linear-gradient(black, black),
        radial-gradient(circle at ${r}px calc(100% - ${nh}px + ${r}px), black ${r}px, transparent calc(${r}px + 0.5px))
      `;

      setMaskStyles({
        maskImage: maskString,
        WebkitMaskImage: maskString,
        maskPosition: "0 0, calc(" + nw + "px + " + r + "px) 0, 0 0, 0 0",
        WebkitMaskPosition: "0 0, calc(" + nw + "px + " + r + "px) 0, 0 0, 0 0",
        maskSize: "100% 100%, 100% 100%, 100% calc(100% - " + nh + "px), calc(" + nw + "px + " + r + "px) calc(" + nh + "px + " + r + "px)",
        WebkitMaskSize: "100% 100%, 100% 100%, 100% calc(100% - " + nh + "px), calc(" + nw + "px + " + r + "px) calc(" + nh + "px + " + r + "px)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        borderRadius: `${r}px` 
      });
    };

    calculatePerfectMask();
    const observer = new ResizeObserver(calculatePerfectMask);
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      data-cursor={testimonial.video ? "video" : "website"}
      className="cursor-none group w-full flex flex-col relative text-white"
    >
      <div className="relative w-full h-[280px] mb-4 bg-transparent">
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={maskStyles}>
          {testimonial.video ? (
            <>
              <video
                src={testimonial.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#c8f135] flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-y-6 border-y-transparent border-l-[12px] border-l-black ml-0.5" />
                </div>
              </div>
            </>
          ) : (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        <div ref={metaRef} className="absolute bottom-0 left-0 bg-black text-white px-5 py-3.5 flex items-center gap-3 pointer-events-none z-10 rounded-tr-[1.5rem]">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-neutral-800">
            <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-sm font-bold tracking-tight text-white whitespace-nowrap">{testimonial.name}</span>
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider whitespace-nowrap">{testimonial.company}</span>
          </div>
        </div>
      </div>

      <div className="relative pl-1">
        <svg className="w-4 h-4 text-[#c8f135] fill-current absolute top-1.5 left-0 select-none opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 11" fill="none">
          <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
        </svg>
        <p className="text-base md:text-lg font-old-school tracking-tight text-neutral-300 leading-relaxed pl-7">
          {testimonial.review}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full bg-black py-24 md:py-10 relative overflow-hidden select-none cursor-none">
      {/* 🔄 Injecting Infinite Carousel Keyframe Rules via CSS Blocks */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .animate-marquee-loop:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        
        {/* Adjusted to asymmetric grid: Left side takes 3 cols, right side gets 9 cols */}
        <div className="grid grid-cols-12 gap-12 items-start">
          
          {/* Left Side Copy Block (Spans 3 Columns for compact modern footprint) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col items-start justify-center h-full lg:sticky lg:top-32 z-10 bg-black">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
              <h2 className="text-white text-sm font-bold uppercase tracking-[0.2em]">Testimonials</h2>
            </div>
            
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8">
              What our<br/> clients say about us
            </h1>
            
            <CreativeButton 
              text="View all reviews" 
              onClick={() => console.log("Reviews navigation requested")} 
            />
          </div>

          {/* Right Side Content Track (Spans 9 Columns) */}
          <div className="col-span-12 lg:col-span-9 relative overflow-hidden pointer-events-auto">
            {/* Infinite Loop Scroller Shell Wrapper */}
            <div className="animate-marquee-loop gap-8 pr-8">
              
              {/* First Track Loop Instance */}
              <div className="flex gap-8">
                {testimonials.map((testimonial, idx) => (
                  <div key={`track-1-${idx}`} className="w-[340px] md:w-[420px] flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>

              {/* Duplicate Track Loop Instance (Provides gapless continuity) */}
              <div className="flex gap-8" aria-hidden="true">
                {testimonials.map((testimonial, idx) => (
                  <div key={`track-2-${idx}`} className="w-[340px] md:w-[420px] flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>

            </div>
            
            {/* Smooth Edge Shading Edge Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-10 hidden md:block" />
            <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10 hidden md:block" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;