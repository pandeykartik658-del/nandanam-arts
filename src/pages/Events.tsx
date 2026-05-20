import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

type EventCategory = "Festival" | "Workshop" | "Recital";
type FilterKey = "All" | EventCategory;

const events: {
  date: string;
  day: string;
  month: string;
  title: string;
  description: string;
  location: string;
  category: EventCategory;
}[] = [
  {
    date: "DEC 15, 2026",
    day: "15",
    month: "DEC",
    title: "Margazhi Utsavam",
    description: "Annual winter dance festival featuring senior disciples executing complex rhythmic patterns.",
    location: "Chennai, IN",
    category: "Festival",
  },
  {
    date: "FEB 10, 2027",
    day: "10",
    month: "FEB",
    title: "Natyanjali Festival",
    description: "Celebrating Maha Shivaratri with all-night classical devotion performances.",
    location: "Chidambaram, IN",
    category: "Festival",
  },
  {
    date: "MAY 05, 2027",
    day: "05",
    month: "MAY",
    title: "Abhinaya Masterclass",
    description: "Intensive 2-day masterclass on nuanced facial expressions by Guru Padmaja.",
    location: "Bengaluru, IN",
    category: "Workshop",
  },
  {
    date: "SEP 14, 2027",
    day: "14",
    month: "SEP",
    title: "Nandanam Annual Day",
    description: "Students showcase their year-long training in a grand evening recital.",
    location: "Mumbai, IN",
    category: "Recital",
  },
  {
    date: "OCT 30, 2027",
    day: "30",
    month: "OCT",
    title: "Global Workshop Series",
    description: "Virtual sessions allowing classical training from any continent.",
    location: "Online",
    category: "Workshop",
  },
];

const filters: FilterKey[] = ["All", "Festival", "Workshop", "Recital"];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const visible = activeFilter === "All" ? events : events.filter((e) => e.category === activeFilter);

  return (
    <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-44 relative z-10">
      <div
        className="w-[1px] h-[80px] mx-auto mb-16"
        style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
      />

      <h2 className="font-display text-3xl md:text-5xl tracking-[3px] text-center text-gradient-wine mb-4">
        Upcoming Events
      </h2>
      <p className="text-center font-body text-muted-foreground/80 mb-12 max-w-xl mx-auto">
        Join us in celebrating Bharatanatyam through festivals, workshops, and recitals across the world.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => {
          const active = activeFilter === f;
          return (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`relative px-5 py-2 rounded-full font-display text-[11px] tracking-[3px] uppercase transition-colors ${
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="event-filter-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((event, i) => (
          <motion.article
            key={event.title}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, boxShadow: "0 20px 50px -20px hsl(320 55% 35% / 0.4)" }}
            className="group relative glass-surface rounded-2xl border border-border/50 p-6 overflow-hidden"
          >
            {/* Category badge */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-display tracking-[2px] uppercase bg-primary/10 text-primary border border-primary/30">
              {event.category}
            </span>

            <div className="flex gap-5">
              {/* Date badge */}
              <div className="shrink-0 w-16 h-20 rounded-lg border border-primary/30 bg-primary/5 flex flex-col items-center justify-center">
                <span className="font-display text-2xl text-primary leading-none">{event.day}</span>
                <span className="font-display text-[10px] tracking-[2px] text-muted-foreground mt-1">
                  {event.month}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-xl tracking-[1px] text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground/90 leading-relaxed mb-3">
                  {event.description}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground/70 font-body">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ x: 4 }}
              className="mt-5 inline-flex items-center gap-1.5 font-display text-[11px] tracking-[3px] uppercase text-primary hover:text-primary/80 transition-colors"
            >
              Reserve Seat <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.button>

            {/* Hover gradient sheen */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          </motion.article>
        ))}
      </div>

      <footer className="text-center py-8 mt-20 border-t border-border/30">
        <p className="font-display text-xs tracking-[4px] text-muted-foreground/50 uppercase">
          © 2026 Nandanam Arts Foundation
        </p>
      </footer>
    </section>
  );
};

export default Events;
