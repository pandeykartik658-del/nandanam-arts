import { motion } from "framer-motion";

interface MarqueeStripProps {
  items: string[];
  duration?: number;
}

const MarqueeStrip = ({ items, duration = 40 }: MarqueeStripProps) => {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loop = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-8 select-none">
      <div
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, hsl(300 20% 6%) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, hsl(300 20% 6%) 0%, transparent 100%)" }}
      />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={reduced ? undefined : { x: ["0%", "-33.333%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl tracking-[8px] uppercase text-white/15"
          >
            {item} <span className="text-primary/30 mx-2">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
