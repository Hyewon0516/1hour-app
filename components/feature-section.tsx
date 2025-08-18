"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations"
import { useState } from "react"
import StrengthDetailPopup from "@/components/strength-detail-popup"

export default function FeatureSection() {
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)

  const features = [
    {
      category: "기술 우선주의",
      items: [
        {
          title: "자체 개발 AMP 프레임워크",
          description:
            "Advanced for Multi Platform - 다양한 플랫폼에서 최적화된 웹 호환성을 제공하는 CNDF만의 핵심 기술",
        },
        {
          title: "최신 기술 스택",
          description: "Vue.js, Go, Java, Node.js, AWS 등 최신 기술을 활용한 시스템 구현",
        },
        {
          title: "멀티 플랫폼 지원",
          description: "One Source Multi Use 방식으로 모바일, 웹, 키오스크 등 다양한 환경에서 일관된 사용자 경험 제공",
        },
      ],
    },
    {
      category: "전문성과 경험",
      items: [
        {
          title: "10년 이상의 프로젝트 수행 경험",
          description: "다양한 산업 분야에서 성공적으로 완료한 100여 개 이상의 프로젝트 레퍼런스",
        },
        {
          title: "산업별 도메인 전문성",
          description: "F&B, 자동차, 패션, 유통 등 다양한 산업 분야에 최적화된 솔루션 제공",
        },
        {
          title: "Full-Stack 역량",
          description: "프론트엔드부터 백엔드, 인프라까지 통합적인 개발 및 운영 역량 보유",
        },
      ],
    },
    {
      category: "균형 잡힌 팀 구성",
      items: [
        {
          title: "다양한 전문가 집단",
          description: "개발자, 기획자, 디자이너, QA 등 각 분야 전문가들의 조화로운 협업",
        },
        {
          title: "애자일/스크럼 방법론",
          description: "2주 단위 스프린트로 빠른 피드백과 효율적인 업무 진행",
        },
        {
          title: "지속적인 역량 강화",
          description: "기술 공유 세미나 및 스터디 그룹을 통한 끊임없는 성장",
        },
      ],
    },
    {
      category: "안정적인 운영 역량",
      items: [
        {
          title: "대규모 트래픽 처리",
          description: "수백만 사용자가 이용하는 서비스의 안정적인 운영 경험",
        },
        {
          title: "클라우드 전문성",
          description: "AWS 및 자체 클라우드 서비스를 활용한 확장 가능한 인프라 구축",
        },
        {
          title: "24/7 모니터링",
          description: "전문 모니터링 솔루션을 활용한 실시간 모니터링",
        },
      ],
    },
  ]

  return (
    <section id="about" className="w-full py-24 px-[25px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="section-subtitle text-gray-500 mb-4">OUR STRENGTH</h2>
          <h3 className="section-title text-3xl md:text-5xl">CNDF만의 강점</h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <FadeIn key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 * index}>
              <ScaleOnHover
                scale={1.03}
                className="bg-white p-8 rounded-2xl shadow-sm h-full transition-shadow duration-300 hover:shadow-md border border-gray-100"
              >
                <h4 className="font-heading text-xl font-bold mb-6">{feature.category}</h4>
                <StaggerContainer className="space-y-6">
                  {feature.items.map((item, itemIndex) => (
                    <StaggerItem key={itemIndex}>
                      <div className="flex">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                          <span className="h-3 w-3 rounded-full bg-primary"></span>
                        </div>
                        <div>
                          <h5 className="font-heading font-semibold mb-2">{item.title}</h5>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </ScaleOnHover>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.6} className="mt-16 text-center">
          <Button
            size="lg"
            className="group transition-transform duration-300 hover:scale-105 bg-primary text-white hover:bg-primary/90 font-medium"
            onClick={() => setIsDetailPopupOpen(true)}
          >
            더 알아보기
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </FadeIn>
      </div>

      {/* Strength Detail Popup */}
      <StrengthDetailPopup isOpen={isDetailPopupOpen} onClose={() => setIsDetailPopupOpen(false)} />
    </section>
  )
}

