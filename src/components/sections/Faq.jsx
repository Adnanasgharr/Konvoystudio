"use client";
import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../ui/Button";
import BookCallButton from "../ui/BookCallButton";

const DEFAULT_FAQS = [
  {
    id: "01",
    question: "You offer web, video, and branding. Do you specialize in each?",
    answer: "We don't do surface-level work. Each service has its own specialist — developers for the web, designers for brand, editors for video. One studio, no generalists.",
  },
  {
    id: "02",
    question: "Can I hire Konvoy Studio for just one service?",
    answer: "Absolutely. We frequently partner with clients on standalone projects — a single landing page, a brand identity, or a promo video. No obligation to take everything.",
  },
  {
    id: "03",
    question: "What does the collaboration process look like?",
    answer: "We start with a discovery call to map out your goals. From there you get a dedicated project dashboard — no messy email chains, just full transparency at every stage.",
  },
  {
    id: "04",
    question: "How long does a typical project take?",
    answer: "A landing page or promo video runs 2 to 4 weeks. Full corporate websites and brand systems typically run 6 to 8 weeks. Exact milestones are agreed before work starts.",
  },
  {
    id: "05",
    question: "How does pricing work?",
    answer: "Custom quotes based on scope. After a discovery call we provide a fixed-cost proposal with clear deliverables — no surprise invoices.",
  },
  {
    id: "06",
    question: "How many revisions are included?",
    answer: "Two structured revision rounds are included in every project. Additional rounds can be added if needed.",
  },
  {
    id: "07",
    question: "Do you work with clients outside Pakistan?",
    answer: "Yes. We work with clients remotely across the world. Time zone and location have never been a blocker.",
  },
];

const FaqSection = ({ faqs }) => {
  const faqData = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  useGSAP(() => {
    faqData.forEach((item) => {
      const contentEl = document.getElementById(`faq-content-${item.id}`);
      if (!contentEl) return;

      if (openId === item.id) {
        gsap.to(contentEl, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(contentEl, { height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut" });
      }
    });
  }, [openId, faqData]);

  return (
    <section className="w-full bg-[#F1F1F1] text-white px-4 sm:px-8 md:px-10 lg:px-16 py-16 md:py-32 font-sans">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_2fr] gap-6 md:gap-16">

        {/* LEFT SIDEBAR */}
        <div className="flex flex-col justify-between md:h-full md:sticky md:top-32 order-1 md:order-none">
          <div>
            <h1
              className="font-abc-arizona text-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9]"
              style={{ mixBlendMode: "difference" }}
            >
              FAQs?
            </h1>
          </div>

          <div className="flex flex-col items-start gap-5 max-w-xs mt-auto">
            <div className="w-34 h-34 rounded-xl overflow-hidden">
              <img
                src="/typing.gif"
                alt="Studio Representative"
                className="w-full h-full object-cover grayscale brightness-95"
              />
            </div>
            <h4 className="text-xl text-neutral-800 tracking-tight font-old-school">
              Got more questions?<br />
              Chat with our team.
            </h4>
         
       
             <BookCallButton
                    
                      text="Book a call with us"
                      ariaLabel="Schedule a discovery call with our consulting team"
                    />
          </div>
        </div>

        {/* RIGHT ACCORDIONS */}
        <div className="flex flex-col order-none md:order-none">
          <h2 className="text-3xl sm:text-4xl md:text-[3.2rem] tracking-tight leading-[1.15] md:leading-[1] text-black mb-10 md:mb-16 max-w-xl font-old-school">
            Questions we get asked the most.
          </h2>

          <div className="flex flex-col border-t border-neutral-800/40">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="w-full border-b border-neutral-800/40">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className={`w-full flex items-center justify-between text-left py-5 md:py-6 px-3 md:px-5 rounded-xl group cursor-pointer transition-all duration-400 ease-out hover:bg-black ${
                      isOpen ? "bg-black" : ""
                    }`}
                  >
                    <span
                      className={`text-base sm:text-lg md:text-[1.15rem] tracking-tight font-old-school transition-colors duration-400 pr-4 ${
                        isOpen ? "text-white" : "text-black group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </span>
                    <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                      <span
                        className={`absolute w-3.5 h-[1.5px] transition-transform duration-300 ${
                          isOpen ? "bg-white rotate-0" : "bg-black group-hover:bg-white"
                        }`}
                      />
                      <span
                        className={`absolute w-[1.5px] h-3.5 transition-transform duration-300 ${
                          isOpen ? "bg-white rotate-90 scale-y-0" : "bg-black group-hover:bg-white"
                        }`}
                      />
                    </div>
                  </button>

                  <div id={`faq-content-${item.id}`} className="h-0 opacity-0 overflow-hidden">
                    <div className="px-3 md:px-5 pb-6 pt-2 text-sm sm:text-base font-old-school leading-relaxed max-w-2xl text-neutral-700">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;