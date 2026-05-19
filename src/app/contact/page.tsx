"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import * as Tooltip from "@radix-ui/react-tooltip";

import PageVeilTransition from "@/components/PageVeilTransition";
import MovingBackground from "@/components/MovingBackground";
import FloatingElements from "@/components/FloatingElements";
import ScrollProgress from "@/components/ScrollProgress";
import Petals from "@/components/Petals";
import Footer from "@/components/Footer";
import KineticSubtitle from "@/components/KineticSubtitle";
import MarqueeStrip from "@/components/MarqueeStrip";
import MagneticButton from "@/components/MagneticButton";
import QuickMessageCapsule, { WHATSAPP_NUMBER } from "@/components/QuickMessageCapsule";
import SignatureMark from "@/components/SignatureMark";
import SocialSidebar from "@/components/SocialSidebar";

const logo = "/assets/logo.png";

type Ripple = { id: number; x: number; y: number };

type Channel = {
  name: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  tint: string;
  hoverAnim: any;
  tooltip: string;
  online?: boolean;
};

const CHANNELS: Channel[] = [
  {
    name: "WhatsApp",
    handle: `+${WHATSAPP_NUMBER}`,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    tint: "hsl(140, 50%, 55%)",
    tooltip: "Usually replies within a day",
    online: true,
    hoverAnim: { rotate: [0, -12, 12, -8, 8, 0], transition: { duration: 0.5 } },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )
  },
  {
    name: "Instagram",
    handle: "@shashanknairdance",
    href: "https://instagram.com/shashanknairdance",
    tint: "hsl(330, 70%, 65%)",
    tooltip: "Follow our daily devotion",
    hoverAnim: { rotate: [0, 360], transition: { duration: 0.8, ease: "backOut" } },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: "Gmail",
    handle: "namaste@nandanam.in",
    href: "mailto:namaste@nandanam.in",
    tint: "hsl(0, 65%, 60%)",
    tooltip: "For formal inquiries",
    hoverAnim: { y: [0, -4, 0, -2, 0], transition: { duration: 0.5 } },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  }
];

