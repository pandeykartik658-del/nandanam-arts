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

      {/* Pulse rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-primary/10"
          style={{ width: 200 + i * 160, height: 200 + i * 160 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeInOut",
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

        {/* Floating wine particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-primary/50"
            style={{
              left: `${10 + i * 9}%`,
              top: `${20 + (i % 5) * 14}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0.05, 0.6, 0.05],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SplashScreen;
