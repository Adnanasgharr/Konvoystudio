// Unified Portfolio Dataset mapped to core agency capabilities
export const studioProjects = [
  {
    id: "01",
    year: "2024",
    client: "Caravan",
    title: "Building a seamless coffee shop experience for a multi-location restaurant brand",
    tags: ["Website", "Next.js"], 
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-bar.webp", 
    featured: true,
    projectUrl: "https://caravanandco.com/"
  },
  {
    id: "02",
    year: "2025",
    client: "Pulse Media",
    title: "Video campaign that drove 2x engagement",
    tags: ["Video Editing", "Cinematics"],
    serviceSlug: "video-editing",
    video: "/images/projects/videos/Live-like-Gessiens.mp4", 
    image: "/images/video.jpg", 
    featured: true
  },
  {
    id: "03",
    year: "2024",
    client: "Mccarthy",
    title: "A corporate website built to match the scale of national construction projects",
    tags: ["Website", "Next.js"], 
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-construction.webp", 
    projectUrl: "https://www.mccarthy.com/"
  },
  {
    id: "04",
    year: "2025",
    client: "Pulse Media",
    title: "Video campaign that drove 2x engagement",
    tags: ["Video Editing", "Cinematics"],
    serviceSlug: "video-editing",
    video: "/images/projects/videos/GOOD DAY LYRIC VIDEO (version 2) (1).mp4", 
    image: "/images/video.jpg", 
    featured: true
  },
  {
    id: "05",
    year: "2025",
    client: "Shear Bliss Salon",
    title: "A booking-ready website for one of NYC's top-rated hair salons",
    tags: ["Website", "WordPress"],
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-salon-2.webp", 
    featured: true,
    projectUrl: "https://shearblissnyc.com/" 
  },
  {
    id: "06",
    year: "2024",
    client: "Mccarthy",
    title: "A corporate website built to match the scale of national construction projects",
    tags: ["Website", "Next.js"], 
    serviceSlug: "brand-identity",
    image: "/images/projects/konvoy-studio-project-construction.webp", 
    // Graphic Design gets high-res modal gallery payloads
    gallery: [
      "/images/websites.jpeg",
      "/images/brand.jpg",
      "/images/video.jpg"
    ]
  },
  {
    id: "07",
    year: "2025",
    client: "Heat Boot Camp",
    title: "Bringing community-first fitness culture to the web",
    tags: ["Website", "Next.js"],
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-gym-2.webp", 
    projectUrl: "https://heatbootcamp.com/" 
  },
  {
    id: "08",
    year: "2025",
    client: "Hand and Stone",
    title: "A booking experience built to match the calm of the spa itself",
    tags: ["Website", "WordPress"],
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-spa.webp", 
    projectUrl: "https://handandstone.com/" 
  },
  {
    id: "09",
    year: "2025",
    client: "Blow Dry Bar",
    title: "Building a beauty experience as polished as the blowouts themselves",
    tags: ["Website", "WordPress"],
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-salon.webp", 
    projectUrl: "https://blomedry.com/" 
  },
  {
    id: "10",
    year: "2026",
    client: "La Malavita",
    title: "Building a beauty experience as polished as the blowouts themselves",
    tags: ["Website", "WordPress"],
    serviceSlug: "websites",
    image: "/images/projects/websites/konvoy-studio-project-salon.webp", 
    projectUrl: "https://blomedry.com/" 
  }
];

export const filterCategories = [
  { name: "Explore All", slug: "all" },
  { name: "Brand Identity", slug: "brand-identity" },
  { name: "Websites", slug: "websites" },
  { name: "Video Editing", slug: "video-editing" },
  { name: "AI Integrations", slug: "ai-integrations" }
];