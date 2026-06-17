"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// Custom specialized modular components (Rendered conditionally via flags)
import VideoShowcase from "@/components/services/VideoShowcase";
import LiveMockupFrame from "@/components/services/LiveMockupFrame";

export default function ServiceTemplate({ data }) {
  return (
    <main className="w-full bg-[#F1F1F1] text-[#242021] py-20 sm:py-28 select-none font-old-school">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 flex flex-col gap-20 sm:gap-28">
        
        {/* ========================================================
            SECTION 1: HERO BLOCK (Typography Focused)
            ======================================================== */}
        <div className="flex flex-col gap-6 max-w-4xl border-b border-neutral-300 pb-12">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-emerald-500 uppercase tracking-widest transition-colors duration-200"
          >
            ← Back to Capabilities
          </Link>
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest block">
            [ Studio Capability / {data.category} ]
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.9] tracking-tight uppercase">
            {data.title}.
          </h1>
          <p className="text-neutral-700 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mt-2">
            {data.description}
          </p>
        </div>

        {/* ========================================================
            SECTION 2: DYNAMIC MEDIA INJECTIONS (Conditional)
            ======================================================== */}
        {/* Video Showcase Injection */}
        {data.hasVideoShowcase && (
          <div className="w-full">
            <VideoShowcase src={data.videoUrl} />
          </div>
        )}

        {/* Live Browser Frame Injection */}
        {data.hasLiveMockup && (
          <div className="w-full">
            <LiveMockupFrame url={data.previewUrl} />
          </div>
        )}

        {/* ========================================================
            SECTION 3: CORE EXECUTION BLUEPRINT GRID
            ======================================================== */}
        <div className="flex flex-col gap-8">
          <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            // Core Operational Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {data.process.map((step, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-neutral-200/40 border border-neutral-300/80 rounded-2xl flex flex-col justify-between group hover:border-neutral-400 transition-colors duration-300"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs text-neutral-400 group-hover:text-emerald-500 transition-colors duration-300">
                    {step.num} //
                  </span>
                  <h4 className="text-xl font-bold tracking-tight">{step.phase}</h4>
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mt-6">
                  {step.intel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 4: LONG-FORM TEXT BLOCK (SEO Keyword Engine)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-neutral-200/20 border border-neutral-300/40 p-8 sm:p-12 rounded-3xl">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight font-mono text-neutral-400">
              Technical <br /> Deep-Dive.
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {data.philosophyTitle}
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {data.philosophyText}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION 5: DELIVERABLES SHEET & TECH STACK MATRIX
            ======================================================== */}
        <div className="flex flex-col gap-6 border-t border-neutral-300 pt-12">
          <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            // Production Matrix & Deliverables
          </h3>
          <div className="flex flex-wrap gap-3 font-mono text-[11px] sm:text-xs text-neutral-700 uppercase tracking-wider">
            {data.deliverables.map((item, idx) => (
              <span key={idx} className="px-4 py-2 bg-neutral-200/80 border border-neutral-300/80 rounded-full flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 6: STRUCTURAL FAQ ACCORDION (Snippet Target)
            ======================================================== */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-t border-neutral-300 pt-12">
            <div className="lg:col-span-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                // Common Queries
              </h3>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">
                Frequently <br /> Asked Questions
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col border-t border-neutral-300">
              {data.faqs.map((faq, i) => (
                <div key={i} className="w-full border-b border-neutral-300 py-6 flex flex-col gap-2">
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-[#242021]">
                    {faq.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            SECTION 7: TRANSACTIONAL CALL TO ACTION
            ======================================================== */}
        <div className="w-full py-12 sm:py-16 bg-[#242021] rounded-3xl text-[#F1F1F1] px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest">// Next Phase</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">Ready to launch your project?</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">Let's blueprint a system built for operational speed and index performance.</p>
          </div>
          <div className="shrink-0">
            <Button text="Initiate Development Brief" variant="primary" />
          </div>
        </div>

      </div>
    </main>
  );
}