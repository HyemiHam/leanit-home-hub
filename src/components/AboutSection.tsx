import React from "react";
import { Lightbulb, Target, Users, Leaf } from "lucide-react";

const values = [
  {
    icon: <Lightbulb className="h-6 w-6 text-brand-500" />,
    title: "혁신",
    desc: "끊임없는 학습과 실험을 통해 최신 AI 트렌드를 선도하고 실질적인 솔루션을 만들어냅니다.",
  },
  {
    icon: <Target className="h-6 w-6 text-brand-500" />,
    title: "맞춤형 접근",
    desc: "각 고객의 업무·조직·목표를 먼저 이해하고, 거기에 맞는 AI 도입 방식을 설계합니다.",
  },
  {
    icon: <Users className="h-6 w-6 text-brand-500" />,
    title: "현장 중심",
    desc: "교육과 컨설팅 모두 현업에서 바로 쓸 수 있는 수준으로 설계합니다. 이론이 아니라 실행입니다.",
  },
  {
    icon: <Leaf className="h-6 w-6 text-brand-500" />,
    title: "린(Lean) 철학",
    desc: "\"품질 우선, 낭비 제거, 지속적인 개선\" — 도요타 린 철학을 IT와 AI 도입에 적용합니다.",
  },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-brand-500 font-medium">회사소개</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            AI 교육·AX 컨설팅 전문 <br className="hidden md:block" />
            <span className="text-gradient">린아이티(leanIT)</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            20년 이상의 IT 경험을 바탕으로 설립. 기업이 AI를 실질적으로 활용할 수 있도록
            교육부터 전략 수립, 시스템 구축까지 함께합니다.
          </p>
        </div>

        {/* 소개 + 핵심 가치 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="reveal">
            <h3 className="text-2xl font-bold mb-5">leanIT는</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              "품질 우선, 낭비 제거, 지속적인 개선"이라는 도요타의 Lean Manufacturing 철학과,
              隣 "이웃 린"의 중의적인 뜻을 담은 이름입니다.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              금융·제조·유통·의료·교육 등 다양한 산업에서 IT 시스템을 설계하고 운영한 경험을 바탕으로,
              지금은 <strong>AI 교육과 AX(AI Transformation) 컨설팅</strong>에 집중하고 있습니다.
            </p>
            <p className="text-gray-600 leading-relaxed">
              강의 1회로 끝나는 교육이 아니라, 실무에서 반복적으로 쓸 수 있는 <strong>스킬로 남는 교육</strong>을 설계합니다.
            </p>

            {/* 수치 */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-brand-50 rounded-xl">
                <div className="text-2xl font-bold text-brand-500">20+</div>
                <div className="text-sm text-gray-600 mt-1">IT 경력(년)</div>
              </div>
              <div className="text-center p-4 bg-brand-50 rounded-xl">
                <div className="text-2xl font-bold text-brand-500">100+</div>
                <div className="text-sm text-gray-600 mt-1">교육 수강 기업</div>
              </div>
              <div className="text-center p-4 bg-brand-50 rounded-xl">
                <div className="text-2xl font-bold text-brand-500">B2B</div>
                <div className="text-sm text-gray-600 mt-1">대기업·중소기업</div>
              </div>
            </div>
          </div>

          {/* 핵심 가치 */}
          <div className="reveal reveal-delay-1">
            <h3 className="text-2xl font-bold mb-5">핵심 가치</h3>
            <div className="space-y-5">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{v.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 경영진 */}
        <div className="reveal">
          <h3 className="text-2xl font-bold mb-8 text-center">경영진</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-brand-500">
                혜
              </div>
              <div>
                <div className="font-bold text-lg">김혜미</div>
                <div className="text-brand-500 text-sm font-medium mb-2">CEO · AI 교육·AX 컨설팅</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  IT 경력 15년 이상. 시스템 운영 9년(한국)·6년(일본) 후 AI 교육·AX 컨설팅으로 전환.
                  대기업·중소기업 AI 활용 교육 설계·강의 담당.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-brand-500">
                찬
              </div>
              <div>
                <div className="font-bold text-lg">이명찬</div>
                <div className="text-brand-500 text-sm font-medium mb-2">CTO · 기술 개발</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  IT 경력 20년 이상. 시스템 아키텍처·클라우드·AI 인프라 전담.
                  leanIT의 기술 전략과 솔루션 개발을 이끕니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
