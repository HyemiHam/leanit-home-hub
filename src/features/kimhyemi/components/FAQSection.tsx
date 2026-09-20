import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface FAQItem {
  questionKo: string;
  questionEn: string;
  answerKo: string;
  answerEn: string;
}

const faqItems: FAQItem[] = [
  {
    questionKo: "AI 컨설팅은 어떤 내용인가요?",
    questionEn: "What does AI consulting include?",
    answerKo:
      "기업의 업무 환경과 목표에 맞춰 AI 도입 전략을 수립하고, 생성형 AI(ChatGPT, Cursor 등) 활용 교육과 업무 자동화 설계까지 함께 진행합니다. 도입이 아닌 정착을 목표로 합니다.",
    answerEn:
      "We build a custom AI adoption strategy based on your business environment and goals, including hands-on training with generative AI tools (ChatGPT, Cursor, etc.) and workflow automation design. The focus is on making AI stick, not just introducing it.",
  },
  {
    questionKo: "AI 교육은 누가 받을 수 있나요?",
    questionEn: "Who can take AI education courses?",
    answerKo:
      "초등학생부터 대학생, 직장인, 은퇴 예정자까지 모든 연령층을 대상으로 맞춤형 AI 교육을 제공합니다. 각 현장의 목적과 학습 속도에 맞게 진행됩니다.",
    answerEn:
      "Customized AI education is available for all ages — from elementary students to college students, working professionals, and retirees. Each program is tailored to the specific goals and learning pace of the participants.",
  },
  {
    questionKo: "업무 자동화는 어떻게 진행되나요?",
    questionEn: "How does workflow automation work?",
    answerKo:
      "반복 업무를 분석해 AI 기반 자동화 툴(n8n, Apps Script 등)로 트리거-처리-기록 구조를 설계하고 구축합니다. 비용 효율적이고 유지보수 가능한 방식으로 진행합니다.",
    answerEn:
      "We analyze repetitive tasks and build trigger-process-log automation using AI-powered tools like n8n and Apps Script. The approach is cost-effective and designed for long-term maintainability.",
  },
  {
    questionKo: "강의나 컨설팅을 의뢰하려면 어떻게 하나요?",
    questionEn: "How can I request a lecture or consulting?",
    answerKo:
      "이메일 또는 LinkedIn, 네이버 블로그 메시지로 문의 주시면 됩니다. 기업 맞춤형 프로그램이므로 먼저 간단한 미팅으로 요구사항을 파악한 뒤 제안서를 드립니다.",
    answerEn:
      "Reach out via email, LinkedIn, or our Naver Blog. Since each program is customized, we start with a brief meeting to understand your needs before sending a proposal.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-8 md:px-16 lg:px-24 bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">?</span>
          <span className="text-sm font-medium tracking-wider uppercase">FAQ</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] mb-16"
          style={{ fontFamily: "var(--font-headline-kr)" }}
        >
          {t("자주 묻는 질문", "Frequently Asked Questions")}
        </motion.h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="border border-border rounded-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg md:text-xl font-medium">
                  {t(item.questionKo, item.questionEn)}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl text-muted-foreground shrink-0"
                >
                  +
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {t(item.answerKo, item.answerEn)}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
