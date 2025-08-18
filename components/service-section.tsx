"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeIn, ScaleOnHover } from "@/components/animations"
import { useState } from "react"
import ProjectModal from "@/components/project-modal"
import ProjectDetailPopup, { type ProjectDetail } from "@/components/project-detail-popup"

export default function ServiceSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const handleOpenModal = (category: string) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleOpenDetail = (project: ProjectDetail) => {
    setSelectedProject(project)
    setIsDetailPopupOpen(true)
  }

  const services = [
    {
      title: "📱 모바일 & 웹 애플리케이션",
      description: "",
      image: "/images/mobile-app-dev.png",
      imageAlt: "모바일 & 웹 애플리케이션",
      features: [
        "고객 맞춤형 네이티브/하이브리드 앱 개발 (BMW Vantage, Plus 앱 등)",
        "반응형 웹 애플리케이션 및 PWA 구축",
        "SSO, OAuth2 기반 멤버십/로그인 시스템",
        "딜리버리, 예약, 결제 등 비즈니스 핵심 기능 구현",
      ],
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      category: "멤버십 서비스",
    },
    {
      title: "🛒 온라인 커머스 & 딜리버리",
      description: "",
      image: "/images/ecommerce-delivery.png",
      imageAlt: "온라인 커머스 & 딜리버리",
      features: [
        "통합 멤버십 기반의 이커머스 플랫폼 구축",
        "자체 딜리버리 시스템 설계 및 운영 경험 (예: bhc/아웃백 통합 딜리버리 시스템)",
        "주문, 결제, 쿠폰, 포인트 등 전자상거래 필수 기능 통합",
      ],
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      category: "온라인 커머스",
    },
    {
      title: "🚚 물류 시스템 연동",
      description: "",
      image: "/images/logistics-system-new.jpg",
      imageAlt: "물류 시스템 연동",
      features: [
        "물류/배송 데이터와의 시스템 연동 및 모니터링 기능 구현",
        "주문-배송-도착의 전 과정 실시간 추적 연동",
        "WMS 등 외부 물류 시스템과의 인터페이스 설계",
      ],
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      category: "물류 시스템",
    },
    {
      title: "🖥 키오스크 & POS 연동 시스템",
      description: "",
      image: "/images/kiosk-pos-new.jpg",
      imageAlt: "키오스크 & POS 연동 시스템",
      features: [
        "F&B/리테일 매장에 특화된 키오스크 UI 및 서비스 기획",
        "외부 POS 시스템 연동을 통한 주문·결제 정보 통합",
        "매장 운영 효율화를 위한 재고·주문 연동 구조 설계",
        "배달, 픽업, 매장 주문 등 O2O 모델 대응",
      ],
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      category: "키오스크",
    },
    {
      title: "🏢 엔터프라이즈 시스템 & 솔루션 커스터마이징",
      description: "",
      image: "/images/enterprise-systems.jpg",
      imageAlt: "엔터프라이즈 시스템 & 솔루션 커스터마이징",
      features: [
        "MSA 기반 시스템 구축 및 레거시 리팩토링",
        "기업별 요구사항을 반영한 솔루션 커스터마이징 경험",
        "API 게이트웨이, 인증/권한 시스템, 내부 포털 등 다양하게 적용",
        "대기업, 중견기업 대상 컨설팅-기획-개발 일괄 수행",
      ],
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
      category: "솔루션 커스터마이징",
    },
    {
      title: "☁ 클라우드 & 인프라",
      description: "",
      image: "/images/cloud-infra.jpg",
      imageAlt: "클라우드 & 인프라",
      features: [
        "Azure, AWS 기반 클라우드 마이그레이션 수행 (예: 두산 ARO 서비스 → Azure App Service)",
        "DevOps 환경 구축, CI/CD 자동화",
        "Kubernetes/Docker 기반 운영 환경 구성",
        "모니터링, 로깅, 보안 강화 중심 인프라 설계",
      ],
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500",
      category: "시스템 구축",
    },
  ]

  return (
    <section id="services" className="w-full py-24 px-[25px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="section-subtitle text-gray-500 uppercase mb-4">OUR SERVICES</h2>
          <h3 className="section-title text-3xl md:text-5xl mb-6">CNDF의 주요 서비스</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            고객의 비즈니스 목표 달성을 위한 최적의 디지털 솔루션을 제공합니다.
          </p>
        </FadeIn>

        <div className="space-y-24">
          {services.map((service, index) => (
            <FadeIn
              key={index}
              direction={index % 2 === 0 ? "right" : "left"}
              delay={0.2}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
            >
              <div className="md:w-1/2">
                <ScaleOnHover className={`relative rounded-2xl overflow-hidden shadow-lg ${service.bgColor}`}>
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-white font-heading text-xl font-bold">{service.title}</h4>
                    </div>
                  </div>
                </ScaleOnHover>
              </div>
              <div className="md:w-1/2">
                <h4 className="font-heading text-2xl md:text-3xl font-bold mb-4">{service.title}</h4>
                {service.description && <p className="text-lg text-gray-600 mb-6">{service.description}</p>}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group">
                      <div
                        className={`flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1 group-hover:bg-primary/20 transition-colors duration-300`}
                      >
                        <span className="h-3 w-3 rounded-full bg-primary"></span>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="group transition-transform duration-300 hover:scale-105"
                  onClick={() => handleOpenModal(service.category)}
                >
                  자세히 보기
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProjectSelect={handleOpenDetail}
        initialCategory={selectedCategory}
      />

      {/* Project Detail Popup */}
      <ProjectDetailPopup
        project={selectedProject}
        isOpen={isDetailPopupOpen}
        onClose={() => setIsDetailPopupOpen(false)}
      />
    </section>
  )
}

