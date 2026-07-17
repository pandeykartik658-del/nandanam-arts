"use client";

import { motion } from "framer-motion";

const DisciplineNavigator = ({ activeSection }: { activeSection: "dance" | "music" | null }) => {
  return (
    <div className="relative z-50 w-full flex justify-center pointer-events-none mt-4 mb-4">
      <div className="glass-surface border border-primary/20 shadow-[0_4px_30px_hsl(var(--primary)/0.15)] rounded-full px-6 py-2 flex gap-4 pointer-events-auto backdrop-blur-md bg-background/80">
        <button
          onClick={() => document.getElementById("dance-wing")?.scrollIntoView({ behavior: "smooth" })}
          className="relative text-xs md:text-sm tracking-[4px] uppercase font-display group focus:outline-none px-4 py-2 rounded-full transition-colors hover:bg-primary/5"
        >
          <span className={`transition-colors duration-500 ${activeSection === "dance" ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
            Dance
          </span>
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary"
            initial={false}
            animate={{ scaleX: activeSection === "dance" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </button>

        <button
          onClick={() => document.getElementById("music-wing")?.scrollIntoView({ behavior: "smooth" })}
          className="relative text-xs md:text-sm tracking-[4px] uppercase font-display group focus:outline-none px-4 py-2 rounded-full transition-colors hover:bg-primary/5"
        >
          <span className={`transition-colors duration-500 ${activeSection === "music" ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
            Music
          </span>
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary"
            initial={false}
            animate={{ scaleX: activeSection === "music" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </button>
      </div>
    </div>
  );
};

export default DisciplineNavigator;

