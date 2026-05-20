import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface ShowcaseImage {
  src: string;
  alt: string;
  caption?: string;
}

interface RotatingShowcaseProps {
  images: ShowcaseImage[];
  interval?: number;
  reverse?: boolean;
}

const RotatingShowcase = ({ images, reverse = false }: RotatingShowcaseProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  // Autoplay — also advances on click/keyboard/swipe
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Image showcase"
        onKeyDown={handleKey}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={next}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-primary/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {/* Wine glow ring */}
        <div
          className="absolute -inset-2 rounded-3xl pointer-events-none -z-10 opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at center, hsl(320 55% 55% / 0.5), transparent 70%)",
          }}
        />
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full object-cover grayscale-[15%] contrast-110"
            loading="lazy"
          />
        </AnimatePresence>
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 60%, hsl(280 30% 8% / 0.6) 100%)",
          }}
        />

        {/* Caption */}
        <AnimatePresence mode="wait">
          {images[index].caption && (
            <motion.div
              key={`cap-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
              style={{
                background: "linear-gradient(0deg, hsl(280 30% 5% / 0.85), transparent)",
              }}
            >
              <p className="font-poppins italic text-sm text-white/85 tracking-wide text-center">
                {images[index].caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicators */}
      <div className="flex justify-center items-center gap-3 mt-5">
        {images.map((_, i) => {
          const isActive = i === index;
          return (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Show image ${i + 1}`}
              className="relative flex items-center justify-center"
              style={{ width: 28, height: 28 }}
            >
              <span
                className="rounded-full transition-all duration-500"
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  background: isActive
                    ? "linear-gradient(135deg, hsl(330 70% 65%), hsl(320 55% 55%))"
                    : "hsl(320 30% 40% / 0.5)",
                  boxShadow: isActive ? "0 0 10px hsl(320 55% 55% / 0.6)" : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RotatingShowcase;
