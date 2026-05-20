import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchFrameImages, openUploadWidget } from "@/lib/cloudinary";
import MovingBackground from "@/components/MovingBackground";

interface FrameSectionProps {
  frameNumber: number;
  tag: string;
  images: string[];
  loading: boolean;
  onUpload: () => void;
}

const FrameSection = ({
  frameNumber,
  tag,
  images,
  loading,
  onUpload,
}: FrameSectionProps) => {
  const handleUploadClick = () => {
    openUploadWidget(tag, onUpload);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: frameNumber * 0.15 }}
      className="glass-surface rounded-2xl p-6 border border-primary/20"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display text-lg tracking-[3px] uppercase text-primary">
            Frame {frameNumber}
          </h3>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Tag: <code className="text-primary/70">{tag}</code> · {images.length}{" "}
            image{images.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>
        <motion.button
          onClick={handleUploadClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-display text-[11px] tracking-[3px] uppercase px-5 py-2.5 rounded-full text-white/90 transition-colors"
          style={{
            background:
              "linear-gradient(135deg, hsl(320 55% 45%), hsl(280 40% 35%))",
            boxShadow: "0 0 20px hsl(320 55% 55% / 0.3)",
          }}
        >
          + Upload
        </motion.button>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((url, i) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-white/10"
            >
              <img
                src={url}
                alt={`Frame ${frameNumber} image ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <span className="absolute top-2 left-2 font-display text-[9px] tracking-[2px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-white/10 bg-white/[0.02]">
          <p className="font-body text-sm text-muted-foreground/50">
            No images uploaded yet — click Upload to add images
          </p>
        </div>
      )}
    </motion.div>
  );
};

const Admin = () => {
  const [frame1, setFrame1] = useState<string[]>([]);
  const [frame2, setFrame2] = useState<string[]>([]);
  const [frame3, setFrame3] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllImages = useCallback(async () => {
    setLoading(true);
    const [f1, f2, f3] = await Promise.all([
      fetchFrameImages("frame1"),
      fetchFrameImages("frame2"),
      fetchFrameImages("frame3"),
    ]);
    setFrame1(f1);
    setFrame2(f2);
    setFrame3(f3);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllImages();
  }, [loadAllImages]);

  return (
    <div className="relative min-h-screen noise-overlay">
      <MovingBackground />

      {/* Back link */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link
          to="/"
          className="font-display text-[10px] tracking-[4px] uppercase text-white/70 hover:text-primary transition-colors glass-surface px-4 py-2 rounded-full"
        >
          ← Back to Site
        </Link>
      </motion.div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-5 py-2 rounded-full font-display text-[10px] tracking-[6px] uppercase text-primary glass-surface glow-wine mb-6">
            Admin Dashboard
          </span>
          <h1 className="font-display text-3xl md:text-4xl tracking-[4px] text-gradient-wine mb-4">
            IMAGE MANAGER
          </h1>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
            Upload images for each of the 3 frames below "About Us." Images are
            stored on Cloudinary and fetched dynamically.
          </p>
        </motion.div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-surface rounded-xl p-4 mb-8 border border-primary/10 text-center"
        >
          <p className="font-body text-xs text-muted-foreground">
            💡 Upload up to <strong className="text-primary">4 images per frame</strong>. 
            To delete images, visit your{" "}
            <a
              href="https://console.cloudinary.com/console"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              Cloudinary Dashboard
            </a>
            , then click <strong className="text-white/80">Refresh</strong> below.
          </p>
        </motion.div>

        {/* Refresh button */}
        <motion.div
          className="flex justify-end mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={loadAllImages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-display text-[10px] tracking-[3px] uppercase text-white/60 hover:text-primary transition-colors glass-surface px-4 py-2 rounded-full border border-white/10"
          >
            ↻ Refresh All
          </motion.button>
        </motion.div>

        {/* Frame sections */}
        <div className="space-y-8">
          <FrameSection
            frameNumber={1}
            tag="frame1"
            images={frame1}
            loading={loading}
            onUpload={loadAllImages}
          />
          <FrameSection
            frameNumber={2}
            tag="frame2"
            images={frame2}
            loading={loading}
            onUpload={loadAllImages}
          />
          <FrameSection
            frameNumber={3}
            tag="frame3"
            images={frame3}
            loading={loading}
            onUpload={loadAllImages}
          />
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center py-10 mt-16 border-t border-border/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-display text-xs tracking-[4px] text-muted-foreground/40 uppercase">
            Nandanam Arts Foundation — Image Admin
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Admin;
