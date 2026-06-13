"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";

const faqSections = [
  {
    title: "General",
    items: [
      { q: "How long does a website project usually take to complete?", a: "A typical custom website project takes between 4 to 8 weeks from discovery to launch, depending heavily on the complexity, structural architecture, and asset readiness." },
      { q: "How much does a website cost?", a: "Every project is entirely tailored to your business goals. Our pricing scales dynamically based on structural scope, custom animation demands, and specific integration requirements." },
      { q: "How easy is it for me to change content myself?", a: "Extremely simple. We configure intuitive Headless CMS panels (like Sanity or Contentful) allowing your team to update copy, images, and visual assets seamlessly without touching a line of code." },
      { q: "Can I create PPC landing pages myself?", a: "Yes. We build modular components and flexible block page builders natively into your dashboard system so you can deploy conversion-focused landing variations on the fly." },
      { q: "We have a limited budget, will you still work with us?", a: "We focus on high-impact value. If your budget doesn't align with a full custom build, we can discuss phasing the project rollout or optimizing critical core touchpoints first." },
      { q: "Do you outsource any work?", a: "No. Everything from strategic engineering, interactive design templates, UX prototyping, to custom frontend development is handled completely in-house by our core team." }
    ]
  },
  {
    title: "Working with Shape",
    items: [
      { q: "How many meetings can we have?", a: "We run a structured, highly transparent design sprint. You'll have dedicated milestone reviews (Discovery, Wireframes, Design, and Pre-Launch Review) alongside text updates in a shared workspace." },
      { q: "Do we have a dedicated project manager?", a: "Yes. You will have a direct line to a dedicated lead producer who syncs with our design and engineering assets, keeping your timeline moving exactly on schedule." },
      { q: "What are your payment terms?", a: "Our standard project engagements operate on a structured milestone distribution split: typically 50% upfront discovery allocation and 50% upon final production sign-off/deployment." },
      { q: "We’re not based in Manchester, does that matter?", a: "Not at all. We operate globally with an optimized remote-first infrastructure, utilizing digital collaboration platforms, recorded async video walkthroughs, and scheduled live syncs." }
    ]
  },
  {
    title: "Other Questions",
    items: [
      { q: "What services do you offer?", a: "We provide high-fidelity web engineering, custom application ecosystems, strategic visual graphic design identities, and high-conversion marketing user interfaces." },
      { q: "Where are you based?", a: "Our creative engineering squad operates out of Manchester, working seamlessly with collaborative teams and high-growth brands worldwide." }
    ]
  }
];

export default function PremiumFAQ() {
  const [openId, setOpenId] = useState(null);
  const panelsRef = useRef({});

  const handleToggle = (uniqueId) => {
    const isOpening = openId !== uniqueId;

    // Smoothly close any currently open panel using GSAP
    if (openId !== null && panelsRef.current[openId]) {
      gsap.to(panelsRef.current[openId], { height: 0, opacity: 0, duration: 0.25, ease: "power2.out" });
    }

    if (isOpening) {
      setOpenId(uniqueId);
      gsap.to(panelsRef.current[uniqueId], {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power3.out"
      });
    } else {
      setOpenId(null);
    }
  };

  return (
    <section className="bg-black text-white py-32 px-6 md:px-10 w-full select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Block */}
        <div className="mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c8f135] block mb-3">• KNOWLEDGE REPOSITORY</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-xl font-old-school leading-none">
            Answering the critical details.
          </h2>
        </div>

        {/* Dynamic Category Sections Stack */}
        <div className="space-y-24">
          {faqSections.map((section, sIdx) => (
            <div key={sIdx} className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 border-t border-neutral-900 pt-10">
              
              {/* Left Column: Category Label Title (Sticky Anchor) */}
              <div className="lg:sticky lg:top-24 h-fit">
                <h3 className=" font-old-school text-3xl  tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f135]" />
                  {section.title}
                </h3>
              </div>

              {/* Right Column: Beautiful Clean Accordion Rows */}
              <div className="divide-y divide-neutral-900 -mt-6">
                {section.items.map((item, iIdx) => {
                  const uniqueId = `${sIdx}-${iIdx}`;
                  const isOpen = openId === uniqueId;

                  return (
                    <div key={iIdx} className="py-6 md:py-7 first:pt-0 last:pb-0 block">
                      <button
                        onClick={() => handleToggle(uniqueId)}
                        className="w-full flex justify-between items-center text-left gap-6 group cursor-pointer"
                      >
                        <span className="text-base md:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                          {item.q}
                        </span>
                        
                        {/* Smooth Rotating Indicator */}
                        <div className="flex items-center justify-center min-w-[32px] min-h-[32px] rounded-full border border-neutral-800 bg-neutral-950/50 group-hover:border-neutral-700 transition-colors">
                          <span className={`text-sm text-neutral-400 font-light transform transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                            ＋
                          </span>
                        </div>
                      </button>

                      {/* Dropdown Answer Text Box Wrapper */}
                      <div
                        ref={(el) => (panelsRef.current[uniqueId] = el)}
                        className="overflow-hidden h-0 opacity-0"
                      >
                        <p className="pt-5 text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}