import { motion } from "framer-motion";

const FloatingElements = () => {
  const elements = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 5 + Math.random() * 8,
    delay: Math.random() * 4,
    glow: Math.random() > 0.7,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute rounded-full ${el.glow ? 'bg-primary/30' : 'bg-primary/15'}`}
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            boxShadow: el.glow ? '0 0 6px hsl(39 68% 55% / 0.3)' : 'none',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, -20, 0],
            opacity: [0.05, 0.4, 0.05],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
