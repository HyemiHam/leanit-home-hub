
import React from "react";
import { Shield, Zap, Users, Heart } from "lucide-react";

const Expertise: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-brand-500" />,
      title: "혁신적인 기술",
      description: "최신 AI 및 IT 기술을 활용하여 혁신적인 솔루션을 제공합니다.",
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-500" />,
      title: "신뢰할 수 있는 파트너",
      description: "안정적인 서비스와 지속적인 지원으로 신뢰할 수 있는 파트너가 되어드립니다.",
    },
    {
      icon: <Users className="h-6 w-6 text-brand-500" />,
      title: "전문가 팀",
      description: "각 분야의 전문가들이 모여 최상의 솔루션을 개발합니다.",
    },
    {
      icon: <Heart className="h-6 w-6 text-brand-500" />,
      title: "고객 중심",
      description: "고객의 니즈를 최우선으로 생각하며 맞춤형 서비스를 제공합니다.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 reveal">
            <span className="text-brand-500 font-medium">전문성</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              <span className="text-gradient">전문적인 노하우</span>로 <br />
              비즈니스 과제를 해결합니다
            </h2>
            <p className="text-gray-600 mb-8">
              leanIT는 다양한 산업 분야의 프로젝트 경험을 바탕으로 고객의 비즈니스 과제를 
              효과적으로 해결하는 솔루션을 제공합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start reveal" style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
                  <div className="mr-3 p-2 bg-brand-100 rounded-lg">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0 reveal reveal-delay-2">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-brand-300 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="전문가 팀"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
