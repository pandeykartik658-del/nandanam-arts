"use client";

import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;