const ChannelCard = ({ channel, i }: { channel: Channel; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const launchRipple = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const ripple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples(prev => [...prev, ripple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 800);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    launchRipple(e);
    navigator.clipboard.writeText(channel.handle).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard!", { description: channel.handle });
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error("Failed to copy");
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    launchRipple(e);
    if (channel.href.startsWith("mailto:")) {
      window.location.href = channel.href;
    } else {
      window.open(channel.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={handleCardClick}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
      whileHover={{ scale: 1.04 }}
      className="relative glass-surface rounded-2xl p-8 overflow-hidden group flex flex-col items-center text-center cursor-pointer"
    >
      {/* Ripple container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <AnimatePresence>
          {ripples.map(r => (
            <motion.div
              key={r.id}
              className="absolute w-3 h-3 rounded-full"
              style={{ left: r.x - 6, top: r.y - 6, backgroundColor: channel.tint }}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 28, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Hover tint overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${channel.tint.replace(")", " / 0.15)")} 0%, transparent 70%)` }}
      />

      {channel.online && (
        <div className="absolute top-6 right-6">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="relative w-3 h-3 flex items-center justify-center cursor-help">
                <motion.div 
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: channel.tint }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="glass-surface border border-primary/30 px-3 py-1.5 rounded text-xs font-body text-white/90 shadow-xl" sideOffset={5}>
                {channel.tooltip}
                <Tooltip.Arrow className="fill-primary/30" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      )}

      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.a
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={launchRipple}
            className="relative z-10 w-16 h-16 rounded-full glass-surface flex items-center justify-center mb-6"
            style={{ color: channel.tint, boxShadow: `0 0 20px ${channel.tint.replace(")", " / 0.2)")}` }}
            whileHover={channel.hoverAnim}
          >
            {channel.icon}
          </motion.a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="glass-surface border border-primary/30 px-3 py-1.5 rounded text-xs font-body text-white/90 shadow-xl" sideOffset={5}>
            {channel.tooltip}
            <Tooltip.Arrow className="fill-primary/30" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>

      <div className="relative z-10 flex flex-col items-center">
        <span className="font-display text-primary tracking-[4px] uppercase text-sm mb-2">{channel.name}</span>
        
        <div className="flex items-center gap-3">
          <span className="font-body text-white/70 text-sm">{channel.handle}</span>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button 
                onClick={handleCopy}
                className="text-white/40 hover:text-primary transition-colors p-1 rounded hover:bg-white/5"
                aria-label={`Copy ${channel.name} handle`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="glass-surface border border-primary/30 px-3 py-1.5 rounded text-xs font-body text-white/90 shadow-xl" sideOffset={5}>
                Copy to clipboard
                <Tooltip.Arrow className="fill-primary/30" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </div>
    </motion.div>
  );
};

export default function ContactPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-250);
  const cursorY = useMotionValue(-250);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  const watermarkY = useTransform(scrollY, [0, 1500], [0, 250]);

  const onHeroMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX - 250);
    cursorY.set(e.clientY - 250);
  };

  const titleText = "✦ CONTACT US ✦";

  return (
    <Tooltip.Provider delayDuration={300}>
      <PageVeilTransition>
        <div className="noise-overlay min-h-screen relative overflow-hidden bg-background">
          <MovingBackground />
          <FloatingElements />
          <ScrollProgress />
          <Petals count={3} />

          {/* Back link */}
          <div className="fixed top-8 left-6 md:left-12 z-50">
            <MagneticButton className="glass-surface rounded-full px-5 py-2">
              <Link href="/#heritage" className="font-display text-[10px] tracking-[4px] uppercase text-white/70 hover:text-primary transition-colors">
                &larr; Return to Sanctum
              </Link>
            </MagneticButton>
          </div>

          <main className="relative z-10 pb-24">
            {/* Hero Section */}
            <section 
              ref={heroRef} 
              onMouseMove={onHeroMove}
              className="min-h-[80vh] flex flex-col items-center justify-center text-center relative px-6"
            >
              {/* Cursor light */}
              <motion.div 
                className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none mix-blend-screen"
                style={{ 
                  x: springX, 
                  y: springY, 
                  backgroundColor: "hsl(320 55% 55% / 0.18)", 
                  filter: "blur(40px)",
                  zIndex: 0
                }}
              />

              <div className="relative z-10 flex flex-col items-center">
                {/* Logo and Glyphs Row */}
                <div className="relative flex items-center gap-5 mb-8">
                  <span className="relative z-10 text-xl text-primary/60 font-display drop-shadow-[0_0_8px_hsl(var(--primary))]">◈</span>
                  
                  <div className="relative">
                    <motion.div
                      className="w-[84px] h-[84px] bg-gradient-wine-shift relative z-10"
                      style={{
                        WebkitMaskImage: `url(${logo})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskImage: `url(${logo})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <span className="relative z-10 text-xl text-primary/60 font-display drop-shadow-[0_0_8px_hsl(var(--primary))]">◈</span>
                </div>

                {/* Title */}
                <h1 className="font-display whitespace-nowrap text-[8vw] sm:text-5xl md:text-7xl tracking-[6px] flex flex-nowrap justify-center mb-8">
                  {titleText.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 100, rotateX: -90, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className={char === "✦" ? "text-primary/60" : "text-gradient-wine"}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>

                {/* Subtitle */}
                <motion.div 
                  className="flex flex-col md:flex-row items-center gap-2 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <span className="font-body italic text-white/50 text-sm md:text-base">
                    A single message can begin a lifetime of devotion &mdash;
                  </span>
                  <div className="h-6 overflow-hidden relative w-48 mt-2 md:mt-0">
                    <KineticSubtitle words={["Write to us", "Visit us", "Learn with us", "Begin the journey"]} />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Channels Grid */}
            <section className="max-w-[1100px] mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CHANNELS.map((channel, i) => (
                  <ChannelCard key={channel.name} channel={channel} i={i} />
                ))}
              </div>
            </section>

            {/* Middle Sections */}
            <section className="max-w-[1100px] mx-auto px-6 py-16 flex flex-col items-center gap-16">
              <QuickMessageCapsule />
            </section>

            {/* Ornamental Divider */}
            <motion.div 
              className="flex items-center justify-center pt-12 pb-6 w-full max-w-2xl mx-auto opacity-60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary/50" />
              <span className="font-display text-primary/40 mx-4 text-xl">◆</span>
              <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary/50" />
            </motion.div>

            {/* Marquee Strip */}
            <div className="relative z-10 py-8 mb-4">
              <MarqueeStrip />
            </div>

            <SocialSidebar />
            <Footer />
          </main>
        </div>
      </PageVeilTransition>
    </Tooltip.Provider>
  );
}
