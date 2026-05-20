import { motion, useScroll, useTransform } from "framer-motion";

const AmbientBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 4000], [0, 800]);
  const y2 = useTransform(scrollY, [0, 4000], [0, 400]);
  const y3 = useTransform(scrollY, [0, 4000], [200, -300]);
  const rotate = useTransform(scrollY, [0, 4000], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Deep forest base with radial depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 15%, hsl(100 15% 14% / 0.9), transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 25%, hsl(90 12% 12% / 0.7), transparent 45%),
            radial-gradient(ellipse 90% 70% at 50% 80%, hsl(100 10% 8% / 0.8), transparent 55%),
            radial-gradient(circle at 30% 60%, hsl(39 40% 20% / 0.15), transparent 40%),
            linear-gradient(145deg, hsl(100 12% 7%) 0%, hsl(100 10% 10%) 40%, hsl(95 8% 14%) 100%)
          `,
        }}
      />

      {/* Warm gold atmospheric glow - moves with scroll */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,hsl(39_60%_45%_/_0.12)_0%,hsl(39_50%_35%_/_0.04)_40%,transparent_70%)]" />
      </motion.div>

      {/* Secondary warm glow - right side */}
      <motion.div
        style={{ y: y2, rotate }}
        className="absolute top-[25%] right-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(39_55%_40%_/_0.07)_0%,hsl(35_40%_25%_/_0.03)_40%,transparent_70%)]"
      />

      {/* Deep forest glow - left */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[55%] left-[-150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(100_15%_20%_/_0.12)_0%,hsl(100_10%_12%_/_0.04)_40%,transparent_70%)]"
      />

      {/* Bottom warm accent */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 3000], [0, -200]) }}
        className="absolute bottom-[-200px] left-[40%] w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse,hsl(39_50%_30%_/_0.06)_0%,transparent_70%)]"
      />

      {/* Textured grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(39 68% 55% / 0.4) 1px, transparent 1px),
            linear-gradient(90deg, hsl(39 68% 55% / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal scratch lines for texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(39 60% 50% / 0.6) 0,
            hsl(39 60% 50% / 0.6) 1px,
            transparent 0,
            transparent 200px
          )`,
        }}
        animate={{ backgroundPosition: ["0px 0px", "200px 200px"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(100 12% 4% / 0.5) 100%)`,
        }}
      />
    </div>
  );
};

export default AmbientBackground;
