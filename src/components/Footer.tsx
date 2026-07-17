"use client";

import { Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-primary/20 bg-background/50 backdrop-blur-md pt-2 pb-1 mt-0 z-20">
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-60" />
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
        <div className="mb-2 flex flex-col items-center">
          <div
            className="w-10 h-10 bg-gradient-wine-shift mb-1"
            style={{
              WebkitMaskImage: `url(/logo.png)`,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: `url(/logo.png)`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
          <span className="font-display text-[14px] tracking-[6px] uppercase text-primary/90 block mb-1 drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]">
            Nandanam Center for Arts
          </span>
        </div>

        {/* Legal/Copyright directly nestled with minimal top clearance */}
        <div className="font-display mt-2 text-[8px] tracking-[4px] text-white/80 uppercase">
          &copy; {new Date().getFullYear()} Nandanam Center for Arts. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

