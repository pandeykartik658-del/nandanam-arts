import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageVeilTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Top veil */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[100] pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        exit={{ height: "50vh" }}
        transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        style={{
          background:
            "linear-gradient(180deg, hsl(280 30% 8%) 0%, hsl(320 45% 18%) 60%, hsl(320 55% 35% / 0.4) 100%)",
          boxShadow: "0 8px 40px hsl(320 55% 55% / 0.4)",
        }}
      />
      {/* Bottom veil */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 bottom-0 z-[100] pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        exit={{ height: "50vh" }}
        transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        style={{
          background:
            "linear-gradient(0deg, hsl(280 30% 8%) 0%, hsl(320 45% 18%) 60%, hsl(320 55% 35% / 0.4) 100%)",
          boxShadow: "0 -8px 40px hsl(320 55% 55% / 0.4)",
        }}
      />
      {children}
    </motion.div>
  );
};

export default PageVeilTransition;
