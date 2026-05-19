"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SplashScreen = () => {
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    const el = document.getElementById("ssr-splash");
    if (el) el.style.display = "none";
  }, []);

  const { scrollY } = useScroll();
  // Only two GPU-friendly transforms: opacity and scale (no letterSpacing)
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.4]);

  // Once scrolled past threshold, unmount heavy content entirely
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      if (v > 400 && !isGone) setIsGone(true);
      if (v <= 400 && isGone) setIsGone(false);
    });
    return unsubscribe;
  }, [scrollY, isGone]);

  if (isGone) return null;

  return (
    <motion.div
      style={{
        opacity,
        scale,
        willChange: "transform, opacity",
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

      {/* Pulse rings — static on mobile, animated on desktop */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute rounded-full border border-primary/10 splash-ring"
          style={{
            width: 200 + i * 160,
            height: 200 + i * 160,
            animationDelay: `${i * 0.9}s`,
          }}
        />
      ))}

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

        {/* Floating wine particles — CSS only, no JS animation per frame */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-primary/50 splash-particle"
            style={{
              left: `${10 + i * 9}%`,
              top: `${20 + (i % 5) * 14}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SplashScreen;
