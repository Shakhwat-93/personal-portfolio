import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ProfileSidebar from "@/components/layout/ProfileSidebar";
import NavigationDock from "@/components/layout/NavigationDock";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shakhwat Hossain Rasel | Frontend Architect",
  description: "Premium Digital Experiences & Technical Excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} bg-black text-white selection:bg-white selection:text-black`}
      >
        <SmoothScroll>
          <div className="flex min-h-screen">
            {/* Left Sidebar */}
            <ProfileSidebar />

            {/* Main Scrollable Content */}
            <main className="flex-1 xl:ml-[400px] xl:mr-[100px] w-full min-h-screen relative z-10">
              {children}
            </main>

            {/* Right Dock */}
            <NavigationDock />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
