import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
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
            {language === 'en' ? 'Terms of Service' : '이용약관'}
          </h1>
          <p className="text-lg text-brand-100">
            {language === 'en'
              ? 'Please read our Terms of Service carefully. By using our services, you agree to these terms.'
              : '당사 이용약관을 주의 깊게 읽어주시기 바랍니다. 당사 서비스를 사용하면 본 약관에 동의하는 것입니다.'}
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
                    <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                    <p className="font-semibold text-red-600 mb-4">
                      PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING OR USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS.
                    </p>
                    <p className="text-base leading-relaxed">
                      These Terms of Service constitute a legally binding agreement between LEANIT and you. This Agreement governs your use of our website, mobile applications, and related services.
                    </p>
                  </section>

                  <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Important Notice</h3>
                    <ul className="text-sm text-yellow-800 list-disc list-inside space-y-2">
                      <li>You must be 18 years old or the legal age of majority in your jurisdiction</li>
                      <li>These terms apply to all users regardless of location</li>
                      <li>Both Korean and US law provisions apply depending on your location</li>
                      <li>By using our services, you consent to our terms</li>
                      <li>We reserve the right to modify these terms at any time</li>
                    </ul>
                  </section>

                  <p className="text-sm text-gray-600">
                    For the complete Terms of Service, please download the full document.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-bold mb-4">이용약관</h2>
                    <p className="font-semibold text-red-600 mb-4">
                      본 약관을 주의 깊게 읽어주시기 바랍니다. 당사 서비스에 접근 또는 사용함으로써 본 약관에 구속력이 있다는 것에 동의하는 것으로 간주됩니다.
                    </p>
                    <p className="text-base leading-relaxed">
                      본 이용약관은 LEANIT과 귀하 간의 법적 구속력이 있는 계약을 구성합니다. 본 약관은 당사의 웹사이트, 모바일 애플리케이션 및 관련 서비스에 대한 귀하의 사용을 관리합니다.
                    </p>
                  </section>

                  <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-3">⚠️ 중요 공지사항</h3>
                    <ul className="text-sm text-yellow-800 list-disc list-inside space-y-2">
                      <li>18세 이상이거나 귀하의 관할권의 법정 성인 연령이어야 합니다.</li>
                      <li>본 약관은 위치와 관계없이 모든 사용자에게 적용됩니다.</li>
                      <li>귀하의 위치에 따라 한국 및 미국 법 조항이 적용됩니다.</li>
                      <li>당사 서비스를 사용함으로써 본 약관에 동의합니다.</li>
                      <li>당사는 언제든지 본 약관을 수정할 권리를 보유합니다.</li>
                    </ul>
                  </section>

                  <p className="text-sm text-gray-600">
                    완전한 이용약관을 위해 전체 문서를 다운로드하십시오.
                  </p>
                </div>
              )}
            </div>

            {/* Download and Navigation Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 sm:flex-none">
                <a
                  href={language === 'en' ? '/TERMS_OF_SERVICE.md' : '/TERMS_OF_SERVICE_KO.md'}
                  download={language === 'en' ? 'terms_of_service_en.md' : 'terms_of_service_ko.md'}
                >
                  {language === 'en' ? 'Download Full Terms' : '전체 약관 다운로드'}
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

export default TermsOfService;
