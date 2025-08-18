"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations"
import ProjectModal from "@/components/project-modal"
import ProjectDetailPopup, { type ProjectDetail } from "@/components/project-detail-popup"
import { featuredProjects } from "@/data/projects"

export default function CaseStudySection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)

  // 주요 프로젝트 사례 (메인 페이지에 표시될 대표 프로젝트)
  const caseStudies = featuredProjects

  const handleOpenDetail = (project: ProjectDetail) => {
    setSelectedProject(project)
    setIsDetailPopupOpen(true)
  }

  return (
    <section id="cases" className="w-full py-24 px-[25px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="section-subtitle text-gray-500 uppercase mb-4">CASE STUDIES</h2>
          <h3 className="section-title text-3xl md:text-5xl mb-6">주요 프로젝트 사례</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 산업 분야에서 성공적으로 완료한 프로젝트를 소개합니다.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <StaggerItem key={index}>
              <ScaleOnHover className="bg-white rounded-2xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow h-full border border-gray-100">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-primary mb-2">{caseStudy.client}</div>
                  <h4 className="font-heading text-xl font-bold mb-3">{caseStudy.title}</h4>
                  <p className="text-gray-600 mb-6 line-clamp-4">{caseStudy.description}</p>
                  <Button variant="outline" className="group" onClick={() => handleOpenDetail(caseStudy)}>
                    자세히 보기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.6} className="mt-12 text-center">
          <Button
            size="lg"
            className="transition-transform duration-300 hover:scale-105 bg-primary text-white hover:bg-primary/90 font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            모든 프로젝트 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </FadeIn>
      </div>

      {/* Project Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectSelect={handleOpenDetail} />

      {/* Project Detail Popup */}
      <ProjectDetailPopup
        project={selectedProject}
        isOpen={isDetailPopupOpen}
        onClose={() => setIsDetailPopupOpen(false)}
      />
    </section>
  )
}

