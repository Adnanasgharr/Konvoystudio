import { servicesData } from "@/content/services";

export default function sitemap() {
  const baseUrl = "https://www.konvoystudio.com";

  const staticPages = [
    { url: `${baseUrl}`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));

  const servicePages = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages];
}