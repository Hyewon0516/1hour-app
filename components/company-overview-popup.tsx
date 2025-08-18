"use client"

import React from "react"
import { X, CheckCircle2, Award, Lightbulb, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CompanyOverviewPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function CompanyOverviewPopup({ isOpen, onClose }: CompanyOverviewPopupProps) {
  // Handle modal close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-10 mx-4"
      >
        {/* Header */}
        <div className="relative h-64 md:h-80 bg-gray-200">
          <Image src="/images/modern-office.jpg" alt="CNDF 사무실" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">CNDFactory 회사 소개</h2>
              <p className="text-lg mt-2">기술과 창의를 통해 미래를 발견하는 기업</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <h3 className="font-heading text-2xl font-bold mb-6">기술 중심 디지털 혁신 파트너</h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              CNDFactory(CNDF)는 2012년 설립된 기술 중심 기업으로, 디지털 혁신을 선도하며 10년 이상의 풍부한 경험을
              보유하고 있습니다. 모바일 앱, 웹, 키오스크 시스템 개발에 전문성을 갖추고 있으며, 특히 자체 개발한
              AMP(Advanced for Multi Platform) 프레임워크를 통해 다양한 디지털 플랫폼에서 최적화된 솔루션을 제공합니다.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              CNDF는 단순한 개발 회사가 아닌, 클라이언트의 비즈니스 목표를 깊이 이해하고 그에 맞는 디지털 전략을 함께
              설계하는 전략적 파트너로서의 역할을 수행합니다. 기술적 전문성과 창의적 사고를 바탕으로 고객의 비즈니스
              가치를 극대화하고, 디지털 혁신을 통해 새로운 미래를 함께 만들어 나갑니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-xl font-bold">혁신적인 기술력</h4>
                </div>
                <p className="text-gray-600">
                  최신 기술 트렌드를 지속적으로 연구하고 적용하여 클라이언트의 디지털 경쟁력 강화에 기여합니다. React,
                  Vue.js, Go, Java, Node.js 등 다양한 기술 스택을 활용하여 최적의 솔루션을 제공하며, 자체 개발한 AMP
                  프레임워크를 통해 다양한 플랫폼에서 일관된 사용자 경험을 구현합니다.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-xl font-bold">비즈니스 이해도</h4>
                </div>
                <p className="text-gray-600">
                  코드를 작성하는 단순 개발사를 넘어, 클라이언트의 비즈니스 목표를 깊이 이해하고 그에 맞는 디지털 전략을
                  함께 설계합니다. F&B, 자동차, 패션, 유통 등 다양한 산업 분야에 대한 도메인 전문성을 바탕으로 각 산업에
                  최적화된 솔루션을 제공합니다.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-xl font-bold">균형 잡힌 팀 구성</h4>
                </div>
                <p className="text-gray-600">
                  개발자, 기획자, 디자이너, QA 등 각 분야 전문가들의 조화로운 협업을 통해 프로젝트의 성공을 보장합니다.
                  애자일/스크럼 방법론을 기반으로 2주 단위 스프린트로 빠른 피드백과 효율적인 업무 진행을 실현하며, 기술
                  공유 세미나 및 스터디 그룹을 통한 끊임없는 성장을 추구합니다.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-xl font-bold">안정적인 운영 역량</h4>
                </div>
                <p className="text-gray-600">
                  수백만 사용자가 이용하는 서비스의 안정적인 운영 경험을 보유하고 있습니다. AWS 및 자체 클라우드
                  서비스를 활용한 확장 가능한 인프라 구축, WhaTap을 활용한 실시간 시스템 모니터링, 그리고 무중단 배포를
                  통한 서비스 연속성 보장으로 안정적인 서비스 운영을 실현합니다.
                </p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold mb-6">주요 사업 영역</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-heading text-lg font-semibold mb-2">모바일 & 웹 애플리케이션 개발</h5>
                  <p className="text-gray-600">
                    네이티브/하이브리드 모바일 앱 개발부터 반응형 웹 애플리케이션, PWA까지 다양한 디지털 서비스를
                    구축합니다. 자체 개발한 AMP 프레임워크를 활용하여 One Source Multi Use 방식으로 다양한 환경에서
                    일관된 사용자 경험을 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-heading text-lg font-semibold mb-2">엔터프라이즈 시스템 구축</h5>
                  <p className="text-gray-600">
                    기업의 비즈니스 요구사항에 맞는 확장 가능하고 안정적인 엔터프라이즈 시스템을 구축합니다.
                    마이크로서비스 아키텍처(MSA) 기반 시스템 구축, 레거시 시스템 현대화 및 리팩토링, 대용량 데이터 처리
                    및 분석 플랫폼, API 게이트웨이 및 통합 솔루션 등을 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-heading text-lg font-semibold mb-2">키오스크 & POS 시스템</h5>
                  <p className="text-gray-600">
                    매장 운영 효율성을 높이는 키오스크와 POS 시스템으로 고객 경험을 혁신합니다. F&B, 소매업 등을 위한
                    맞춤형 키오스크 개발, 클라우드 기반 통합 POS 시스템, 매장 관리 및 재고 관리 솔루션, 오프라인-온라인
                    연계 서비스(O2O) 등을 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-heading text-lg font-semibold mb-2">클라우드 & 인프라 구축</h5>
                  <p className="text-gray-600">
                    안정적이고 확장 가능한 클라우드 인프라를 구축하여 비즈니스 성장을 지원합니다. 클라우드 마이그레이션
                    및 최적화, DevOps 파이프라인 구축, 컨테이너 기반 인프라 구성, 시스템 모니터링 및 관리 등의 서비스를
                    제공합니다.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold mb-6">CNDF의 차별점</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              CNDF는 기술적 전문성과 창의적 사고를 바탕으로 고객의 비즈니스 가치를 극대화하는 디지털 혁신 파트너입니다.
              단순한 개발 회사가 아닌, 클라이언트의 비즈니스 목표를 깊이 이해하고 그에 맞는 디지털 전략을 함께 설계하는
              전략적 파트너로서의 역할을 수행합니다.
            </p>

            <p className="text-gray-700 leading-relaxed">
              10년 이상의 풍부한 경험과 다양한 산업 분야에 대한 도메인 전문성, 자체 개발한 AMP 프레임워크, 그리고
              개발자, 기획자, 디자이너, QA 등 각 분야 전문가들의 조화로운 협업을 통해 고객의 디지털 혁신을 성공적으로
              이끌어 나갑니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            닫기
          </button>
        </div>
      </motion.div>
    </div>
  )
}

