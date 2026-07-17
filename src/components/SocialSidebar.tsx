"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";

// Reusable social blocks injected identically into both variants
const SocialLinks = () => (
  <>
    <a href="https://instagram.com/shashanknairdance" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-[1.3] group">
      <Instagram className="w-5 h-5 stroke-[url(#divine-grad)] group-hover:stroke-[#E1306C] drop-shadow-[0_0_8px_hsl(var(--primary)/0.2)] group-hover:drop-shadow-[0_0_12px_rgba(225,48,108,0.8)] transition-all duration-300" />
    </a>
    
    <a href="mailto:shashank.k.nair@gmail.com" className="opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-[1.3] group">
      <Mail className="w-5 h-5 stroke-[url(#divine-grad)] group-hover:stroke-[#D44638] drop-shadow-[0_0_8px_hsl(var(--primary)/0.2)] group-hover:drop-shadow-[0_0_12px_rgba(212,70,56,0.8)] transition-all duration-300" />
    </a>
    
    <a href="https://wa.me/918762174113" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-[1.3] group">
      <MessageCircle className="w-5 h-5 stroke-[url(#divine-grad)] group-hover:stroke-[#25D366] drop-shadow-[0_0_8px_hsl(var(--primary)/0.2)] group-hover:drop-shadow-[0_0_12px_rgba(37,211,102,0.8)] transition-all duration-300" />
    </a>
  </>
);

const SocialSidebar = ({ neverSettle = false }: { neverSettle?: boolean }) => {
  const { scrollYProgress } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtBottom(latest > 0.95);
  });

  return (
    <>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="divine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(330, 60%, 65%)">
              <animate attributeName="stop-color" values="hsl(330,60%,65%); hsl(280,40%,55%); hsl(320,55%,55%); hsl(330,60%,65%)" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="hsl(320, 55%, 55%)">
              <animate attributeName="stop-color" values="hsl(320,55%,55%); hsl(330,60%,65%); hsl(280,40%,55%); hsl(320,55%,55%)" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      <AnimatePresence>
        {(!isAtBottom || neverSettle) && (
          <motion.div
            key="sidebar-side"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed right-6 xl:right-10 top-[46%] -translate-y-1/2 z-[100] hidden md:flex flex-col items-center justify-center gap-6"
          >
            <div className="w-[1px] h-12 bg-gradient-to-t from-primary/60 to-transparent mb-2" />
            <div className="flex flex-col gap-6 items-center justify-center">
              <SocialLinks />
            </div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary/60 to-transparent mt-2" />
          </motion.div>
        )}
      </AnimatePresence>



    </>
  );
};

export default SocialSidebar;

