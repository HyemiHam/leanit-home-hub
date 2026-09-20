import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

const SideNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.href.replace("#", ""),
        number: item.number,
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].number);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.number}>
            <a
              href={item.href}
              className="flex items-center gap-3 group"
            >
              <span
                className={`nav-number transition-colors ${
                  activeSection === item.number
                    ? "bg-black text-white"
                    : "group-hover:bg-foreground group-hover:text-background"
                }`}
              >
                {item.number}
              </span>
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default SideNavigation;
