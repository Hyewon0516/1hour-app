"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { ProjectDetail } from "@/components/project-detail-popup"
import { projectsData, projectCategories } from "@/data/projects"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onProjectSelect: (project: ProjectDetail) => void
  initialCategory?: string
}

export default function ProjectModal({ isOpen, onClose, onProjectSelect, initialCategory = "전체" }: ProjectModalProps) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetail[]>([])
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const [groupedProjects, setGroupedProjects] = useState<Record<string, ProjectDetail[]>>({})

  // 프로젝트를 카테고리별로 그룹화하는 함수
  const groupProjectsByCategory = (projects: ProjectDetail[]) => {
    const grouped: Record<string, ProjectDetail[]> = {}

    projects.forEach((project) => {
      if (!project.title || !project.client) return

      const category = project.category || "기타"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(project)
    })

    return grouped
  }

  // 필터 변경 시 프로젝트 필터링 및 그룹화
  useEffect(() => {
    let filtered: ProjectDetail[]

    if (activeFilter === "전체") {
      filtered = projectsData.filter((project) => project.title && project.client)
    } else {
      filtered = projectsData.filter((project) => project.category === activeFilter && project.title && project.client)
    }

    setFilteredProjects(filtered)
    setGroupedProjects(groupProjectsByCategory(filtered))
  }, [activeFilter])

  // 모달이 열릴 때 필터링 적용
  useEffect(() => {
    if (isOpen) {
      let filtered: ProjectDetail[]

      if (activeFilter === "전체") {
        filtered = projectsData.filter((project) => project.title && project.client)
      } else {
        filtered = projectsData.filter(
          (project) => project.category === activeFilter && project.title && project.client,
        )
      }

      setFilteredProjects(filtered)
      setGroupedProjects(groupProjectsByCategory(filtered))
    }
  }, [isOpen, activeFilter])

  // Handle modal close on escape key
  useEffect(() => {
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

  useEffect(() => {
    setActiveFilter(initialCategory)
  }, [initialCategory])

  if (!isOpen) return null

  // 카테고리 정렬 (특정 순서로 표시하고 싶은 경우)
  const sortedCategories = Object.keys(groupedProjects).sort((a, b) => {
    // 중요한 카테고리를 먼저 표시하도록 정렬
    const priorityOrder: Record<string, number> = {
      "멤버십 서비스": 1,
      "온라인 커머스": 2,
      "딜리버리 & 멤버십 서비스": 3,
      키오스크: 4,
      "물류 시스템": 5,
      "솔루션 커스터마이징": 6,
      "시스템 구축": 7,
      "그 외 프로젝트": 8,
      "하드웨어 서버 구축": 9,
      기타: 10,
    }

    return (priorityOrder[a] || 100) - (priorityOrder[b] || 100)
  })

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative w-full max-w-7xl h-[90vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-10 mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">모든 프로젝트 ({filteredProjects.length})</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid - Grouped by Category */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProjects.length === 0 ? (
            <div className="py-8 text-center text-gray-500">해당 카테고리의 프로젝트가 없습니다.</div>
          ) : (
            <div className="space-y-12">
              {sortedCategories.map((category) => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedProjects[category].map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full flex flex-col cursor-pointer"
                        onClick={() => onProjectSelect(project)}
                      >
                        <div className="relative h-48 flex items-center justify-center bg-white">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title || "프로젝트 이미지"}
                              width={240}
                              height={144}
                              className="object-contain"
                              style={{ maxHeight: '100%', maxWidth: '100%' }}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-gray-400 text-4xl mb-2">📷</div>
                                <p className="text-gray-500 font-medium">준비중입니다</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                            {project.projectPeriod || project.year}
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="text-sm font-semibold text-primary mb-1">{project.client}</div>
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{project.description}</p>
                          <Button variant="outline" size="sm" className="mt-auto self-start group">
                            자세히 보기
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

