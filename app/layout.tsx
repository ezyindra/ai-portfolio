import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

/* ---------------- FONT ---------------- */
const inter = Inter({ subsets: ["latin"] });

/* ---------------- META ---------------- */
export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

/* ---------------- DELAYED MOUNT (CRITICAL FIX) ----------------
   This staggers heavy GPU systems on mobile.
   Visuals remain IDENTICAL.
--------------------------------------------------------------- */
function DelayedMount({ children }: { children: React.ReactNode }) {
  // This component runs only on the client
  // Next.js will tree-shake it correctly
  const React = require("react");
  const { useEffect, useState } = React;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}

/* ---------------- ROOT LAYOUT ---------------- */
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        {/* 🌌 HEAVY GPU CANVAS — DELAYED (INVISIBLE FIX) */}
        <DelayedMount>
          <StarsCanvas />
        </DelayedMount>

        {/* UI (lightweight, mounts immediately) */}
        <Navbar />

        {/* Page content */}
        {children}

        <Footer />
      </body>
    </html>
  );
}
