
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Expertise from "../components/Expertise";

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <Expertise />
      
      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-brand-500 font-medium">고객 사례</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              <span className="text-gradient">고객의 성공</span>이 우리의 성공입니다
            </h2>
            <p className="text-gray-600">
              leanIT의 솔루션과 서비스로 성공을 이룬 고객들의 이야기를 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm reveal">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-brand-500 font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-bold">A 금융회사</h4>
                  <p className="text-sm text-gray-600">금융 서비스</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "leanIT의 AI 기반 고객 분석 시스템 도입 후, 고객 만족도가 35% 향상되었고 
                운영 효율성이 크게 개선되었습니다."
              </p>
              <p className="text-sm font-medium">- 김부장, CTO</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm reveal reveal-delay-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-brand-500 font-bold">B</span>
                </div>
                <div>
                  <h4 className="font-bold">B 제조기업</h4>
                  <p className="text-sm text-gray-600">제조업</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "leanIT의 스마트 팩토리 솔루션으로 생산 효율성이 42% 증가했으며, 
                불량률을 18% 감소시킬 수 있었습니다."
              </p>
              <p className="text-sm font-medium">- 이대표, CEO</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm reveal reveal-delay-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-brand-500 font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-bold">C 교육기관</h4>
                  <p className="text-sm text-gray-600">교육 서비스</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "leanIT의 교육 프로그램을 통해 직원들의 AI 역량이 크게 향상되었고, 
                이를 통해 혁신적인 프로젝트를 진행할 수 있게 되었습니다."
              </p>
              <p className="text-sm font-medium">- 박원장, 교육원장</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-500 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              비즈니스의 디지털 혁신을 함께 시작하세요
            </h2>
            <p className="text-xl text-white/80 mb-8">
              leanIT와 함께라면 더 빠르고 효율적인 비즈니스 혁신이 가능합니다.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const contactButton = document.querySelector('button[aria-label="Contact"]');
                if (contactButton && 'click' in contactButton) {
                  (contactButton as HTMLButtonElement).click();
                }
              }}
              className="px-8 py-4 bg-white text-brand-500 rounded-lg inline-block font-medium hover:bg-opacity-90 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                d="M0,0 L100,100"
              ></path>
              <path
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                d="M100,0 L0,100"
              ></path>
            </svg>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
