"use client";
import React, { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// TopoJSON World Map data URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// 1. DATA FIX: Keys must match the exact string name properties inside the world-atlas JSON file
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

  // Calculate stats dynamically based on actual entries
  const totalCountriesWorked = Object.keys(konvoyClientData).length;
  const dominationPercentage = Math.round((totalCountriesWorked / 195) * 100);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    
    // Smoothly calculate exact overlay coordinates inside our section wrapper container
    const bounds = containerRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    setTooltipPos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#0f1011] border border-neutral-800/60 rounded-[32px] p-6 md:p-10 relative overflow-hidden select-none"
    >
      {/* HEADER BAR COUNTER */}
      <div className="flex flex-col gap-1 mb-6">
        <h3 className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
          Global Footprint
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-white font-old-school text-2xl md:text-3xl font-bold">
            World Domination
          </span>
          <span className="text-[#c8f135] font-old-school text-2xl md:text-3xl font-bold">
            {dominationPercentage}%
          </span>
        </div>
      </div>

      {/* RENDER INTERACTIVE WORLD MAP MAPBOX */}
      <div 
        className="relative w-full h-auto cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projectionConfig={{ scale: 140, center: [0, 10] }}
          width={800}
          height={400}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Extract plain text country name safely from geometry file properties
                const countryName = geo.properties.name; 
                const hasWorked = konvoyClientData[countryName];

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (hasWorked) {
                        setTooltipContent({ name: countryName, ...hasWorked });
                      } else {
                        setTooltipContent({ name: countryName, projects: 0, clients: [] });
                      }
                    }}
                    onMouseLeave={() => setTooltipContent(null)}
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
                    className="stroke-[#0f1011] stroke-[0.5px]"
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* FLOATING GLASS TOOLTIP */}
        {tooltipContent && (
          <div
            className="absolute z-50 pointer-events-none bg-[#17191c]/95 backdrop-blur-md border border-neutral-800 rounded-xl p-4 shadow-2xl min-w-[200px] max-w-xs transition-transform duration-75 ease-out transform -translate-x-1/2"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y - 15}px`, // Locks tooltip offset cleanly above your cursor path
              transform: "translate(-50%, -100%)"
            }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-neutral-800/60 pb-2 mb-2">
              <span className="text-white font-semibold text-sm tracking-wide block truncate max-w-[120px]">
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
                <ul className="text-xs text-neutral-300 space-y-1 list-disc pl-3">
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

      {/* METRICS LEGEND */}
      <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#4b4e54]" />
          <span>Active Client Region</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#232528]" />
          <span>Untapped Potential</span>
        </div>
      </div>
    </div>
  );
};

export default ClientWorldMap;