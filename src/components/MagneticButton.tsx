"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const MagneticButton = ({ children, to, className }: { children: React.ReactNode; to?: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 rounded-full" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  if (to) {
    return (
      <Link href={to} className="inline-block relative">
        {content}
      </Link>
    );
  }

  return <div className="inline-block relative">{content}</div>;
};


export default MagneticButton;

