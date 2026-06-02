"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookCallButton from "../BookCallButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusable link item with font-old-school type system styling
const NavLink = ({ label, href = "#" }) => {
  return (
    <li className="group">
      <a
        href={href}
        className="relative block py-1 font-old-school text-[15px] capitalize text-neutral-300 tracking-wide transition-colors duration-300 group-hover:text-white cursor-pointer"
      >
        <span>{label}</span>
        <span 
          className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c8f135] scale-x-0 origin-right transition-transform duration-450 group-hover:scale-x-100 group-hover:origin-left" 
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
        />
      </a>
    </li>
  );
};

// Awwwards-grade Mobile Fullscreen Link Element with staggered reveals
const MobileMenuLink = ({ label, href = "#", number, countBadge }) => {
  return (
    <div className="mobile-link-container border-b border-neutral-800/60 overflow-hidden w-full">
      <a 
        href={href} 
        className="flex items-center justify-between w-full py-5 text-left text-[11vw] xs:text-4xl font-old-school tracking-tight text-neutral-400 hover:text-white transition-colors duration-300 relative group"
      >
        <div className="flex items-baseline gap-4">
          <span className="text-[11px] font-mono tracking-widest text-[#c8f135] font-light">
            {number}
          </span>
          <span className="capitalize transform transition-transform duration-500 ease-out group-hover:translate-x-2">
            {label}
          </span>
        </div>
        
        {countBadge ? (
          <span className="text-xs font-bold bg-[#c8f135] text-black px-2.5 py-1 rounded-full mix-blend-screen mr-2">
            {countBadge}
          </span>
        ) : (
          <svg className="w-5 h-5 text-neutral-600 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#c8f135]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        )}
      </a>
    </div>
  );
};

const Navbar = () => {
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const overlayBgRef = useRef(null);
  const burgerLine1Ref = useRef(null);
  const burgerLine2Ref = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // 1. DESKTOP SERVICES DROPDOWN LIFECYCLE CONTROLLER
  useEffect(() => {
    if (!dropdownRef.current) return;
    if (isDropdownOpen) {
      gsap.to(dropdownRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.98,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power3.inOut",
      });
    }
  }, [isDropdownOpen]);

  // 2. AWWWARDS FULLSCREEN MOBILE OVERLAY LIFECYCLE CONTROLLER (GSAP Sequential Animation Grid)
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayBgRef.current) return;

    if (isMobileMenuOpen) {
      // Prevent body scrolling when the overlay is fully operational
      document.body.style.overflow = "hidden";

      // Morph Hamburger into Symmetrical "X" Close Cross
      gsap.to(burgerLine1Ref.current, { y: 3, rotate: 45, duration: 0.4, ease: "power4.out" });
      gsap.to(burgerLine2Ref.current, { y: -3, rotate: -45, duration: 0.4, ease: "power4.out" });

      // Run Fullscreen Slide and Content Stagger pipeline Sequence
      gsap.timeline()
        .to(mobileMenuRef.current, { pointerEvents: "auto", duration: 0 })
        .to(overlayBgRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
          ease: "power4.inOut"
        })
        .fromTo(".mobile-link-container a", 
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(".mobile-menu-footer",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        );
    } else {
      document.body.style.overflow = "";

      // Revert Menu Button back to baseline parallel tracking lines
      gsap.to(burgerLine1Ref.current, { y: 0, rotate: 0, duration: 0.3, ease: "power3.inOut" });
      gsap.to(burgerLine2Ref.current, { y: 0, rotate: 0, duration: 0.3, ease: "power3.inOut" });

      // Run Inverse Stage Dismissal Sequence
      gsap.timeline()
        .to(".mobile-link-container a", { yPercent: -100, opacity: 0, duration: 0.4, stagger: 0.04, ease: "power3.in" })
        .to(".mobile-menu-footer", { opacity: 0, duration: 0.2 }, "-=0.4")
        .to(overlayBgRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.65,
          ease: "power4.inOut"
        }, "-=0.2")
        .to(mobileMenuRef.current, { pointerEvents: "none", duration: 0 });
    }
  }, [isMobileMenuOpen]);

  // 3. SMART NAVIGATION SCROLL MONITORS
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isMobileMenuOpen) return; // Freeze transform modifications if fullscreen view is engaged

      if (currentScrollY > lastScrollY.current && isDropdownOpen) {
        setIsDropdownOpen(false);
      }

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDropdownOpen, isMobileMenuOpen]);

  // 4. CAPSULE MORPHING TIMELINE (Full width -> Floating Dock capsule)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=40", 
          scrub: 0.2,  
        }
      })
      .to(navRef.current, {
        maxWidth: window.matchMedia("(min-width: 768px)").matches ? "960px" : "100%",
        height: window.matchMedia("(min-width: 768px)").matches ? "64px" : "70px",
        backgroundColor: "rgba(23, 25, 28, 0.85)",
        paddingLeft: window.matchMedia("(min-width: 768px)").matches ? "32px" : "20px",
        paddingRight: window.matchMedia("(min-width: 768px)").matches ? "10px" : "20px",
        marginTop: window.matchMedia("(min-width: 768px)").matches ? "20px" : "10px",
        borderColor: "rgba(63, 63, 70, 0.4)",
        boxShadow: "0 24px 50px -12px rgba(0, 0, 0, 0.6)",
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HEADER BAR TRACK FRAME */}
      <header 
        className={`fixed top-0 left-0 z-[100] w-full px-4 sm:px-6 pointer-events-none flex justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          ref={navRef}
          className="relative pointer-events-auto flex items-center justify-between w-full max-w-full h-[80px] md:h-[90px] px-4 mt-0 bg-transparent border border-transparent backdrop-blur-md rounded-full will-change-[max-width,padding,margin,height]"
        >
          {/* BRAND LOGO ELEMENT */}
          <div className="flex items-center shrink-0 z-[110]">
            <a href="#" className="text-white text-xl sm:text-2xl font-bold tracking-tight cursor-pointer">
              Konvoy<span className="text-[#c8f135]">.</span>
            </a>
          </div>

          {/* DESKTOP EXCLUSIVE VIEW NAVIGATION LINKS BAR */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 px-4 h-full">
            <li 
              className="relative h-full flex items-center cursor-pointer group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="relative py-1">
                <span className={`font-old-school text-[15px] capitalize tracking-wide transition-colors duration-300 ${isDropdownOpen ? "text-[#c8f135]" : "text-neutral-300 group-hover:text-white"}`}>
                  Services
                </span>
                <span className="absolute -top-1.5 -right-5 flex items-center justify-center text-[9px] font-bold bg-[#c8f135] text-black w-4 h-4 rounded-full">
                  13
                </span>
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#c8f135] transition-transform duration-450 ${
                    isDropdownOpen ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
                />
              </div>

              {/* DESKTOP DROPDOWN CONTAINER */}
              <div
                ref={dropdownRef}
                className="absolute w-[680px] bg-[#17191c] border border-neutral-800/80 rounded-[28px] p-8 grid grid-cols-[1.2fr_1fr] gap-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)] opacity-0 scale-[0.98] pointer-events-none origin-top will-change-transform cursor-default"
                style={{ top: "calc(100% + 12px)", left: "calc(50% + 80px)", transform: "translateX(-50%)" }}
              >
                <div className="absolute -top-1.5 left-[calc(50%-80px)] -translate-x-1/2 w-3 h-3 bg-[#17191c] border-t border-l border-neutral-800/80 rotate-45" />
                <div className="flex flex-col gap-6 justify-center">
                  {[
                    { title: "Web Design", desc: "Deliver your business to a wider audience" },
                    { title: "Craft CMS", desc: "The most reliable way to build a website" },
                    { title: "Branding", desc: "Creating brands you're proud of" },
                    { title: "SEO", desc: "Get your brand seen online" },
                    { title: "Shopify", desc: "Custom Shopify store in 4 weeks" }
                  ].map((item, index) => (
                    <a href="#" key={index} className="group/item block select-none">
                      <h4 className="text-[15px] font-semibold text-white tracking-wide transition-colors duration-200 group-hover/item:text-[#c8f135]">
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-neutral-500 font-normal mt-0.5 tracking-normal">
                        {item.desc}
                      </p>
                    </a>
                  ))}
                </div>
                <div className="bg-[#121315] border border-neutral-800/40 rounded-2xl p-6 flex flex-col justify-between overflow-hidden group/card cursor-pointer">
                  <div>
                    <h4 className="text-[15px] font-semibold text-white tracking-wide">View all Services</h4>
                    <p className="text-[12px] text-neutral-400 font-normal mt-2 leading-relaxed">
                      We don't stop there, check out all the services we offer here at Shape.
                    </p>
                  </div>
                  <div className="relative w-full h-[125px] mt-4 rounded-xl overflow-hidden bg-neutral-900">
                    <img 
                      src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop" 
                      alt="Shape Agency Feature View" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 filter grayscale-[30%] opacity-80"
                    />
                  </div>
                </div>
              </div>
            </li>
            <NavLink label="Work" href="#work" />
            <NavLink label="About" href="#about" />
            <NavLink label="Blog" href="#blog" />
            <NavLink label="Contact" href="#contact" />
          </ul>

          {/* ACTION BUTTON WRAPPER */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 z-[110]">
            <div className="hidden xs:block">
              <BookCallButton />
            </div>

            {/* AWWWARDS BURGER BUTTON METER ENGINE:
                Visible exclusively on mobile layouts. Controls full-screen state triggers.
            */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden flex-col items-center justify-center w-11 h-11 bg-neutral-900/90 border border-neutral-800/80 rounded-full cursor-pointer focus:outline-none"
              aria-label="Toggle structural navigation menu layer"
            >
              <div className="w-5 h-[5px] flex flex-col justify-between items-center relative">
                <span ref={burgerLine1Ref} className="block w-full h-[1.5px] bg-white rounded-full will-change-transform" />
                <span ref={burgerLine2Ref} className="block w-full h-[1.5px] bg-white rounded-full will-change-transform" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* 📱 EXPERT LEVEL FULLSCREEN OVERLAY COMPONENT LAYER:
          Uses precise CSS Polygon Clip Paths combined with GSAP arrays to drive rich stagger patterns.
      */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[95] w-screen h-screen pointer-events-none flex flex-col overflow-hidden"
      >
        {/* Dynamic Clipping Mask Panel Frame Background */}
        <div 
          ref={overlayBgRef}
          className="absolute inset-0 bg-[#0f1011] w-full h-full flex flex-col justify-between pt-32 pb-10 px-6 sm:px-12"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", willChange: "clip-path" }}
        >
          {/* Main Links Container */}
          <div className="flex flex-col w-full max-w-lg mx-auto">
            <span className="text-[11px] font-mono tracking-widest text-neutral-600 uppercase mb-4 block">
              Navigation Menu
            </span>
            <div className="flex flex-col w-full">
              <MobileMenuLink label="Services" href="#services" number="01" countBadge="13" />
              <MobileMenuLink label="Our Work" href="#work" number="02" />
              <MobileMenuLink label="About Studio" href="#about" number="03" />
              <MobileMenuLink label="Insights" href="#blog" number="04" />
              <MobileMenuLink label="Get in Touch" href="#contact" number="05" />
            </div>
          </div>

          {/* Overlay Footer Block */}
          <div className="mobile-menu-footer w-full max-w-lg mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-neutral-900 opacity-0 will-change-transform">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono uppercase text-neutral-600 tracking-wider">Project Inquiry</span>
              <a href="mailto:hello@konvoy.studio" className="text-sm font-medium text-neutral-300 hover:text-[#c8f135] transition-colors">
                hello@konvoy.studio
              </a>
            </div>
            
            {/* Inline Action block fallback for tiny viewports */}
            <div className="block xs:hidden w-full">
              <BookCallButton />
            </div>

            <div className="flex gap-4 items-center">
              {["TW", "IG", "LN"].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-xs text-neutral-500 hover:border-neutral-600 hover:text-white transition-all duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;