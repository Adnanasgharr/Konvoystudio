"use client";

import Button from "../ui/Button";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#000000] py-16 sm:py-24 md:py-20 lg:pt-46 xl:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* Responsive Flex layout for mobile, swapping to strict CSS Grid on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-y-6 md:gap-x-8 lg:gap-x-12 items-start">
          
          {/* Left Column: Label Badge */}
          <div className="col-span-12 md:col-span-4 flex items-center md:items-start md:pt-2 lg:pt-4">
            <h3 className="text-neutral-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] whitespace-nowrap">
              (Who are we?)
            </h3>
          </div>

          {/* Right Column: Statement Manifesto & CTA */}
          <div className="col-span-12 md:col-span-8 flex flex-col items-start gap-8 sm:gap-10 lg:gap-14 w-full">
            
            <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-old-school leading-snug md:leading-[1.1] lg:leading-[1.12] tracking-tight max-w-5xl">
              An independent web development and creative studio built by developers and designers who care about craft, move fast, and deliver work that actually performs.
            </h1>

            {/* CTA Trigger */}
            <div className="pt-2">
              <Button
                text="About Konvoy"
                variant="primary"
                aria-label="Learn more about Konvoy Studio"
                href="/about"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;