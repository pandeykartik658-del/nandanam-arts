"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

const Counter = ({ end, suffix = "", label }: CounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient-gold font-display">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

const InteractiveCounter = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
    <Counter end={25} suffix="+" label="Years of Legacy" />
    <Counter end={500} suffix="+" label="Students Trained" />
    <Counter end={12} label="Countries Reached" />
    <Counter end={100} suffix="+" label="Performances" />
  </div>
);

export default InteractiveCounter;

