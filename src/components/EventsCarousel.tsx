"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { optimizeImage, getBlurDataURL } from "@/utils/image";

const dancer1 = "/assets/dancer1.jpg";
const dancer2 = "/assets/dancer2.jpg";

type Category = "All" | "Festival" | "Workshop" | "Recital";

export interface CarouselEvent {
  id: string | number;
  day: string;
  month: string;
  year: string;
  title: string;
  description: string;
  location: string;
  category: Category;
  image: string;
}

interface EventsCarouselProps {
  events: CarouselEvent[];
}

export default function EventsCarousel({ events }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!events || events.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, events]);

  if (!events || events.length === 0) {
    return <div className="text-center text-muted-foreground italic py-12">No events found.</div>;
  }

  const event = events[currentIndex];

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative w-full min-h-[auto] md:min-h-[600px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center"
            style={{ willChange: "transform, opacity" }}
          >
          {/* Poster Image */}
          <div className="relative w-full max-w-[450px] aspect-[3/4] sm:aspect-auto sm:h-[450px] rounded-2xl overflow-hidden glow-wine mb-8 border-2 border-primary/40 flex justify-center bg-black/40">
            <Image 
              src={optimizeImage(event.image, 800)} 
              alt={event.title} 
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              placeholder="blur"
              blurDataURL={getBlurDataURL(event.image)}
              className="object-contain object-center contrast-110"
            />
          </div>

          {/* Event Architecture Details */}
          <div className="glass-surface border border-primary/20 rounded-xl p-5 md:p-6 w-full max-w-[600px] backdrop-blur-xl">
            <div className="relative flex flex-col items-center justify-start min-h-[90px] mb-4">
              {/* Date Badge */}
              <div className="relative sm:absolute sm:left-0 sm:top-0 flex justify-center mb-4 sm:mb-0">
                <div className="flex flex-col items-center justify-center bg-background/90 border border-primary/40 rounded-lg p-2 min-w-[60px] shadow-[0_0_10px_hsl(320_55%_55%/0.15)]">
                  <span className="font-display text-primary text-[10px] tracking-widest uppercase mb-0.5">{event.month}</span>
                  <span className="font-display text-xl text-foreground font-semibold">{event.day}</span>
                  <span className="font-display text-muted-foreground text-[8px] tracking-widest mt-0.5">{event.year}</span>
                </div>
              </div>
              
              {/* Top Center Logo & Title */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className="w-10 h-10 bg-gradient-wine-shift mb-2 shrink-0"
                  style={{
                    WebkitMaskImage: `url(/assets/logo.png)`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: `url(/assets/logo.png)`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                />
                <span className="font-display text-[9px] tracking-[4px] uppercase text-primary text-center">Nandanam Center<br className="sm:hidden" /> for Arts</span>
              </div>

              {/* Category Tag on exact Right */}
              <div className="absolute right-0 top-0 hidden sm:block">
                <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 font-display text-[9px] tracking-widest uppercase text-primary font-semibold">
                  {event.category}
                </span>
              </div>
            </div>

            <h3 className="font-display text-2xl md:text-3xl tracking-[2px] text-foreground mb-2">
              {event.title}
            </h3>
            
            <p className="font-body text-muted-foreground/90 leading-relaxed text-[15px] md:text-[17px] mb-6">
              {event.description}
            </p>

            <div className="flex items-center gap-2 pt-4 border-t border-border/40 text-muted-foreground/80 font-body text-xs tracking-wide">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators & Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">





      </div>
    </div>
  );
}
