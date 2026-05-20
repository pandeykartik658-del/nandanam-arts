import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stops = [
  { year: "Year I", title: "Foundation", desc: "Posture, breath, and the first attentive listening — the disciple learns to arrive." },
  { year: "Year II", title: "Adavus & Sarali", desc: "Footwork meets vocal varisai — the body and voice begin their parallel discipline." },
  { year: "Year III", title: "Geetham & Abhinaya", desc: "First songs, first expressions — devotion takes its earliest articulate form." },
  { year: "Year IV", title: "Varnam & Kriti", desc: "The grammar deepens. The disciple holds longer compositions, longer silences." },
  { year: "Year V", title: "Margam & Manodharma", desc: "The full repertoire, the improvised phrase — the offering becomes the disciple's own." },
];

const JourneyTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="max-w-[900px] mx-auto px-6 py-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-display text-[10px] tracking-[6px] uppercase text-primary/80 block mb-4">
          The Path Within
        </span>
        <h2 className="font-display text-[2.5rem] md:text-[3.5rem] tracking-[3px] text-white/95 leading-[1.1]">
          The Disciple's Journey
        </h2>
      </motion.div>

      <div ref={ref} className="relative pl-12 md:pl-20">
        {/* Background line */}
        <div className="absolute left-3 md:left-7 top-0 bottom-0 w-[1px] bg-white/8" />
        {/* Animated wine line */}
        <motion.div
          className="absolute left-3 md:left-7 top-0 w-[1px]"
          style={{
            height: lineHeight,
            background: "linear-gradient(180deg, hsl(330 60% 65%), hsl(320 55% 55%), hsl(280 40% 35%))",
            boxShadow: "0 0 14px hsl(320 55% 55% / 0.6)",
          }}
        />

        <div className="space-y-16">
          {stops.map((s, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Marker */}
              <motion.div
                className="absolute -left-[37px] md:-left-[57px] top-1 text-primary text-xl"
                animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                ◆
              </motion.div>
              <span className="font-display text-[10px] tracking-[5px] uppercase text-primary/80 block mb-2">
                {s.year}
              </span>
              <h3 className="font-display text-2xl md:text-3xl tracking-[2px] text-white/95 mb-3">
                {s.title}
              </h3>
              <p className="font-poppins italic font-medium text-sm md:text-base leading-[1.9] text-white/70 max-w-[560px]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
