"use client"

import { ArrowRight } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"

export default function ProcessSection() {
  const processes = [
    {
      number: "01",
      title: "요구사항 분석",
      description: "깊이 있는 비즈니스 이해를 바탕으로 명확한 프로젝트 방향성 수립",
    },
    {
      number: "02",
      title: "설계 및 기획",
      description: "최적의 기술 스택 선정 및 시스템 아키텍처 설계",
    },
    {
      number: "03",
      title: "개발 및 구현",
      description: "애자일 방법론 기반 2주 단위 스프린트 진행, 지속적인 코드 리뷰와 품질 관리",
    },
    {
      number: "04",
      title: "테스트 및 QA",
      description: "철저한 품질 보증을 통한 안정적인 서비스 제공",
    },
    {
      number: "05",
      title: "배포 및 운영",
      description: "무중단 배포를 통한 서비스 연속성 보장",
    },
    {
      number: "06",
      title: "지속적인 모니터링 및 개선",
      description: "실시간 모니터링 및 피드백을 통한 서비스 개선",
    },
  ]

  return (
    <section id="process" className="w-full py-24 px-[25px] bg-secondary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="section-subtitle text-primary uppercase mb-4">OUR PROCESS</h2>
          <h3 className="section-title text-3xl md:text-5xl mb-6 text-white">CNDF의 업무 방식</h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            프로젝트의 시작부터 완료까지, 체계적인 프로세스로 성공적인 결과를 만들어냅니다.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <StaggerItem key={index}>
              <div className="bg-white/10 p-8 rounded-2xl group hover:bg-primary transition-colors duration-500 cursor-default h-full backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <span className="font-heading text-4xl font-bold text-primary group-hover:text-white transition-colors duration-500">
                    {process.number}
                  </span>
                  <ArrowRight className="ml-4 h-6 w-6 text-white/50 group-hover:text-white transition-colors duration-500 group-hover:translate-x-1" />
                </div>
                <h4 className="font-heading text-xl font-bold mb-4 text-white">{process.title}</h4>
                <p className="text-white/80 group-hover:text-white/90 transition-colors duration-500">
                  {process.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

