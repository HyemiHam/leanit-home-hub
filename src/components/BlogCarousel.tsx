import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

type Post = {
  date: string;
  category: string;
  categoryClass: string;
  title: string;
  desc: string;
  href: string;
};

// 데이터 소스: /pub/blog-posts.json (정국이 blog-publish.mjs로 갱신).
// 런타임에 읽으므로 새 글 추가 시 홈페이지 재배포 불필요 — blog-posts.json만 바뀌면 자동 반영.
const TYPE_META: Record<string, { label: string; cls: string }> = {
  news: { label: "뉴스", cls: "bg-blue-100 text-blue-700" },
  video: { label: "인사이트", cls: "bg-brand-100 text-brand-700" },
};

const BlogCarousel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/pub/blog-posts.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: any[]) => {
        const mapped: Post[] = (Array.isArray(data) ? data : [])
          .slice()
          .sort(
            (a, b) =>
              (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
              String(b.date).localeCompare(String(a.date))
          )
          .map((p) => {
            const meta =
              TYPE_META[p.type] || { label: "인사이트", cls: "bg-brand-100 text-brand-700" };
            return {
              date: p.date,
              category: meta.label,
              categoryClass: meta.cls,
              title: String(p.title || "").replace(/\n/g, " "),
              desc: String(p.summary || "").replace(/\n/g, " "),
              href: p.href,
            };
          });
        setPosts(mapped);
      })
      .catch(() => {
        /* blog-posts.json 로드 실패 시 캐러셀 비워둠 (헤더/전체보기 링크는 유지) */
      });
  }, []);

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
