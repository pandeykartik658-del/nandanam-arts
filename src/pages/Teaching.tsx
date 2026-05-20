import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import RotatingShowcase from "@/components/RotatingShowcase";
import PageVeilTransition from "@/components/PageVeilTransition";
import MovingBackground from "@/components/MovingBackground";
import ScrollProgress from "@/components/ScrollProgress";
import KineticSubtitle from "@/components/KineticSubtitle";
import DisciplineNavigator from "@/components/DisciplineNavigator";
import MarqueeStrip from "@/components/MarqueeStrip";
import JourneyTimeline from "@/components/JourneyTimeline";
import MagneticButton from "@/components/MagneticButton";
import FloatingElements from "@/components/FloatingElements";
import dancer2 from "@/assets/dancer2.jpg";
import dancer3 from "@/assets/dancer3.jpg";
import dancer4 from "@/assets/dancer4.jpg";
import dancer5 from "@/assets/dancer5.jpg";
import musicVeena from "@/assets/music-veena.jpg";
import musicMridangam from "@/assets/music-mridangam.jpg";
import musicVocalist from "@/assets/music-vocalist.jpg";
import musicViolin from "@/assets/music-violin.jpg";

const titleLetters = "THE TEACHING WING".split("");

const PillarCard = ({
  title,
  desc,
  back,
  i,
}: {
  title: string;
  desc: string;
  back?: { term: string; translit: string };
  i: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => back && setFlipped(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setFlipped(false);
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative cursor-default"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative min-h-[120px]"
      >
        {/* Front */}
        <div
          className="glass-surface rounded-sm p-5 absolute inset-0 hover:shadow-[0_0_30px_hsl(320_55%_55%/0.18)] transition-shadow"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h4 className="font-display text-lg tracking-[3px] uppercase text-primary mb-2">{title}</h4>
          <p className="font-poppins italic font-medium text-sm leading-[1.8] text-white/70">{desc}</p>
        </div>
        {/* Back */}
        {back && (
          <div
            className="glass-surface rounded-sm p-5 absolute inset-0 flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, hsl(320 55% 55% / 0.15), hsl(280 40% 35% / 0.15))",
              boxShadow: "0 0 30px hsl(320 55% 55% / 0.25) inset",
            }}
          >
            <span className="font-display text-2xl md:text-3xl text-white/95 tracking-[2px] mb-2">
              {back.term}
            </span>
            <span className="font-poppins italic text-xs tracking-[3px] uppercase text-primary/80">
              {back.translit}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Teaching = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const cursorXSpring = useSpring(cursorX, { stiffness: 60, damping: 20 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 60, damping: 20 });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5, 0.85], [1, 0.6, 0]);
  const heroBlur = useTransform(heroProgress, [0, 0.85], ["blur(0px)", "blur(8px)"]);

  return (
    <PageVeilTransition>
      <div className="relative noise-overlay min-h-screen">
        <MovingBackground />
        <FloatingElements />
        <ScrollProgress />

        {/* Back link */}
        <motion.div
          className="fixed top-6 left-6 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link
            to="/"
            className="font-display text-[10px] tracking-[4px] uppercase text-white/70 hover:text-primary transition-colors glass-surface px-4 py-2 rounded-full"
          >
            ← Return to Sanctum
          </Link>
        </motion.div>

        {/* Hero with cursor-reactive light */}
        <motion.section
          ref={heroRef}
          onMouseMove={(e) => {
            const rect = heroRef.current?.getBoundingClientRect();
            if (!rect) return;
            cursorX.set(e.clientX - rect.left);
            cursorY.set(e.clientY - rect.top);
          }}
          onMouseLeave={() => {
            cursorX.set(-200);
            cursorY.set(-200);
          }}
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity, filter: heroBlur }}
          className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
        >
          {/* Cursor light */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              width: 500,
              height: 500,
              translateX: "-50%",
              translateY: "-50%",
              background:
                "radial-gradient(circle, hsl(320 55% 55% / 0.12), transparent 60%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Ornamental glyph */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 -m-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(320 55% 55% / 0.45), transparent 70%)",
                filter: "blur(12px)",
              }}
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{
                rotate: { duration: 24, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <span className="relative font-display text-3xl text-primary block">◈</span>
          </motion.div>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-block px-5 py-2 rounded-full font-display text-[10px] tracking-[6px] uppercase text-primary glass-surface glow-wine">
              Where Tradition Is Passed On
            </span>
          </motion.div>

          <div className="overflow-hidden mb-8">
            <h1 className="font-display text-4xl md:text-6xl lg:text-[5rem] tracking-[5px] leading-[1.1]">
              {titleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-gradient-wine"
                  initial={{ y: 120, rotateX: -90, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Kinetic subtitle */}
          <motion.div
            className="mb-6 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <KineticSubtitle
              words={["Discipline.", "Devotion.", "Expression.", "Rhythm.", "Grace."]}
              className="font-display text-sm md:text-base tracking-[6px] uppercase text-primary/80"
            />
          </motion.div>

          <motion.p
            className="font-body text-base md:text-lg text-muted-foreground max-w-[640px] leading-[1.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            The teaching wing of the foundation Nandanam Centre for Arts conducts classes for Carnatic Vocal and Bharathanatya, training several aspiring students from all age groups.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <span className="font-display text-[9px] tracking-[5px] uppercase text-white/50">
              Scroll to Begin
            </span>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary/80 text-lg"
            >
              ⌄
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Intro */}
        <section className="max-w-[900px] mx-auto px-6 py-16">
          <motion.p
            className="font-poppins italic font-medium text-base md:text-lg leading-[2.2] text-white/70 tracking-wide text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            At Nandanam, the teaching wing is the beating heart of our sanctum. Through Bharatanatyam and Carnatic music, our disciples are guided not merely toward proficiency, but toward a lifelong devotion — a quiet, unbroken conversation between the seeker and the divine.
          </motion.p>
        </section>

        {/* Sticky discipline navigator */}
        <DisciplineNavigator
          sections={[
            { id: "dance-section", label: "Dance" },
            { id: "music-section", label: "Music" },
          ]}
        />

        {/* DANCE SECTION */}
        <section id="dance-section" className="max-w-[1200px] mx-auto px-6 pt-12 pb-20 scroll-mt-24">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-[10px] tracking-[6px] uppercase text-primary/80">
              Discipline I
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingShowcase
                images={[
                  { src: dancer2, alt: "Bharatanatyam pose", caption: "Tribhanga — the threefold bend" },
                  { src: dancer3, alt: "Bharatanatyam mudra", caption: "Pataka — the open palm of offering" },
                  { src: dancer4, alt: "Bharatanatyam in motion", caption: "Adavu — the rhythmic alphabet" },
                  { src: dancer5, alt: "Bharatanatyam expression", caption: "Abhinaya — the face speaks" },
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-[3rem] md:text-[4rem] lg:text-[4.5rem] tracking-[3px] text-white/95 mb-6 leading-[1]">
                The Dance Wing
              </h2>
              <p className="font-poppins italic font-medium text-base md:text-lg leading-[2] text-white/70 tracking-wide mb-8">
                Bharatanatyam is taught here in its purest, unhurried form — beginning with the foundational adavus and unfolding, year by year, into the full margam. Every disciple is shaped patiently, mudra by mudra, breath by breath, until the body itself becomes a language.
              </p>

              <div className="space-y-4">
                <PillarCard
                  i={0}
                  title="Adavu"
                  desc="The rhythmic alphabet — footwork, posture, and the geometry of movement."
                  back={{ term: "अडवु", translit: "Aḍavu" }}
                />
                <PillarCard
                  i={1}
                  title="Abhinaya"
                  desc="The art of expression — face, eyes, and hands telling stories older than memory."
                  back={{ term: "अभिनय", translit: "Abhinaya" }}
                />
                <PillarCard
                  i={2}
                  title="Margam"
                  desc="The traditional repertoire — Alarippu through Tillana, the dancer's complete journey."
                  back={{ term: "मार्गम्", translit: "Mārgam" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marquee divider */}
        <MarqueeStrip
          items={["Adavu", "Tala", "Raga", "Bhava", "Mudra", "Laya", "Shruti", "Nritta"]}
        />

        {/* Ornamental divider */}
        <div className="flex flex-col items-center gap-4 py-6">
          <motion.div
            className="w-[1px] h-[40px]"
            style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.span
            className="text-primary text-2xl"
            initial={{ opacity: 0, rotate: -180 }}
            whileInView={{ opacity: 0.7, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            ◆
          </motion.span>
        </div>

        {/* MUSIC SECTION */}
        <section id="music-section" className="max-w-[1200px] mx-auto px-6 pt-12 pb-20 scroll-mt-24">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-[10px] tracking-[6px] uppercase text-primary/80">
              Discipline II
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              className="md:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingShowcase
                reverse
                images={[
                  { src: musicVocalist, alt: "Carnatic vocalist with tanpura", caption: "Sruti — the unbroken drone of the tanpura" },
                  { src: musicVeena, alt: "Veena on silk", caption: "Veena — the instrument of Saraswati" },
                  { src: musicMridangam, alt: "Mridangam being played", caption: "Mridangam — the heartbeat of the kutcheri" },
                  { src: musicViolin, alt: "Carnatic violin", caption: "Violin — the voice's gentle echo" },
                ]}
              />
            </motion.div>

            <motion.div
              className="md:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-[3rem] md:text-[4rem] lg:text-[4.5rem] tracking-[3px] text-white/95 mb-6 leading-[1]">
                The Music Wing
              </h2>
              <p className="font-poppins italic font-medium text-base md:text-lg leading-[2] text-white/70 tracking-wide mb-8">
                Our Carnatic music wing is built upon the vocal tradition — the original instrument. Disciples begin with sarali and janta varisai, walking the long, patient path toward kritis, ragas, and the deep wells of manodharma. Instrumental study in violin and mridangam supports the voice.
              </p>

              <div className="space-y-4">
                <PillarCard
                  i={0}
                  title="Vocal"
                  desc="Sarali · Janta · Geetham · Varnam · Kriti — the vocal scaffolding of the tradition."
                  back={{ term: "स्वर", translit: "Svara" }}
                />
                <PillarCard
                  i={1}
                  title="Instrumental"
                  desc="Violin and mridangam — the supporting voices that shape every concert."
                  back={{ term: "वाद्य", translit: "Vādya" }}
                />
                <PillarCard
                  i={2}
                  title="Theory"
                  desc="Raga, tala, and manodharma — the architecture beneath every improvised phrase."
                  back={{ term: "राग · ताल", translit: "Rāga · Tāla" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disciple's Journey timeline */}
        <JourneyTimeline />

        {/* Closing quote + magnetic CTA */}
        <section className="max-w-[800px] mx-auto px-6 pt-8 pb-24 text-center">
          <motion.div
            className="w-[1px] h-[60px] mx-auto mb-12"
            style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.p
            className="font-display italic text-lg md:text-xl leading-[2] text-muted-foreground tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            "A teacher does not give knowledge. A teacher lights a small lamp inside the disciple, and waits — patiently, devotedly — for that lamp to become a star."
          </motion.p>

          <motion.div
            className="mt-14 flex flex-col items-center gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <MagneticButton>
              <button
                onClick={() => document.getElementById("dance-section")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative font-display text-xs tracking-[5px] uppercase text-white/95 px-10 py-5 rounded-full overflow-hidden glass-surface"
                style={{
                  boxShadow: "0 0 40px hsl(320 55% 55% / 0.35), 0 0 80px hsl(320 55% 55% / 0.15)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: "linear-gradient(135deg, hsl(320 55% 55% / 0.3), hsl(280 40% 35% / 0.3))",
                  }}
                />
                <span className="relative">Begin Your Journey →</span>
              </button>
            </MagneticButton>

            <Link
              to="/"
              className="inline-block font-display text-[10px] tracking-[5px] uppercase text-white/60 hover:text-primary transition-colors"
            >
              ← Return to the Sanctum
            </Link>

            {/* Signature mark */}
            <motion.span
              className="font-display text-2xl text-primary/30 tracking-[4px] mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              नन्दनम्
            </motion.span>
          </motion.div>
        </section>
      </div>
    </PageVeilTransition>
  );
};

export default Teaching;
