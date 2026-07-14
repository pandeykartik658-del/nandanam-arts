"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Image from "next/image";
import { optimizeCloudinary } from "@/utils/image";

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
    if (!isLong) return <p className="font-luxury text-[13px] md:text-sm text-white/80 leading-[1.6] italic">{text}</p>;

    return (
      <div aria-expanded={expanded}>
        <motion.div animate={{ height: expanded ? "auto" : "3rem" }} className="overflow-hidden">
          <p className="font-luxury text-[13px] md:text-sm text-white/80 leading-[1.6] italic">
            {expanded ? text : words.slice(0, WORD_LIMIT).join(" ") + "…"}
          </p>
        </motion.div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-[10px] uppercase tracking-widest text-primary hover:text-white transition-colors"
        >
          {expanded ? "Show less ▴" : "Read more ▾"}
        </button>
      </div>
    );
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
          onClick={prevSlide}
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
            const xOffset = normalizedDist * 105; // 105% of its own width so they don't overlap
            const scale = isCenter ? 1 : 0.72;
            const opacity = isCenter ? 1 : 0.35;
            const zIndex = 10 - Math.abs(normalizedDist);
            const delay = isCenter ? 0 : Math.min(Math.abs(normalizedDist), 2) * 0.06;

            const isFlipped = flippedIndex === index;
            const itemImages = Array.isArray(item.image) ? item.image : [item.image];

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

                  {/* Image Container */}
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
                          className="absolute inset-0 overflow-hidden"
                          custom={photoDirection}
                          initial={(dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 })}
                          animate={{ x: 0, opacity: 1 }}
                          exit={(dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 1 })}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          {itemImages[photoIdx] && (
                            <Image 
                              src={optimizeCloudinary(itemImages[photoIdx])} 
                              alt={item.title || "Performance"}
                              fill
                              unoptimized
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="opacity-95"
                              style={{ objectFit: "cover", objectPosition: "center" }}
                            />
                          )}
                          <div className="absolute inset-0 bg-primary/5" />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 overflow-hidden">
                          {itemImages[0] && (
                            <Image 
                              src={optimizeCloudinary(itemImages[0])} 
                              alt={item.title || "Performance"}
                              fill
                              unoptimized
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="opacity-70"
                              style={{ objectFit: "cover", objectPosition: "center" }}
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
                    <h3 className="font-display text-xl md:text-2xl tracking-[2px] font-medium text-gradient-rose-wine mb-1 shrink-0">
                      {item.title}
                    </h3>
                    <div className="flex-grow overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20">
                      {renderDescription(item.description)}
                    </div>
                  </div>

                </div>

                {/* BACK SIDE (Creative Collage) */}
                <div 
                  className="absolute inset-0 rounded-2xl border border-primary/40 shadow-[0_0_60px_15px_hsl(320,55%,35%,0.3),_0_0_20px_hsl(45,80%,50%,0.15)] flex flex-col overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, hsl(320 30% 8%) 0%, hsl(280 20% 5%) 50%, hsl(320 30% 10%) 100%)" }}
                  onDoubleClick={() => setFlippedIndex(null)}
                >
                  {/* Header with close hint */}
                  <div className="relative w-full text-center py-3 shrink-0 border-b border-primary/20" style={{ background: "linear-gradient(90deg, transparent, hsl(320 55% 35% / 0.15), transparent)" }}>
                    <span className="font-display text-[10px] tracking-[6px] text-primary/90 uppercase">✦ {item.title} ✦</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFlippedIndex(null); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Creative Masonry Grid */}
                  <div className="flex-grow p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
                    <div className={`grid gap-2 auto-rows-[minmax(80px,1fr)] ${
                      itemImages.length <= 2 ? 'grid-cols-1' :
                      itemImages.length <= 4 ? 'grid-cols-2' :
                      'grid-cols-3'
                    }`}>
                      {itemImages.filter(Boolean).map((img, i) => {
                        // Alternate between tall and wide cells for visual interest
                        const isFeatured = i === 0;
                        const isWide = !isFeatured && i % 3 === 1 && itemImages.length > 3;
                        const spanClass = isFeatured && itemImages.length > 2
                          ? 'col-span-2 row-span-2' 
                          : isWide 
                            ? 'col-span-2' 
                            : '';

                        return (
                          <motion.div 
                            key={i} 
                            className={`relative overflow-hidden rounded-xl group cursor-pointer ${spanClass}`}
                            style={{ 
                              minHeight: isFeatured ? '180px' : '100px',
                              boxShadow: '0 0 15px hsl(320 55% 35% / 0.2), inset 0 0 20px hsl(0 0% 0% / 0.3)'
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                          >
                            <Image 
                              src={optimizeCloudinary(img, 500)} 
                              fill
                              unoptimized
                              loading="lazy"
                              sizes="(max-width: 768px) 50vw, 33vw"
                              className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" 
                              style={{ objectFit: "cover", objectPosition: "center" }}
                              alt={`Gallery ${i+1}`} 
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {/* Image number badge */}
                            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="font-mono text-[10px] text-white/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">{String(i+1).padStart(2, '0')}</span>
                            </div>
                            {/* Corner glow accent */}
                            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer hint */}
                  <div className="shrink-0 text-center py-2 border-t border-white/5">
                    <span className="text-[9px] tracking-[4px] uppercase text-white/25 font-display">Double-tap to close</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
            );
          })}
        </AnimatePresence>
        {/* Right Navigation Button */}
        <button
          onClick={nextSlide}
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
              key={i}
              onClick={() => { setActiveIndex(i); setPhotoIdx(0); }}
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
    </section>
  );
}
