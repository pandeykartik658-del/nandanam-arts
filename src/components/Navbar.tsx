import { motion } from "framer-motion";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "About Us" },
  { id: "events", label: "Upcoming Events" },
];

const Navbar = ({ activePage, onNavigate }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] glass-surface"
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
            <motion.img
              src="/logo.jpeg"
              alt="Nandanam logo"
              className="w-8 h-8 object-contain mix-blend-screen"
              style={{ filter: "invert(1) sepia(1) saturate(1.5) hue-rotate(330deg) brightness(0.7)" }}
              animate={{
                filter: [
                  "invert(1) sepia(1) saturate(1.5) hue-rotate(330deg) brightness(0.7)",
                  "invert(1) sepia(1) saturate(1.2) hue-rotate(280deg) brightness(0.65)",
                  "invert(1) sepia(1) saturate(1.5) hue-rotate(320deg) brightness(0.7)",
                  "invert(1) sepia(1) saturate(1.5) hue-rotate(330deg) brightness(0.7)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="font-display text-sm tracking-[4px] uppercase text-foreground">
            Nandanam
          </span>
        </motion.div>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
