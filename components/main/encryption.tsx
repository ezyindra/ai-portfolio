"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromTop } from "@/lib/motion";
import EncryptionModal from "@/components/sub/encryption-modal";

export const Encryption = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background video */}
      <video
        loop
        muted
        autoPlay
        playsInline
        preload="false"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      {/* Title (top) */}
      <div className="absolute top-16 w-full flex justify-center z-10">
        <motion.div
          variants={slideInFromTop}
          className="text-[40px] font-medium text-gray-200 text-center"
        >
          Performance{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          security.
        </motion.div>
      </div>

      {/* 🔒 CENTER LOCK (CLICKABLE) */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        
        {/* This is the clickable lock */}
        <EncryptionModal
          trigger={
            <div className="cursor-pointer group flex flex-col items-center">
              <Image
                src="/lock-top.png"
                alt="Lock top"
                width={55}
                height={55}
                className="translate-y-4 transition-all duration-300 group-hover:translate-y-8"
              />
              <Image
                src="/lock-main.png"
                alt="Lock main"
                width={80}
                height={80}
                className="z-10"
              />
              <span className="mt-4 text-xs tracking-widest uppercase text-white/60">
                Encrypted Section
              </span>
            </div>
          }
        />

      </div>

      {/* Footer text */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <div className="cursive text-[18px] font-medium text-gray-300 text-center">
          Secure your data with end-to-end encryption.
        </div>
      </div>

    </section>
  );
};
