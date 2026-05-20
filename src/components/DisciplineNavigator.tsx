import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface DisciplineNavigatorProps {
  sections: Section[];
}

const DisciplineNavigator = ({ sections }: DisciplineNavigatorProps) => {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [200, 400], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      style={{ opacity }}
      className="sticky top-4 z-40 mx-auto w-fit"
    >
      <div className="glass-surface rounded-full px-3 py-2 flex items-center gap-1 backdrop-blur-xl">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="relative px-5 py-2 rounded-full font-display text-[10px] tracking-[4px] uppercase transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="discipline-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(320 55% 55% / 0.25), hsl(280 40% 35% / 0.25))",
                    boxShadow: "0 0 20px hsl(320 55% 55% / 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                />
              )}
              <span className={`relative ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default DisciplineNavigator;
