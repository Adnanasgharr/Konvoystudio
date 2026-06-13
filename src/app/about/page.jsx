import React from "react";
import AboutHero from "@/components/about/AboutHero"; // Adjust this path based on where you saved your file
import AboutStory from "@/components/about/AboutStory";
import Metrics from "@/components/about/Metrics";
import MissionValues from "@/components/about/MissionValues";
import ClientWorldMap from "@/components/ClientWorldMap";

export default function AboutPage() {
  return (
    <main className="w-full relative bg-[#FDFCF7]">
      {/* Dynamic Image Track Hero Section */}
      <AboutHero />
      
      
      
        <AboutStory/>
           <Metrics/>
        <MissionValues/>
        <ClientWorldMap/>
     
        
     
    </main>
  );
}