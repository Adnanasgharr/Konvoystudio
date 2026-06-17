import React from "react";

export default function AboutStory() {
  return (
    <section className="w-full bg-[#F1F1F1] text-[#0F1011] py-16 sm:py-24 lg:py-32 border-t border-[#E4E2D9] relative z-10 select-none">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header Line */}
        <div className="w-full flex justify-between items-baseline border-b border-[#E4E2D9] pb-4 mb-10 lg:mb-16 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
          <span>01 / Origin Narrative</span>
          <span>Since 2024</span>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-28 items-start">
          
          {/* Left Side: Editorial Hook Statement */}
          <div className="col-span-1 lg:col-span-7">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-old-school tracking-tight leading-[1.15] md:leading-[1.1] text-[#0F1011]">
              We started with a vision, grew sharper with every project, and never once settled for anything less than our best work.
            </h2>
          </div>

          {/* Right Side: Paragraph Block Content */}
          <div className="col-span-1 lg:col-span-5 space-y-6 sm:space-y-8 text-neutral-700 text-base sm:text-lg leading-relaxed font-old-school lg:mt-2">
            <p>
              Konvoy Studio is an independent creative agency delivering bespoke web development, brand identity, and video production for businesses and ambitious individuals worldwide. 
            </p>
            <p>
              Founded with a clear vision and an uncompromising standard for quality, we have grown from early freelance projects into a full-service creative studio trusted by startups, growing businesses, and founders who refuse to blend in. We are focused, experienced, and fully committed to delivering work that performs as good as it looks.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}