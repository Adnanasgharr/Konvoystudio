import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ReactLenis } from "lenis/react"; // 👈 add this
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/layout/Footer";

const neueHaas = localFont({
  src: "./fonts/NeueHaasDisplayMedium.ttf",
  weight: "500",
  variable: "--font-neue-haas",
  
});

const abcArizona = localFont({
  src: "./fonts/ABCArizonaSerif-Light.ttf",
  weight: "400",
  variable: "--font-abc-arizona",
})

const oldSchool = localFont({
  src: "./fonts/OldschoolGrotesk-NormalRegular.otf",
  weight: "400",
  variable: "--font-old-school",
})

const rlMadena = localFont({
  src: "./fonts/RL-Madena.otf",
  weight: "100",
  variable: "--font-rl-madena",
})

const montreal = localFont({
  src: "./fonts/Montreal Bold.otf",
  weight: "400",
  variable: "--font-montreal",
})

export const metadata = {
  metadataBase: new URL("https://www.konvoystudio.com"),

  title: {
    default: "Konvoy Studio | Web Development, Video & Creative Agency",
    template: "%s | Konvoy Studio",
  },

  description:
    "Konvoy Studio is an independent creative agency offering custom web development, brand identity, graphic design, video production, and AI integrations for businesses worldwide.",

  keywords: [
    "web development agency",
    "custom website development",
    "video production studio",
    "graphic design agency",
    "brand identity design",
    "AI integration services",
    "Next.js development agency",
    "creative agency Karachi",
    "creative agency Pakistan",
  ],

  authors: [{ name: "Konvoy Studio" }],
  creator: "Konvoy Studio",
  publisher: "Konvoy Studio",

  alternates: {
    canonical: "https://www.konvoystudio.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.konvoystudio.com",
    siteName: "Konvoy Studio",
    title: "Konvoy Studio | Web Development, Video & Creative Agency",
    description:
      "Custom web development, brand identity, graphic design, video production, and AI integrations — one studio, no outsourcing.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630px — place in public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Konvoy Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Konvoy Studio | Web Development, Video & Creative Agency",
    description:
      "Custom web development, brand identity, graphic design, video production, and AI integrations.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={`${neueHaas.className} ${abcArizona.variable} ${oldSchool.variable} ${rlMadena.variable} ${montreal.variable} antialiased `}>
        <CustomCursor />
        <ReactLenis root> 
          <Navbar />
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}