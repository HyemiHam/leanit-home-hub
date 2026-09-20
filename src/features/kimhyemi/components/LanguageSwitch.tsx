import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-8 z-50 flex items-center gap-1 text-sm font-medium"
    >
      <span
        className={`px-2 py-1 transition-all duration-300 ${
          language === "KO"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        KO
      </span>
      <span className="text-muted-foreground">/</span>
      <span
        className={`px-2 py-1 transition-all duration-300 ${
          language === "EN"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </span>
    </motion.button>
  );
};

export default LanguageSwitch;
