"use client";

import { motion } from "framer-motion";

const FloatingElements = () => {
  const particles = Array.from({ length: 6 }).map((_, i) => ({
    size: Math.random() * 8 + 2,
    x: Math.random() * 100,
    yEnd: -10 - Math.random() * 20,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-5]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-10%] rounded-full bg-primary/30"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, filter: "blur(1px)" }}
          animate={{ y: [`0vh`, `${p.yEnd}vh`], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;

