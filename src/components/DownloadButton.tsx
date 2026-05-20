import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const DownloadButton = () => {
  const handleDownload = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob(
      [
        `<!DOCTYPE html><html>${html.slice(html.indexOf("<head"))}`,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nandanam-arts.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MagneticButton>
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(39 68% 65% / 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/50 transition-colors flex items-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Page
      </motion.button>
    </MagneticButton>
  );
};

export default DownloadButton;
