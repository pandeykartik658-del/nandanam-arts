"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"), {
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(300 25% 8%), hsl(300 20% 5%))' }}>
      <h1 className="font-display text-4xl md:text-7xl tracking-[6px] uppercase text-gradient-ivory" style={{ opacity: 0.85 }}>
        Nandanam Centre of Arts
      </h1>
    </div>
  ),
});
const MovingBackground = dynamic(() => import("@/components/MovingBackground"), { ssr: false });
const FloatingElements = dynamic(() => import("@/components/FloatingElements"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const SocialSidebar = dynamic(() => import("@/components/SocialSidebar"), { ssr: false });
const EventsCarousel = dynamic(() => import("@/components/EventsCarousel"), { ssr: false });
import { CarouselEvent } from "@/components/EventsCarousel";
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const dancer1 = "/assets/dancer1.jpg";
const dancer4 = "/assets/dancer4.jpg";
const dancer5 = "/assets/dancer5.jpg";
const logo = "/assets/logo.png";

const titleLetters = "DIVINE TRADITIONS".split("");

const philosophyFull =
  "Rooted in the ancient soils of South India, Nandanam is dedicated to promoting the pure, unadulterated art of Bharatanatyam. We believe that classical dance is not merely a performing art, but a spiritual discipline calling upon ancient geometry. Through rigorous practice and unwavering dedication, the artist becomes a vessel for storytelling that transcends generations.";

const WORD_LIMIT = 80;
const words = philosophyFull.split(" ");
const truncated = words.slice(0, WORD_LIMIT).join(" ") + "…";

const navCards = [
  { label: "Nandanam Center of Arts", link: "/teaching" },
  { label: "Leela: The Divine Festival", link: "/leela" },
  { label: "Other Events", link: "/events" },
  { label: "Contact Us", link: "/contact" },
];

const NavTiltCard = ({ item, i, onNavigate }: { item: typeof navCards[0]; i: number; onNavigate: (link: string) => void }) => {
  return (
    <Link 
      href={item.link} 
      className="block"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.link);
      }}
    >
      <motion.div
        className="glass-surface rounded-sm p-5 text-center cursor-pointer group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <span className="font-display text-xs md:text-sm tracking-[3px] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2">
          {item.label}
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </span>
      </motion.div>
    </Link>
  );
};

const PageTransitionVeil = ({ visible }: { visible: boolean }) => {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div style={{ willChange: "transform" }} className="fixed inset-y-0 left-0 w-1/2 bg-background z-[2000] pointer-events-none" initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5" />
          </motion.div>
          <motion.div style={{ willChange: "transform" }} className="fixed inset-y-0 right-0 w-1/2 bg-background z-[2000] pointer-events-none" initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/5" />
          </motion.div>
          <motion.div style={{ willChange: "opacity, transform" }} className="fixed inset-0 z-[2001] flex items-center justify-center pointer-events-none" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.2 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="w-16 h-16 bg-gradient-wine-shift" style={{ WebkitMaskImage: `url(${logo})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", maskImage: `url(${logo})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center", willChange: "transform" }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface HomeClientProps {
  upcomingEvents: CarouselEvent[];
}

export default function HomeClient({ upcomingEvents }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // Simple, elegant fade and slight upward movement
  const heroY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = (link: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(link);
    }, 800);
  };

  return (
    <div className="noise-overlay min-h-screen relative overflow-hidden">
      <SplashScreen />
      <PageTransitionVeil visible={isTransitioning} />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <MovingBackground speed={3} />
      </div>
      <FloatingElements />
      <ScrollProgress />
      
      {/* Spacer for splash screen — scroll past this to reveal the hero */}
      <div className="min-h-screen" />

      <motion.section
        ref={heroRef}
        style={{ y: heroY }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
      >
        {/* Pulsing rings behind hero content */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`hero-ring-${i}`}
            className="absolute rounded-full border border-primary/10 pointer-events-none"
            style={{ width: 250 + i * 180, height: 250 + i * 180 }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`hero-particle-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-primary/40 pointer-events-none"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.05, 0.5, 0.05],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Logo + Badge */}
        <motion.div
          className="flex items-center gap-4 mb-10 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image src={logo} alt="" width={1} height={1} priority className="hidden" aria-hidden="true" />
          <div
            className="w-10 h-10 bg-gradient-wine-shift shrink-0"
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
          <span className="inline-block px-5 py-2 rounded-full font-display text-[10px] tracking-[6px] uppercase text-primary glass-surface glow-wine">
            Nandanam Arts Foundation
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-6 relative z-10 w-full px-4">
          <motion.h1
            className="font-display flex flex-wrap justify-center gap-x-4 sm:gap-x-6 text-[11vw] sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-[4px] sm:tracking-[6px] leading-[1.1] text-gradient-wine"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            DIVINE TRADITIONS
          </motion.h1>
        </div>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-[600px] leading-[1.8] relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          A legacy of rhythm, expression, and absolute devotion to the ancient art of Bharatanatyam.
        </motion.p>
      </motion.section>

      <motion.div
        className="w-[1px] h-[80px] mx-auto"
            style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

      <section id="philosophy" className="max-w-[1100px] mx-auto px-6 pt-12 pb-20">
        <motion.h2
          aria-hidden="true"
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[3px] mb-10"
          style={{ color: 'rgba(255, 255, 255, 0.92)', textShadow: '0 0 20px rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          About Us
        </motion.h2>

        <div
          className="max-w-[800px] mb-14"
        >
          <p className="font-body text-lg md:text-xl leading-[1.8] mb-4" style={{ color: 'rgba(255, 255, 255, 0.92)', textShadow: '0 0 20px rgba(255,255,255,0.06)' }}>
            {expanded ? philosophyFull : truncated}
          </p>
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="font-display text-xs tracking-[3px] uppercase text-primary hover:text-primary-foreground transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            {expanded ? "Show Less" : "Read More →"}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden mb-16">
          {/* Frame 1 - Empty */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden rounded-2xl border border-primary/30 relative h-[200px] bg-black/20" />
          </div>
          {/* Frame 2 - Empty */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden rounded-2xl border border-primary/30 relative h-[200px] bg-black/20" />
          </div>
          {/* Frame 3 - Empty */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden rounded-2xl border border-primary/30 relative h-[200px] bg-black/20" />
          </div>
        </div>
      </section>

      <section id="heritage" className="max-w-[800px] mx-auto px-6 py-16 text-center">
        <motion.div
          className="w-[1px] h-[60px] mx-auto mb-12"
          style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.h3
          className="font-display text-lg md:text-xl tracking-[4px] md:tracking-[5px] uppercase text-primary mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Philosophy
        </motion.h3>

        <p
          className="font-body text-lg md:text-xl leading-[1.8] mb-16"
          style={{ color: 'rgba(255, 255, 255, 0.92)', textShadow: '0 0 20px rgba(255,255,255,0.06)' }}
        >
          "Every mudra is a prayer. Every adavu is a meditation. We do not merely dance — we channel the divine through disciplined movement, transforming the human body into a vessel of ancient stories and timeless devotion."
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {navCards.map((item, i) => (
              <NavTiltCard key={item.label} item={item} i={i} onNavigate={handleTransition} />
            ))}
          </div>
        </motion.div>
      </section>


      {/* Events Section below Our Philosophy */}
      <section id="events" className="w-full py-24 relative z-10">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[3px] text-center text-gradient-wine mb-16">
          Upcoming Events
        </h2>
        <EventsCarousel events={upcomingEvents} />
      </section>

      <SocialSidebar />
      <Footer />
    </div>
  );
}
