"use client";

import { motion } from "framer-motion";

const MovingBackground = ({ speed = 1 }: { speed?: number }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-10]">
      {/* Deep wine base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 15%, hsl(300 30% 14% / 0.9), transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 25%, hsl(280 25% 12% / 0.7), transparent 45%),
            radial-gradient(ellipse 90% 70% at 50% 80%, hsl(320 20% 8% / 0.8), transparent 55%),
            linear-gradient(145deg, hsl(300 25% 6%) 0%, hsl(310 20% 10%) 40%, hsl(280 18% 14%) 100%)
          `,
        }}
      />

      {/* Ambient wine glow 1 */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(320 55% 45% / 0.12) 0%, transparent 70%)",
          left: "-5%",
          top: "10%",
          willChange: "transform",
        }}
        animate={{
          x: ["-5%", "8%", "-3%", "10%", "-5%"],
          y: ["0%", "5%", "-5%", "3%", "0%"],
        }}
        transition={{ duration: 25 * speed, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient plum orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(280 40% 35% / 0.12) 0%, transparent 65%)",
          right: "-5%",
          bottom: "20%",
          willChange: "transform",
        }}
        animate={{
          x: ["5%", "-10%", "8%", "-5%", "5%"],
          y: ["0%", "-6%", "4%", "-2%", "0%"],
          rotate: [0, 15, -10, 5, 0],
        }}
        transition={{ duration: 30 * speed, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(330 35% 20% / 0.2) 0%, transparent 60%)",
          willChange: "transform",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 15 * speed, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Watercolor stain texture layers */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 40% 30% at 30% 20%, hsl(330 50% 40%), transparent),
            radial-gradient(ellipse 35% 40% at 70% 60%, hsl(280 30% 30%), transparent),
            radial-gradient(ellipse 50% 25% at 50% 80%, hsl(300 40% 25%), transparent)
          `,
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.006]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(320 55% 55% / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(320 55% 55% / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};

export default MovingBackground;
