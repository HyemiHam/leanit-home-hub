import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialLang = (searchParams.get('lang') as 'en' | 'ko') || 'en';
  const [language, setLanguage] = useState<'en' | 'ko'>(initialLang);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'en' ? 'Privacy Policy' : '개인정보 처리방침'}
          </h1>
          <p className="text-lg text-brand-100">
            {language === 'en'
              ? 'Your privacy is important to us. Learn how we collect and protect your data.'
              : '귀하의 개인정보 보호는 당사에게 중요합니다. 당사가 귀하의 데이터를 수집하고 보호하는 방식을 알아보세요.'}
          </p>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="bg-gray-50 border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Tabs value={language} onValueChange={(v) => setLanguage(v as 'en' | 'ko')}>
            <TabsList className="grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ko">한국어</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-700 leading-relaxed">
              <p className="text-sm text-gray-500 mb-8">
                {language === 'en'
                  ? 'Last Updated: February 2026'
                  : '마지막 업데이트: 2026년 2월'}
              </p>

              {language === 'en' ? (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                    <p className="mb-4">
                      This Privacy Policy describes how LEANIT collects, uses, discloses, and otherwise processes personal information in connection with our website, mobile applications, and related services.
                    </p>
                    <p className="text-base leading-relaxed">
                      We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our privacy policy, please contact us at <a href="mailto:privacy@leanit.com" className="font-semibold text-brand-500 hover:underline">privacy@leanit.com</a>.
                    </p>
                  </section>

                  <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">Key Privacy Rights:</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>✓ Right to access your personal information</li>
                      <li>✓ Right to correct inaccurate information</li>
                      <li>✓ Right to delete your personal information</li>
                      <li>✓ Right to data portability</li>
                      <li>✓ Right to opt-out of marketing communications</li>
                    </ul>
                  </section>

                  <p className="text-sm text-gray-600">
                    For the complete Privacy Policy, please download the full document.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-bold mb-4">개인정보 처리방침</h2>
                    <p className="mb-4">
                      본 개인정보 처리방침은 LEANIT이 당사의 웹사이트, 모바일 애플리케이션 및 관련 서비스와 관련하여 개인정보를 수집, 사용, 공개 및 기타 방식으로 처리하는 방법을 설명합니다.
                    </p>
                    <p className="text-base leading-relaxed">
                      당사는 귀하의 개인정보 보호와 개인정보 보호 권리를 보장하기 위해 최선을 다하고 있습니다. 당사의 개인정보 처리방침에 대한 질문이나 우려사항이 있으시면 <a href="mailto:privacy@leanit.com" className="font-semibold text-brand-500 hover:underline">privacy@leanit.com</a>으로 문의하십시오.
                    </p>
                  </section>

                  <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">주요 개인정보 보호 권리:</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>✓ 개인정보 접근 권리</li>
                      <li>✓ 부정확한 정보 정정 권리</li>
                      <li>✓ 개인정보 삭제 권리</li>
                      <li>✓ 데이터 이동성 권리</li>
                      <li>✓ 마케팅 통신 거부 권리</li>
                    </ul>
                  </section>

                  <p className="text-sm text-gray-600">
                    완전한 개인정보 처리방침을 위해 전체 문서를 다운로드하십시오.
                  </p>
                </div>
              )}
            </div>

            {/* Download and Navigation Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 sm:flex-none">
                <a
                  href={language === 'en' ? '/PRIVACY_POLICY.md' : '/PRIVACY_POLICY_KO.md'}
                  download={language === 'en' ? 'privacy_policy_en.md' : 'privacy_policy_ko.md'}
                >
                  {language === 'en' ? 'Download Full Policy' : '전체 정책 다운로드'}
                </a>
              </Button>
              <Button variant="outline" asChild className="flex-1 sm:flex-none">
                <a href="/">
                  {language === 'en' ? 'Back to Home' : '홈으로 돌아가기'}
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-brand-500 hover:bg-brand-600 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;
