import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dancer1 from "@/assets/dancer1.jpg";
import dancer4 from "@/assets/dancer4.jpg";
import dancer5 from "@/assets/dancer5.jpg";
import logo from "@/assets/logo.jpeg";
import MiniFrameSlider from "@/components/MiniFrameSlider";

const frame1Images = [
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267836/WhatsApp_Image_2026-05-20_at_11.20.09_AM_ohp4q6.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267835/WhatsApp_Image_2026-05-20_at_11.20.13_AM_nmnml2.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267835/WhatsApp_Image_2026-05-20_at_11.20.09_AM_1_go1l5s.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267835/WhatsApp_Image_2026-05-20_at_11.20.11_AM_mzxjov.jpg",
];
const frame2Images = [
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267835/WhatsApp_Image_2026-05-20_at_11.20.12_AM_1_qf0duj.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267817/WhatsApp_Image_2026-05-20_at_11.20.10_AM_1_lllemh.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267815/WhatsApp_Image_2026-05-20_at_11.20.13_AM_banivp.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267815/WhatsApp_Image_2026-05-20_at_11.20.11_AM_2_gujsvk.jpg",
];
const frame3Images = [
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267835/WhatsApp_Image_2026-05-20_at_11.20.12_AM_o60hvv.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267815/WhatsApp_Image_2026-05-20_at_11.20.12_AM_1_dwek71.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267815/WhatsApp_Image_2026-05-20_at_11.20.11_AM_1_cbvajt.jpg",
  "https://res.cloudinary.com/dndsxfdaj/image/upload/q_auto/f_auto/v1779267815/WhatsApp_Image_2026-05-20_at_11.20.10_AM_2_fr4tta.jpg",
];

const titleLetters = "DIVINE TRADITIONS".split("");

const philosophyFull =
  "Rooted in the ancient soils of South India, Nandanam is dedicated to promoting the pure, unadulterated art of Bharatanatyam. We believe that classical dance is not merely a performing art, but a spiritual discipline calling upon ancient geometry. Through rigorous practice and unwavering dedication, the artist becomes a vessel for storytelling that transcends generations.";

const WORD_LIMIT = 80;
const words = philosophyFull.split(" ");
const truncated = words.slice(0, WORD_LIMIT).join(" ") + "…";

const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const TiltCard = ({
  stat,
  i,
}: {
  stat: { number: number; suffix: string; label: string };
  i: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="glass-surface rounded-sm p-5 text-center cursor-default"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ scale: 1.06, boxShadow: "0 0 30px hsl(320 55% 55% / 0.15)" }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="font-display text-3xl text-primary block mb-1"
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <CountUp value={stat.number} suffix={stat.suffix} />
      </motion.span>
      <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
        {stat.label}
      </span>
    </motion.div>
  );
};

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5, 0.85], [1, 0.6, 0]);
  const heroBlur = useTransform(heroProgress, [0, 0.85], ["blur(0px)", "blur(8px)"]);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="noise-overlay">
      <motion.section
        ref={heroRef}
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity, filter: heroBlur }}
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative"
      >
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.img
            src={logo}
            alt="Nandanam logo"
            className="w-10 h-10 object-contain mix-blend-screen"
            style={{ filter: "invert(1) sepia(1) saturate(1.5) hue-rotate(330deg) brightness(0.6)" }}
            animate={{
              filter: [
                "invert(1) sepia(1) saturate(1.5) hue-rotate(330deg) brightness(0.6)",
                "invert(1) sepia(1) saturate(1.2) hue-rotate(280deg) brightness(0.55)",
                "invert(1) sepia(1) saturate(1.5) hue-rotate(320deg) brightness(0.6)",
                "invert(1) sepia(1) saturate(1.5) hue-rotate(330deg) brightness(0.6)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <span className="inline-block px-5 py-2 rounded-full font-display text-[10px] tracking-[6px] uppercase text-primary glass-surface glow-wine">
            Nandanam Arts Foundation
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] tracking-[6px] leading-[1.1]">
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-gradient-wine"
                initial={{ y: 120, rotateX: -90, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-[600px] leading-[1.8]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          A legacy of rhythm, expression, and absolute devotion to the ancient art of Bharatanatyam.
        </motion.p>
      </motion.section>

      <motion.div
        className="w-[1px] h-[100px] mx-auto"
        style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <motion.h2
          className="font-display text-[3.25rem] md:text-[4.25rem] lg:text-[5.2rem] tracking-[3px] text-white/95 mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          The Philosophy
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[800px] mb-14"
        >
          <p className="font-poppins italic font-medium text-base md:text-lg leading-[2.2] text-white/70 tracking-wide mb-4">
            {expanded ? philosophyFull : truncated}
          </p>
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="font-display text-xs tracking-[3px] uppercase text-primary hover:text-primary/80 transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            {expanded ? "Show Less" : "Read More →"}
          </motion.button>
        </motion.div>

        <div className="flex gap-4 overflow-hidden">
          <div className="flex-1 min-w-0">
            <MiniFrameSlider images={frame1Images} />
          </div>
          <div className="flex-1 min-w-0">
            <MiniFrameSlider images={frame2Images} />
          </div>
          <div className="flex-1 min-w-0">
            <MiniFrameSlider images={frame3Images} />
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-[4.25rem] md:text-[5.2rem] lg:text-[6rem] tracking-[3px] text-white/95 mb-8">
            Our Heritage
          </h2>

          <motion.p
            className="font-poppins italic font-medium text-base md:text-lg leading-[2] text-white/70 tracking-wide mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Nandanam Arts Foundation preserves and propagates the purest form of Bharatanatyam — an ancient South Indian classical dance that fuses rhythmic footwork, expressive storytelling, and spiritual devotion into a singular art form.
          </motion.p>

          <motion.p
            className="font-poppins italic font-medium text-base md:text-lg leading-[2] text-white/70 tracking-wide mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Under the guidance of Guru Padmaja, our disciples train rigorously in adavus, abhinaya, and nritta — mastering every mudra with precision that honours centuries of unbroken tradition.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { number: 25, suffix: "+", label: "Years of Legacy" },
              { number: 500, suffix: "+", label: "Students Trained" },
              { number: 100, suffix: "+", label: "Performances" },
              { number: 12, suffix: "", label: "Countries Reached" },
              { number: 18, suffix: "", label: "Awards Won" },
            ].map((stat, i) => (
              <TiltCard key={stat.label} stat={stat} i={i} />
            ))}
          </div>

          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/teaching" className="group">
              <motion.span
                className="inline-flex items-center gap-3 font-display text-xs md:text-sm tracking-[5px] uppercase text-primary glass-surface px-7 py-4 rounded-full glow-wine"
                whileHover={{ scale: 1.04, letterSpacing: "6px" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Enter the Teaching Wing
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-[800px] mx-auto px-6 pt-12 pb-4 text-center">
        <motion.div
          className="w-[1px] h-[60px] mx-auto mb-12"
          style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.h3
          className="font-display text-xl tracking-[5px] uppercase text-primary mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Philosophy
        </motion.h3>

        <motion.p
          className="font-display italic text-lg md:text-xl leading-[2] text-muted-foreground tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          "Every mudra is a prayer. Every adavu is a meditation. We do not merely dance — we channel the divine through disciplined movement, transforming the human body into a vessel of ancient stories and timeless devotion."
        </motion.p>
      </section>
    </div>
  );
};

export default Landing;
