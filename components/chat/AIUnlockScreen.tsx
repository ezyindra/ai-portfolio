"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AIChat } from "./AIChat";

export const AIUnlockScreen = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!showChat) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black text-purple-400 text-3xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🔓 Decrypting Indra AI Vault...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl mb-4 text-purple-400 font-bold"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Welcome to Indra AI Vault
      </motion.h1>

      <p className="text-white/70 mb-8 text-center max-w-xl">
        You have successfully decrypted the vault.  
        This is Indra’s personal AI assistant — ask anything about him.
      </p>

      <AIChat />
    </motion.div>
  );
};
