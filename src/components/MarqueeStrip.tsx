"use client";

import { motion } from "framer-motion";

const MarqueeStrip = () => {
  const terms = ["Adavu", "Tala", "Raga", "Bhava", "Mudra", "Laya", "Shruti", "Nritta"];
  const strip = [...terms, ...terms, ...terms].map((t, i) => (
    <div key={i} className="flex items-center">
      <span className="mx-6 font-display text-2xl md:text-4xl uppercase tracking-[8px] text-white/15">
        {t}
      </span>
      <span className="font-display text-xl md:text-2xl text-primary/40">◈</span>
    </div>
  ));

  return (
    <div className="w-full overflow-hidden py-24 relative select-none pointer-events-none">
      {/* Edge Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap"
        style={{ willChange: "transform" }}
        animate={{ x: [0, -2000] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {strip}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;

