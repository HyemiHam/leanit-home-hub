import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface ExpertiseItem {
  number: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
}

const expertiseItems: ExpertiseItem[] = [
  {
    number: "001",
    titleKo: "AI 교육",
    titleEn: "AI Education",
    descriptionKo: "LLM, Google AI Studio, 바이브코딩 등 실습 중심 AI 교육 설계·진행",
    descriptionEn: "Design and delivery of hands-on AI training in LLMs, Google AI Studio, and vibe coding",
  },
  {
    number: "002",
    titleKo: "AI/IT 컨설팅",
    titleEn: "AI/IT Consulting",
    descriptionKo: "Java, Spring, Oracle 기반 시스템 개발·운영 경험을 결합한 AI 기획·컨설팅",
    descriptionEn: "AI planning and consulting informed by systems development and operations with Java, Spring, and Oracle",
  },
  {
    number: "003",
    titleKo: "AI 업무 자동화",
    titleEn: "AI Workflow Automation",
    descriptionKo: "Dify, n8n, Google Apps Script를 활용한 AI 챗봇·업무 워크플로우 구축",
    descriptionEn: "AI chatbot and workflow development with Dify, n8n, and Google Apps Script",
  },
  {
    number: "004",
    titleKo: "AI 학습 자동화",
    titleEn: "AI Learning Automation",
    descriptionKo: "배우고, 기록하고, 활용하는 AI 기반 학습 루틴 자동화 설계",
    descriptionEn: "Designing AI-based learning routines: learn, record, and apply",
  },
];

const ExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="expertise" className="py-32 px-8 md:px-16 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">03</span>
          <span className="text-sm font-medium tracking-wider uppercase">Expertise</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="section-headline mb-16"
        >
          Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {expertiseItems.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="expertise-card group hover:bg-accent transition-colors duration-300 relative overflow-hidden"
            >
              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <span className="text-sm text-card-foreground/60 group-hover:text-accent-foreground/60 relative z-10">
                {item.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-headline uppercase tracking-tight mb-2">
                  {t(item.titleKo, item.titleEn)}
                </h3>
                <p className="text-sm text-card-foreground/70 group-hover:text-accent-foreground/70">
                  {t(item.descriptionKo, item.descriptionEn)}
                </p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-accent-foreground/30"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
