
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="reveal">
              <h2 className="text-2xl font-bold mb-6">회사 소개</h2>
              <p className="text-gray-600 mb-4">
                leanIT는 기업의 디지털 혁신을 선도하는 AI/IT 솔루션 기업입니다. 
                우리는 최신 기술과 깊은 산업 지식을 바탕으로 고객의 비즈니스 문제를 해결하고 
                지속 가능한 성장을 지원합니다.
              </p>
              <p className="text-gray-600 mb-4">
                2018년 설립 이후, leanIT는 금융, 제조, 유통, 의료 등 다양한 산업 분야의 기업들과 
                협력하여 혁신적인 솔루션을 제공해 왔습니다. 우리의 강점은 고객의 비즈니스를 깊이 
                이해하고 맞춤형 솔루션을 설계하는 능력에 있습니다.
              </p>
              <p className="text-gray-600">
                leanIT는 기술 개발뿐만 아니라 IT 역량 강화를 위한 교육 프로그램도 제공하여 
                고객사의 디지털 전환을 종합적으로 지원합니다.
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
            <h2 className="text-2xl font-bold mb-8 text-center">전문 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0 1 7 7c0 2.1-2 5.8-7 10-5-4.2-7-7.9-7-10a7 7 0 0 1 7-7z" />
                    <circle cx="12" cy="9" r="2" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">AI 솔루션</h3>
                <p className="text-gray-600 text-sm">
                  데이터 분석, 예측 모델링, 자연어 처리, 컴퓨터 비전 등 다양한 AI 기술 활용
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 1-5-4.5 4.5 4.5 0 0 1 5-4.5 4.5 4.5 0 0 0 5-4.5 4.5 4.5 0 0 0-5-4.5Z" />
                    <path d="M12 6v12" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">디지털 트랜스포메이션</h3>
                <p className="text-gray-600 text-sm">
                  기업의 디지털 전환을 위한 전략 수립 및 실행 지원
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
                <h3 className="font-bold mb-2">IT 교육</h3>
                <p className="text-gray-600 text-sm">
                  AI, 소프트웨어 개발, 데이터 분석 등 IT 역량 강화 교육 제공
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7.8 7.8a2 2 0 0 1 .6 1.4Z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">소프트웨어 개발</h3>
                <p className="text-gray-600 text-sm">
                  맞춤형 소프트웨어 및 애플리케이션 개발
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
