import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
  direction: number; // 1 = forward, -1 = backward
}

const rotationalVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.8,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transformOrigin: "center center",
    transition: {
      duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.8,
    transformOrigin: direction > 0 ? "right center" : "left center",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const PageTransition = ({ children, pageKey, direction }: PageTransitionProps) => {
  return (
    <div style={{ perspective: "1200px", overflow: "hidden" }} className="min-h-screen">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pageKey}
          custom={direction}
          variants={rotationalVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
