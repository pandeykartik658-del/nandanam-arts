"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "About Us" },
  { id: "center", label: "Center of Arts" },
  { id: "events", label: "Upcoming Events" },
];

const Navbar = ({ activePage, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-[5vh] left-0 right-0 z-[100] bg-transparent border-y border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("home")}
        >
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden bg-transparent">
            <div
              className="w-8 h-8 bg-gradient-wine-shift"
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
          </div>
          <span className="font-display text-sm tracking-[4px] uppercase text-foreground">
            Nandanam
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-5 py-2 font-display text-xs tracking-[3px] uppercase transition-colors duration-300 ${
                activePage === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {activePage === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[1px] bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-primary/20"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left font-display text-sm tracking-[3px] uppercase transition-colors duration-300 ${
                    activePage === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

