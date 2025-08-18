"use client"

import { useState } from "react"

import React from "react"
import { X, Calendar, Building, Tag, CheckCircle2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export interface ProjectDetail {
  id: number
  title: string
  client: string
  category: string
  description: string
  fullDescription?: string
  image: string
  year: number
  projectPeriod?: string
  details?: string
  techStack?: string
  gallery?: string[]
}

interface ProjectDetailPopupProps {
  project: ProjectDetail | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailPopup({ project, isOpen, onClose }: ProjectDetailPopupProps) {
  const [activeTab, setActiveTab] = useState("overview")

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

  if (!isOpen || !project) return null

  // 38번 이후 프로젝트는 간략한 정보만 표시
  const isSimplifiedProject = project.id > 38

  // 프로젝트 상세 정보 표시 형식 변환
  const formatDetails = (details: string) => {
    if (!details) return []

    // 줄바꿈 문자(\n)를 기준으로 분리하고 빈 줄은 제거
    return details
      .split(/\\n/)
      .map((line) => line.trim())
      .filter((line) => line !== "")
  }

  const formatTechStack = (techStack: string) => {
    if (!techStack) return {}

    const result: Record<string, string[]> = {}

    // 줄바꿈 문자(\n)를 기준으로 분리하고 빈 줄은 제거
    const lines = techStack
      .split(/\\n/)
      .map((line) => line.trim())
      .filter((line) => line !== "")

    let currentCategory = "기술 스택"

    lines.forEach((line) => {
      // 콜론(:)이 있는 경우 카테고리로 간주
      if (line.includes(": ")) {
        const [key, value] = line.split(": ")
        if (key && value) {
          result[key] = value.split(", ")
        }
      } else if (line.endsWith(":")) {
        // 라인이 콜론으로 끝나는 경우 새 카테고리 시작
        currentCategory = line.slice(0, -1)
        result[currentCategory] = []
      } else {
        // 그 외의 경우 현재 카테고리에 추가
        if (!result[currentCategory]) {
          result[currentCategory] = []
        }
        result[currentCategory].push(line)
      }
    })

    return result
  }

  const projectDetails = formatDetails(project.details || "")
  const techStack = formatTechStack(project.techStack || "")

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
        {/* Header with image */}
        <div className="relative h-64 md:h-80 bg-gray-200">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="h-4 w-4" />
                <span className="text-sm font-medium">{project.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold">{project.title}</h2>
              <div className="flex flex-wrap items-center mt-2 gap-4">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.client}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.projectPeriod || project.year}</span>
                </div>
              </div>
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

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              프로젝트 개요
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "details" ? "border-b-2 border-primary text-primary" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              기술 스택
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="prose prose-lg max-w-none">
                  <h3 className="font-heading text-xl font-bold mb-4">프로젝트 개요</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {(project.fullDescription || project.description).replace(/\\n/g, "\n")}
                  </p>

                  {!isSimplifiedProject && projectDetails.length > 0 && (
                    <>
                      <h4 className="font-heading text-lg font-bold mt-8 mb-4">프로젝트 내역</h4>
                      <ul className="space-y-2">
                        {projectDetails.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{detail.replace(/^- /, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h5 className="font-heading font-semibold mb-3">클라이언트</h5>
                      <p className="text-gray-700">{project.client}</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h5 className="font-heading font-semibold mb-3">프로젝트 유형</h5>
                      <p className="text-gray-700">{project.category}</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h5 className="font-heading font-semibold mb-3">진행 기간</h5>
                      <p className="text-gray-700">{project.projectPeriod || project.year}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "details" && !isSimplifiedProject && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-heading text-xl font-bold mb-6">기술 스택</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(techStack).length > 0 ? (
                    Object.entries(techStack).map(([category, technologies], index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="font-heading text-lg font-bold mb-4">{category}</h4>
                        <ul className="space-y-2">
                          {technologies.map((tech, techIndex) => (
                            <li key={techIndex} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                              <span className="text-gray-700">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-xl col-span-2">
                      <p className="text-gray-700 whitespace-pre-line">
                        {project.techStack?.replace(/\\n/g, "\n") || "기술 스택 정보가 없습니다."}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "details" && isSimplifiedProject && (
              <motion.div
                key="details-simplified"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-heading text-xl font-bold mb-6">간략 정보</h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700">
                    이 프로젝트에 대한 상세 정보는 요청 시 제공해 드립니다. 관심이 있으시면 문의하기 버튼을 통해 연락
                    부탁드립니다.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Button className="group">
            프로젝트 문의하기
            <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

