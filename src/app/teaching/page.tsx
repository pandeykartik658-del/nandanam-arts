"use client";

import { motion, AnimatePresence, useInView, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import MovingBackground from "@/components/MovingBackground";
import KineticSubtitle from "@/components/KineticSubtitle";
import DisciplineNavigator from "@/components/DisciplineNavigator";
import MarqueeStrip from "@/components/MarqueeStrip";
import JourneyTimeline from "@/components/JourneyTimeline";
import FloatingElements from "@/components/FloatingElements";
import MagneticButton from "@/components/MagneticButton";
import PillarCard from "@/components/PillarCard";
import dynamic from "next/dynamic";
const DynamicRotatingShowcase = dynamic(() => import("@/components/RotatingShowcase"), { ssr: false });
const DynamicJourneyTimeline = dynamic(() => import("@/components/JourneyTimeline"), { ssr: false });
import SocialSidebar from "@/components/SocialSidebar";
import Footer from "@/components/Footer";

const dancer1 = "/assets/dancer1.jpg";
const dancer2 = "/assets/dancer2.jpg";
const dancer4 = "/assets/dancer4.jpg";
const dancer5 = "/assets/dancer5.jpg";
const logo = "/assets/logo.png";

const danceImages = [
  { src: dancer1, caption: "Nritta — pure geometry" },
  { src: dancer4, caption: "Abhinaya — soulful expression" },
  { src: dancer5, caption: "Aramandi — the foundation" },
  { src: dancer2, caption: "Arangetram — the ascent" },
];

const musicImages = [
  { gradient: "radial-gradient(ellipse at 30% 40%, hsl(330,40%,28%), hsl(280,25%,14%))", label: "Veena", glyph: "𝄞", caption: "The divine string" },
  { gradient: "radial-gradient(ellipse at 70% 30%, hsl(280,30%,22%), hsl(320,35%,16%))", label: "Mridangam", glyph: "𝄢", caption: "The heartbeat of tala" },
  { gradient: "radial-gradient(ellipse at 40% 60%, hsl(45,35%,22%), hsl(330,30%,15%))", label: "Vocalist", glyph: "♪", caption: "The human instrument" },
  { gradient: "radial-gradient(ellipse at 60% 50%, hsl(320,35%,20%), hsl(45,40%,20%))", label: "Violin", glyph: "♫", caption: "The endless resonance" },
];

const CustomIcons = {
  Lotus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-12 md:h-12 text-primary/80 group-hover:text-primary transition-colors">
      <path d="M12 2C8 6 4 10 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 10 16 6 12 2Z" />
      <circle cx="12" cy="14" r="3" />
    </svg>
  ),
  Trisula: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-12 md:h-12 text-primary/80 group-hover:text-primary transition-colors">
      <path d="M12 22V2M7 7C7 10 9 12 12 12C15 12 17 10 17 7M4 7V5M20 7V5" />
    </svg>
  ),
  Lamp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-12 md:h-12 text-primary/80 group-hover:text-primary transition-colors">
      <path d="M4 22H20M12 22V16M8 16H16L17 12C17 9 15 8 12 8C9 8 7 9 7 12L8 16Z" />
      <path d="M12 8V4M10 4Q12 2 12 0Q12 2 14 4Q12 6 12 8Z" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-12 md:h-12 text-primary/80 group-hover:text-primary transition-colors">
      <path d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Grace: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-12 md:h-12 text-primary/80 group-hover:text-primary transition-colors">
      <path d="M12 22 C 4 15, 16 9, 12 2 C 8 9, 20 15, 12 22" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  Resonance: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 md:w-12 md:h-12 text-primary/80 group-hover:text-primary transition-colors">
      <path d="M12 2v20 M8 6v12 M4 10v4 M16 6v12 M20 10v4" />
    </svg>
  )
};

