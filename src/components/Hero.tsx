
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 reveal">
            <span className="inline-block px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm font-medium mb-4">
              AI/IT 솔루션 전문기업
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              고객 맞춤형 <span className="text-gradient">AI/IT 솔루션</span>으로<br />
              비즈니스의 혁신을 이끕니다
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              leanIT는 최신 기술과 혁신적인 접근 방식으로 고객의 비즈니스에 맞는 
              맞춤형 솔루션을 제공합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="px-6 py-3 bg-brand-500 text-white rounded-lg flex items-center gap-2 hover:bg-brand-600 transition-colors"
              >
                <span>서비스 알아보기</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/education"
                className="px-6 py-3 border border-brand-500 text-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
              >
                교육 프로그램
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 reveal reveal-delay-2">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-200 to-brand-400 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="AI 기술 이미지"
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 p-4 bg-white rounded-lg shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">AI 기술 기반</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="hidden md:block absolute top-40 left-10 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="hidden md:block absolute bottom-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </section>
  );
};

export default Hero;
