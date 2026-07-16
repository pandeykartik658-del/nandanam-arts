"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Activity, Users, BookOpen, ChevronDown, Music, Mic, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import PageVeilTransition from "@/components/PageVeilTransition";
import MovingBackground from "@/components/MovingBackground";
import FloatingElements from "@/components/FloatingElements";
import ScrollProgress from "@/components/ScrollProgress";
import Petals from "@/components/Petals";
import KineticSubtitle from "@/components/KineticSubtitle";
import MarqueeStrip from "@/components/MarqueeStrip";
import StageCarousel, { StageItem } from "@/components/StageCarousel";
const DynamicStageCarousel = dynamic(() => import("@/components/StageCarousel"), { ssr: false });
import SocialSidebar from "@/components/SocialSidebar";
import Footer from "@/components/Footer";

const logo = "/assets/logo.png";
const dancer1 = "/assets/dancer1.jpg";
const dancer4 = "/assets/dancer4.jpg";
const dancer5 = "/assets/dancer5.jpg";

// Helpers
const toRoman = (num: number): string => {
  const lookup: { [key: string]: number } = { X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = "";
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

const LAUNCH_DATE = new Date("2024-12-01");

interface EditionData {
  id: number;
  edition: string;
  title: string;
  year: string;
  text: string;
  images: string[];
}

const baseEditions: EditionData[] = [
  { id: 1, edition: "I", title: "The Awakening", year: "2019", text: "The inaugural edition exploring the roots of Bharatanatyam through rhythm and unadulterated form. Artists stripped away modern excess to reveal the pure geometry of the Margam, receiving immense critical acclaim.", images: [dancer1, dancer4, dancer5, dancer1, dancer4] },
  { id: 2, edition: "II", title: "Sacred Geometry", year: "2020", text: "A comprehensive study of angles, lines, and the divine mathematics that govern classical adavus. This edition pushed boundaries by introducing intricate geometric staging and highlighting the precision required in traditional footwork.", images: [dancer5, dancer1, dancer4, dancer5, dancer1] },
  { id: 3, edition: "III", title: "Rasa & Bhava", year: "2021", text: "Delving deep into emotional expression, moving beyond technical perfection to touch the soul. We presented rare Varnams sourced from archival manuscripts, brought to life by master practitioners focusing entirely on Abhinaya.", images: [dancer4, dancer5, dancer1, dancer4, dancer5] },
  { id: 4, edition: "IV", title: "Mythos", year: "2022", text: "Bringing ancient epics to life on stage, weaving complex narratives of gods and mortals. A spectacular showcase of storytelling where the dancers transcended their physical forms to embody multiple mythological characters.", images: [dancer1, dancer4, dancer5, dancer1, dancer4] },
  { id: 5, edition: "V", title: "Continuum", year: "2023", text: "Exploring the unbroken lineage of dance, passing the torch from guru to shishya. This monumental edition featured side-by-side performances of legends and their prodigious disciples, highlighting the living nature of the tradition.", images: [dancer5, dancer1, dancer4, dancer5, dancer1] },
  { id: 6, edition: "VI", title: "Transcendence", year: "2024", text: "The culmination of a half-decade of exploration, reaching for the sublime through movement. Featuring an unprecedented ensemble and a commissioned orchestral score, it bridged the gap between physical exertion and spiritual transcendence.", images: [dancer4, dancer5, dancer1, dancer4, dancer5] },
];

const computeAutoEditions = (now: Date): EditionData[] => {
  const monthsSinceLaunch = (now.getFullYear() - LAUNCH_DATE.getFullYear()) * 12 + (now.getMonth() - LAUNCH_DATE.getMonth());
  const extraCount = Math.max(0, Math.floor(monthsSinceLaunch / 6));
  
  return Array.from({ length: extraCount }).map((_, i) => {
    const id = 7 + i;
    const yearDate = new Date(LAUNCH_DATE);
    yearDate.setMonth(yearDate.getMonth() + 6 * (i + 1));
    return {
      id,
      edition: toRoman(id),
      title: `Edition ${toRoman(id)}`,
      year: yearDate.getFullYear().toString(),
      text: "A continuing journey into the depths of classical art, preserving tradition while embracing evolution. This upcoming iteration promises to push the boundaries of rhythmic complexity and emotional resonance on the grand stage.",
      images: [dancer1, dancer4, dancer5, dancer1, dancer4],
    };
  });
};

interface LeelaClientProps {
  sanityEditions: any[];
  sanityChambers?: any[];
  sanityWorkshops?: any[];
  sanityAnnouncement?: any;
}

export default function LeelaClient({ sanityEditions, sanityChambers, sanityWorkshops, sanityAnnouncement }: LeelaClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // Delay non-critical hydration to free up initial thread
    const timer = setTimeout(() => setIsDeferred(true), 150);
    // Ensure we start at the top of the page when navigating here
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Cursor Light
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!isFinePointer || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 180);
      cursorY.set(e.clientY - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Section Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Data
  let performances: StageItem[] = [];
  
  if (sanityEditions && sanityEditions.length > 0) {
    performances = sanityEditions.map((e: any) => ({
      title: e.title,
      description: e.text,
      image: e.images || [],
      eyebrow: `EDITION ${e.edition}`,
      meta: e.year
    }));
  } else {
    const allEditions = [...baseEditions, ...computeAutoEditions(new Date())];
    performances = allEditions.slice(0, 3).map(e => ({
      title: e.title,
      description: e.text,
      image: e.images.slice(0, 5),
      eyebrow: `EDITION ${e.edition}`,
      meta: e.year
    }));
  }

  let chambers: StageItem[] = [];
  if (sanityChambers && sanityChambers.length > 0) {
    chambers = sanityChambers.map((e: any) => ({
      title: e.title,
      description: e.text,
      image: e.images || [],
    }));
  } else {
    chambers = [
      { title: "The Poetry of Jayadeva", description: "Experience the Ashtapadis of the Gita Govinda in an unplugged, candle-lit setting. Without the physical distance of a proscenium stage, the audience becomes intimately involved in the profound emotional exchange between the artists.", image: dancer1 },
      { title: "Padams of Kshetrayya", description: "A masterful exploration of slow, languorous, and deeply evocative Telugu Padams. This chamber concert relies entirely on the seated Abhinaya tradition, relying solely on subtle facial expressions to convey layers of meaning.", image: dancer4 },
    ];
  }

  let workshops: StageItem[] = [];
  if (sanityWorkshops && sanityWorkshops.length > 0) {
    workshops = sanityWorkshops.map((e: any) => ({
      title: e.title,
      description: e.text,
      image: e.images || [],
    }));
  } else {
    workshops = [
      { title: "Karanas: The Lost Movement", description: "A rigorous, intensive deep dive into the 108 Karanas as detailed in the ancient Natya Shastra. This workshop requires immense physical discipline to reconstruct dynamic movement units from foundational sculptural evidence.", image: dancer4 },
      { title: "Tala & Nattuvangam", description: "Understanding the complex mathematics and vocalized rhythmic syllables (Jathis) that form the structural backbone of Bharatanatyam. Participants will learn how to construct their own rhythmic sequences and wield the cymbals with absolute precision.", image: dancer5 },
    ];
  }

  return (
    <PageVeilTransition pageKey="leela">
      <div className="noise-overlay min-h-screen relative text-foreground selection:bg-primary/30">
        
        {/* Background Chrome */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <MovingBackground speed={3} />
        </div>
        <FloatingElements />
        <ScrollProgress />
        <Petals count={6} slow />
        
        {/* Cursor Light */}
        <motion.div 
          className="fixed pointer-events-none z-[30] rounded-full mix-blend-screen opacity-80"
          style={{ x: springX, y: springY, width: 360, height: 360, background: "radial-gradient(circle, hsl(320 55% 55% / 0.3) 0%, transparent 70%)", willChange: "transform, opacity" }}
        />

        {/* Hero Section */}
        <motion.section id="hero" ref={heroRef} style={{ y: heroY, opacity: heroOpacity }} className="min-h-[90vh] overflow-hidden flex flex-col items-center justify-center text-center relative z-10 px-4 pt-20">
          <div className="relative mb-12 flex items-center justify-center gap-6 md:gap-10">
            {/* Left Glyph */}
            <div className="relative flex items-center justify-center">
              <motion.div 
                className="absolute bg-primary/50 rounded-full blur-2xl z-0"
                style={{ width: "160%", height: "160%" }}
                animate={{ rotate: 360, scale: [1, 1.4, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-3xl md:text-4xl text-primary relative z-10 block drop-shadow-[0_0_15px_hsl(320,55%,55%,0.8)]">◈</span>
            </div>

            {/* Masked Logo */}
            <Image src={logo} alt="" width={128} height={128} priority className="hidden" aria-hidden="true" />
            <div
              className="w-28 h-28 md:w-32 md:h-32 bg-gradient-wine-shift"
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

            {/* Right Glyph */}
            <div className="relative flex items-center justify-center">
              <motion.div 
                className="absolute bg-primary/50 rounded-full blur-2xl z-0"
                style={{ width: "160%", height: "160%" }}
                animate={{ rotate: -360, scale: [1, 1.4, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-3xl md:text-4xl text-primary relative z-10 block drop-shadow-[0_0_15px_hsl(320,55%,55%,0.8)]">◈</span>
            </div>
          </div>

          <div className="glass-surface glow-wine rounded-full px-6 py-2.5 mb-8">
            <span className="text-[12px] tracking-[6px] uppercase font-display text-primary">THE FESTIVAL OF ARTS</span>
          </div>

          <h1 className="font-display whitespace-nowrap text-[15vw] sm:text-6xl lg:text-[5rem] tracking-[5px] mb-2 flex gap-2">
            {"LEELA".split("").map((char, i) => (
              <motion.span 
                key={i} 
                className="text-gradient-wine inline-block"
                initial={{ y: 120, rotateX: -90 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <div className="h-8 mb-4">
            <KineticSubtitle words={["a divine geometry", "rhythm and devotion", "the unseen breath", "movement as prayer"]} />
          </div>

          <p className="font-body text-base md:text-lg text-white/90 max-w-[500px] leading-[2] mb-8">
            An annual congregation where mastery meets divinity. Leela is not merely a performance; it is a communion of souls through the sacred geometry of Bharatanatyam.
          </p>

          {/* Social Sidebar removed from hero */}
          
          {/* Scroll Indicator */}
          <motion.div 
            className="flex flex-col items-center text-primary/70 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="font-display text-[11px] md:text-xs font-bold uppercase tracking-[4px] mb-3">SCROLL TO BEGIN</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 drop-shadow-[0_0_8px_hsl(var(--primary))]" />
            </motion.div>
          </motion.div>
        </motion.section>

      {isDeferred && (
        <>
          {/* Marquee */}
        <div className="relative z-10">
          <MarqueeStrip />
        </div>

        {/* Performance Series */}
        <section id="performance" className="py-16 md:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-16 text-center flex flex-col items-center">
            <div className="relative inline-block mb-4 w-full">
              <span className="absolute inset-0 flex items-center justify-center font-display text-[10rem] sm:text-[15rem] md:text-[20rem] text-white/5 pointer-events-none -translate-y-12 select-none">I</span>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Small Pill (Eyebrow Label) */}
                <div className="inline-flex items-center gap-3 px-6 py-1.5 rounded-full border border-primary/20 bg-black/20 backdrop-blur-sm mb-6">
                  <Music className="w-3 h-3 text-primary/70" />
                  <span className="font-display text-[10px] tracking-[5px] uppercase text-primary/70">SERIES ONE</span>
                  <Music className="w-3 h-3 text-primary/70" />
                </div>

                <h2 className="font-display text-4xl md:text-5xl tracking-[4px] text-gradient-wine">The Performance Series</h2>
              </div>
            </div>
            <p className="font-luxury text-lg text-white/90 italic max-w-2xl mx-auto">
              The grand stage where technique dissolves into pure expression.<br className="hidden md:block" /> Experience the monumental scale of ancient mythologies brought to life.
            </p>
          </div>
          <StageCarousel items={performances} intervalMs={9000} Icon={Sparkles} />
        </section>

        {/* Dynamic CMS Announcement Pill */}
        <div className="flex items-center justify-center py-4 relative z-10">
          <div className="glass-surface glow-wine rounded-full px-8 py-3 border border-primary/30 backdrop-blur-md shadow-[0_0_20px_hsl(var(--primary)/0.15)] text-center max-w-[90%] mx-auto">
            <span className="text-[12px] md:text-[14px] tracking-[1px] md:tracking-[2px] font-display text-primary/90 font-medium drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
              {sanityAnnouncement?.announcementText || "NEXT LEELA ARTS FESTIVAL IS ON 20TH SEPTEMBER. STAY TUNED FOR MORE UPDATES."}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-8 relative z-10">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/40 text-xs">◆</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* Chamber Concert */}
        <section id="chamber" className="py-16 md:py-24 relative z-10 bg-black/10">
          <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-16 text-center flex flex-col items-center relative z-10">
            <div className="relative inline-block mb-4 w-full">
              <span className="absolute inset-0 flex items-center justify-center font-display text-[10rem] sm:text-[15rem] md:text-[20rem] text-white/5 pointer-events-none -translate-y-12 select-none">II</span>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Small Pill (Eyebrow Label) */}
                <div className="inline-flex items-center gap-3 px-6 py-1.5 rounded-full border border-primary/20 bg-black/20 backdrop-blur-sm mb-6">
                  <Mic className="w-3 h-3 text-primary/70" />
                  <span className="font-display text-[10px] tracking-[5px] uppercase text-primary/70">SERIES TWO</span>
                  <Mic className="w-3 h-3 text-primary/70" />
                </div>

                <h2 className="font-display text-4xl md:text-5xl tracking-[4px] text-gradient-wine">The Chamber Concert</h2>
              </div>
            </div>
            <p className="font-luxury text-lg text-white/90 italic max-w-2xl mx-auto">
              NAF hosts the LEELA Chamber Concert series.
              <br />
              This effort is aimed at creating a space for upcoming artists and rasikas to engage in a much more intimate setting, creating a space for active dialogue and artistic discussion, thus bringing the art closer to the audience.
            </p>
          </div>
          <DynamicStageCarousel items={chambers} intervalMs={7000} />
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-8 relative z-10">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/40 text-xs">◆</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* Workshop Series */}
        <section id="workshop" className="pt-16 pb-0 md:pt-24 md:pb-0 relative z-10">
          <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-16 text-center flex flex-col items-center relative z-10">
            <div className="relative inline-block mb-4 w-full">
              <span className="absolute inset-0 flex items-center justify-center font-display text-[10rem] sm:text-[15rem] md:text-[20rem] text-white/5 pointer-events-none -translate-y-12 select-none">III</span>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Small Pill (Eyebrow Label) */}
                <div className="inline-flex items-center gap-3 px-6 py-1.5 rounded-full border border-primary/20 bg-black/20 backdrop-blur-sm mb-6">
                  <GraduationCap className="w-3 h-3 text-primary/70" />
                  <span className="font-display text-[10px] tracking-[5px] uppercase text-primary/70">SERIES THREE</span>
                  <GraduationCap className="w-3 h-3 text-primary/70" />
                </div>

                <h2 className="font-display text-4xl md:text-5xl tracking-[4px] text-gradient-wine">The Workshop Series</h2>
              </div>
            </div>
            <p className="font-luxury text-lg text-white/90 italic max-w-2xl mx-auto">
              The Youth edition of the Leela stages prominent youngsters from the performing arts arena.
            </p>
          </div>
          <StageCarousel items={workshops} intervalMs={7000} Icon={GraduationCap} />
        </section>

        {/* Marquee After Workshop */}
        <div className="relative z-10 py-0">
          <MarqueeStrip />
        </div>

        {/* Closing Section */}
        <section id="closing" className="pt-0 pb-32 -mt-4 md:-mt-8 relative z-10 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-3xl text-primary block mb-6">◈</span>
            <h2 className="font-luxury text-3xl md:text-4xl text-white/80 leading-relaxed mb-12 italic">
              "When the dancer vanishes and only the dance remains, we enter the realm of Leela."
            </h2>
            <Link href="/#heritage" className="inline-block px-8 py-3 border border-primary/30 rounded-full font-display uppercase tracking-[3px] text-sm text-primary hover:bg-primary/10 transition-colors">
              Return to Sanctum
            </Link>
          </div>
        </section>

        <SocialSidebar />
        <Footer />
        </>
      )}
      </div>
    </PageVeilTransition>
  );
}