const CurtainVeil = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div style={{ willChange: "transform" }} className="fixed inset-y-0 left-0 w-1/2 bg-background z-[2000] pointer-events-none" initial={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5" />
          </motion.div>
          <motion.div style={{ willChange: "transform" }} className="fixed inset-y-0 right-0 w-1/2 bg-background z-[2000] pointer-events-none" initial={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/5" />
          </motion.div>
          <motion.div style={{ willChange: "opacity, transform" }} className="fixed inset-0 z-[2001] flex items-center justify-center pointer-events-none" exit={{ opacity: 0, scale: 1.5 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="w-16 h-16 bg-gradient-wine-shift" style={{ WebkitMaskImage: `url(${logo})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: `url(${logo})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const GradientDivider = () => (
  <motion.div
    className="w-[1px] h-[100px] mx-auto"
    style={{ background: "linear-gradient(180deg, transparent, hsl(var(--primary)), transparent)" }}
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2 }}
  />
);

export default function TeachingWingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const danceRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const danceInView = useInView(danceRef, { margin: "-20% 0px -60% 0px" });
  const musicInView = useInView(musicRef, { margin: "-20% 0px -60% 0px" });

  const activeSection = danceInView ? "dance" : musicInView ? "music" : null;

  return (
    <div className="relative noise-overlay min-h-screen" onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] md:h-[2px] bg-primary z-[1000] origin-left"
        style={{ scaleX: scrollYProgress, filter: "drop-shadow(0 0 5px hsl(var(--primary)))" }}
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <MovingBackground speed={3} />
      </div>
      
      <FloatingElements />
      <CurtainVeil />

      {/* Hero Ambient Light */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary)/0.15), transparent 40%)`
        }}
      />

      {/* Section Anchors */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-5">
        {[
          { id: "hero", section: null, label: "Sanctum" },
          { id: "dance-wing", section: "dance", label: "Dance" },
          { id: "music-wing", section: "music", label: "Music" },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (item.id === "hero") window.scrollTo({ top: 0, behavior: 'smooth' });
              else document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-all duration-300 rounded-full ${
              (activeSection === item.section)
                ? "w-2.5 h-2.5 bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
                : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-primary/50"
            }`}
            title={item.label}
          />
        ))}
      </div>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative pt-20 pb-10 z-10">
        <motion.div 
          className="absolute top-8 left-6 md:left-12 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <Link href="/#heritage" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-surface border border-primary/20 text-white hover:text-primary transition-all duration-300 group shadow-md backdrop-blur-md relative">
            <motion.div 
              className="absolute inset-[-5px] bg-primary/0 group-hover:bg-primary/20 rounded-full blur-[10px] pointer-events-none transition-colors duration-500"
            />
            <span className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="font-display text-[9px] md:text-[10px] uppercase tracking-[4px]">RETURN TO SANCTUM</span>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-6 mb-12 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Logo and Glyphs Row */}
            <div className="relative flex items-center gap-5">
              <span className="relative z-10 text-xl text-primary/60 font-display drop-shadow-[0_0_8px_hsl(var(--primary))]">◈</span>
              <Image src={logo} alt="" width={1} height={1} priority className="hidden" aria-hidden="true" />
              <div className="relative">
                <div
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
                />
              </div>
              <span className="relative z-10 text-xl text-primary/60 font-display drop-shadow-[0_0_8px_hsl(var(--primary))]">◈</span>
            </div>

            {/* Tagline Row */}
            <div className="relative mt-2">
              <div className="relative z-10 group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.15)] glow-wine">
                <span className="relative font-display text-xs md:text-sm tracking-[4px] uppercase text-primary font-medium drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
                  Where tradition is passed on
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <h1 className="font-display whitespace-nowrap text-[6.5vw] sm:text-4xl md:text-6xl lg:text-[4.5rem] tracking-[5px] leading-[1.1]">
            {"THE TEACHING WING".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-gradient-wine drop-shadow-[0_4px_24px_hsl(var(--primary)/0.2)]"
                initial={{ y: 120, rotateX: -90, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.0 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mb-10 w-full flex flex-col items-center"
        >
          <KineticSubtitle />
          <motion.p 
            className="font-body mt-6 max-w-[600px] text-sm md:text-base leading-[2] tracking-wide text-muted-foreground/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            The teaching wing of the foundation Nandanam Centre for Arts conducts classes for Carnatic Vocal and Bharathanatya, training several aspiring students from all age groups.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 flex flex-col items-center text-primary/70 cursor-pointer"
          onClick={() => document.getElementById("dance-wing")?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          <span className="font-display text-[11px] md:text-xs font-bold uppercase tracking-[4px] mb-3">SCROLL TO BEGIN</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 drop-shadow-[0_0_8px_hsl(var(--primary))]" />
          </motion.div>
        </motion.div>
      </section>

      <GradientDivider />

      <DisciplineNavigator activeSection={activeSection} />

      {/* DANCE WING */}
      <section id="dance-wing" ref={danceRef} className="max-w-[1100px] mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="font-display text-[10px] tracking-[6px] uppercase text-primary/70">Discipline I</span>
        </motion.div>

        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[3px] text-white/90 mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Bharatanatyam
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="grid grid-cols-1 gap-6">
              <div><PillarCard icon={<CustomIcons.Lotus />} title="Tradition" desc="Guarding centuries of unbroken guru-shishya parampara, we transmit art exactly as our masters received it." delay={0} sanskrit="परम्परा" translit="Parampara" /></div>
              <div><PillarCard icon={<CustomIcons.Trisula />} title="Discipline" desc="Every adavu, every swara is forged through rigorous daily practice that transcends performance." delay={0.15} sanskrit="साधना" translit="Sadhana" /></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
            <DynamicRotatingShowcase images={danceImages} type="dance" />
          </motion.div>
        </div>
      </section>

      <MarqueeStrip />

      {/* MUSIC WING */}
      <section id="music-wing" ref={musicRef} className="max-w-[1100px] mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-right"
        >
          <span className="font-display text-[10px] tracking-[6px] uppercase text-primary/70">Discipline II</span>
        </motion.div>

        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[3px] text-white/90 mb-14 text-right"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Carnatic Music
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="order-2 lg:order-1 relative">
            <DynamicRotatingShowcase images={musicImages} type="music" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="order-1 lg:order-2">
            <div className="grid grid-cols-1 gap-6">
              <div><PillarCard icon={<CustomIcons.Lamp />} title="Devotion" desc="Our art is prayer — each mudra, each raga an offering to the divine narrative of Indic tradition." delay={0} sanskrit="भक्ति" translit="Bhakti" /></div>
              <div><PillarCard icon={<CustomIcons.Eye />} title="Expression" desc="We awaken the inner emotional core to breathe life into the geometric forms." delay={0.15} sanskrit="भाव" translit="Bhava" /></div>
            </div>
          </motion.div>
        </div>
      </section>

      <GradientDivider />

      <DynamicJourneyTimeline />

      {/* CLOSING SECTION */}
      <section className="max-w-[800px] mx-auto px-6 pt-12 pb-32 text-center relative z-10">
        <motion.div
          className="w-[1px] h-[60px] mx-auto mb-12"
          style={{ background: "linear-gradient(180deg, transparent, hsl(var(--primary)), transparent)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.p
          className="font-body italic text-base md:text-lg leading-[2] text-white/40 tracking-wide mb-16 mx-auto max-w-[650px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          To create a sanctuary where the ancient arts of dance and music converge — where every student becomes a custodian of tradition, carrying forward the sacred geometry of rhythm and melody into a world that yearns for beauty, discipline, and devotion.
        </motion.p>
        
        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MagneticButton className="px-10 py-5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md shadow-[0_0_30px_hsl(var(--primary)/0.15)] flex flex-col items-center z-10">
              <Link href="/contact" className="font-display text-sm tracking-[4px] uppercase text-primary font-semibold">Begin Your Journey</Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <motion.div 
              className="absolute inset-[0px] bg-primary/0 group-hover:bg-primary/25 rounded-full blur-[20px] pointer-events-none transition-colors duration-500"
            />
            <Link href="/#heritage" className="relative z-10 text-white group-hover:text-primary transition-colors duration-300 uppercase tracking-[4px] text-[10px] md:text-xs font-display flex items-center justify-center py-2 px-6">
              Return to Sanctum
            </Link>
          </motion.div>
        </div>
        
      </section>

      <SocialSidebar />

      <Footer />
    </div>
  );
}
