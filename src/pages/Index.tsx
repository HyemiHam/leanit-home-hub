
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
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-500 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              비즈니스의 AI 혁신을 함께 시작하세요
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
                strokeWidth="0"
                d="M0,0 L100,100"
              ></path>
              <path
                fill="none"
                stroke="white"
                strokeWidth="0"
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
