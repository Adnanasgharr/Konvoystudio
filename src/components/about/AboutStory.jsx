import React from "react";

export default function AboutStory() {
  return (
    <section 
      className="w-full bg-[#F1F1F1] text-[#0F1011] py-12 sm:py-20 md:py-24 lg:py-32 border-t border-[#E4E2D9] relative z-10"
      aria-labelledby="origin-heading"
    >
      {/* 📱 Dynamic container padding that expands based on screen size */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 w-full">
        
        {/* Section Header Line */}
        <div className="w-full flex justify-between items-baseline border-b border-[#E4E2D9] pb-4 mb-8 sm:mb-10 lg:mb-16 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
          <span className="font-semibold">01 / Origin Narrative</span>
          <span>Since 2024</span>
        </div>

        {/* 💻 Grid system built to handle mobile -> tablet -> desktop transitions cleanly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-0 md:gap-x-8 lg:gap-x-16 xl:gap-x-28 items-start w-full">
          
          {/* Left Side: Editorial Hook Statement */}
          {/* Spans full width on mobile, 7 columns on tablet (md) and desktop */}
          <header className="col-span-1 md:col-span-7 w-full">
            <h2 
              id="origin-heading"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-old-school tracking-tight leading-[1.15] md:leading-[1.1] text-[#0F1011]"
            >
              We started with a vision, grew sharper with every project, and never once settled for anything less than our best work.
            </h2>
          </header>

          {/* Right Side: Paragraph Block Content */}
          {/* Spans full width on mobile, 5 columns on tablet (md) and desktop */}
          <div className="col-span-1 md:col-span-5 space-y-6 sm:space-y-8 text-neutral-700 text-base sm:text-lg leading-relaxed font-old-school md:mt-2 w-full">
            <p>
              <strong>Konvoy Studio</strong> is an independent creative agency delivering bespoke web development, brand identity, and video production for businesses and ambitious individuals worldwide. 
            </p>
            <p>
              Founded with a clear vision and an uncompromising standard for quality, we have grown from early freelance projects into a full-service creative studio trusted by startups, growing businesses, and founders who refuse to blend in. We are focused, experienced, and fully committed to delivering work that performs as good as it looks.
            </p>
          </div>

          {/* Screen-reader hidden semantic text for crawler SEO indexing */}
          <span className="sr-only">Independent creative studio specializing in bespoke web production, design architecture, and corporate brand positioning.</span>

        </div>

      </div>
    </section>
  );
}