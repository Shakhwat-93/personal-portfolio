import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ProfileSidebar from "@/components/layout/ProfileSidebar";
import NavigationDock from "@/components/layout/NavigationDock";
import "@/app/globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/neue-montreal/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
});

export const metadata: Metadata = {
  title: "Shakhwat Hossain Rasel | Frontend Architect",
  description: "Premium Digital Experiences & Technical Excellence.",
};

import LayoutContent from "@/components/layout/LayoutContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className={`${neueMontreal.variable} font-sans bg-black text-white selection:bg-white selection:text-black`}
        style={{ fontFamily: 'var(--font-neue-montreal)' }}
      >
        <SmoothScroll>
          <LayoutContent>
            {children}
          </LayoutContent>
        </SmoothScroll>
      </body>
    </html>
  );
}
