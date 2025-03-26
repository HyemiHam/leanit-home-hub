
import React from "react";
import Layout from "../components/Layout";

const About: React.FC = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-brand-500 font-medium">회사소개</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              혁신적인 <span className="text-gradient">AI/IT 솔루션</span> 파트너
            </h1>
            <p className="text-gray-600">
              leanIT는 고객의 비즈니스 성장을 위한 혁신적인 기술 솔루션을 제공하는 기업입니다.
            </p>
            <p className="text-gray-600 mt-2 font-semibold">
              Your IT Advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="reveal">
              <h2 className="text-2xl font-bold mb-6">회사 소개</h2>
              <p className="text-gray-600 mb-4">
                "품질 우선, 낭비 제거, 지속적인 개선"이라는 도요타의 Lean Manufacturing 철학과,
                隣 "이웃 린"의 중의적인 뜻을 가집니다.
              </p>
              <p className="text-gray-600 mb-4">
                leanIT는 20년 이상의 IT경험을 바탕으로 설립된 회사로 뛰어난 기술력과 혁신적인 솔루션을 제공하여 
                고객의 비즈니스 성장을 돕고 있습니다. 효율적이고 경제적인 시스템 개발과, 고객과 친근하게 소통하는 
                IT 회사가 되는 것이 목표입니다.
              </p>
              <p className="text-gray-600">
                금융, 제조, 유통, 의료 등 다양한 산업 분야의 기업들과 협력하여 혁신적인 솔루션을 제공해 왔습니다. 
                우리의 강점은 고객의 비즈니스를 깊이 이해하고 맞춤형 솔루션을 설계하는 능력에 있습니다.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="bg-gray-50 p-8 rounded-2xl h-full">
                <h3 className="text-xl font-bold mb-6">핵심 가치</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">혁신</h4>
                      <p className="text-gray-600">
                        끊임없는 학습과 실험을 통해 최신 기술 트렌드를 선도하고 혁신적인 솔루션을 개발합니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">맞춤형 접근</h4>
                      <p className="text-gray-600">
                        각 고객의 고유한 요구사항과 비즈니스 환경을 이해하고 맞춤형 솔루션을 설계합니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">신뢰성</h4>
                      <p className="text-gray-600">
                        투명한 커뮤니케이션과 검증된 방법론을 통해 고객의 신뢰를 구축합니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">지속 가능성</h4>
                      <p className="text-gray-600">
                        일회성 솔루션이 아닌 장기적인 비즈니스 성장과 발전을 지원하는 지속 가능한 솔루션을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 reveal">
            <h2 className="text-2xl font-bold mb-8 text-center">주요 경영진</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 md:mb-0 md:mr-6 flex items-center justify-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">김혜미</h3>
                    <p className="text-brand-500 font-medium mb-2">CEO</p>
                    <p className="text-gray-600 text-sm">
                      IT 경력 15년 이상으로, 다양한 기업의 디지털 혁신을 주도해 왔습니다. 
                      고객 중심의 접근 방식과 혁신적인 리더십으로 leanIT를 이끌고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 md:mb-0 md:mr-6 flex items-center justify-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">이명찬</h3>
                    <p className="text-brand-500 font-medium mb-2">CTO</p>
                    <p className="text-gray-600 text-sm">
                      IT 경력 20년 이상의 베테랑으로, 최신 기술 트렌드를 선도하며 
                      leanIT의 기술적 비전과 전략을 담당하고 있습니다. 혁신적인 솔루션 개발의 핵심 인력입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 reveal">
            <h2 className="text-2xl font-bold mb-8 text-center">제공 서비스</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">맞춤형 솔루션 제작</h3>
                <p className="text-gray-600 text-sm">
                  고객 비즈니스에 최적화된 맞춤형 소프트웨어 솔루션 개발
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">AX 컨설팅</h3>
                <p className="text-gray-600 text-sm">
                  AI 기반 디지털 트랜스포메이션을 위한 전략 컨설팅
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">시스템 유지보수</h3>
                <p className="text-gray-600 text-sm">
                  안정적인 IT 시스템 운영을 위한 전문 유지보수 서비스
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">홈페이지 제작</h3>
                <p className="text-gray-600 text-sm">
                  반응형 웹사이트 및 쇼핑몰 제작 서비스
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                    <path d="M12 13v8" />
                    <path d="M5 13v2a2 2 0 0 0 2 2h5" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">AI 강의</h3>
                <p className="text-gray-600 text-sm">
                  기업 맞춤형 AI 교육 프로그램 제공
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brand-50 p-8 rounded-2xl reveal">
            <h3 className="text-xl font-bold mb-4 text-center">leanIT와 함께 비즈니스 혁신을 시작하세요</h3>
            <p className="text-gray-600 text-center mb-6">
              귀사의 비즈니스 요구사항과 목표에 대해 논의해 보세요. 최적의 솔루션을 제안해 드립니다.
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

export default About;
