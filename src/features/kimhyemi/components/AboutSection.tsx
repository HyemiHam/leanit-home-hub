import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="about" className="py-32 px-8 md:px-16 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">01</span>
          <span className="text-sm font-medium tracking-wider uppercase">About</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] mb-16"
          style={{ fontFamily: "var(--font-headline-kr)" }}
        >
          {t("AI시대에도", "Even in the AI era,")}<br />
          <span className="text-red-700">{t("사람이 중심", "People first")}</span>{t("인", "")}<br />
          {t("시스템을 만듭니다", "Building human-centered systems")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Decorative line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute left-0 top-0 w-[2px] h-full bg-red-700/30 origin-top hidden md:block"
            />
            <p className="text-lg leading-relaxed text-muted-foreground md:pl-6">
              {t(
                "초등학생, 대학생, 직장인, 은퇴예정이신 분들까지 다양한 현장에서 AI교육과 컨설팅을 진행했습니다.",
                "From elementary students to college students, working professionals, and retirees—I've conducted AI education and consulting across diverse settings."
              )}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute left-0 top-0 w-[2px] h-full bg-red-700/30 origin-top hidden md:block"
            />
            <p className="text-lg leading-relaxed text-muted-foreground md:pl-6">
              {t(
                "현장마다 목적이 다르고, 사람마다 이해의 속도가 다르다는 전제로, 기술을 단순한 기능이 아닌 사용 가능한 경험으로 만듭니다. 교육과 시스템 설계를 함께 고민합니다.",
                "Understanding that every environment has different goals and every person learns at their own pace, I transform technology from mere functionality into usable experiences. I consider both education and system design together."
              )}
            </p>
          </motion.div>
        </div>

        {/* Stats section with counter animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border"
        >
          {[
            { number: "17+", label: t("IT 경력 (년)", "Years in IT") },
            { number: "50+", label: t("강의/스터디", "Lectures/Studies") },
            { number: "5+", label: t("파트너십", "Partnerships") },
            { number: "100%", label: t("열정", "Passion") },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <motion.span
                className="text-4xl md:text-5xl font-bold text-red-700 block mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                {stat.number}
              </motion.span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
