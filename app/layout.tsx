"use client";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  const [enableHeavyFX, setEnableHeavyFX] = useState(false);

  useEffect(() => {
    // Delay + hardware check
    const timer = setTimeout(() => {
      if (!isLowEndDevice()) {
        setEnableHeavyFX(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        {/* 🌌 ONLY ENABLE HEAVY FX IF DEVICE CAN HANDLE IT */}
        {enableHeavyFX && <StarsCanvas />}

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  return memory <= 4 || cores <= 4;
}
