"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SplashScreen = () => {
  useEffect(() => {
    const el = document.getElementById("ssr-splash");
    if (el) el.style.display = "none";
  }, []);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.8]);
  const letterSpacing = useTransform(scrollY, [0, 500], [6, 30]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        letterSpacing: useTransform(letterSpacing, (v) => `${v}px`),
      }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      {/* Subtle radial background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, hsl(300 25% 10%), hsl(300 20% 5%))`,
        }}
      />

      <div className="text-center relative z-10">
        <motion.h1
          className="font-display text-4xl md:text-7xl tracking-[6px] uppercase glow-text text-gradient-ivory"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Nandanam Centre of Arts
        </motion.h1>

        <div
          className="w-24 h-[1px] mx-auto mt-10"
          style={{ background: "linear-gradient(90deg, transparent, hsl(320 55% 55%), transparent)" }}
        />

        <motion.p
          className="font-display text-xs tracking-[5px] text-muted-foreground uppercase mt-10"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to discover ↓
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
