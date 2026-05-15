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
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 2.5]);
  const blur = useTransform(scrollY, [0, 600], [0, 20]);
  const letterSpacing = useTransform(scrollY, [0, 600], [6, 40]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        letterSpacing: useTransform(letterSpacing, (v) => `${v}px`),
      }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      {/* Deep wine radial bg */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 45%, hsl(320 40% 20% / 0.3), transparent 60%),
            radial-gradient(ellipse 80% 60% at 50% 50%, hsl(300 25% 8%), hsl(300 20% 5%))
          `,
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
        <div>
          <motion.h1
            className="font-display text-4xl md:text-7xl tracking-[6px] uppercase glow-text text-gradient-ivory"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Nandanam Centre of Arts
          </motion.h1>
        </div>

        <motion.div
          className="w-32 h-[1px] mx-auto mt-10"
          style={{ background: "linear-gradient(90deg, transparent, hsl(320 55% 55%), hsl(280 40% 45%), transparent)" }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.p
          className="font-display text-xs tracking-[5px] text-muted-foreground uppercase mt-10"
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
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
