import nodemailer from 'nodemailer';

// AWS SES 설정 확인
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials are not properly configured in environment variables");
}

if (!process.env.AWS_SES_SENDER_EMAIL || !process.env.AWS_SES_RECIPIENT_EMAIL) {
  throw new Error("AWS SES email configuration is missing in environment variables");
}

// CC 이메일 주소 처리
const ccEmails = process.env.AWS_SES_CC_EMAIL ? process.env.AWS_SES_CC_EMAIL.split(',').map(email => email.trim()) : [];

// SMTP 트랜스포터 생성
const transporter = nodemailer.createTransport({
  host: 'email-smtp.ap-northeast-2.amazonaws.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.AWS_ACCESS_KEY_ID,
    pass: process.env.AWS_SECRET_ACCESS_KEY,
  },
  debug: process.env.NODE_ENV !== 'production', // 개발 환경에서만 디버그 활성화
});

// 트랜스포터 연결 확인
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

export interface EmailData {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendEmail(data: EmailData) {
  const { name, company, email, phone, subject, message } = data;

  const emailContent = `
    이름: ${name}
    회사: ${company || '입력되지 않음'}
    이메일: ${email}
    전화번호: ${phone || '입력되지 않음'}
    
    문의내용:
    ${message}
  `;

  try {
    const mailOptions = {
      from: process.env.AWS_SES_SENDER_EMAIL,
      to: process.env.AWS_SES_RECIPIENT_EMAIL,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      subject: `[홈페이지 문의] ${subject}`,
      text: emailContent,
      // HTML 버전 추가
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">[홈페이지 문의]</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>회사:</strong> ${company || '입력되지 않음'}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>전화번호:</strong> ${phone || '입력되지 않음'}</p>
            <h3 style="color: #444;">문의내용:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 3px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
} 