export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: "https://www.konvoystudio.com/sitemap.xml",
  };
}