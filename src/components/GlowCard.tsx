import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface GlowCardProps {
  title: string;
  description: string;
  keys: string[];
  index: number;
}

const GlowCard = ({ title, description, keys, index }: GlowCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsl(39 68% 65% / 0.06), transparent 40%)`;
  const border = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(39 68% 65% / 0.3), transparent 40%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl p-[1px] overflow-hidden cursor-default"
    >
      {/* Glow border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: border }}
      />

      {/* Card content */}
      <div className="relative rounded-xl bg-card p-8 h-full border border-border/50 overflow-hidden">
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background }}
        />

        <div className="relative z-10">
          <motion.div
            className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5"
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </motion.div>

          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>

          <div className="flex gap-1.5">
            {keys.map((key) => (
              <motion.span
                key={key}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border cursor-pointer select-none"
              >
                {key}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlowCard;
