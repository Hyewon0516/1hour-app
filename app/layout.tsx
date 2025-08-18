import type { ReactNode } from "react"
import { Montserrat, Noto_Sans_KR } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// 메타데이터 설정
export const metadata = {
  title: "CNDFactory - 기술과 창의를 통해 미래를 발견하는 기업",
  description:
    "CNDFactory는 2012년 설립된 기술 중심 기업으로, 디지털 혁신을 선도하며 10년 이상의 풍부한 경험을 보유하고 있습니다.",
  generator: 'v0.dev'
}

// 폰트 로딩 방식 변경
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  preload: false,
})

// Load Montserrat for headings
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${notoSansKr.variable} ${montserrat.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="cndf-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
