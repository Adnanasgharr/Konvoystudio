"use client";
import React, { useRef, useState } from "react";

export default function VideoShowcase({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Visual Identity Block Label */}
      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
        // Media Node / Motion Preview
      </span>

      {/* Main Premium Video Container */}
      <div 
        onClick={togglePlay}
        data-cursor="play" // Hook for your global custom cursor logic to turn into "PLAY" / "PAUSE"
        className="w-full aspect-video bg-neutral-900 rounded-2xl overflow-hidden relative group cursor-pointer border border-neutral-300/40 shadow-sm"
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loop
          muted
          playsInline
        />

        {/* Ambient Dark Overlay Layer */}
        <div className={`absolute inset-0 bg-[#0F1011]/10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`} />

        {/* Dynamic Static UI Playback HUD Layer */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-3">
          <div className="h-7 px-3 rounded-full bg-[#F1F1F1]/90 backdrop-blur-md border border-neutral-300/40 inline-flex items-center justify-center shadow-sm">
            <span className="font-mono text-[10px] font-bold text-[#242021] uppercase tracking-wider">
              {isPlaying ? "Pause Media —" : "Play Showcase +"}
            </span>
          </div>
        </div>

        {/* Subtle Decorative Audio Vector Indicator */}
        {isPlaying && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-0.5 h-3">
            <span className="w-[2px] bg-[#F1F1F1] rounded-full animate-[pulse_0.8s_infinite_alternate]" />
            <span className="w-[2px] bg-[#F1F1F1] rounded-full h-2 animate-[pulse_0.5s_infinite_alternate]" style={{ animationDelay: '0.2s' }} />
            <span className="w-[2px] bg-[#F1F1F1] rounded-full h-3 animate-[pulse_0.7s_infinite_alternate]" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>
    </div>
  );
}