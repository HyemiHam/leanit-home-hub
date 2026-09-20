import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 px-8 md:px-16 lg:px-24 border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground"
        >
          © {currentYear} {t("All rights reserved", "All rights reserved")}.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground"
        >
          {t("Hyemi Kim", "Hyemi Kim")}
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
