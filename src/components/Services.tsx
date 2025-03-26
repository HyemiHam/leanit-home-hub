
import React from "react";
import { Code, Database, Brain, PenTool, School, BarChart } from "lucide-react";

const Services: React.FC = () => {
  const services = [
    {
      icon: <Brain className="h-10 w-10 text-brand-500" />,
      title: "AI 솔루션",
      description:
        "빅데이터 분석, 머신러닝, 딥러닝 등 최신 AI 기술을 활용한 맞춤형 솔루션을 제공합니다.",
    },
    {
      icon: <Code className="h-10 w-10 text-brand-500" />,
      title: "IT 시스템 개발",
      description:
        "웹/앱 개발부터 대규모 기업 시스템까지 다양한 IT 솔루션을 개발합니다.",
    },
    {
      icon: <Database className="h-10 w-10 text-brand-500" />,
      title: "클라우드 서비스",
      description:
        "AWS, Azure, GCP 등 다양한 클라우드 플랫폼을 활용한 클라우드 솔루션을 제공합니다.",
    },
    {
      icon: <School className="h-10 w-10 text-brand-500" />,
      title: "AI/IT 교육",
      description:
        "기업과 개인을 위한 맞춤형 AI 및 IT 교육 프로그램을 운영합니다.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-brand-500" />,
      title: "데이터 분석",
      description:
        "고객의 데이터를 분석하여 비즈니스 인사이트와 의사결정에 도움이 되는 솔루션을 제공합니다.",
    },
    {
      icon: <PenTool className="h-10 w-10 text-brand-500" />,
      title: "컨설팅",
      description:
        "디지털 트랜스포메이션과 AI 도입을 위한 전문적인 컨설팅 서비스를 제공합니다.",
    },
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-brand-500 font-medium">서비스</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            고객의 비즈니스를 성장시키는 <br className="hidden md:block" />
            <span className="text-gradient">맞춤형 솔루션</span>
          </h2>
          <p className="text-gray-600">
            leanIT는 다양한 산업 분야의 고객에게 최적화된 AI/IT 솔루션과 교육 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow card-hover reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
