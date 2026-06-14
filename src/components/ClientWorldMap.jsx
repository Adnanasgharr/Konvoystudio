"use client";
import React, { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// TopoJSON World Map data URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const konvoyClientData = {
  "United States of America": { projects: 14, clients: ["Alpha Corp", "Verge Digital", "Apex Labs"] },
  "Canada": { projects: 5, clients: ["Shopify Plus Partner", "North Studio"] },
  "France": { projects: 3, clients: ["Luxe Design", "Atelier Co."] },
  "Germany": { projects: 6, clients: ["Berlin Tech", "Autobahn Media"] },
  "India": { projects: 8, clients: ["Zeta Pay", "CryptoFlow"] },
  "China": { projects: 4, clients: ["Neo-Beijing Logistics"] },
  "Australia": { projects: 7, clients: ["Sydney Web Group", "Outback Digital"] },
  "New Zealand": { projects: 2, clients: ["Kiwi Creative"] },
  "Singapore": { projects: 9, clients: ["Merlion Venture", "Fintech SG"] },
};

const ClientWorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const totalCountriesWorked = Object.keys(konvoyClientData).length;
  const dominationPercentage = Math.round((totalCountriesWorked / 195) * 100);

  // Unified position mapper working across hover coordinates and click events
  const updateCoordinates = (event) => {
    if (!containerRef.current) return;
    
    const bounds = containerRef.current.getBoundingClientRect();
    // Support both mouse movements and standard single-touch event lists
    const clientX = event.clientX || (event.touches && event.touches[0]?.clientX);
    const clientY = event.clientY || (event.touches && event.touches[0]?.clientY);

    if (!clientX || !clientY) return;

    const x = clientX - bounds.left;
    const y = clientY - bounds.top;

    setTooltipPos({ x, y });
  };

  const handleMouseMove = (event) => {
    // Rely exclusively on hover trackers when desktop platforms are running
    if (window.matchMedia("(min-width: 1024px)").matches) {
      updateCoordinates(event);
    }
  };

  const handleCountryInteraction = (event, countryName, hasWorked) => {
    const isMobile = !window.matchMedia("(min-width: 1024px)").matches;
    
    if (isMobile) {
      // Mobile Toggles: Close tooltip if tapping the same active country twice
      if (tooltipContent && tooltipContent.name === countryName) {
        setTooltipContent(null);
      } else {
        updateCoordinates(event);
        setTooltipContent({
          name: countryName,
          ...(hasWorked || { projects: 0, clients: [] })
        });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#0f1011] border border-neutral-800/60 rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-10 relative overflow-hidden select-none"
    >
      {/* HEADER BAR COUNTER */}
      <div className="flex flex-col gap-1 mb-4 sm:mb-6">
        <h3 className="text-neutral-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          Global Footprint
        </h3>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-white font-old-school text-xl sm:text-2xl md:text-3xl font-bold">
            World Domination
          </span>
          <span className="text-[#c8f135] font-old-school text-xl sm:text-2xl md:text-3xl font-bold">
            {dominationPercentage}%
          </span>
        </div>
      </div>

      {/* RENDER INTERACTIVE WORLD MAP */}
      <div 
        className="relative w-full h-auto cursor-crosshair overflow-x-auto lg:overflow-x-visible scrollbar-none"
        onMouseMove={handleMouseMove}
      >
        {/* Min-width constraint prevents the map from shrinking into an unclickable ball on ultra-narrow phones */}
        <div className="min-w-[550px] md:min-w-full w-full h-auto">
          <ComposableMap
            projectionConfig={{ scale: 145, center: [0, 12] }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.name !== "Antarctica")
                  .map((geo) => {
                    const countryName = geo.properties.name; 
                    const hasWorked = konvoyClientData[countryName];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(e) => {
                          if (window.matchMedia("(min-width: 1024px)").matches) {
                            setTooltipContent({
                              name: countryName,
                              ...(hasWorked || { projects: 0, clients: [] })
                            });
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.matchMedia("(min-width: 1024px)").matches) {
                            setTooltipContent(null);
                          }
                        }}
                        onClick={(e) => handleCountryInteraction(e, countryName, hasWorked)}
                        style={{
                          default: {
                            fill: hasWorked ? "#4b4e54" : "#232528",
                            outline: "none",
                            transition: "fill 300ms ease",
                            pointerEvents: "auto"
                          },
                          hover: {
                            fill: hasWorked ? "#c8f135" : "#32353a",
                            outline: "none",
                            transition: "fill 150ms ease",
                            pointerEvents: "auto"
                          },
                          pressed: {
                            fill: "#c8f135",
                            outline: "none",
                          },
                        }}
                        className="stroke-[#0f1011] stroke-[0.6px] transition-colors duration-200"
                      />
                    );
                  })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* FLOATING GLASS TOOLTIP */}
        {tooltipContent && (
          <div
            className="absolute z-50 pointer-events-none bg-[#17191c]/95 backdrop-blur-md border border-neutral-800 rounded-xl p-3 sm:p-4 shadow-2xl min-w-[180px] sm:min-w-[200px] max-w-xs transition-all duration-100 ease-out transform -translate-x-1/2"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y - 12}px`,
              transform: "translate(-50%, -100%)"
            }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-neutral-800/60 pb-1.5 mb-1.5">
              <span className="text-white font-semibold text-xs sm:text-sm tracking-wide block truncate max-w-[110px]">
                {tooltipContent.name}
              </span>
              {tooltipContent.projects > 0 && (
                <span className="bg-[#c8f135] text-black text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {tooltipContent.projects} Projs
                </span>
              )}
            </div>

            {tooltipContent.projects > 0 ? (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Selected Clients:
                </span>
                <ul className="text-[11px] sm:text-xs text-neutral-300 space-y-0.5 list-disc pl-3">
                  {tooltipContent.clients.map((client, i) => (
                    <li key={i} className="leading-tight">{client}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span className="text-[10px] sm:text-[11px] text-neutral-500 italic block">
                No active studio ventures yet.
              </span>
            )}
          </div>
        )}
      </div>

      {/* METRICS LEGEND */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-[#4b4e54]" />
          <span>Active Client Region</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-[#232528]" />
          <span>Untapped Potential</span>
        </div>
        {/* Helper instruction flag visible on small screen devices only */}
        <span className="block lg:hidden text-[9px] text-neutral-600 italic mt-1 sm:mt-0">
          * Tap country boundaries to reveal client list details
        </span>
      </div>
    </div>
  );
};

export default ClientWorldMap;