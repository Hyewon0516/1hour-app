"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/animations"

export default function CareerSection() {
  const values = [
    {
      title: "혁신",
      description: "기존의 틀을 넘어 새로운 솔루션을 찾는 창의적 사고",
    },
    {
      title: "전문성",
      description: "끊임없는 학습과 성장을 통한 최고의 기술력 추구",
    },
    {
      title: "협업",
      description: "다양한 배경과 전문성을 가진 팀원들과의 시너지 창출",
    },
    {
      title: "도전정신",
      description: "어려운 문제에 맞서는 불굴의 의지와 열정",
    },
    {
      title: "고객 중심",
      description: "고객의 비즈니스 성공을 최우선으로 하는 마인드",
    },
  ]

  const benefits = [
    "최신 기술을 접하고 학습할 수 있는 환경",
    "수평적 조직 문화와 자유로운 의견 교환",
    "정기적인 기술 세미나 및 컨퍼런스 참여 지원",
    "성과에 따른 공정한 보상 시스템",
    "워라밸을 존중하는 유연한 근무 환경",
  ]

  const stats = [
    {
      value: new Date().getFullYear() - 2012,
      suffix: "년+",
      label: "업계 경력",
    },
    { value: 100, suffix: "+", label: "프로젝트 완료" },
    { value: 50, suffix: "+", label: "기업 고객사" },
    { value: 60, suffix: "+", label: "전문가 팀원" },
  ]

  return (
    <section id="careers" className="w-full py-24 px-[25px] bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">JOIN OUR TEAM</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">함께 성장할 인재를 찾습니다</h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            CNDF는 디지털 혁신을 함께 이끌어갈 열정적인 인재를 항상 찾고 있습니다. 우리는 단순한 직원이 아닌, 함께
            성장하고 발전할 수 있는 동료를 원합니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <FadeIn key={index} direction="up" delay={0.1 * index}>
              <div className="bg-white/10 p-6 rounded-xl text-center transform transition-transform duration-300 hover:scale-105 hover:bg-white/15 backdrop-blur-sm">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold text-primary mb-2 block"
                />
                <span className="text-white/80">{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn direction="right">
            <h4 className="text-2xl font-bold mb-8 text-white">우리가 추구하는 가치</h4>
            <StaggerContainer className="space-y-8">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <div className="flex group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center mr-6 transition-transform duration-300 group-hover:scale-110 text-secondary">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2 text-white">{value.title}</h5>
                      <p className="text-white/80">{value.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>

          <FadeIn direction="left">
            <h4 className="text-2xl font-bold mb-8 text-white">성장과 복지</h4>
            <div className="bg-white/10 p-8 rounded-2xl transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(166,206,57,0.2)] backdrop-blur-sm">
              <StaggerContainer className="space-y-6">
                {benefits.map((benefit, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 group-hover:bg-primary/40 transition-colors duration-300">
                        <span className="h-3 w-3 rounded-full bg-primary"></span>
                      </div>
                      <span className="text-lg text-white/90">{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="mt-10">
                <Button
                  size="lg"
                  className="w-full transition-transform duration-300 hover:scale-105 group bg-primary text-white hover:bg-primary/90"
                  asChild
                >
                  <a
                    href="https://www.saramin.co.kr/zf_user/search/recruit?search_area=main&search_done=y&search_optional_item=n&searchType=search&searchword=%EC%94%A8%EC%95%A4%EB%94%94%ED%8C%A9%ED%86%A0%EB%A6%AC"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    채용 공고 보기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

