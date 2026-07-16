"use client";

import { Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-primary/20 bg-background/50 backdrop-blur-md pt-16 pb-8 mt-12 z-20">
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-60" />
      
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
        {/* Foundation Branding */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className="w-10 h-10 bg-gradient-wine-shift mb-4"
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
          <span className="font-display text-[15.5px] tracking-[6px] uppercase text-primary/90 block mb-3 drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]">
            Nandanam Art Foundation
          </span>
          <p className="font-body text-[14px] tracking-wide text-white/70 max-w-[400px] mx-auto leading-relaxed">
            Preserving the ancient geometry and devotional storytelling of classical Bharatanatyam.
          </p>
        </div>

        {/* Legal/Copyright directly nestled with minimal top clearance */}
        <div className="font-display mt-8 text-[8px] tracking-[4px] text-white/80 uppercase">
          &copy; {new Date().getFullYear()} Nandanam Art Foundation. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

