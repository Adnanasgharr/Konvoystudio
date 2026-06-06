"use client";

import Button from "./Button";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#111111] py-16 sm:py-24 lg:py-32 relative overflow-hidden select-none cursor-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16">
        
        <div className="grid grid-cols-12 gap-y-6 md:gap-y-0 md:gap-x-8 items-start">
          
          {/* Left Column */}
          <div className="col-span-12 md:col-span-4 flex items-center md:items-start gap-2 md:pt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />

            <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              Who are we?
            </h3>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-8 flex flex-col items-start gap-8 sm:gap-10 lg:gap-12">
            
            <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-old-school leading-[1.15] md:leading-[1.1] tracking-tight">
             An independent web development and creative agency in Karachi — built by developers and designers who care about craft, move fast, and deliver work that actually performs.
            </h1>

            {/* CTA */}
            <Button
              text="About Konvoy"
              variant="primary"
            />

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;