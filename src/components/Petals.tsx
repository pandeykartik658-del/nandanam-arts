"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PetalsProps {
  count?: number;
  slow?: boolean;
}

const Petals = ({ count = 6, slow = false }: PetalsProps) => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const activeCount = Math.max(count, 30);
    const newPetals = Array.from({ length: activeCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: -Math.random() * 20,
      duration: (slow ? 15 : 8) + Math.random() * 10,
    }));
    setPetals(newPetals);
  }, [count, slow]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[20] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-10%] w-5 h-5 bg-primary/30 rounded-[100%_0_100%_0] shadow-[0_0_15px_hsl(320,55%,55%,0.2)]"
          initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, 50, -50, 0],
            rotate: 360,
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: `${petal.left}%`, willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
};

export default Petals;

