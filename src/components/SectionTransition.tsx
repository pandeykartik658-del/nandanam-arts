"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  variant?: "fade-rise" | "clip-reveal" | "split-curtain" | "scale-blur";
  className?: string;
}

const SectionTransition = ({ children, variant = "fade-rise", className = "" }: SectionTransitionProps) => {
  if (variant === "clip-reveal") {
    return (
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "scale-blur") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "split-curtain") {
    return (
      <div className={className}>
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Default: fade-rise
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
