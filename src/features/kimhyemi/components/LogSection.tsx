import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface LogEntry {
  year: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  tags: string[];
}

interface CategoryData {
  id: string;
  title: string;
  titleKr: string;
  entries: LogEntry[];
}

const categories: CategoryData[] = [
  {
    id: "ai-education",
    title: "AI Education",
    titleKr: "강의경력",
    entries: [
      {
        year: "2025.12",
        titleKo: "공공기관 AI 자격검정 교육과정 강사",
        titleEn: "Public Institution AI Certification Course Instructor",
        descriptionKo: "산업인공지능활용능력전문가 자격검정 교육과정",
        descriptionEn: "Industrial AI Application Expert Certification Program",
        tags: ["Public", "AI Certification"],
      },
      {
        year: "2025.11",
        titleKo: "K대 평생교육원 AI트랙 강의",
        titleEn: "K University AI Track Lecture",
        descriptionKo: "가을특강 AI트랙 강의 진행",
        descriptionEn: "Fall special lecture on AI track",
        tags: ["University", "AI"],
      },
      {
        year: "2025.11",
        titleKo: "메타코드 에브리AI n8n 스터디",
        titleEn: "Metacode EveryAI n8n Study",
        descriptionKo: "n8n 워크플로우 자동화 스터디 진행",
        descriptionEn: "n8n workflow automation study",
        tags: ["n8n", "Automation"],
      },
      {
        year: "2025.11",
        titleKo: "지피터스 19기 챗GPT앱 AI 스터디",
        titleEn: "GPTers 19th ChatGPT App AI Study",
        descriptionKo: "챗GPT 앱 개발 스터디 진행",
        descriptionEn: "ChatGPT app development study",
        tags: ["ChatGPT", "App Dev"],
      },
      {
        year: "2025.10",
        titleKo: "M사 전사 AI교육",
        titleEn: "Company M Enterprise AI Training",
        descriptionKo: "기업 전사 대상 AI 활용 교육",
        descriptionEn: "Enterprise-wide AI utilization training",
        tags: ["Corporate", "AI"],
      },
      {
        year: "2025.08",
        titleKo: "CURSOR 및 바이브코딩 강의",
        titleEn: "CURSOR & Vibe Coding Lecture",
        descriptionKo: "별의별AI에서 AI 코딩 도구 활용 강의",
        descriptionEn: "AI coding tools lecture at ByulByulAI",
        tags: ["CURSOR", "Vibe Coding"],
      },
      {
        year: "2025.06",
        titleKo: "지피터스 17기 AI과외선생님 스터디",
        titleEn: "GPTers 17th AI Tutor Study",
        descriptionKo: "AI 활용 교육 스터디 스터디장",
        descriptionEn: "AI education study leader",
        tags: ["AI Education", "Study Leader"],
      },
      {
        year: "2025.05",
        titleKo: "지피터스 16기 AI홈스쿨링 스터디",
        titleEn: "GPTers 16th AI Homeschooling Study",
        descriptionKo: "AI 홈스쿨링 스터디 스터디장",
        descriptionEn: "AI homeschooling study leader",
        tags: ["AI Homeschool", "Study Leader"],
      },
      {
        year: "2025.05",
        titleKo: "S대 AI교육",
        titleEn: "S University AI Education",
        descriptionKo: "AI시대 미래인재의 3가지 생존전략 / 나를 만드는 시간, AI로 완성하는 퍼스널 브랜딩",
        descriptionEn: "3 Survival Strategies for Future Talents in AI Era / Personal Branding with AI",
        tags: ["University", "Personal Branding"],
      },
      {
        year: "2024.10",
        titleKo: "ChatGPT 챗봇 제작 챌린지",
        titleEn: "ChatGPT Chatbot Creation Challenge",
        descriptionKo: "챗봇 제작 챌린지 운영 및 강의",
        descriptionEn: "Chatbot creation challenge management and lecture",
        tags: ["ChatGPT", "Chatbot"],
      },
      {
        year: "2023.07",
        titleKo: "경기도 Y시 청년강사",
        titleEn: "Gyeonggi Y City Youth Instructor",
        descriptionKo: "청년 대상 IT/AI 강의",
        descriptionEn: "IT/AI lectures for youth",
        tags: ["Youth", "Public"],
      },
    ],
  },
  {
    id: "partnership",
    title: "Partnership",
    titleKr: "외부 활동",
    entries: [
      {
        year: "2025.07~",
        titleKo: "지피터스 파트너스 스터디장",
        titleEn: "GPTers Partners Study Leader",
        descriptionKo: "AI 커뮤니티 스터디 운영 및 리딩",
        descriptionEn: "AI community study management and leading",
        tags: ["GPTers", "Study Leader"],
      },
      {
        year: "2024.12~",
        titleKo: "플랫폼식스 AI/IT 자문 파트너십",
        titleEn: "Platform Six AI/IT Advisory Partnership",
        descriptionKo: "AI/IT 분야 전문 자문 파트너",
        descriptionEn: "AI/IT professional advisory partner",
        tags: ["Advisory", "Partnership"],
      },
      {
        year: "2024.11~",
        titleKo: "크라우드 아카데미 파트너스 강사",
        titleEn: "Crowd Academy Partners Instructor",
        descriptionKo: "AI 교육 파트너 강사 활동",
        descriptionEn: "AI education partner instructor",
        tags: ["Crowd Academy", "Instructor"],
      },
      {
        year: "2024.10~",
        titleKo: "중앙인재개발원 파트너스 강사",
        titleEn: "Central HRD Institute Partners Instructor",
        descriptionKo: "공공기관 AI 교육 파트너 강사",
        descriptionEn: "Public institution AI education partner instructor",
        tags: ["Central HRD", "Public"],
      },
      {
        year: "2024.02~",
        titleKo: "웍스AI 파트너스 강사",
        titleEn: "Works AI Partners Instructor",
        descriptionKo: "AI 실무 교육 파트너 강사 활동",
        descriptionEn: "AI practical education partner instructor",
        tags: ["Works AI", "Instructor"],
      },
    ],
  },
  {
    id: "it-project",
    title: "IT Project",
    titleKr: "주요 프로젝트",
    entries: [
      {
        year: "2017-2025",
        titleKo: "P사 표준운영 운영/개발",
        titleEn: "Company P Standard Operations",
        descriptionKo: "대기업 표준운영 시스템 장기 운영 및 개발",
        descriptionEn: "Long-term operation and development of enterprise standard system",
        tags: ["SAP", "Operations"],
      },
      {
        year: "2013-2014",
        titleKo: "P사 재무/관리 회계 운영/개발",
        titleEn: "Company P Financial/Management Accounting",
        descriptionKo: "재무 및 관리회계 시스템 운영/개발",
        descriptionEn: "Financial and management accounting system operation/development",
        tags: ["Finance", "Accounting"],
      },
      {
        year: "2012-2013",
        titleKo: "행안부 재무 운영",
        titleEn: "Ministry of Interior Finance Operations",
        descriptionKo: "행정안전부 재무 시스템 운영",
        descriptionEn: "Ministry of Interior financial system operation",
        tags: ["Government", "Finance"],
      },
      {
        year: "2008-2012",
        titleKo: "(일본) R사 회계 시스템 운영",
        titleEn: "(Japan) Company R Accounting System",
        descriptionKo: "일본 R사 회계 시스템 운영 프로젝트",
        descriptionEn: "Japan Company R accounting system operation project",
        tags: ["Japan", "Accounting"],
      },
      {
        year: "2007-2008",
        titleKo: "(일본) M은행 담보시스템 개발",
        titleEn: "(Japan) M Bank Collateral System",
        descriptionKo: "일본 M은행 담보 관리 시스템 개발",
        descriptionEn: "Japan M Bank collateral management system development",
        tags: ["Japan", "Banking", "Development"],
      },
    ],
  },
];

const LogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { t, language } = useLanguage();

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section id="log" className="py-32 px-8 md:px-16 lg:px-24 bg-secondary" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">02</span>
          <span className="text-sm font-medium tracking-wider uppercase">Log</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="section-headline mb-4"
        >
          Work Log
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-16"
        >
          {t(
            "각 카테고리를 클릭하시면 상세경력을 확인하실 수 있습니다",
            "Click each category to view detailed experience"
          )}
        </motion.p>

        <div className="space-y-4">
          {categories.map((category, categoryIndex) => {
            const isOpen = openCategories.includes(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                className="border border-border overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between p-6 transition-colors group ${
                    isOpen
                      ? "bg-red-700 text-white"
                      : "hover:bg-red-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-3xl md:text-4xl font-headline uppercase tracking-tight">
                      {category.title}
                    </span>
                    <span className={`text-sm transition-colors ${isOpen ? "text-white/70" : "text-muted-foreground group-hover:text-white/70"}`}>
                      ({language === "KO" ? category.titleKr : category.title})
                    </span>
                    <span className={`text-xs transition-colors ${isOpen ? "text-white/60" : "text-muted-foreground group-hover:text-white/60"}`}>
                      {category.entries.length} projects
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border">
                        {category.entries.map((entry, entryIndex) => (
                          <motion.article
                            key={entryIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: entryIndex * 0.05 }}
                            className="p-4 border-b border-border last:border-b-0 hover:bg-background/30 transition-colors cursor-pointer group"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-xs text-muted-foreground">
                                    ({entry.year})
                                  </span>
                                </div>
                                <h3 className="text-base md:text-lg font-medium group-hover:text-accent transition-colors">
                                  {language === "KO" ? entry.titleKo : entry.titleEn}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                                  {language === "KO" ? entry.descriptionKo : entry.descriptionEn}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1 md:justify-end md:max-w-xs">
                                {entry.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="text-xs text-muted-foreground"
                                  >
                                    {tag}
                                    {tagIndex < entry.tags.length - 1 && ","}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogSection;
