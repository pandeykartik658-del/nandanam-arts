"use client";

import { motion } from "framer-motion";

const SignatureMark = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-20 relative z-10">
      <svg width="360" height="90" viewBox="0 0 360 90" className="opacity-80">
        <defs>
          <linearGradient id="sig-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(330, 60%, 65%)" stopOpacity="0" />
            <stop offset="20%" stopColor="hsl(320, 55%, 55%)" />
            <stop offset="80%" stopColor="hsl(320, 55%, 55%)" />
            <stop offset="100%" stopColor="hsl(330, 60%, 65%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Shirorekha (Top line) */}
        <motion.path
          d="M 60,30 L 300,30"
          stroke="url(#sig-grad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {/* Stylized curves evoking "नन्दनम्" */}
        <motion.path
          d="M 80,30 Q 80,50 90,60 T 110,50 M 130,30 L 130,60 M 150,30 Q 150,50 160,60 T 180,50 M 200,30 L 200,60 M 220,30 Q 220,50 230,60 T 250,50 M 270,30 Q 280,60 290,40"
          stroke="url(#sig-grad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
        />

        {/* Tiny ornament dot */}
        <motion.circle
          cx="295"
          cy="45"
          r="1.5"
          fill="hsl(320, 55%, 55%)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2.6 }}
        />
      </svg>
      
      <motion.span 
        className="font-display text-2xl tracking-[10px] text-primary/30 mt-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2.8 }}
      >
        नन्दनम्
      </motion.span>
    </div>
  );
};

export default SignatureMark;

