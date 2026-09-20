import React from "react";
import { GraduationCap, TrendingUp, Zap, Bot, Code, MessageSquare } from "lucide-react";

const Services: React.FC = () => {
  const services = [
    {
      icon: <GraduationCap className="h-10 w-10 text-brand-500" />,
      title: "AI 교육",
      description:
        "대기업·중소기업 맞춤형 AI 활용 교육. 생성AI 기초부터 업무 적용, 프롬프트 설계, 스킬 내재화까지 현장에서 바로 쓰는 커리큘럼으로 설계합니다.",
      tags: ["대기업 교육", "중소기업 교육", "프롬프트 설계"],
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-brand-500" />,
      title: "AX 컨설팅",
      description:
        "AI 전환(AX) 전략 수립부터 실행까지. 현업 프로세스를 분석하고, 어디서 AI가 실질적인 변화를 만드는지 찾아 실행 계획을 함께 만듭니다.",
      tags: ["AX 전략", "프로세스 분석", "실행 로드맵"],
    },
    {
      icon: <Zap className="h-10 w-10 text-brand-500" />,
      title: "업무 자동화",
      description:
        "n8n·Make·Apps Script 기반으로 반복 업무를 자동화합니다. 사람이 판단해야 할 구간은 남기고 나머지를 자동화. 시간과 비용을 실질적으로 줄입니다.",
      tags: ["n8n", "Make", "Apps Script"],
    },
    {
      icon: <Bot className="h-10 w-10 text-brand-500" />,
      title: "AI 에이전트 구축",
      description:
        "멀티에이전트 시스템 설계·운영. 회사 업무에 맞는 AI 에이전트 팀을 구축하고, 실제로 작동하는 시스템으로 만듭니다.",
      tags: ["멀티에이전트", "Slack 연동", "자동화 파이프라인"],
    },
    {
      icon: <Code className="h-10 w-10 text-brand-500" />,
      title: "맞춤형 개발",
      description:
        "웹앱·대시보드·내부 도구 제작. 처음부터 거대 시스템보다 작동하는 MVP를 먼저 만들고, 실제 사용하면서 늘려갑니다.",
      tags: ["웹앱", "대시보드", "MVP 개발"],
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-brand-500" />,
      title: "IT 컨설팅",
      description:
        "시스템 현대화·클라우드 전환·기술 스택 선택 자문. 20년 이상의 IT 운영 경험을 바탕으로 현실적인 방향을 제시합니다.",
      tags: ["클라우드 전환", "시스템 현대화", "기술 자문"],
    },
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-brand-500 font-medium">서비스</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            AI를 <span className="text-gradient">실제로 쓰는 조직</span>을 만듭니다
          </h2>
          <p className="text-gray-600">
            교육, 컨설팅, 자동화, 개발 — 어떤 입구로 들어와도 결국 같은 목표로 연결됩니다.
            AI가 실무에서 작동하는 조직.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow card-hover reveal flex flex-col gap-4"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div>{service.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {service.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-xs px-2 py-1 bg-brand-50 text-brand-600 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
