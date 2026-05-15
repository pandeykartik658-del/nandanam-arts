"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  variant?: "fade-rise" | "clip-reveal" | "split-curtain" | "scale-blur";
  className?: string;
}

const SectionTransition = ({ children, variant = "fade-rise", className = "" }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], [12, 4, 0]);
  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);

  if (variant === "clip-reveal") {
    return (
      <motion.div
        ref={ref}
        style={{
          opacity,
          clipPath: useTransform(clipProgress, (v) => `inset(${v}% 0% 0% 0%)`),
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "scale-blur") {
    return (
      <motion.div
        ref={ref}
        style={{
          opacity,
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "split-curtain") {
    const xLeft = useTransform(scrollYProgress, [0, 1], [-60, 0]);
    const xRight = useTransform(scrollYProgress, [0, 1], [60, 0]);

    return (
      <div ref={ref} className={className}>
        <motion.div style={{ opacity, x: xLeft }}>
          {children}
        </motion.div>
      </div>
    );
  }

  // Default: fade-rise
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;

