import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const posts = [
  {
    date: "2026-06-29",
    category: "뉴스",
    categoryClass: "bg-blue-100 text-blue-700",
    title: "후지쓰 × OpenAI·Anthropic 동시 협업 발표",
    desc: "일본 최대 SI기업이 세계 최고 AI 2개사를 동시 파트너로 — 일본 기업 AI 전환의 분기점",
    href: "https://leanit.kr/pub/news-dive-001.html",
  },
  {
    date: "2026-06-29",
    category: "리서치",
    categoryClass: "bg-purple-100 text-purple-700",
    title: "일본 AI 지형도 2026",
    desc: "일본 기업 AI 도입 현황과 주요 플레이어 분석. 중소기업 실질 도입률 12%의 의미.",
    href: "https://leanit.kr/pub/japan-ai-landscape.html",
  },
  {
    date: "2026-06-22",
    category: "인사이트",
    categoryClass: "bg-brand-100 text-brand-700",
    title: "하네스 엔지니어링 — 에이전트들끼리 어떻게 일하게 할까?",
    desc: "에이전트 품질은 모델이 아니라 '하네스(권한·도구·검증·관측)'가 결정한다.",
    href: "https://leanit.kr/lab/insight-harness-engineering.html",
  },
  {
    date: "2026-06-20",
    category: "인사이트",
    categoryClass: "bg-brand-100 text-brand-700",
    title: "AI에게 매번 같은 설명을 다시 하지 않으려면 — LLM Wiki",
    desc: "RAG와 LLM Wiki의 차이를 통해, AI 지식 관리를 '검색'에서 '운영'으로 바꾸는 관점.",
    href: "https://leanit.kr/lab/insight-llm-wiki.html",
  },
  {
    date: "2026-06-16",
    category: "인사이트",
    categoryClass: "bg-brand-100 text-brand-700",
    title: "진짜는 에이전트가 아니라 '스킬'이었다",
    desc: "AI 도입을 에이전트 자동화가 아니라 반복 가능한 스킬 설계와 조직 지식화 문제로.",
    href: "https://leanit.kr/lab/insight-skill-not-agent.html",
  },
  {
    date: "2026-06-16",
    category: "인사이트",
    categoryClass: "bg-brand-100 text-brand-700",
    title: "샌드위치 코딩과 프롬프트 엔지니어링",
    desc: "정밀한 지시와 제약 조건 설계가 왜 어려운지 시각적으로 보여주는 사례.",
    href: "https://leanit.kr/lab/insight-sandwich-coding.html",
  },
];

const BlogCarousel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        {/* 헤더 */}
        <div className="flex items-end justify-between mb-10 reveal">
          <div>
            <span className="text-brand-500 font-medium">블로그</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              AI·AX 현장 인사이트
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">
              교육 현장과 컨설팅에서 매일 마주치는 질문들. 실전에서 바로 쓸 수 있는 관점으로 정리합니다.
            </p>
          </div>
          <a
            href="https://leanit.kr/pub/insight-library.html"
            className="hidden md:flex items-center gap-2 text-brand-500 font-medium hover:text-brand-600 transition-colors flex-shrink-0 ml-8"
          >
            전체 보기 <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* 캐러셀 */}
        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
            aria-label="이전"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <div
            ref={ref}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3 card-hover"
                style={{ width: "300px", scrollSnapAlign: "start" }}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.categoryClass}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                  {post.desc}
                </p>
                <span className="text-brand-500 text-sm font-medium flex items-center gap-1 mt-1">
                  읽기 <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
            aria-label="다음"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* 모바일 전체보기 */}
        <div className="mt-6 text-center md:hidden reveal">
          <a
            href="https://leanit.kr/pub/insight-library.html"
            className="inline-flex items-center gap-2 text-brand-500 font-medium"
          >
            전체 보기 <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
