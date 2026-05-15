"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Schedule = { start: number; end: number; text: string; closed?: boolean };

const WEEK_SCHEDULE: Record<number, Schedule> = {
  0: { start: 0, end: 0, text: "Closed", closed: true }, // Sunday
  1: { start: 17, end: 20, text: "5 PM - 8 PM" }, // Monday
  2: { start: 17, end: 20, text: "5 PM - 8 PM" }, // Tuesday
  3: { start: 17, end: 20, text: "5 PM - 8 PM" }, // Wednesday
  4: { start: 17, end: 20, text: "5 PM - 8 PM" }, // Thursday
  5: { start: 17, end: 20, text: "5 PM - 8 PM" }, // Friday
  6: { start: 8, end: 12, text: "8 AM - 12 PM" }, // Saturday
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const VisitingHours = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const currentDay = now.getDay();
  const currentHourFloat = now.getHours() + now.getMinutes() / 60;
  
  const todaySchedule = WEEK_SCHEDULE[currentDay];
  const isOpen = !todaySchedule.closed && currentHourFloat >= todaySchedule.start && currentHourFloat < todaySchedule.end;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-surface rounded-2xl p-6 md:p-8 max-w-[560px] mx-auto border border-primary/20 w-full"
    >
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-display tracking-[4px] uppercase text-primary/80 text-sm mb-1">
            Visiting Hours
          </h3>
          <p className="font-body text-white/50 text-sm">
            Today &middot; {DAYS[currentDay]}
            {!todaySchedule.closed && ` (${todaySchedule.text})`}
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
          {isOpen ? (
            <>
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "hsl(140, 60%, 55%)" }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-display text-[10px] tracking-[2px] uppercase text-white/80">Open now</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="font-display text-[10px] tracking-[2px] uppercase text-white/50">Closed</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day, i) => {
          const isToday = i === currentDay;
          const schedule = WEEK_SCHEDULE[i];
          return (
            <div 
              key={day}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isToday 
                  ? "bg-primary/20 border border-primary/40" 
                  : schedule.closed 
                    ? "opacity-30" 
                    : "bg-white/5 border border-transparent"
              }`}
            >
              <span className={`font-display text-[10px] tracking-[2px] uppercase mb-2 ${isToday ? "text-primary" : "text-white/60"}`}>
                {day}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${
                schedule.closed 
                  ? "bg-white/20" 
                  : isToday && isOpen 
                    ? "bg-[hsl(140,60%,55%)]" 
                    : "bg-primary/60"
              }`} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default VisitingHours;

