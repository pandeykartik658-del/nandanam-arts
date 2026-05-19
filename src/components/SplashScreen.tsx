"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SplashScreen = () => {
  // Hide the server-rendered splash once the animated version mounts
  useEffect(() => {
    const el = document.getElementById("ssr-splash");
    if (el) el.style.display = "none";
  }, []);
  const { scrollY } = useScroll();
  
  // Simple, clear fade out on scroll
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -100]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />

      <div className="text-center relative z-10 px-4">
        <h1 className="font-display text-4xl md:text-7xl tracking-[8px] uppercase text-gradient-ivory drop-shadow-md">
          Nandanam Centre of Arts
        </h1>

        <motion.div
          className="w-24 h-[1px] mx-auto mt-10"
          style={{ background: "linear-gradient(90deg, transparent, hsl(320 55% 55%), transparent)" }}
          animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.p
          className="font-display text-[10px] md:text-xs tracking-[6px] text-primary/80 uppercase mt-10"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to discover ↓
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
