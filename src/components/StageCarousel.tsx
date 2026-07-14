"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X, ZoomIn } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Image from "next/image";
import { optimizeImage } from "@/utils/image";

export interface StageItem {
  title: string;
  description: string;
  image: string | string[];
  eyebrow?: string;
  meta?: string;
}

interface StageCarouselProps {
  items: StageItem[];
  intervalMs?: number;
  ctaLabel?: string;
  Icon?: React.ElementType;
}

const WORD_LIMIT = 20;

export default function StageCarousel({ items, intervalMs = 9000, ctaLabel, Icon }: StageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [photoDirection, setPhotoDirection] = useState(1);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const currentItem = items[activeIndex];
  const images = Array.isArray(currentItem.image) ? currentItem.image : [currentItem.image];
  const hasMultipleImages = images.length > 1;

  // Next slide
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    setPhotoIdx(0);
    setExpanded(false);
  }, [items.length]);

  // Prev slide
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    setPhotoIdx(0);
    setExpanded(false);
  }, [items.length]);

  // Auto-advance removed as per user request

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") {
        setLightboxImg(null);
        setFlippedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Swipe support
  const touchStartRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartRef.current = null;
    setPaused(false);
  };

  const renderDescription = (text: string) => {
    const words = text.split(/\s+/);
    const isLong = words.length > WORD_LIMIT;
    if (!isLong) return <p className="font-luxury text-[16px] md:text-[17px] text-white/80 leading-[1.6] italic">{text}</p>;

    return (
      <div aria-expanded={expanded}>
        <motion.div animate={{ height: expanded ? "auto" : "4.5rem" }} className="overflow-hidden">
          <p className="font-luxury text-[16px] md:text-[17px] text-white/80 leading-[1.6] italic">
            {expanded ? text : words.slice(0, WORD_LIMIT).join(" ") + "…"}
          </p>
        </motion.div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="mt-1 text-[10px] uppercase tracking-widest text-primary hover:text-white transition-colors"
        >
          {expanded ? "Show less ▴" : "Read more ▾"}
        </button>
      </div>
    );
  };

  // Bento grid layout patterns based on image count
  const getBentoLayout = (count: number) => {
    if (count <= 1) return [{ col: "1 / -1", row: "1 / 3" }];
    if (count === 2) return [
      { col: "1 / 2", row: "1 / 3" },
      { col: "2 / 3", row: "1 / 3" },
    ];
    if (count === 3) return [
      { col: "1 / 3", row: "1 / 2" },
      { col: "1 / 2", row: "2 / 3" },
      { col: "2 / 3", row: "2 / 3" },
    ];
    if (count === 4) return [
      { col: "1 / 2", row: "1 / 3" },
      { col: "2 / 3", row: "1 / 2" },
      { col: "2 / 3", row: "2 / 3" },
      { col: "1 / 2", row: "3 / 4" },
    ];
    // 5+ images: featured hero + grid
    const layouts = [
      { col: "1 / 3", row: "1 / 3" }, // hero spanning 2 cols, 2 rows
    ];
    for (let i = 1; i < count; i++) {
      layouts.push({ col: "auto", row: "auto" });
    }
    return layouts;
  };

  return (
    <section 
      className="relative w-full py-8 md:py-16 overflow-visible focus-visible:outline-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
    >
      <div className="sr-only" aria-live="polite">
        Slide {activeIndex + 1} of {items.length} — {currentItem.title}.
        {hasMultipleImages && ` Photo ${photoIdx + 1} of ${images.length}.`}
      </div>

      <div className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center max-w-6xl mx-auto px-4 md:px-12" ref={containerRef}>
        
        {/* Left Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-0 md:left-4 z-50 p-3 rounded-full border border-primary/30 text-primary bg-background/50 backdrop-blur hover:bg-primary/20 transition-colors focus-visible:ring-2 ring-primary"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>

        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, index) => {
            const dist = (index - activeIndex + items.length) % items.length;
            const normalizedDist = dist > items.length / 2 ? dist - items.length : dist;
            
            if (Math.abs(normalizedDist) > 2) return null; // Only render nearby cards

            const isCenter = normalizedDist === 0;
            const xOffset = normalizedDist * 105;
            const scale = isCenter ? 1 : 0.72;
            const opacity = isCenter ? 1 : 0.35;
            const zIndex = 10 - Math.abs(normalizedDist);
            const delay = isCenter ? 0 : Math.min(Math.abs(normalizedDist), 2) * 0.06;

            const isFlipped = flippedIndex === index;
            const itemImages = Array.isArray(item.image) ? item.image : [item.image];
            const bentoLayout = getBentoLayout(itemImages.length);

            return (
              <motion.div
                key={`${index}-${item.title}`}
                className={`absolute inset-0 w-full max-w-md md:max-w-lg mx-auto ${isCenter ? "pointer-events-auto" : "pointer-events-auto cursor-pointer"}`}
                style={{ zIndex, perspective: "1000px" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: `${xOffset}%`,
                  scale,
                  opacity,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                    setPhotoIdx(0);
                    setExpanded(false);
                    setFlippedIndex(null);
                  }
                }}
              >
                <motion.div 
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                  
                  {/* FRONT SIDE */}
                  <div 
                    className="absolute inset-0 bg-card/40 backdrop-blur-md rounded-2xl border border-primary/30 overflow-hidden flex flex-col shadow-[0_0_60px_15px_hsl(320,55%,35%,0.3),_0_0_20px_hsl(45,80%,50%,0.15)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Edition Header Strip */}
                    {item.eyebrow && (
                      <div className="h-[8%] flex-shrink-0 flex justify-between items-center px-6 border-b border-white/10 bg-black/40">
                        <span className="font-display text-[10px] md:text-xs tracking-[5px] text-primary/85 uppercase">{item.eyebrow}</span>
                        <span className="font-luxury italic text-[10px] md:text-xs text-white/55">{item.meta}</span>
                      </div>
                    )}

                  <div
                    className="relative w-full h-[68%] md:h-[73%] overflow-hidden bg-black/60 cursor-pointer"
                    onClick={(e) => {
                      if (isCenter && hasMultipleImages) {
                        e.stopPropagation();
                        setPhotoDirection(1);
                        setPhotoIdx((prev) => (prev + 1) % itemImages.length);
                      }
                    }}
                  >
                    {itemImages.length > 1 && (
                      <div className="absolute top-4 right-4 z-20 glass-surface px-3 py-1 rounded-full">
                        <span className="font-mono text-xs text-white/80 tracking-widest">
                          0{(isCenter ? photoIdx : 0) + 1} / 0{itemImages.length}
                        </span>
                      </div>
                    )}
                    <AnimatePresence initial={false} mode="popLayout" custom={photoDirection}>
                      {isCenter ? (
                        <motion.div
                          key={`photo-${photoIdx}`}
                          className="absolute inset-0"
                          style={{ overflow: "hidden" }}
                          custom={photoDirection}
                          initial={(dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 })}
                          animate={{ x: 0, opacity: 1 }}
                          exit={(dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 1 })}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          {itemImages[photoIdx] && (
                            <img 
                              src={optimizeImage(itemImages[photoIdx], 1600)} 
                              alt={item.title || "Performance"}
                              loading="lazy"
                              style={{ 
                                position: "absolute",
                                top: 0, left: 0,
                                width: "100%", height: "100%",
                                objectFit: "contain", 
                                objectPosition: "center",
                                opacity: 0.95,
                              }}
                            />
                          )}
                          <div className="absolute inset-0 bg-primary/5" />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0" style={{ overflow: "hidden" }}>
                          {itemImages[0] && (
                            <img 
                              src={optimizeImage(itemImages[0], 1600)} 
                              alt={item.title || "Performance"}
                              loading="lazy"
                              style={{ 
                                position: "absolute",
                                top: 0, left: 0,
                                width: "100%", height: "100%",
                                objectFit: "contain", 
                                objectPosition: "center",
                                opacity: 0.7,
                              }}
                            />
                          )}
                          <div className="absolute inset-0 bg-primary/5" />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Area */}
                  <div 
                    className="h-[24%] md:h-[19%] flex-grow px-5 py-3 md:py-4 flex flex-col select-none border-t border-white/5 bg-black/20"
                    onDoubleClick={() => {
                      if (isCenter) setFlippedIndex(isFlipped ? null : index);
                    }}
                  >
                    <h3 className="font-display text-2xl md:text-3xl tracking-[2px] font-medium text-gradient-rose-wine mb-1 shrink-0">
                      {item.title}
                    </h3>
                    <div 
                      className="flex-grow overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20"
                      style={{ touchAction: "pan-y" }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      onWheel={(e) => e.stopPropagation()}
                    >
                      {renderDescription(item.description)}
                    </div>
                  </div>

                </div>

                {/* ═══════════════════════════════════════════ */}
                {/* BACK SIDE — Immersive Bento Gallery        */}
                {/* ═══════════════════════════════════════════ */}
                <div 
                  className="absolute inset-0 rounded-2xl flex flex-col"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)", 
                    overflow: "hidden",
                    background: "linear-gradient(160deg, hsl(320 25% 6%) 0%, hsl(260 15% 4%) 40%, hsl(320 20% 8%) 100%)",
                    border: "1px solid hsl(320 55% 35% / 0.4)",
                    boxShadow: "0 0 80px 20px hsl(320 55% 30% / 0.25), inset 0 1px 0 hsl(320 55% 50% / 0.15)",
                  }}
                  onDoubleClick={() => setFlippedIndex(null)}
                >
                  {/* Decorative top line */}
                  <div className="h-[2px] w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent, hsl(320 55% 55% / 0.6), hsl(45 80% 55% / 0.3), hsl(320 55% 55% / 0.6), transparent)" }} />
                  
                  {/* Header */}
                  <div className="relative shrink-0 flex items-center justify-between px-4 py-3" style={{ background: "linear-gradient(180deg, hsl(320 20% 10% / 0.8), transparent)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                      <span className="font-display text-[9px] tracking-[5px] text-primary/80 uppercase">Gallery</span>
                    </div>
                    <span className="font-display text-[10px] tracking-[4px] text-white/50 uppercase">{item.title}</span>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFlippedIndex(null); }}
                      className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-primary hover:border-primary/40 transition-all duration-300"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {/* Bento Grid Gallery */}
                  <div className="flex-grow p-2.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20" style={{ overflow: "hidden auto" }}>
                    <div 
                      className="grid gap-1.5 h-full"
                      style={{ 
                        gridTemplateColumns: itemImages.length <= 2 ? "1fr" : "repeat(3, 1fr)",
                        gridAutoRows: "1fr",
                      }}
                    >
                      {itemImages.filter(Boolean).map((img, i) => {
                        const layout = bentoLayout[i] || { col: "auto", row: "auto" };
                        // Random subtle rotations for scattered feel
                        const rotation = i === 0 ? 0 : ((i % 2 === 0 ? 1 : -1) * (0.5 + (i % 3) * 0.3));
                        
                        return (
                          <motion.div 
                            key={i} 
                            className="relative group cursor-pointer rounded-lg"
                            style={{ 
                              gridColumn: layout.col,
                              gridRow: layout.row,
                              overflow: "hidden",
                              minHeight: "70px",
                            }}
                            initial={{ opacity: 0, scale: 0.8, rotate: rotation * 3 }}
                            animate={{ opacity: 1, scale: 1, rotate: rotation }}
                            transition={{ 
                              duration: 0.6, 
                              delay: i * 0.07,
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              rotate: 0, 
                              zIndex: 20,
                              transition: { duration: 0.3 }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxImg(optimizeImage(img, 2000));
                            }}
                          >
                            {/* Image */}
                            <img 
                              src={optimizeImage(img, 800)} 
                              loading="lazy"
                              alt={`${item.title} - Photo ${i+1}`}
                              style={{ 
                                position: "absolute",
                                top: 0, left: 0,
                                width: "100%", height: "100%",
                                objectFit: "cover", 
                                objectPosition: "center",
                                transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease",
                              }}
                              className="group-hover:scale-[1.15] group-hover:brightness-110"
                            />

                            {/* Shimmer border on hover */}
                            <div 
                              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{ 
                                boxShadow: "inset 0 0 0 1.5px hsl(320 55% 55% / 0.5), 0 0 20px hsl(320 55% 45% / 0.3)",
                              }}
                            />

                            {/* Bottom gradient with number */}
                            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-between px-2.5 pb-2">
                              <span className="font-mono text-[10px] text-white/90 tracking-wider">{String(i+1).padStart(2, '0')}</span>
                              <ZoomIn size={12} className="text-white/70" />
                            </div>

                            {/* Top-right glow dot */}
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "hsl(320 55% 55%)", boxShadow: "0 0 8px hsl(320 55% 55% / 0.8)" }} />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="shrink-0 flex items-center justify-center gap-3 py-2 px-4 border-t border-white/5" style={{ background: "linear-gradient(0deg, hsl(320 20% 8% / 0.6), transparent)" }}>
                    <div className="flex gap-1">
                      {itemImages.filter(Boolean).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40" />
                      ))}
                    </div>
                    <span className="text-[8px] tracking-[3px] uppercase text-white/20 font-display">{itemImages.filter(Boolean).length} photos</span>
                    <div className="flex gap-1">
                      {itemImages.filter(Boolean).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40" />
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
            );
          })}
        </AnimatePresence>
        {/* Right Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-0 md:right-4 z-50 p-3 rounded-full border border-primary/30 text-primary bg-background/50 backdrop-blur hover:bg-primary/20 transition-colors focus-visible:ring-2 ring-primary"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Navigation Indicators (Dots & CTA) */}
      <div className="mt-8 flex flex-col items-center gap-6 max-w-xl mx-auto px-4">
        <div className="flex items-center gap-3">
          {items.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveIndex(i); 
                setPhotoIdx(0); 
              }}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary w-8" : "bg-primary/30 w-2"}`}
              aria-label={`Go to slide ${i + 1}`}
              tabIndex={i === activeIndex ? 0 : -1}
            />
          ))}
        </div>

        {ctaLabel && (
           <MagneticButton onClick={() => {}} className="bg-primary/10 border border-primary/30 text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-display tracking-[2px] uppercase text-xs flex items-center gap-2">
             {Icon && <Icon size={14} />}
             {ctaLabel}
           </MagneticButton>
        )}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "hsl(0 0% 0% / 0.92)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            {/* Close button */}
            <button 
              type="button"
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40 transition-all"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLightboxImg(null);
              }}
            >
              <X size={20} />
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImg}
                alt="Full size view"
                style={{ 
                  maxWidth: "90vw", 
                  maxHeight: "85vh", 
                  objectFit: "contain",
                  borderRadius: "12px",
                  boxShadow: "0 0 100px hsl(320 55% 35% / 0.3), 0 25px 50px hsl(0 0% 0% / 0.5)",
                }}
              />
              {/* Glow frame */}
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px hsl(320 55% 55% / 0.2)" }}
              />
            </motion.div>

            {/* Hint text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="text-[10px] tracking-[4px] uppercase text-white/30 font-display">Click anywhere or press ESC to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
