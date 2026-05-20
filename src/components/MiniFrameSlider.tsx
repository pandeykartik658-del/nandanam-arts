import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MiniFrameSliderProps {
  images: string[];
}

export const MiniFrameSlider = ({ images }: MiniFrameSliderProps) => {
  const [index, setIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const slideVariants = {
    enter: {
      x: "100%",
    },
    center: {
      x: 0,
    },
    exit: {
      x: "-100%",
    },
  };

  return (
    <div
      onClick={handleNext}
      className="relative w-full h-[200px] rounded-2xl border border-primary/30 overflow-hidden cursor-pointer group select-none"
    >
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
      
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Bharatanatyam dancer slide"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 220, damping: 26 },
          }}
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-110 group-hover:scale-105 transition-transform duration-700"
        />
      </AnimatePresence>

      {/* Subtle indicator dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary w-3.5" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniFrameSlider;
