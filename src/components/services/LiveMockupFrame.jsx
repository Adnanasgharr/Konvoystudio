"use client";
import React from "react";

export default function LiveMockupFrame({ url }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Visual Identity Block Label */}
      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
        // Production Viewport / Live Render
      </span>

      {/* Browser Window UI Frame Container */}
      <div className="w-full border border-neutral-300/80 rounded-2xl overflow-hidden bg-[#F1F1F1] shadow-sm flex flex-col">
        
        {/* Browser Top Bar Panel Menu */}
        <div className="w-full h-10 px-4 bg-neutral-200/60 border-b border-neutral-300/60 flex items-center justify-between select-none">
          
          {/* Left Side: Traditional Mac Browser Navigation Dot Orbs */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300/80" />
          </div>

          {/* Center: Simplified Clean Target Link Node Track */}
          <div className="w-1/2 max-w-md h-6 px-3 rounded-md bg-[#F1F1F1]/90 border border-neutral-300/40 flex items-center justify-center">
            <span className="font-mono text-[9px] text-neutral-400 tracking-tight truncate select-all">
              {url.replace(/^https?:\/\//, "")}
            </span>
          </div>

          {/* Right Side Spacer layout anchor */}
          <div className="w-10 h-2" />
        </div>

        {/* Deep Embedded Sandbox Window Display Canvas Area */}
        <div className="w-full aspect-[4/3] sm:aspect-video bg-white relative">
          <iframe
            src={url}
            title={`Live showcase execution wrapper viewport rendering ${url}`}
            className="w-full h-full border-0 absolute inset-0 bg-white"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

      </div>
    </div>
  );
}