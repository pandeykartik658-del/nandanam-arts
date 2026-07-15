"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "Year 1", title: "Foundation", desc: "Mastering the Aramandi and basic Adavus." },
  { year: "Year 2", title: "Adavus & Sarali", desc: "Geometric perfection in movement." },
  { year: "Year 3", title: "Geetham & Abhinaya", desc: "The awakening of emotional storytelling." },
  { year: "Year 4", title: "Varnam & Kriti", desc: "Sustaining rhythm through complex choreography." },
  { year: "Year 5", title: "Margam & Manodharma", desc: "Improvisation. The ascent to the Arangetram." },
];

const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="max-w-[700px] mx-auto px-6 py-32 relative">
      <motion.h2
        className="font-display text-3xl md:text-4xl tracking-[4px] text-center text-muted-foreground/70 mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Disciple's Journey
      </motion.h2>

      <div className="relative">
        {/* Background Guide Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/10 -translate-x-1/2" />
        
        {/* Animated Wine-Thread Line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/80 to-transparent -translate-x-1/2 origin-top"
          style={{ scaleY: lineHeight, filter: "drop-shadow(0 0 8px hsl(var(--primary)/0.5))" }}
        />

        <div className="relative z-10 flex flex-col gap-12 md:gap-20">
          {milestones.map((ms, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`flex items-center w-full ${isEven ? "md:flex-row-reverse" : "md:flex-row"} justify-start`}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`w-full md:w-1/2 pl-14 md:pl-0 text-left ${isEven ? "md:pl-16" : "md:text-right md:pr-16"}`}>
                  <span className="font-display text-[10px] tracking-[4px] uppercase text-primary/60 mb-2 block">{ms.year}</span>
                  <h4 className="font-display text-xl text-gradient-wine tracking-wide mb-2">{ms.title}</h4>
                  <p className="font-body text-xs md:text-sm text-white/90 leading-relaxed font-light">{ms.desc}</p>
                </div>

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
                  <motion.div 
                    className="w-3 h-3 rotate-45 bg-background border border-primary/40 text-[8px] flex items-center justify-center text-primary/80 shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  >
                    ◆
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;

