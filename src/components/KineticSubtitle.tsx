"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const defaultWords = ["Discipline", "Devotion", "Expression", "Rhythm", "Grace"];

const KineticSubtitle = ({ words = defaultWords }: { words?: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div className="relative inline-flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 15, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, filter: "blur(2px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="font-display tracking-[6px] uppercase text-sm md:text-base text-primary/70 block text-center"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default KineticSubtitle;

