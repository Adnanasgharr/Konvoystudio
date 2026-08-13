"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookCallButton from "../ui/BookCallButton";
navigation
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_PREVIEW = {
  title: "Studio Capabilities",
  desc: "Hover over our core structural specifications to reveal architectural details and previews.",
  img: "/images/konvoy studio.gif",
};

const SERVICE_DATA = {
  webdev: {
    title: "Web Development",
    links: [
      { title: "Corporate Websites", slug: "corporate-websites", desc: "Enterprise-grade scalable platforms built to sustain heavy concurrent traffic layouts.", img: "/images/services/Konvoy studio corporate websites development.webp" },
      { title: "Business Websites", slug: "business-websites", desc: "Conversion-optimized technical architecture engineered for high-growth scaling teams.", img: "/images/services/Konvoy studio business websites.webp" },
      { title: "WordPress Development", slug: "wordpress-development", desc: "Bespoke decoupled headless configurations paired with lightning-fast frontend layers.", img: "/images/services/konvoy studio wordpress website development.webp" },
      { title: "E-Commerce Websites", slug: "ecommerce-websites", desc: "Seamless transactional pipelines featuring highly optimized visual checkout experiences.", img: "/images/services/ecommerce-websites-development.webp" },
      { title: "Landing Pages", slug: "landing-pages", desc: "Awwwards-grade digital storytelling layouts crafted specifically to capture engagement.", img: "/images/services/landing-page-design.webp" },
      { title: "Website Redesign", slug: "website-redesign", desc: "Complete visual, technical, and architectural structural overhauls with zero loss in search equity.", img: "/images/services/website-redesign-services.webp" },
      { title: "Website Maintenance", slug: "website-maintenance", desc: "Continuous optimization, performance auditing, system patches, and cloud server maintenance.", img: "/images/services/website-maintenance-services.jpeg" },
    ],
  },
  video: {
    title: "Video Production",
    links: [
      { title: "Social Media Videos", slug: "social-media-videos", desc: "Short-form videos built to stop the scroll and grow your brand on social.", img: "/images/services/social-media-videos.gif" },
      { title: "Promotional Ads", slug: "promotional-ads", desc: "High-impact visual advertising engineered to capture market attention on digital campaigns.", img: "/images/services/promotional-ads.gif" },
      { title: "AI Filmmaking", slug: "ai-filmmaking", desc: "AI-assisted production workflows built to accelerate video output without cutting quality.", img: "/images/services/ai-filmmaking.gif" },
      { title: "Post-Production Editing", slug: "post-production-editing", desc: "Precision digital color grading, directional sound design, and premium motion graphics workflows.", img: "/images/services/post-production.gif" },
    ],
  },
  brand: {
    title: "Graphic Design",
    links: [
      { title: "Logo & Branding", slug: "logo-and-branding", desc: "Strategic brand placement analysis, architectural positioning guidelines, and corporate messaging foundations.", img: "/assets/services/vlogo-and-branding.jpg" },
      { title: "Marketing Materials", slug: "marketing-materials", desc: "Bespoke mathematical vector marks, kinetic logo lockups, and diverse responsive variations.", img: "/assets/services/marketing-materials.jpg" },
      { title: "Social Media Graphics", slug: "social-media-graphics", desc: "Comprehensive design system guardrails outlining structural layout laws across digital environments.", img: "/assets/services/media-graphics.jpg" },
    ],
  },
  ai: {
    title: "AI Integrations",
    links: [
      { title: "RAG Systems", slug: "rag-systems", desc: "Proprietary vector pipeline embeddings and document indexing structures for custom data search layers.", img: "/assets/services/rag-systems.jpg" },
      { title: "Custom Voice Agents", slug: "custom-voice-agents", desc: "Low-latency voice interactions utilizing custom agent knowledge bases and real-time processing.", img: "/assets/services/voice-agents.jpg" },
      { title: "Automation Pipelines", slug: "automation-pipelines", desc: "End-to-end automated state handling, system-to-system data streaming, and autonomous workflow layers.", img: "/assets/services/automation-pipelines.jpg" },
    ],
  },
};

