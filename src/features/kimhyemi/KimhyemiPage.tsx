import { useEffect } from "react";
import SideNavigation from "./components/SideNavigation";
import MobileNavigation from "./components/MobileNavigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import LogSection from "./components/LogSection";
import ExpertiseSection from "./components/ExpertiseSection";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import LanguageSwitch from "./components/LanguageSwitch";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./kimhyemi.css";

const KimhyemiPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const pageTitle = "Hyemi Kim | AI 컨설팅 · AI 교육 · 업무 자동화 — leanIT";
    const pageDescription = "김혜미(Hyemi Kim) — AI 컨설팅, 생성형 AI 교육, 업무 자동화 설계 및 구축을 제공합니다.";
    const metadata = [
      ["meta[name='description']", "content", pageDescription],
      ["meta[property='og:title']", "content", pageTitle],
      ["meta[property='og:description']", "content", pageDescription],
      ["meta[property='og:url']", "content", "https://leanit.kr/kimhyemi"],
      ["meta[name='twitter:title']", "content", pageTitle],
      ["meta[name='twitter:description']", "content", pageDescription],
      ["link[rel='canonical']", "href", "https://leanit.kr/kimhyemi"],
    ] as const;
    const previousMetadata = metadata.map(([selector, attribute]) => {
      const element = document.querySelector(selector);
      return [element, attribute, element?.getAttribute(attribute)] as const;
    });
    const structuredData = document.createElement("script");

    document.title = pageTitle;
    metadata.forEach(([selector, attribute, value]) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    });
    structuredData.type = "application/ld+json";
    structuredData.id = "kimhyemi-structured-data";
    structuredData.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "김혜미",
      alternateName: "Hyemi Kim",
      jobTitle: "AI 컨설턴트 · 교육자",
      url: "https://leanit.kr/kimhyemi",
      worksFor: { "@type": "Organization", name: "leanIT", url: "https://leanit.kr" },
    });
    document.head.appendChild(structuredData);

    return () => {
      document.title = previousTitle;
      previousMetadata.forEach(([element, attribute, value]) => {
        if (element && value !== null) element.setAttribute(attribute, value);
      });
      structuredData.remove();
    };
  }, []);

  return (
    <LanguageProvider>
      <main className="kimhyemi-page relative min-h-screen">
        <LanguageSwitch />
        <SideNavigation />
        <MobileNavigation />
        <HeroSection />
        <AboutSection />
        <LogSection />
        <ExpertiseSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
};

export default KimhyemiPage;
