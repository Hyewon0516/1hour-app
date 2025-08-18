import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import ServiceSection from "@/components/service-section"
import ProcessSection from "@/components/process-section"
import CaseStudySection from "@/components/case-study-section"
import TechStackSection from "@/components/tech-stack-section"
import CareerSection from "@/components/career-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import AboutSection from "@/components/about-section"
import FullscreenOverlay from "@/components/fullscreen-overlay"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center" style={{backgroundColor: 'rgb(254, 254, 254)'}}>
      {/* <FullscreenOverlay /> */}
      
      <Navigation />

      <HeroSection />

      <AboutSection />

      <FeatureSection />

      <ServiceSection />

      <ProcessSection />

      <CaseStudySection />

      <TechStackSection />

      <CareerSection />

      <ContactSection />

      {/* Footer */}
      <footer className="w-full py-12 px-[25px] bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">CNDFactory</h3>
              <p className="text-sm text-gray-600">기술과 창의를 통해 미래를 발견하는 기업</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">회사 정보</h3>
              <p className="text-sm text-gray-600 mb-1">사업자 등록번호 : 220-88-39543</p>
              <p className="text-sm text-gray-600 mb-1">주소 : 서울시 마포구 연남로 1길 70 신원빌딩 4F ,5F</p>
              <p className="text-sm text-gray-600 mb-1">대표이사 : 김충곤</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">연락처</h3>
              <p className="text-sm text-gray-600 mb-1">Email : sales@cndfactory.com</p>
              <p className="text-sm text-gray-600 mb-1">Tel : 02-2197-9998</p>
              <p className="text-sm text-gray-600 mb-1">Fax : 02-2197-9999</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} 주식회사 씨앤디팩토리. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

