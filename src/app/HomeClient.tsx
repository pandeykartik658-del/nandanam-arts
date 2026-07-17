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
  "NAF is a non profit organisation founded with an aim of promoting and propagating Indian culture and arts. As an organisation in its formative stage NAF has undertaken several initiatives to further our cause. NAF actively conducts other artistic and cultural events, on the community level, providing a platform for the students of NCA and other amateur artists.";

const WORD_LIMIT = 30;
const words = philosophyFull.split(" ");
const truncated = words.slice(0, WORD_LIMIT).join(" ") + "…";

const navCards = [
  { label: "Nandanam Center for Arts", link: "/teaching" },
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
        className="min-h-[25vh] sm:min-h-[35vh] flex flex-col items-center justify-start sm:justify-center text-center px-6 relative pt-10 sm:pt-0"
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
          className="flex flex-col items-center justify-center gap-4 mb-10 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Remove the tiny width=1 logo that causes re-renders, use unoptimized and real size to ensure the mask gets the same preloaded raw file */}
          <Image src={logo} alt="" width={128} height={128} unoptimized priority className="hidden" aria-hidden="true" />
          <div
            className="w-16 h-16 md:w-[72px] md:h-[72px] bg-gradient-wine-shift shrink-0"
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
          <h1 className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 px-6 py-3 rounded-full font-display text-[11px] sm:text-[14px] md:text-[17px] tracking-[4px] md:tracking-[6px] uppercase glass-surface glow-wine max-w-[92vw]">
            {"Nandanam Art Foundation".split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((letter, i) => {
                  const globalIdx = wIdx * 10 + i;
                  return (
                    <motion.span
                      key={i}
                      className="inline-block text-gradient-wine"
                      initial={{ y: 20, rotateX: -90, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 + globalIdx * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>
        </motion.div>


      </motion.section>

      <section id="philosophy" className="max-w-[1100px] mx-auto px-6 pt-0 pb-10">
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
            {aboutData?.text || philosophyFull}
          </p>
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
      <section id="events" className="w-full pt-24 pb-0 relative z-10">
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
