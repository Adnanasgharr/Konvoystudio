import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-24 lg:pt-32 pb-[12vw] overflow-hidden">
      
      {/* 1. TOP BLOCK: Action Heading & Direct Access Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full z-10">
        <div className="lg:col-span-7 xl:col-span-8">
          <p className="text-sm font-semibold tracking-widest text-neutral-500 uppercase mb-4 pl-1">
            Have an idea?
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.05] uppercase">
            Let's build something <br />
            <span className="font-sans italic lowercase font-light font-abc-arizona text-[#c8f135] pr-2">extraordinary</span> 
            together.
          </h2>
        </div>

        {/* Big Action Link Column */}
        <div className="lg:col-span-5 xl:col-span-4 flex items-end lg:justify-end lg:pt-0 pt-6">
          <a 
            href="mailto:hello@konvoy.studio" 
            className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-medium border-b border-neutral-700 pb-2 overflow-hidden w-full lg:w-auto"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#c8f135]">
              hello@konvoy.studio
            </span>
            <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 text-neutral-500 group-hover:text-[#c8f135]">
              →
            </span>
          </a>
        </div>
      </div>

      {/* 2. MIDDLE BLOCK: Categorized Directories & System Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-6 w-full mt-16 lg:mt-auto z-10 pb-12 border-t border-neutral-900 pt-12">
        
        {/* Navigation Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] text-neutral-600 uppercase font-bold">Navigation</span>
          <ul className="flex flex-col gap-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
            <li><a href="#about" className="hover:text-white transition-colors duration-200">About</a></li>
            <li><a href="#services" className="hover:text-white transition-colors duration-200">Services</a></li>
            <li><a href="#work" className="hover:text-white transition-colors duration-200">Our Work</a></li>
          </ul>
        </div>

        {/* Social Framework Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] text-neutral-600 uppercase font-bold">Socials</span>
          <ul className="flex flex-col gap-2 text-sm text-neutral-400">
            <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">LinkedIn</a></li>
            <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">X / Twitter</a></li>
            <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">Dribbble</a></li>
          </ul>
        </div>

        {/* Studio Coordinates Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] text-neutral-600 uppercase font-bold">Location</span>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Digital Agency <br />
            Operating Globally <br />
            <span className="text-neutral-600">Based in PK</span>
          </p>
        </div>

        {/* System Time / Rights Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 md:items-start lg:items-end lg:text-right">
          <span className="text-[10px] tracking-[0.2em] text-neutral-600 uppercase font-bold">Copyright</span>
          <p className="text-sm text-neutral-500 leading-relaxed mt-auto">
            &copy; {new Date().getFullYear()} Konvoy Studio. <br />
            All rights reserved.
          </p>
        </div>

      </div>

      {/* 3. BASE BACKGROUND LAYER: Massive Scaled Brand Typography */}
      {/* Reduced the translate-y slightly to compensate for the taller viewbox architecture */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0 overflow-hidden select-none translate-y-[8%]">
        {/* 👈 FIXED: Expanded height boundary component scale from 160 to 270 to allow font-size 260 to fit perfectly */}
        <svg 
          viewBox="0 0 1000 270" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto block" 
          preserveAspectRatio="xMinYMax meet"
        >
          <text 
            x="50%" 
            y="300" /* 👈 FIXED: Moved rendering line slightly up from the baseline edge to block crop issues */
            dominantBaseline="auto" 
            textAnchor="middle" 
            fill="#121212" 
            fontSize="260" 
            fontWeight="900" 
            letterSpacing="-8"
          >
            KONVOY
          </text>
        </svg>
      </div>

    </footer>
  );
};

export default Footer;