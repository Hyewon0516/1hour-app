"use client"

import React from "react"
import { X, CheckCircle2, Zap, Users, Code, Server, Database, Globe } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface StrengthDetailPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function StrengthDetailPopup({ isOpen, onClose }: StrengthDetailPopupProps) {
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
          <Image src="/images/tech-digital.jpg" alt="CNDF 기술력" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">CNDF만의 강점</h2>
              <p className="text-lg mt-2">기술과 경험, 그리고 균형 잡힌 팀워크로 만들어가는 디지털 혁신</p>
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
            <h3 className="font-heading text-2xl font-bold mb-6">기술 우선주의</h3>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold">자체 개발 AMP 프레임워크</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Advanced for Multi Platform(AMP)은 CNDF가 자체 개발한 핵심 기술로, 다양한 플랫폼에서 최적화된 웹
                호환성을 제공합니다. 이 프레임워크는 다음과 같은 특징을 가지고 있습니다:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    One Source Multi Use 방식으로 모바일, 웹, 키오스크 등 다양한 환경에서 일관된 사용자 경험 제공
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>반응형 디자인과 적응형 레이아웃을 자동으로 처리하여 개발 효율성 향상</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>성능 최적화 기능이 내장되어 빠른 로딩 속도와 부드러운 사용자 경험 보장</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>다양한 브라우저 및 디바이스 호환성 문제를 자동으로 해결</span>
                </li>
              </ul>
              <p className="text-gray-700">
                AMP 프레임워크는 CNDF의 모든 프로젝트에 적용되어 개발 시간을 단축하고, 일관된 품질을 보장하며,
                클라이언트의 다양한 디지털 채널에서 통합된 브랜드 경험을 제공합니다.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold">최신 기술 스택</h4>
              </div>
              <p className="text-gray-700 mb-4">
                CNDF는 최신 기술 트렌드를 지속적으로 연구하고 적용하여 클라이언트의 디지털 경쟁력 강화에 기여합니다.
                주요 기술 스택은 다음과 같습니다:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">프론트엔드</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>Vue.js, React, Angular</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>JavaScript/TypeScript</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>HTML5, CSS3/SASS</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>AMP(자체 개발 프레임워크)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">백엔드</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>Go, Java, PHP, Node.js</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>Spring Boot, Express</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>RESTful API, GraphQL</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>마이크로서비스 아키텍처</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">데이터베이스</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>Oracle, MSSQL, MySQL, PostgreSQL</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>MongoDB, Redis</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>대용량 데이터 처리 및 최적화</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">DevOps & 클라우드</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>AWS, CNDF 자체 클라우드</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>Docker, Kubernetes</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>Jenkins, GitHub Actions</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      <span>CI/CD Automation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700">
                이러한 다양한 기술 스택을 활용하여 각 프로젝트에 가장 적합한 기술을 선택하고, 최적의 성능과 확장성을
                갖춘 솔루션을 제공합니다.
              </p>
            </div>

            <h3 className="font-heading text-2xl font-bold mb-6">전문성과 경험</h3>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold">산업별 도메인 전문성</h4>
              </div>
              <p className="text-gray-700 mb-4">
                CNDF는 다양한 산업 분야에서의 프로젝트 경험을 통해 축적된 도메인 전문성을 보유하고 있습니다. 각 산업의
                특성과 요구사항을 깊이 이해하고, 이에 최적화된 솔루션을 제공합니다:
              </p>

              <div className="space-y-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">F&B 산업</h5>
                  <p className="text-sm text-gray-700">
                    SPC 그룹, 아웃백, BHC 등 다수의 F&B 기업과 협업한 경험을 바탕으로 멤버십 시스템, 주문 및 결제
                    시스템, 매장 관리 솔루션 등을 성공적으로 구축했습니다. 특히 대규모 트래픽 처리와 실시간 주문 관리에
                    특화된 솔루션을 제공합니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">자동차 산업</h5>
                  <p className="text-sm text-gray-700">
                    BMW와 같은 프리미엄 자동차 브랜드와의 협업을 통해 차량 정보 연동, 딜러십 관리, 예약 시스템 등을
                    구축했습니다. 고급스러운 브랜드 아이덴티티를 디지털 환경에서 구현하는 노하우를 보유하고 있습니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">유통 및 물류 산업</h5>
                  <p className="text-sm text-gray-700">
                    광동상회 등 유통 기업과의 협업을 통해 재고 관리, 물류 추적, 주문 처리 자동화 등의 시스템을
                    구축했습니다. 복잡한 물류 프로세스를 디지털화하고 최적화하는 전문성을 갖추고 있습니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">게임 및 엔터테인먼트 산업</h5>
                  <p className="text-sm text-gray-700">
                    넷마블 등 게임 기업과의 협업을 통해 게임 포털, 커뮤니티 플랫폼, 결제 시스템 등을 구축했습니다.
                    대규모 동시 접속자 처리와 안정적인 서비스 운영 노하우를 보유하고 있습니다.
                  </p>
                </div>
              </div>

              <p className="text-gray-700">
                이러한 다양한 산업에서의 경험을 통해 CNDF는 각 산업의 특성과 요구사항을 깊이 이해하고, 이에 최적화된
                맞춤형 솔루션을 제공할 수 있습니다.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold">Full-Stack 역량</h4>
              </div>
              <p className="text-gray-700 mb-4">
                CNDF는 프론트엔드부터 백엔드, 인프라까지 통합적인 개발 및 운영 역량을 보유하고 있습니다. 이를 통해
                다음과 같은 이점을 제공합니다:
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>원스톱 솔루션:</strong> 디자인, 개발, 배포, 운영까지 전체 프로세스를 일관되게 관리하여
                    프로젝트의 일관성과 효율성을 높입니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>최적화된 아키텍처:</strong> 프론트엔드와 백엔드 간의 효율적인 통신과 데이터 처리를 고려한
                    최적화된 아키텍처를 설계합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>통합 테스트 및 품질 관리:</strong> 전체 시스템에 대한 통합 테스트와 품질 관리를 체계적으로
                    수행하여 안정적인 서비스를 보장합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>확장 가능한 인프라:</strong> 비즈니스 성장에 따라 유연하게 확장할 수 있는 클라우드 기반
                    인프라를 구축합니다.
                  </span>
                </li>
              </ul>

              <p className="text-gray-700">
                이러한 Full-Stack 역량을 바탕으로 CNDF는 클라이언트의 요구사항을 정확히 이해하고, 최적의 기술 스택을
                선택하여 효율적이고 안정적인 시스템을 구축합니다.
              </p>
            </div>

            <h3 className="font-heading text-2xl font-bold mb-6">균형 잡힌 팀 구성</h3>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold">다양한 전문가 집단</h4>
              </div>
              <p className="text-gray-700 mb-4">
                CNDF는 개발자, 기획자, 디자이너, QA 등 각 분야 전문가들로 구성된 균형 잡힌 팀을 운영합니다. 이를 통해
                다음과 같은 이점을 제공합니다:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">개발팀</h5>
                  <p className="text-sm text-gray-700">
                    프론트엔드, 백엔드, 모바일, 인프라 등 각 분야의 전문 개발자들로 구성되어 있습니다. 최신 기술
                    트렌드를 지속적으로 연구하고 적용하며, 코드 리뷰와 페어 프로그래밍을 통해 코드 품질을 높이고 지식을
                    공유합니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">기획팀</h5>
                  <p className="text-sm text-gray-700">
                    사용자 경험(UX) 전문가와 비즈니스 분석가로 구성되어 있습니다. 클라이언트의 비즈니스 목표와 사용자의
                    니즈를 깊이 이해하고, 이를 바탕으로 최적의 디지털 전략과 사용자 경험을 설계합니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">디자인팀</h5>
                  <p className="text-sm text-gray-700">
                    UI 디자이너와 그래픽 디자이너로 구성되어 있습니다. 사용자 중심의 직관적인 인터페이스를 설계하고,
                    클라이언트의 브랜드 아이덴티티를 디지털 환경에서 효과적으로 구현합니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold mb-2">QA팀</h5>
                  <p className="text-sm text-gray-700">
                    품질 보증 전문가로 구성되어 있습니다. 체계적인 테스트 프로세스를 통해 서비스의 안정성과 품질을
                    보장하며, 자동화된 테스트 도구를 활용하여 효율적인 품질 관리를 수행합니다.
                  </p>
                </div>
              </div>

              <p className="text-gray-700">
                이러한 다양한 전문가들의 조화로운 협업을 통해 CNDF는 기술적으로 우수하면서도 사용자 친화적이고 비즈니스
                목표에 부합하는 디지털 솔루션을 제공합니다.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold">안정적인 운영 역량</h4>
              </div>
              <p className="text-gray-700 mb-4">
                CNDF는 수백만 사용자가 이용하는 서비스의 안정적인 운영 경험을 보유하고 있습니다. 이를 통해 다음과 같은
                이점을 제공합니다:
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>대규모 트래픽 처리:</strong> 일 100만 이상의 트랜잭션을 안정적으로 처리할 수 있는 아키텍처
                    설계 및 운영 노하우를 보유하고 있습니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>클라우드 전문성:</strong> AWS 및 자체 클라우드 서비스를 활용한 확장 가능한 인프라를
                    구축하고, 자동 스케일링, 로드 밸런싱 등을 통해 안정적인 서비스를 제공합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>24/7 모니터링:</strong> 전문 모니터링 솔루션을 활용하여 서비스 이상을 즉시 감지하고 대응합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>보안 관리:</strong> 정기적인 보안 점검과 취약점 분석을 통해 서비스와 사용자 데이터의 안전을
                    보장합니다.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>무중단 배포:</strong> CI/CD 파이프라인과 블루-그린 배포 전략을 통해 서비스 중단 없이 새로운
                    기능을 안전하게 배포합니다.
                  </span>
                </li>
              </ul>

              <p className="text-gray-700">
                이러한 안정적인 운영 역량을 바탕으로 CNDF는 클라이언트의 서비스가 지속적으로 안정적으로 운영될 수 있도록
                지원하며, 비즈니스 성장에 따라 유연하게 확장할 수 있는 기반을 제공합니다.
              </p>
            </div>

            <h3 className="font-heading text-2xl font-bold mb-6">CNDF만의 차별화된 강점</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              CNDF는 기술 우선주의, 풍부한 경험과 전문성, 균형 잡힌 팀 구성, 그리고 안정적인 운영 역량을 바탕으로
              클라이언트의 디지털 혁신을 성공적으로 이끌어 나갑니다. 이러한 강점들이 유기적으로 결합되어 CNDF만의
              차별화된 가치를 창출합니다.
            </p>

            <p className="text-gray-700 leading-relaxed">
              단순한 개발 회사가 아닌, 클라이언트의 비즈니스 목표를 깊이 이해하고 그에 맞는 디지털 전략을 함께 설계하는
              전략적 파트너로서 CNDF는 클라이언트의 지속적인 성장과 혁신을 위한 든든한 동반자가 되겠습니다.
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

