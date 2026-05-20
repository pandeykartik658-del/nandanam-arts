import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 bottom-0 w-[2px] z-[60] origin-top"
      style={{
        scaleY,
        background:
          "linear-gradient(180deg, hsl(280 40% 55% / 0.6), hsl(320 55% 55%), hsl(330 70% 65%))",
        boxShadow: "0 0 10px hsl(320 55% 55% / 0.6), 0 0 20px hsl(320 55% 55% / 0.3)",
      }}
    />
  );
};

export default ScrollProgress;