const Navbar = () => {
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const overlayBgRef = useRef(null);
  const burgerLine1Ref = useRef(null);
  const burgerLine2Ref = useRef(null);
  const previewImgRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [previewData, setPreviewData] = useState(DEFAULT_PREVIEW);
  const lastScrollY = useRef(0);

  const totalServices = Object.values(SERVICE_DATA).reduce(
    (acc, current) => acc + current.links.length,
    0
  );

  const handleLinkHover = (link) => {
    setPreviewData({ title: link.title, desc: link.desc, img: link.img });
    if (previewImgRef.current) {
      gsap.fromTo(
        previewImgRef.current,
        { filter: "blur(4px) brightness(0.6)" },
        { filter: "blur(0px) brightness(0.9)", duration: 0.35, ease: "power2.out" }
      );
    }
  };

  // 1. DESKTOP SERVICES DROPDOWN LIFECYCLE CONTROLLER
  useEffect(() => {
    if (!dropdownRef.current) return;
    const ctx = gsap.context(() => {
      if (isDropdownOpen) {
        gsap.timeline({ overwrite: "auto" })
          .to(dropdownRef.current, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.4, ease: "power4.out" })
          .to(".dropdown-col", { opacity: 1, y: 0, duration: 0.3, stagger: 0.02, ease: "power3.out" }, "-=0.25")
          .to(".dropdown-link-item", { opacity: 1, x: 0, duration: 0.2, stagger: 0.008, ease: "power2.out" }, "-=0.2");
      } else {
        gsap.to(dropdownRef.current, {
          opacity: 0, y: -8, scale: 0.9, pointerEvents: "none", duration: 0.25, ease: "power3.inOut",
          onComplete: () => setPreviewData(DEFAULT_PREVIEW)
        });
      }
    }, dropdownRef);

    return () => ctx.revert();
  }, [isDropdownOpen]);

  // 2. FULLSCREEN MOBILE OVERLAY LIFECYCLE CONTROLLER
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayBgRef.current) return;
    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
        gsap.to(burgerLine1Ref.current, { y: 2.75, rotate: 45, duration: 0.35, ease: "power4.out" });
        gsap.to(burgerLine2Ref.current, { y: -2.75, rotate: -45, duration: 0.35, ease: "power4.out" });

        gsap.timeline()
          .to(mobileMenuRef.current, { pointerEvents: "auto", duration: 0 })
          .to(overlayBgRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.65, ease: "power4.inOut" })
          .fromTo(".mobile-link-container a", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power4.out" }, "-=0.25")
          .fromTo(".mobile-menu-footer", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.3");
      } else {
        document.body.style.overflow = "";
        gsap.to(burgerLine1Ref.current, { y: 0, rotate: 0, duration: 0.3, ease: "power3.inOut" });
        gsap.to(burgerLine2Ref.current, { y: 0, rotate: 0, duration: 0.3, ease: "power3.inOut" });

        gsap.timeline()
          .to(".mobile-link-container a", { yPercent: -100, opacity: 0, duration: 0.35, stagger: 0.03, ease: "power3.in" })
          .to(".mobile-menu-footer", { opacity: 0, duration: 0.15 }, "-=0.3")
          .to(overlayBgRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 0.55, ease: "power4.inOut" }, "-=0.15")
          .to(mobileMenuRef.current, { pointerEvents: "none", duration: 0 });
      }
    });

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // 3. SMART NAVIGATION SCROLL MONITORS
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isMobileMenuOpen) return;

      if (currentScrollY > lastScrollY.current && isDropdownOpen) {
        setIsDropdownOpen(false);
      }

      if (currentScrollY > 120) {
        setIsVisible(currentScrollY < lastScrollY.current);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDropdownOpen, isMobileMenuOpen]);

  // 4. CAPSULE MORPHING TIMELINE
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=50",
          scrub: 0.3,
        },
      }).to(navRef.current, {
        maxWidth: isMd ? "1020px" : "calc(100% - 2rem)",
        height: "70px",
        backgroundColor: "rgba(11, 12, 13, 0.9)",
        backdropFilter: "blur(18px)",
        paddingLeft: isMd ? "36px" : "20px",
        paddingRight: isMd ? "14px" : "20px",
        marginTop: isMd ? "20px" : "10px",
        borderColor: "rgba(39, 39, 42, 0.5)",
        borderRadius: "9999px",
        // Removed dynamic shadow mapping to comply with flat design request
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[100] w-full flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <nav
          ref={navRef}
          className="relative pointer-events-auto flex items-center justify-between w-full max-w-full h-[95px] px-6 md:px-10 bg-transparent border border-transparent will-change-[max-width,padding,margin,height,background-color,border-color,border-radius,backdrop-filter]"
        >
          <div className="flex items-center shrink-0 z-[110]">
            <a href="/" className="text-white text-xl uppercase font-bold tracking-wider">
              Konvoy<span className="text-[#c8f135] inline-block">.</span>
            </a>
          </div>

          <ul className="hidden md:flex items-center gap-2 h-full">
            <li
              className="relative h-full flex items-center px-5 cursor-pointer group select-none"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="relative inline-flex items-center py-2">
                {/* Removed shadow from count bubble tag */}
                <div className="absolute -top-1.5 -right-3.5 flex items-center justify-center w-[17px] h-[17px] rounded-full bg-[#c8f135] text-[8.5px] font-mono font-bold text-neutral-950 transition-transform duration-300 group-hover:scale-110">
                  {totalServices}
                </div>
                <span className={`text-sm tracking-wide capitalize transition-colors duration-300 ${isDropdownOpen ? "text-[#c8f135]" : "text-neutral-300 group-hover:text-white"}`}>
                  Services
                </span>
                <span className={`absolute bottom-2 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left ${isDropdownOpen ? "scale-x-100 origin-left" : ""}`} />
              </div>
            </li>

            {["Work", "About", "Blog", "Contact"].map((item) => (
              <li key={item} className="relative h-full flex items-center px-5 cursor-pointer group">
                <div className="relative inline-flex items-center py-2">
                  <a href={`/${item.toLowerCase()}`} className="text-sm tracking-wide capitalize text-neutral-300 transition-colors duration-300 group-hover:text-white">
                    {item}
                  </a>
                  <span className="absolute bottom-2 left-0 right-0 h-[1.5px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 shrink-0 z-[110]">
            <div className="hidden md:block transition-transform duration-300 hover:scale-[1.02]">
              <BookCallButton />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden flex-col items-center justify-center w-11 h-11 bg-neutral-900 border border-neutral-800 rounded-full cursor-pointer transition-colors duration-300 gap-[4px]"
              aria-label="Toggle Navigation Menu Overlay"
            >
              <span ref={burgerLine1Ref} className="block w-5 h-[1.5px] bg-white rounded-full will-change-transform" />
              <span ref={burgerLine2Ref} className="block w-5 h-[1.5px] bg-white rounded-full will-change-transform" />
            </button>
          </div>

          {/* Desktop Mega Dropdown with absolute layout properties */}
          <div
            ref={dropdownRef}
            className="absolute top-full left-1/2 -translate-x-1/2 w-[92vw] max-w-[1140px] pt-4 pb-7 opacity-0 scale-[0.995] pointer-events-none origin-top flex cursor-default"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* Removed panel drop shadow wrapper formatting */}
            <div className="w-full bg-black border border-neutral-800/80 rounded-[32px] p-7 backdrop-blur-2xl flex gap-8">
              <div className="w-[28%] bg-neutral-900/30 border border-neutral-800/50 rounded-[22px] p-5 flex flex-col justify-between overflow-hidden relative group/portal shrink-0">
                <div className="flex flex-col gap-3">
                  <div className="w-full h-40 rounded-[14px] bg-neutral-950 overflow-hidden relative border border-neutral-800/60">
                    <img
  ref={previewImgRef}
  src={previewData.img}
  alt={previewData.title}
  className={`w-full h-full object-cover filter brightness-[0.85] transition-all duration-500 scale-100 group-hover/portal:scale-105 ${
    previewData.img === DEFAULT_PREVIEW.img
      ? "object-[center_50%]"
      : "object-top"
  }`}
/>
                    {/* Removed linear bottom gradient cover block completely */}
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <h5 className="text-white text-base tracking-wide font-medium">{previewData.title}</h5>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed min-h-[64px]">{previewData.desc}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between text-[10px] font-mono text-neutral-600 tracking-wider">
                  <span>KONVOY STUDIO</span>
                  <span>©2026</span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-4 gap-x-6 gap-y-7 py-2 pr-2">
                {Object.entries(SERVICE_DATA).map(([key, section]) => (
                  <div key={key} className="dropdown-col flex flex-col gap-3.5 opacity-0 transform translate-y-[12px]">
                    <div className="flex flex-col gap-0.5 border-b border-neutral-800/60 pb-2">
                      <h4 className="text-[14px] tracking-wide text-white capitalize whitespace-nowrap font-medium">{section.title}</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                      {section.links.map((link, i) => (
                        <a
                          key={i}
                          href={`/services/${link.slug}`}
                          className="dropdown-link-item group/item text-left cursor-pointer py-0.5 transform -translate-x-[6px]"
                          onMouseEnter={() => handleLinkHover(link)}
                        >
                          <span className="text-[12.5px] font-light text-neutral-400 group-hover/item:text-[#c8f135] transition-colors duration-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f135] transition-transform duration-300 scale-0 group-hover/item:scale-100 shrink-0" />
                            <span className="transform transition-transform duration-300 ease-out group-hover/item:translate-x-1">{link.title}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay remain unchanged but optimized container references layout */}
      <div ref={mobileMenuRef} className="fixed inset-0 z-[95] w-screen h-screen pointer-events-none flex flex-col overflow-hidden md:hidden">
        <div
          ref={overlayBgRef}
          className="absolute inset-0 bg-[#0f1011] w-full h-full flex flex-col justify-between pt-32 pb-10 px-6 sm:px-12 overflow-y-auto"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", willChange: "clip-path" }}
        >
          <div className="flex flex-col w-full max-w-lg mx-auto">
           
            <div className="flex flex-col w-full">
              <div className="mobile-link-container border-b border-neutral-800/60 overflow-hidden w-full">
                <a href="/services" className="flex items-center justify-between w-full py-5 text-left text-[11vw] xs:text-4xl tracking-tight text-neutral-400 hover:text-white transition-colors duration-300 relative group">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[11px] font-mono tracking-widest text-[#c8f135] font-light">01</span>
                    <span className="capitalize transform transition-transform duration-500 ease-out group-hover:translate-x-2">Services</span>
                  </div>
                  {/* Removed mix-blend-screen for flat styling accuracy on total service display */}
                  <span className="text-xs font-bold bg-[#c8f135] text-black px-2.5 py-1 rounded-full mr-2">{totalServices}</span>
                </a>
              </div>

              {[
                { label: "Our Work", href: "/work", number: "02" },
                { label: "About Studio", href: "/about", number: "03" },
                { label: "Blog", href: "/blog", number: "04" },
                { label: "Contact", href: "/contact", number: "05" },
              ].map((item, idx) => (
                <div key={idx} className="mobile-link-container border-b border-neutral-800/60 overflow-hidden w-full">
                  <a href={item.href} className="flex items-center justify-between w-full py-5 text-left text-[11vw] xs:text-4xl tracking-tight text-neutral-400 hover:text-white transition-colors duration-300 relative group">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[11px] font-mono tracking-widest text-[#c8f135] font-light">{item.number}</span>
                      <span className="capitalize transform transition-transform duration-500 ease-out group-hover:translate-x-2">{item.label}</span>
                    </div>
                    <svg className="w-5 h-5 text-neutral-600 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#c8f135]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-menu-footer w-full max-w-lg mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-neutral-900 opacity-0 will-change-transform">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono uppercase text-neutral-600 tracking-wider">Project Inquiry</span>
              <a href="mailto:hello@konvoy.studio" className="text-sm font-medium text-neutral-300 hover:text-[#c8f135] transition-colors">hello@konvoystudio.com</a>
            </div>
            <div className="block xs:hidden w-full"><BookCallButton /></div>
            <div className="flex gap-4 items-center">
              {[
                { label: "IG", href: "https://www.instagram.com/konvoystudio" },
                { label: "X", href: "#" }, // TODO: replace with actual X/Twitter profile URL
                { label: "FB", href: "#" }, // TODO: replace with actual Facebook page URL
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-xs text-neutral-500 hover:border-neutral-600 hover:text-white transition-all duration-300">{social.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;