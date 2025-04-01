
import React from "react";
import Layout from "../components/Layout";

const Services: React.FC = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-brand-500 font-medium">서비스</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              <span className="text-gradient">맞춤형 솔루션</span>으로 AI 혁신을 이끕니다
            </h1>
            <p className="text-gray-600">
              leanIT는 고객 맞춤형 AI/IT솔루션을 통해 비즈니스의 AI 혁신을 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal">
              <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 7v5h16a2 2 0 1 1 0 4H3v-4"></path>
                  <path d="M3 12v5h14v-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI 기반 솔루션</h3>
              <p className="text-gray-600 mb-4">
                최신 인공지능 기술을 활용하여 다양한 비즈니스 문제를 해결하는 맞춤형 AI 솔루션을 제공합니다.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  자연어 처리 솔루션
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  비전 AI 시스템
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal reveal-delay-1">
              <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h.01" />
                  <path d="M11 7h.01" />
                  <path d="M15 7h.01" />
                  <path d="M7 11h.01" />
                  <path d="M11 11h.01" />
                  <path d="M15 11h.01" />
                  <path d="M7 15h.01" />
                  <path d="M11 15h.01" />
                  <path d="M15 15h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AX(AI Transformation)</h3>
              <p className="text-gray-600 mb-4">
                기업의 AI 전환을 위한 전략 수립부터 실행까지 종합적인 컨설팅 제공
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  AX 전략 컨설팅
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  프로세스 자동화
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  레거시 시스템 현대화
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal">
              <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">고객 경험 개선</h3>
              <p className="text-gray-600 mb-4">
                사용자 중심의 개발을 통해 고객 경험을 향상 시킵니다.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  UX/UI 디자인 및 개발
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  사용자 행동 분석
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  고객 여정 최적화
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal reveal-delay-1">
              <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">클라우드 솔루션</h3>
              <p className="text-gray-600 mb-4">
                확장성과 안정성을 갖춘 클라우드 기반 인프라 구축 및 
                마이그레이션 서비스를 제공합니다.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  클라우드 마이그레이션
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                  하이브리드 클라우드 구축
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-brand-50 p-8 rounded-2xl reveal">
            <h3 className="text-xl font-bold mb-4 text-center">맞춤형 솔루션이 필요하신가요?</h3>
            <p className="text-gray-600 text-center mb-6">
              비즈니스 요구사항에 맞는 최적의 솔루션을 제공해 드립니다. 지금 바로 문의하세요.
            </p>
            <div className="text-center">
              <button
                onClick={() => {
                  const contactButton = document.querySelector('button[aria-label="Contact"]');
                  if (contactButton && 'click' in contactButton) {
                    (contactButton as HTMLButtonElement).click();
                  }
                }}
                className="px-6 py-3 bg-brand-500 text-white rounded-lg inline-block font-medium hover:bg-brand-600 transition-colors"
              >
                문의하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
