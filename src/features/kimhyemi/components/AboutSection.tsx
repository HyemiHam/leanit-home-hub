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
                "IT 시스템 개발·운영 경험과 AI 기술을 결합하여 다양한 사람과 기업의 AX와 업무 자동화를 지원합니다.",
                "I combine experience in IT systems development and operations with AI to support people and businesses in AX and workflow automation."
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
                "Dify, n8n 등 노코드 AI 플랫폼을 활용한 AI 챗봇·워크플로우 구축 교육과 컨설팅을 진행합니다.",
                "I teach and consult on building AI chatbots and workflows with no-code platforms such as Dify and n8n."
              )}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="border-t border-border pt-5">
            <h3 className="text-xl font-bold mb-3">{t("IT 기술", "IT Skills")}</h3>
            <p className="text-muted-foreground leading-relaxed">Java · Spring · Oracle · PL/SQL · Oracle ERP</p>
          </div>
          <div className="border-t border-border pt-5">
            <h3 className="text-xl font-bold mb-3">{t("AI 도구·활용", "AI Tools & Practice")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("LLM · Dify · n8n · Google AI Studio · Google Apps Script · 바이브코딩 · AI 쇼츠 제작", "LLM · Dify · n8n · Google AI Studio · Google Apps Script · vibe coding · AI short-form video creation")}
            </p>
          </div>
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

        <div className="grid md:grid-cols-2 gap-8 mt-16 pt-12 border-t border-border">
          <div>
            <h3 className="text-2xl font-bold mb-5">{t("학력", "Education")}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><span className="text-foreground font-medium">2005.08</span> · {t("독학사 컴퓨터공학 학사", "B.S. in Computer Science, Bachelor's Degree Examination for Self-Education")}</li>
              <li><span className="text-foreground font-medium">2005.02</span> · {t("인덕대학 인터넷TV방송 전문학사", "Associate Degree in Internet TV Broadcasting, Induk University")}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-5">{t("자격·언어", "Certifications & Language")}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>{t("정보처리기사", "Engineer Information Processing")}</li>
              <li>SCJP (Sun Certified Java Programmer)</li>
              <li>{t("사무자동화산업기사", "Industrial Engineer Office Automation")}</li>
              <li>{t("일본어 JLPT 1급", "Japanese JLPT Level 1")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
