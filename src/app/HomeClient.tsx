"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";



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
  "NAF is a non profit organisation founded with an aim of promoting and propagating Indian culture and arts. As an organisation in its formative stage NAF has undertaken several initiatives to further our cause. NAF actively conducts other artistic and cultural events, on the community level, providing a platform for the students of NCA and other ameture artists.";

const WORD_LIMIT = 30;
const words = philosophyFull.split(" ");
const truncated = words.slice(0, WORD_LIMIT).join(" ") + "…";

const navCards = [
  { label: "Nandanam Center of Arts", link: "/teaching" },
  { label: "Leela: A Festival of Arts", link: "/leela" },
  { label: "Other Events", link: "/events" },
];

const NavTiltCard = ({ item, i, onNavigate }: { item: typeof navCards[0]; i: number; onNavigate: (link: string) => void }) => {
  return (
    <Link 
      href={item.link} 
      className="block h-full"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.link);
      }}
    >
      <motion.div
        className="glass-surface rounded-xl p-6 py-7 h-full text-center cursor-pointer group transition-all duration-500 hover:glow-wine flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <span className="font-display text-xs md:text-sm tracking-[3px] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2 group-hover:glow-text">
          {item.label}
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
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
  aboutData?: {
    title?: string;
    text?: string;
  } | null;
}

export default function HomeClient({ upcomingEvents, aboutData }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // Elegant subtle upward parallax that moves away from rising content on scroll
  const heroY = useTransform(heroProgress, [0, 1], [0, -30]);
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
      <PageTransitionVeil visible={isTransitioning} />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <MovingBackground speed={3} />
      </div>
      <FloatingElements />
      <ScrollProgress />

      <motion.section
        ref={heroRef}
        style={{ y: heroY }}
        className="min-h-[70vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-6 relative pt-0"
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
          {/* Remove the tiny width=1 logo that causes re-renders, use unoptimized and real size to ensure the mask gets the same preloaded raw file */}
          <Image src={logo} alt="" width={128} height={128} unoptimized priority className="hidden" aria-hidden="true" />
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
            Nandanam Art Foundation
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
        className="w-[1px] h-[40px] sm:h-[60px] mx-auto"
            style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

      <section id="philosophy" className="max-w-[1100px] mx-auto px-6 pt-8 sm:pt-10 pb-10">
        <motion.h2
          aria-hidden="true"
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[3px] mb-10"
          style={{
            color: '#FDF2E3',
            animation: 'aboutUsGlow 3s ease-in-out infinite',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          About Us
        </motion.h2>

        <div
          className="max-w-[800px] mb-6"
        >
          <p className="font-body text-lg md:text-xl leading-[1.8] mb-4" style={{ color: 'rgba(255, 255, 255, 0.92)', textShadow: '0 0 20px rgba(255,255,255,0.06)' }}>
            {expanded 
              ? (aboutData?.text || philosophyFull) 
              : ((aboutData?.text || philosophyFull).split(/\s+/).slice(0, 30).join(" ") + ((aboutData?.text || philosophyFull).split(/\s+/).length > 30 ? "…" : ""))
            }
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


      </section>



      <section id="heritage" className="max-w-[800px] mx-auto px-6 py-6 text-center">
        <motion.div
          className="w-[1px] h-[30px] mx-auto mb-6"
          style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.h3
          className="font-display text-lg md:text-xl tracking-[4px] md:tracking-[5px] uppercase mb-8 text-gradient-wine glow-text"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
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
