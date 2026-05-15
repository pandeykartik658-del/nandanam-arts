"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const galleryItems = [
  {
    id: 1,
    title: "Arangetram Ceremony",
    category: "Performance",
    description: "The sacred debut performance marking a student's transition from learner to artist.",
    color: "from-primary/20 to-accent/10",
  },
  {
    id: 2,
    title: "Natya Shastra Studies",
    category: "Theory",
    description: "Deep exploration of ancient treatises that form the backbone of classical dance.",
    color: "from-accent/20 to-primary/10",
  },
  {
    id: 3,
    title: "Rhythmic Mastery",
    category: "Nritta",
    description: "Pure dance sequences exploring complex time cycles and mathematical precision.",
    color: "from-primary/15 to-accent/20",
  },
  {
    id: 4,
    title: "Expressive Storytelling",
    category: "Abhinaya",
    description: "The art of conveying emotions through facial expressions, hand gestures, and body language.",
    color: "from-accent/15 to-primary/20",
  },
  {
    id: 5,
    title: "Temple Architecture",
    category: "Heritage",
    description: "Understanding the sacred spaces that shaped and preserved classical dance traditions.",
    color: "from-primary/20 to-accent/15",
  },
  {
    id: 6,
    title: "Carnatic Music",
    category: "Music",
    description: "The melodic foundation that breathes life into every movement and expression.",
    color: "from-accent/20 to-primary/15",
  },
];

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <div ref={containerRef} className="py-24 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center mb-16 px-6"
      >
        <span className="inline-block px-3 py-1 rounded-full font-mono text-xs text-primary bg-secondary border border-border mb-4">
          Gallery
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
          Explore the <span className="text-gradient-gold">Art Forms</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          A curated journey through the pillars of classical Indian dance tradition.
        </p>
      </motion.div>

      {/* Horizontal scrolling gallery */}
      <motion.div style={{ x }} className="flex gap-6 px-6 will-change-transform">
        {galleryItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
            onHoverStart={() => setActiveId(item.id)}
            onHoverEnd={() => setActiveId(null)}
            className="relative flex-shrink-0 w-[280px] md:w-[340px] rounded-2xl overflow-hidden cursor-pointer group"
            style={{ perspective: "1000px" }}
          >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-all duration-500`} />
            <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "1px solid transparent",
                backgroundClip: "padding-box",
              }}
              animate={{
                boxShadow: activeId === item.id
                  ? "0 0 40px hsl(39 68% 65% / 0.2), inset 0 0 40px hsl(39 68% 65% / 0.05)"
                  : "0 0 0px transparent",
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 h-[320px] flex flex-col justify-between">
              <div>
                <motion.span
                  className="text-xs font-mono text-primary uppercase tracking-widest"
                  animate={{ letterSpacing: activeId === item.id ? "0.2em" : "0.1em" }}
                  transition={{ duration: 0.3 }}
                >
                  {item.category}
                </motion.span>
                <h3 className="text-xl font-bold font-display mt-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Animated arrow */}
              <motion.div
                className="flex items-center gap-2 text-primary text-sm font-medium"
                initial={{ x: 0 }}
                animate={{ x: activeId === item.id ? 8 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span>Explore</span>
                <motion.span
                  animate={{ x: activeId === item.id ? 4 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>

            {/* Decorative corner element */}
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary/20 rounded-tr-lg"
              animate={{
                borderColor: activeId === item.id ? "hsl(39 68% 65% / 0.5)" : "hsl(39 68% 65% / 0.2)",
                scale: activeId === item.id ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary/20 rounded-bl-lg"
              animate={{
                borderColor: activeId === item.id ? "hsl(39 68% 65% / 0.5)" : "hsl(39 68% 65% / 0.2)",
                scale: activeId === item.id ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="flex justify-center mt-10 gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {galleryItems.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;

