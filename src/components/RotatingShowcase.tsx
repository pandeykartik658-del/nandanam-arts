"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { optimizeCloudinary } from "@/utils/image";

const RotatingShowcase = ({ images, type }: { images: any[]; type: "dance" | "music" }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const len = images.length;
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  const next = useCallback(() => { setDirection(1); setCurrent((p) => (p + 1) % len); }, [len]);
  const prev = useCallback(() => { setDirection(-1); setCurrent((p) => (p - 1 + len) % len); }, [len]);

  // Autoplay — also advances on click/drag/keyboard
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 1 }),
  };



  return (
    <motion.div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY, transformPerspective: 800 }}
      className="relative w-full max-w-[640px] mx-auto focus:outline-none"
    >
      <div
        className="relative h-[340px] md:h-[420px] overflow-hidden rounded-2xl border border-primary/15 glow-wine bg-background/50 backdrop-blur-sm shadow-2xl cursor-pointer"
        onClick={next}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, info) => {
              if (info.offset.x < -40) { setDirection(1); setCurrent((p) => (p + 1) % len); }
              else if (info.offset.x > 40) { setDirection(-1); setCurrent((p) => (p - 1 + len) % len); }
            }}
          >
            <motion.div 
              className="w-full h-full absolute inset-0"
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
            >
              {type === "dance" ? (
                <Image 
                  src={optimizeCloudinary(images[current].src)} 
                  alt={images[current].caption} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale-[15%] contrast-110 pointer-events-none select-none" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center relative pointer-events-none select-none" style={{ background: images[current].gradient }}>
                  <div className="absolute inset-8 border border-primary/10 rounded-full opacity-40 mix-blend-overlay" />
                  <motion.span 
                    className="font-display text-8xl text-primary/20 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                    animate={{ rotate: prefersReducedMotion ? 0 : [0, 6, -6, 0], scale: [1, 1.05, 1] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {images[current].glyph}
                  </motion.span>
                  <span className="font-display text-sm tracking-[8px] uppercase text-foreground/50">{images[current].label}</span>
                </div>
              )}
            </motion.div>
            
            {/* Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/95 via-background/40 to-transparent flex items-end justify-center pb-6 pointer-events-none">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display italic text-primary/80 tracking-widest text-sm drop-shadow-md"
              >
                {images[current].caption}
              </motion.span>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-surface flex items-center justify-center text-foreground/50 hover:text-primary transition-all duration-300 hover:scale-110 shadow-lg z-10">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-surface flex items-center justify-center text-foreground/50 hover:text-primary transition-all duration-300 hover:scale-110 shadow-lg z-10">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-6 items-center">
        {images.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className="relative h-4 w-4 flex items-center justify-center outline-none group p-2">
            <div className={`rounded-full transition-all duration-400 ${i === current ? "w-2.5 h-2.5 bg-primary shadow-[0_0_10px_hsl(var(--primary))]" : "w-1.5 h-1.5 bg-muted-foreground/30 group-hover:bg-primary/50 group-hover:scale-125"}`} />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default RotatingShowcase;

