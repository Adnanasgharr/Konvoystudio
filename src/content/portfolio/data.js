// 1. Unified Portfolio Dataset mapped to your core Service Slugs
export const studioProjects = [
  {
    id: "01",
    year: "2026",
    client: "Neon Labs",
    title: "Building a bold brand identity from scratch",
    tags: ["Branding", "Visual System"], 
    serviceSlug: "brand-identity",
    image: "/images/brand.jpg", 
  },
  {
    id: "02",
    year: "2026",
    client: "Vertex Studio",
    title: "Redesigning the digital production experience",
    tags: ["Next.js", "Tailwind CSS"], 
    serviceSlug: "websites",
    image: "/images/websites.jpeg", 
  },
  {
    id: "03",
    year: "2025",
    client: "Pulse Media",
    title: "Video campaign that drove 2x engagement",
    tags: ["Video Editing", "Cinematics"],
    serviceSlug: "video-editing",
    video: "/cover2.mp4", 
    image: "/images/video.jpg", 
  },
  {
    id: "04",
    year: "2025",
    client: "Drift Co.",
    title: "E-commerce overhaul with conversion focus",
    tags: ["Conversion Optimizations", "Funneling"],
    serviceSlug: "digital-strategy",
    image: "/images/brand.jpg", 
  },
  {
    id: "05",
    year: "2026",
    client: "AskUni Labs",
    title: "Custom conversational voice layers and automation",
    tags: ["RAG Engine", "Voice Agents"],
    serviceSlug: "ai-integrations",
    image: "/images/websites.jpeg", 
  }
];

// 2. Filter system referencing your core capabilities matrix
export const filterCategories = [
  { name: "Explore All", slug: "all" },
  { name: "Brand Identity", slug: "brand-identity" },
  { name: "Websites", slug: "websites" },
  { name: "Video Editing", slug: "video-editing" },
  { name: "Digital Strategy", slug: "digital-strategy" },
  { name: "AI Integrations", slug: "ai-integrations" }
];