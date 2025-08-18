"use client"

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"

export default function TechStackSection() {
  // projects.ts 파일에서 기술 스택 정보 추출 및 분류
  const techStacks = [
    {
      category: "Frontend",
      technologies: [
        "Vue.js",
        "React",
        "Angular",
        "JavaScript/TypeScript",
        "HTML5",
        "CSS3/SASS",
        "AMP(자체 개발 프레임워크)",
        "jQuery",
      ],
    },
    {
      category: "Backend",
      technologies: [
        "Go",
        "Java",
        "PHP",
        "Node.js",
        "Spring Boot",
        "Express",
        "RESTful API",
        "GraphQL",
        "Microservices Architecture",
      ],
    },
    {
      category: "Database",
      technologies: [
        "Oracle",
        "MSSQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "대용량 데이터 처리 및 최적화",
        "DynamoDB",
      ],
    },
    {
      category: "DevOps & Cloud",
      technologies: [
        "AWS",
        "CNDF 자체 클라우드",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitHub Actions",
        "CI/CD Automation",
        "Azure",
        "AWS Lambda",
        "AWS SQS",
      ],
    },
    {
      category: "Mobile",
      technologies: [
        "Android (Kotlin)",
        "iOS (Swift)",
        "React Native",
        "Firebase",
        "WebView 기반 하이브리드 앱",
        "MLKit",
        "Retrofit/Alamofire",
        "Coroutines",
      ],
    },
    {
      category: "기타 도구",
      technologies: ["Electron", "SAP 연동", ".NET", "WebRTC", "POS 시스템 연동", "결제 시스템 연동"],
    },
  ]

  return (
    <section id="tech" className="w-full py-24 px-[25px] bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4">TECHNOLOGY STACK</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">CNDF 기술 스택</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 프로젝트에서 검증된 최신 기술을 활용하여 최적의 솔루션을 제공합니다.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStacks.map((stack, index) => (
            <FadeIn key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 * index}>
              <div className="bg-white p-8 rounded-2xl h-full shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold mb-8">{stack.category}</h4>
                <StaggerContainer className="flex flex-wrap gap-5">
                  {stack.technologies.map((tech, techIndex) => (
                    <StaggerItem key={techIndex}>
                      <span className="px-4 py-2.5 bg-gray-100 rounded-full text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary hover:text-white cursor-default">
                        {tech}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

