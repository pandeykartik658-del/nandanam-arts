"use client";

import { motion } from "framer-motion";

interface PillarCardProps {
  title: string;
  desc: string;
  icon: string | React.ReactNode;
  delay: number;
  sanskrit: string;
  translit: string;
}

const PillarCard = ({ title, desc, icon, delay, sanskrit, translit }: PillarCardProps) => {
  return (
    <motion.div
      className="relative h-[180px] sm:h-[240px] w-full rounded-xl cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <div className="w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass-surface rounded-xl p-3 sm:p-6 flex flex-col items-center text-center justify-center border border-primary/10 shadow-lg">
          <span className="text-2xl sm:text-4xl mb-2 sm:mb-5 group-hover:drop-shadow-[0_0_20px_hsl(var(--primary))] transition-all duration-500 group-hover:scale-110">
            {icon}
          </span>
          <h4 className="font-display text-[clamp(17px,3vw,26px)] tracking-[2px] sm:tracking-[4px] uppercase text-primary mb-2 sm:mb-3">
            {title}
          </h4>
          <p className="font-body text-[clamp(15px,2.2vw,22px)] text-muted-foreground/80 leading-snug sm:leading-relaxed font-light">
            {desc}
          </p>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass-surface rounded-xl p-3 sm:p-6 flex flex-col items-center justify-center border border-primary/30 glow-wine [transform:rotateY(180deg)] bg-gradient-to-br from-primary/10 to-transparent text-center shadow-[inset_0_0_40px_hsl(var(--primary)/0.1)]">
          <span className="font-display text-[clamp(2.2rem,5.5vw,3.5rem)] text-white mb-2 sm:mb-3 drop-shadow-[0_0_8px_hsl(var(--primary))]">{sanskrit}</span>
          <span className="font-body text-[clamp(14px,2.2vw,20px)] tracking-[3px] sm:tracking-[5px] uppercase text-primary/70">{translit}</span>
        </div>

      </div>
    </motion.div>
  );
};

export default PillarCard;

