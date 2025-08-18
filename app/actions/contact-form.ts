"use server"

import { sendEmail } from "@/utils/ses";

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // 필수 필드 검증
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        message: "필수 항목을 모두 입력해주세요.",
      };
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "올바른 이메일 형식이 아닙니다.",
      };
    }

    // 개발 환경에서는 실제 메일을 보내지 않음
    if (process.env.NODE_ENV !== 'production') {
      console.log('개발 환경: 이메일 전송 시뮬레이션', {
        to: process.env.AWS_SES_RECIPIENT_EMAIL,
        subject: `[홈페이지 문의] ${data.subject}`,
        data: data
      });
      return {
        success: true,
        message: "개발 환경: 문의가 성공적으로 전송되었습니다.",
      };
    }

    // 프로덕션 환경에서만 실제 메일 전송
    const result = await sendEmail(data);

    if (result.success) {
      return {
        success: true,
        message: "문의가 성공적으로 전송되었습니다.",
      };
    } else {
      console.error("Email sending failed:", result.error);
      return {
        success: false,
        message: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

