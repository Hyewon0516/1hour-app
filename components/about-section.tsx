"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/animations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyOverviewPopup from "@/components/company-overview-popup"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isOverviewPopupOpen, setIsOverviewPopupOpen] = useState(false)

  const stats = [
    { value: 2012, label: "설립년도" },
    {
      value: new Date().getFullYear() - 2012,
      suffix: "년+",
      label: "업계 경력",
    },
    { value: 100, suffix: "+", label: "프로젝트" },
    { value: 60, suffix: "+", label: "전문가 팀원" },
  ]

  const keyClients = ["SPC 그룹", "BMW", "넷마블", "아웃백", "광동상회", "BHC"]

  return (
    <section id="about" className="w-full py-24 px-[25px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <FadeIn direction="right" className="md:w-1/3">
            <h2 className="section-subtitle text-gray-500 mb-4">WHO WE ARE</h2>
            <h3 className="section-title text-3xl md:text-4xl mb-6">CNDF 소개</h3>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix || ""}
                    className="text-3xl font-bold text-primary block"
                  />
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="font-heading text-lg font-semibold mb-3">주요 고객사</h4>
              <div className="flex flex-wrap gap-2">
                {keyClients.map((client, index) => (
                  <span key={index} className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="md:w-2/3">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="overview" className="text-sm">
                  회사 개요
                </TabsTrigger>
                <TabsTrigger value="mission" className="text-sm">
                  미션 & 비전
                </TabsTrigger>
                <TabsTrigger value="history" className="text-sm">
                  연혁
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <FadeIn direction="left" className="mb-6">
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                    <Image src="/images/modern-office.jpg" alt="CNDF 사무실" fill className="object-cover" />
                  </div>
                  <h4 className="font-heading text-xl font-bold mb-4">기술 중심 디지털 혁신 파트너</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CNDFactory(CNDF)는 2012년 설립된 기술 중심 기업으로, 디지털 혁신을 선도하며 10년 이상의 풍부한
                    경험을 보유하고 있습니다. 모바일 앱, 웹, 키오스크 시스템 개발에 전문성을 갖추고 있으며, 특히 자체 개발한 AMP 프레임워크를 통해 다양한 디지털 플랫폼에서 최적화된 솔루션을 제공합니다
                  </p>
                </FadeIn>

                <FadeIn direction="left" delay={0.2}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h5 className="font-heading font-semibold mb-3 flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        혁신적인 기술력
                      </h5>
                      <p className="text-gray-600 text-sm">
                        최신 기술 트렌드를 지속적으로 연구하고 적용하여 클라이언트의 디지털 경쟁력 강화에 기여합니다.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h5 className="font-heading font-semibold mb-3 flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        비즈니스 이해도
                      </h5>
                      <p className="text-gray-600 text-sm">
                        코드를 작성하는 단순 개발사를 넘어, 클라이언트의 비즈니스 목표를 깊이 이해하고 그에 맞는 디지털
                        전략을 함께 설계합니다.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.4}>
                  <Button
                    className="group transition-transform duration-300 hover:scale-105"
                    onClick={() => setIsOverviewPopupOpen(true)}
                  >
                    더 알아보기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </FadeIn>
              </TabsContent>

              <TabsContent value="mission" className="mt-0">
                <FadeIn direction="left">
                  <div className="bg-gray-50 p-8 rounded-xl mb-8">
                    <h4 className="font-heading text-xl font-bold mb-2">미션</h4>
                    <p className="text-gray-700 text-lg mb-6 italic">"기술과 창의를 통해 미래를 발견하는 기업"</p>
                    <p className="text-gray-600">
                      CNDF는 최신 기술과 창의적인 사고를 바탕으로 고객의 비즈니스 가치를 극대화하고, 디지털 혁신을 통해
                      새로운 미래를 함께 만들어 나갑니다.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h4 className="font-heading text-xl font-bold mb-2">비전</h4>
                    <p className="text-gray-700 text-lg mb-6 italic">"디지털 혁신을 선도하는 글로벌 기술 파트너"</p>
                    <p className="text-gray-600">
                      국내를 넘어 글로벌 시장에서 인정받는 기술 기업으로 성장하며, 지속 가능한 혁신을 통해 디지털
                      생태계의 발전에 기여합니다.
                    </p>
                  </div>
                </FadeIn>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <FadeIn direction="left">
                  <div className="relative border-l-2 border-primary pl-8 pb-8 ml-4">
                    <StaggerContainer className="space-y-12">
                      <StaggerItem>
                        <div className="relative">
                          <div className="absolute -left-[41px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                          </div>
                          <h4 className="font-heading text-xl font-bold mb-2">2022 - 현재</h4>
                          <p className="text-gray-700 mb-2">글로벌 확장 및 새로운 도전</p>
                          <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                            <li>최신 디지털 기술 도입 및 서비스 적용</li>
                            <li>글로벌 브랜드와의 협업 프로젝트 성공</li>
                            <li>대기업 디지털 혁신 프로젝트 주도</li>
                            <li>사용자 맞춤형 디지털 경험 설계</li>
                            <li>접근성과 사용성을 고려한 디자인 철학 확립</li>
                            <li>신기술 접목을 통한 차별화된 디지털 솔루션 제공</li>
                          </ul>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="relative">
                          <div className="absolute -left-[41px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                          </div>
                          <h4 className="font-heading text-xl font-bold mb-2">2017 - 2021</h4>
                          <p className="text-gray-700 mb-2">성장 및 확장 단계</p>
                          <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                            <li>자체 웹 개발 프레임워크 개발 및 적용</li>
                            <li>연남동 사무실 확장 이전</li>
                            <li>대기업 파트너십 확대</li>
                            <li>사용자 친화적 디자인 솔루션으로 업계 인정</li>
                            <li>디자인과 기술의 조화를 통한 혁신적 서비스 제공</li>
                            <li>개발 효율성 향상을 위한 시스템 도입</li>
                          </ul>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="relative">
                          <div className="absolute -left-[41px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                          </div>
                          <h4 className="font-heading text-xl font-bold mb-2">2012 - 2016</h4>
                          <p className="text-gray-700 mb-2">창업 및 초기 성장기</p>
                          <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                            <li>CNDFactory 설립 (2012년)</li>
                            <li>첫 모바일 앱 출시 성공</li>
                            <li>핵심 디자인팀과 개발팀 구성</li>
                            <li>모바일 사용자 경험 중심 프로젝트 진행</li>
                            <li>국내 중견기업 대상 웹사이트 리뉴얼 다수 완료</li>
                          </ul>
                        </div>
                      </StaggerItem>
                    </StaggerContainer>
                  </div>
                </FadeIn>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Company Overview Popup */}
      <CompanyOverviewPopup isOpen={isOverviewPopupOpen} onClose={() => setIsOverviewPopupOpen(false)} />
    </section>
  )
}

