"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromTop } from "@/lib/motion";
import EncryptionModal from "@/components/sub/encryption-modal";

export const Encryption = () => {
  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">

      {/* Background video (mobile-safe, same look) */}
      <video
        loop
        muted
        autoPlay
        playsInline
        preload="none"
        disablePictureInPicture
        controls={false}
        className="absolute inset-0 w-full h-full object-cover -z-10 will-change-transform transform-gpu"
      >
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      {/* Title */}
      <div className="absolute top-14 w-full flex justify-center z-10 px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          className="text-[32px] md:text-[40px] font-medium text-gray-200 text-center"
        >
          Performance{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          security.
        </motion.div>
      </div>

      {/* 🔒 CENTER LOCK (CLICKABLE + TRUE CENTER) */}
      <div className="relative z-20 flex flex-col items-center justify-center">

        <EncryptionModal
          trigger={
            <div className="cursor-pointer group flex flex-col items-center transform-gpu">
              <Image
                src="/lock-top.png"
                alt="Lock top"
                width={55}
                height={55}
                className="translate-y-4 transition-transform duration-300 motion-safe:group-hover:translate-y-8"
                priority
              />
              <Image
                src="/lock-main.png"
                alt="Lock main"
                width={80}
                height={80}
                className="z-10"
                priority
              />
              <span className="mt-4 text-xs tracking-widest uppercase text-white/60">
                Encrypted Section
              </span>
            </div>
          }
        />

      </div>

      {/* Footer text */}
      <div className="absolute bottom-8 w-full flex justify-center z-10 px-4">
        <div className="cursive text-[16px] md:text-[18px] font-medium text-gray-300 text-center">
          Secure your data with end-to-end encryption.
        </div>
      </div>

    </section>
  );
};
