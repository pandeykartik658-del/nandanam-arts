"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

interface SlideImage {
  id: number;
  src: string;
  title: string;
  subtitle: string;
}

const SLIDE_IMAGES: SlideImage[] = [
  {
    id: 1,
    src: "/assets/about-slide-1.jpeg",
    title: "Divine Mudras",
    subtitle: "Sacred hand gestures translating spiritual stories into tangible emotion.",
  },
  {
    id: 2,
    src: "/assets/about-slide-2.jpeg",
    title: "Graceful Rhythms",
    subtitle: "The exquisite balance of movement, expression, and absolute devotion.",
  },
  {
    id: 3,
    src: "/assets/about-slide-3.jpeg",
    title: "Legacy of Expression",
    subtitle: "Carrying forward the ancient lineages of classical Indian storytelling.",
  },
  {
    id: 4,
    src: "/assets/about-slide-4.jpeg",
    title: "Sadhana of Movement",
    subtitle: "A lifetime of rigorous practice transformed into effortless artistic worship.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.5 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.5 },
    },
  }),
};

export default function AboutImagesSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = Math.abs(page % SLIDE_IMAGES.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDotClick = (index: number) => {
    const currentActive = activeIndex;
    if (index === currentActive) return;
    const dir = index > currentActive ? 1 : -1;
    setPage([page + (index - currentActive), dir]);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, page]);

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 mt-8 mb-20">
      {/* Decorative Top Accent line */}
      <div 
        className="w-[150px] h-[1px] mx-auto mb-8"
        style={{ background: "linear-gradient(90deg, transparent, hsl(320 55% 55% / 0.5), transparent)" }}
      />
      
      {/* Section Title */}
      <div className="text-center mb-10">
        <span className="font-display text-[10px] tracking-[6px] uppercase text-primary mb-2 block glow-text">
          Showcase Gallery
        </span>
        <h3 className="font-display text-2xl md:text-3xl tracking-[3px] text-white">
          Expressions of Nandanam
        </h3>
      </div>

      {/* Main Single Image Frame Container */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-primary/30 glow-wine bg-black/40 group"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={SLIDE_IMAGES[activeIndex].src}
              alt={SLIDE_IMAGES[activeIndex].title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              loading="lazy"
              className="object-cover object-center contrast-105 saturate-95"
            />
            {/* Dark Vignette Overlay for rich contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Side Arrows - Premium Glassmorphism */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
          <motion.button
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 sm:p-4 rounded-full glass-surface border border-primary/20 text-primary hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-colors pointer-events-auto backdrop-blur-md shadow-lg"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 sm:p-4 rounded-full glass-surface border border-primary/20 text-primary hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-colors pointer-events-auto backdrop-blur-md shadow-lg"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        {/* Floating Caption Box - Premium Design */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 z-10 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeIndex}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-surface border border-primary/20 rounded-2xl p-4 sm:p-6 max-w-[500px] backdrop-blur-xl pointer-events-auto"
            style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)' }}
          >
            <span className="font-display text-[9px] sm:text-[10px] tracking-[4px] uppercase text-primary font-semibold mb-1 block">
              Slide {activeIndex + 1} of {SLIDE_IMAGES.length}
            </span>
            <h4 className="font-display text-lg sm:text-xl md:text-2xl tracking-[1px] text-white font-medium mb-1.5 sm:mb-2">
              {SLIDE_IMAGES[activeIndex].title}
            </h4>
            <p className="font-body text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {SLIDE_IMAGES[activeIndex].subtitle}
            </p>
          </motion.div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full glass-surface border border-primary/20 text-primary hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 duration-300"
          aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Indicators (Dots & Lines Combo) */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {SLIDE_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="relative p-2 focus:outline-none group"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                idx === activeIndex
                  ? "w-8 bg-primary shadow-[0_0_10px_hsl(320_55%_55%/0.6)]"
                  : "w-2.5 bg-muted-foreground/35 hover:bg-primary/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
