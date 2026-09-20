import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import AboutSection from "../components/AboutSection";
import BlogCarousel from "../components/BlogCarousel";

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <AboutSection />
      <BlogCarousel />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-500 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              비즈니스의 AI 혁신을 함께 시작하세요
            </h2>
            <p className="text-xl text-white/80 mb-8">
              교육이든 컨설팅이든, 먼저 현황을 얘기해보세요. 어디서 시작할지 같이 찾겠습니다.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const contactButton = document.querySelector('button[aria-label="Contact"]');
                if (contactButton && "click" in contactButton) {
                  (contactButton as HTMLButtonElement).click();
                }
              }}
              className="px-8 py-4 bg-white text-brand-500 rounded-lg inline-block font-medium hover:bg-opacity-90 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
