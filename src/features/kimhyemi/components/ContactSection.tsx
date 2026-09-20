import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface SocialLink {
  number: string;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { number: "001", label: "LinkedIn", href: "https://www.linkedin.com/in/leanit-hyemi" },
  { number: "002", label: "Threads", href: "https://www.threads.com/@hemi1019?hl=ko" },
  { number: "003", label: "Naver Blog", href: "https://blog.naver.com/hugyourheart" },
  { number: "004", label: "leanIT", href: "https://leanit.kr" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 px-8 md:px-16 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">04</span>
          <span className="text-sm font-medium tracking-wider uppercase">Contact</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] mb-16"
          style={{ fontFamily: "var(--font-headline-kr)" }}
        >
          {t("더 알아보고 싶으신가요?", "Want to learn more?")}<br />
          <span className="text-accent">{t("아래 채널로 연결해주세요", "Connect through the channels below")}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl space-y-6"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.number}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ x: 10 }}
              className="social-link group"
            >
              <span className="nav-number text-xs group-hover:bg-foreground group-hover:text-background transition-colors">
                {link.number}
              </span>
              <span>{link.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
