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

  const updateCoordinates = (event) => {
    if (!containerRef.current) return;
    
    const bounds = containerRef.current.getBoundingClientRect();
    const clientX = event.clientX || (event.touches && event.touches[0]?.clientX);
    const clientY = event.clientY || (event.touches && event.touches[0]?.clientY);

    if (!clientX || !clientY) return;

    const x = clientX - bounds.left;
    const y = clientY - bounds.top;

    setTooltipPos({ x, y });
  };

  const handleMouseMove = (event) => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      updateCoordinates(event);
    }
  };

  const handleCountryInteraction = (event, countryName, hasWorked) => {
    const isMobile = !window.matchMedia("(min-width: 1024px)").matches;
    
    if (isMobile) {
      if (tooltipContent && tooltipContent.name === countryName) {
        setTooltipContent(null);
      } else {
        // Safe tracking placement coordinates
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
      className="w-full bg-black border border-neutral-800/60 sm:rounded-t-4xl p-4 sm:p-6 md:p-10 relative overflow-hidden select-none"
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

      {/* RENDER INTERACTIVE WORLD MAP (PROJECTION MATRIX FIX) */}
      <div 
        className="relative w-full h-auto cursor-crosshair overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Removed min-w constraints to guarantee 100% bleed scale container layout */}
        <div className="w-full h-auto overflow-hidden block">
          <ComposableMap
            projectionConfig={{ scale: 112, center: [0, 8] }}
            width={800}
            height={330}
            style={{ width: "100%", height: "auto", display: "block" }}
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

        {/* DESKTOP-ONLY FLOATING GLASS TOOLTIP */}
        {tooltipContent && (
          <div
            className="hidden lg:block absolute z-50 pointer-events-none bg-[#17191c]/95 backdrop-blur-md border border-neutral-800 rounded-xl p-4 shadow-2xl min-w-[200px] max-w-xs transition-all duration-100 ease-out transform -translate-x-1/2"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y - 12}px`,
              transform: "translate(-50%, -100%)"
            }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-neutral-800/60 pb-1.5 mb-1.5">
              <span className="text-white font-semibold text-sm tracking-wide block truncate max-w-[110px]">
                {tooltipContent.name}
              </span>
              {tooltipContent.projects > 0 && (
                <span className="bg-[#c8f135] text-black text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {tooltipContent.projects} Projs
                </span>
              )}
            </div>

            {tooltipContent.projects > 0 ? (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Selected Clients:
                </span>
                <ul className="text-xs text-neutral-300 space-y-0.5 list-disc pl-3">
                  {tooltipContent.clients.map((client, i) => (
                    <li key={i} className="leading-tight">{client}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span className="text-[11px] text-neutral-500 italic block">
                No active studio ventures yet.
              </span>
            )}
          </div>
        )}
      </div>

      {/* RESPONSIVE MOBILE ACCORDION CARD DRAWER (Zero Overflow Layout System) */}
      {tooltipContent && (
        <div className="block lg:hidden mt-4 w-full bg-[#111214] border border-neutral-800/80 rounded-xl p-4 transition-all duration-300 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
            <h4 className="text-white text-sm font-bold tracking-wide">
              {tooltipContent.name}
            </h4>
            {tooltipContent.projects > 0 ? (
              <span className="bg-[#c8f135] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {tooltipContent.projects} Projects
              </span>
            ) : (
              <span className="text-[10px] font-mono text-neutral-600 uppercase">Inactive</span>
            )}
          </div>
          {tooltipContent.projects > 0 ? (
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                Active Strategic Engagements:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-neutral-300 list-inside list-disc">
                {tooltipContent.clients.map((client, i) => (
                  <li key={i} className="truncate">{client}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs text-neutral-500 italic">
              No active operations localized inside this sector yet.
            </p>
          )}
        </div>
      )}

      {/* METRICS LEGEND BAR */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] sm:text-xs font-mono text-neutral-500 border-t border-neutral-900 pt-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#4b4e54]" />
            <span>Active Client Region</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#232528]" />
            <span>Untapped Potential</span>
          </div>
        </div>
        <span className="block lg:hidden text-[9px] text-neutral-600 italic">
          * Tap country nodes to securely access micro-metrics
        </span>
      </div>
    </div>
  );
};

export default ClientWorldMap;