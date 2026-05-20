import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

type DockPhase = "floating" | "descending" | "docked";

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    url: "#",
    color: "hsl(330 70% 55%)",
  },
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="2" y="4" width="20" height="16" rx="4" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
      </svg>
    ),
    url: "#",
    color: "hsl(0 70% 50%)",
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
      </svg>
    ),
    url: "#",
    color: "hsl(220 70% 55%)",
  },
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    url: "#",
    color: "hsl(142 70% 45%)",
  },
];

const SocialSidebar = () => {
  const { scrollYProgress } = useScroll();
  const [phase, setPhase] = useState<DockPhase>("floating");

  // L-shaped motion: starts slightly below center on the right edge.
  // Phase 1 (0.84 → 0.92): slides DOWN.
  // Phase 2 (0.92 → 0.97): slides LEFT into the bottom dock.
  const yDown = useTransform(scrollYProgress, [0.84, 0.92], ["0vh", "32vh"]);
  const xLeft = useTransform(scrollYProgress, [0.92, 0.97], [0, -200]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.97) setPhase("docked");
    else if (latest >= 0.84) setPhase("descending");
    else setPhase("floating");
  });

  const isDocked = phase === "docked";

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        className={`pointer-events-auto absolute ${
          isDocked ? "bottom-0 left-0 right-0" : "top-1/2 right-4"
        }`}
        style={isDocked ? undefined : { y: yDown, x: xLeft, translateY: "-30%" }}
      >
        {/* Soft ambient bleed above the dock — fades dock into page */}
        {isDocked && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-full h-40"
            style={{
              background:
                "linear-gradient(to top, hsl(var(--background) / 0.7) 0%, hsl(var(--background) / 0.25) 50%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        <motion.div
          layout
          className={`relative origin-right flex items-center ${
            isDocked
              ? "flex-col w-full px-6 py-6"
              : "w-11 flex-col gap-4 rounded-full border border-border/50 glass-surface px-0 py-4"
          }`}
          transition={{ layout: { type: "spring", stiffness: 170, damping: 22 } }}
        >
          {/* Top glowing line (docked only) */}
          {isDocked && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
          )}

          {/* Floating-only top divider */}
          {!isDocked && (
            <motion.div
              layout
              className="mx-auto h-8 w-px shrink-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
            />
          )}

          {/* Icon row */}
          <div
            className={
              isDocked
                ? "flex flex-row items-center justify-center gap-12 py-5 w-full"
                : "contents"
            }
          >
            {socialLinks.map((social, i) => (
              <motion.a
                layout
                key={social.name}
                href={social.url}
                title={social.name}
                aria-label={social.name}
                className={
                  isDocked
                    ? "relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300"
                    : "relative flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/40 text-muted-foreground transition-colors duration-300"
                }
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                whileHover={{
                  scale: 1.25,
                  y: isDocked ? -6 : 0,
                  x: isDocked ? 0 : -6,
                  color: social.color,
                  filter: `drop-shadow(0 0 10px ${social.color})`,
                }}
                whileTap={{ scale: 0.92 }}
              >
                <span className="relative z-10">{social.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* Bottom glowing line (docked) — identical to top */}
          {isDocked && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
          )}

          {/* Floating-only bottom divider */}
          {!isDocked && (
            <motion.div
              layout
              className="mx-auto h-8 w-px shrink-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SocialSidebar;
