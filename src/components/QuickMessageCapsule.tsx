"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export const WHATSAPP_NUMBER = "910000000000";

const QuickMessageCapsule = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      toast.error("Please enter a message first.", {
        description: "Your message seems to be empty.",
      });
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(trimmed)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp...", {
      description: "Redirecting to your chat.",
    });
    setMessage("");
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <span className="font-display text-[10px] tracking-[4px] uppercase text-primary/60">
          ✦ Or send a quick whisper ✦
        </span>
      </div>
      <form 
        onSubmit={handleSubmit}
        className="glass-surface rounded-[2rem] sm:rounded-full px-4 py-4 sm:p-2 sm:pl-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 group hover:shadow-[0_0_20px_hsl(320,55%,55%,0.2)] transition-shadow duration-500"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={240}
          placeholder="I would like to inquire about..."
          className="w-full flex-grow bg-transparent border-none outline-none text-center sm:text-left text-white/80 placeholder:text-white/30 font-body text-sm md:text-base sm:mr-4"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 rounded-full px-6 py-3 font-display uppercase tracking-[2px] text-xs transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          Send via WhatsApp
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
};

export default QuickMessageCapsule;

