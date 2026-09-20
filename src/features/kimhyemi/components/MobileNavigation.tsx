import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  number: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Log", href: "#log" },
  { number: "03", label: "Expertise", href: "#expertise" },
  { number: "04", label: "Contact", href: "#contact" },
];

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 lg:hidden nav-number w-10 h-10"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-50 lg:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 nav-number w-10 h-10"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            <nav className="flex flex-col items-start justify-center h-full px-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-4 group"
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="text-4xl font-headline uppercase tracking-tight group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
