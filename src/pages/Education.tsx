
import React from "react";
import Layout from "../components/Layout";

const Education: React.FC = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-brand-500 font-medium">교육</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              <span className="text-gradient">AI/IT 전문가</span>가 제공하는 교육 프로그램
            </h1>
            <p className="text-gray-600">
              leanIT는 기업과 개인을 위한 맞춤형 교육 프로그램을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 reveal">
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                  <path d="M12 13v8" />
                  <path d="M5 13v2a2 2 0 0 0 2 2h5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI 기초 과정</h3>
              <p className="text-gray-600 mb-4">
                인공지능의 기본 개념부터 머신러닝, 딥러닝의 기초까지 AI를 처음 접하는 분들을 위한 교육 프로그램입니다.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>AI 개념 및 역사</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>머신러닝 알고리즘 이해</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>Python 기반 AI 실습</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 reveal reveal-delay-1">
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">기업 맞춤형 AI 워크샵</h3>
              <p className="text-gray-600 mb-4">
                기업의 특정 비즈니스 문제를 AI로 해결하기 위한 실무 중심의 워크샵을 제공합니다.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>비즈니스 케이스 분석</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>맞춤형 AI 솔루션 설계</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>데이터 활용 전략</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 reveal reveal-delay-2">
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h20" />
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                  <path d="m7 21 5-5 5 5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">IT 개발자 과정</h3>
              <p className="text-gray-600 mb-4">
                웹, 모바일, 백엔드 개발 등 최신 IT 기술을 습득할 수 있는 실무 중심의 개발자 교육 과정입니다.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>풀스택 웹 개발</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>모바일 앱 개발</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 mt-1.5"></span>
                  <span>클라우드 인프라 구축</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal">
              <h3 className="text-xl font-bold mb-4">기업 교육 프로그램</h3>
              <p className="text-gray-600 mb-6">
                기업의 요구사항과 목표에 맞춰 커스터마이징된 교육 프로그램을 설계하고 제공합니다.
                디지털 역량 향상과 AI 리터러시 향상을 위한 다양한 과정이 준비되어 있습니다.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-brand-500 font-bold text-xs">1</span>
                  </div>
                  <span>임직원 대상 AI 기초 및 활용 교육</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-brand-500 font-bold text-xs">2</span>
                  </div>
                  <span>경영진을 위한 AI 전략 워크샵</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-brand-500 font-bold text-xs">3</span>
                  </div>
                  <span>IT 부서 역량 강화 프로그램</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-brand-500 font-bold text-xs">4</span>
                  </div>
                  <span>디지털 트랜스포메이션 교육</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 reveal reveal-delay-1">
              <h3 className="text-xl font-bold mb-4">교육 특징</h3>
              <p className="text-gray-600 mb-6">
                leanIT의 교육 프로그램은 실무 경험이 풍부한 전문가들이 이론과 실습을 균형있게 제공합니다.
                교육 후에도 지속적인 성장을 위한 커뮤니티와 자료를 제공합니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">실무 중심 교육</h4>
                  <p className="text-sm text-gray-600">실제 업무에 바로 적용할 수 있는 실용적인 내용</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">소규모 그룹</h4>
                  <p className="text-sm text-gray-600">개별 피드백과 질의응답이 가능한 소규모 교육</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">유연한 커리큘럼</h4>
                  <p className="text-sm text-gray-600">요구사항에 맞춰 조정 가능한 교육 과정</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a997f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" x2="8" y1="13" y2="13" />
                      <line x1="16" x2="8" y1="17" y2="17" />
                      <line x1="10" x2="8" y1="9" y2="9" />
                    </svg>
                  </div>
                  <h4 className="font-medium mb-1">자료 제공</h4>
                  <p className="text-sm text-gray-600">수강 후에도 활용 가능한 교육자료 제공</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-50 p-8 rounded-2xl reveal">
            <h3 className="text-xl font-bold mb-4 text-center">맞춤형 교육 프로그램이 필요하신가요?</h3>
            <p className="text-gray-600 text-center mb-6">
              기업과 개인의 목표에 맞는 최적의 교육 과정을 설계해 드립니다. 지금 바로 문의하세요.
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
                교육 문의하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Education;
