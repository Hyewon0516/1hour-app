"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { submitContactForm } from "@/app/actions/contact-form"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const formData = new FormData()
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const result = await submitContactForm(formData)

      if (result.success) {
        setFormStatus({
          type: "success",
          message: "문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.",
        })
        // 폼 초기화
        setFormState({
          name: "",
          company: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setFormStatus({
          type: "error",
          message: result.message || "문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      }
    } catch (error) {
      console.error("폼 제출 오류:", error)
      setFormStatus({
        type: "error",
        message: "문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="w-full py-24 px-[25px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4">CONTACT US</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">문의하기</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            새로운 프로젝트나 협업 기회, 채용에 관한 문의는 언제든지 환영합니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn direction="right">
            <div className="bg-gray-50 p-8 rounded-2xl h-full transform transition-all duration-500 hover:shadow-lg border border-gray-100">
              <h4 className="text-2xl font-bold mb-8">연락처 정보</h4>

              <StaggerContainer className="space-y-8">
                <StaggerItem>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-2">주소</h5>
                      <p className="text-gray-600">서울 마포구 연남동 연남로1길 70 (신원빌딩) 4F, 5F</p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-2">전화</h5>
                      <p className="text-gray-600">02-2197-9901</p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-2">이메일</h5>
                      <p className="text-gray-600">sales@cndfactory.com</p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              <div className="mt-12">
                <h5 className="text-lg font-bold mb-4">찾아오시는 길</h5>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden transform transition-all duration-500 hover:shadow-md">
                  <iframe
                    src="https://maps.google.com/maps?q=서울특별시%20마포구%20연남로1길%2070&t=m&z=17&output=embed&iwloc=near&markers=color:red%7Clabel:CNDF%7C서울특별시%20마포구%20연남로1길%2070"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-gray-50 p-8 rounded-2xl transform transition-all duration-500 hover:shadow-lg border border-gray-100">
              <h4 className="text-2xl font-bold mb-8">문의하기</h4>

              {formStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-start ${
                    formStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {formStatus.type === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <p>{formStatus.message}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium group-focus-within:text-primary transition-colors duration-300"
                    >
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="이름을 입력하세요"
                      required
                      className="transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium group-focus-within:text-primary transition-colors duration-300"
                    >
                      회사명
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder="회사명을 입력하세요"
                      className="transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium group-focus-within:text-primary transition-colors duration-300"
                    >
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="이메일을 입력하세요"
                      required
                      className="transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium group-focus-within:text-primary transition-colors duration-300"
                    >
                      전화번호
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="전화번호를 입력하세요"
                      className="transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium group-focus-within:text-primary transition-colors duration-300"
                  >
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    required
                    className="transition-all duration-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div className="space-y-2 group">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium group-focus-within:text-primary transition-colors duration-300"
                  >
                    메시지 <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="문의 내용을 입력하세요"
                    rows={6}
                    required
                    className="transition-all duration-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-transform duration-300 hover:scale-105"
                >
                  {isSubmitting ? "전송 중..." : "문의하기"}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

