# 1Hour App - Node.js 카카오 로그인

Express.js 기반의 카카오 로그인을 지원하는 Node.js 웹 애플리케이션입니다.

## 🎯 프로젝트 개요

이 프로젝트는 Node.js와 Express.js를 사용하여 카카오 OAuth 인증을 구현한 웹 애플리케이션입니다. 서버 사이드 렌더링과 세션 관리를 통해 안전하고 확장 가능한 로그인 시스템을 제공합니다.

## ✨ 주요 기능

- **서버 사이드 인증**: 카카오 OAuth를 서버에서 안전하게 처리
- **세션 관리**: Express Session을 통한 안전한 세션 관리
- **RESTful API**: 사용자 정보 조회 및 인증 상태 확인 API
- **모던 UI/UX**: 반응형 디자인과 부드러운 애니메이션
- **보안 강화**: Helmet.js를 통한 보안 헤더 설정
- **환경 변수 관리**: dotenv를 통한 안전한 설정 관리

## 🚀 시작하기

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 또는 yarn
- 카카오 개발자 계정
- 카카오 JavaScript 키 및 Client Secret

### 설치 및 설정

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   ```bash
   cp env.example .env
   ```
   
   `.env` 파일을 편집하여 카카오 설정을 입력하세요:
   ```env
   PORT=8989
   NODE_ENV=development
   KAKAO_JS_KEY=your_kakao_javascript_key_here
   KAKAO_CLIENT_ID=your_kakao_client_id_here
   KAKAO_CLIENT_SECRET=your_kakao_client_secret_here
   KAKAO_REDIRECT_URI=http://localhost:8989/redirect
   SESSION_SECRET=your_session_secret_here
   ```

3. **카카오 개발자 설정**
   - [Kakao Developers](https://developers.kakao.com)에서 애플리케이션 생성
   - JavaScript 키 및 Client Secret 발급
   - 플랫폼 설정에서 도메인 등록: `http://localhost:8989`
   - Redirect URI 등록: `http://localhost:8989/redirect`

4. **개발 서버 실행**
   ```bash
   # 개발 모드 (nodemon 사용)
   npm run dev
   
   # 프로덕션 모드
   npm start
   ```

5. **브라우저에서 접속**
   ```
   http://localhost:8989
   ```

## 📁 프로젝트 구조

```
1hour-app/
├── app.js                # Express 서버 메인 파일
├── index.html           # 메인 HTML 파일 (정적 파일)
├── package.json         # 프로젝트 설정 및 의존성
├── env.example         # 환경 변수 예시
├── backup/             # 백업 파일들
└── README.md           # 프로젝트 문서
```

## 🔧 주요 파일 설명

### `app.js`
- Express.js 서버 설정 및 메인 파일
- 카카오 OAuth 인증 처리
- 액세스 토큰 발급 및 사용자 정보 조회
- 세션 관리 및 API 엔드포인트

### `index.html`
- 메인 HTML 파일
- 클라이언트 사이드 JavaScript 포함
- 카카오 SDK 초기화 및 UI 로직
- API 통신 및 상태 관리

## 🎨 UI/UX 특징

- **모던한 디자인**: 깔끔하고 직관적인 인터페이스
- **반응형 레이아웃**: 모든 디바이스에서 최적화
- **부드러운 애니메이션**: 사용자 경험 향상
- **상태 피드백**: 실시간 로딩 및 오류 메시지

## 🔒 보안 고려사항

- **서버 사이드 인증**: 클라이언트에서 직접 토큰 처리하지 않음
- **세션 보안**: HttpOnly 쿠키와 세션 시크릿 사용
- **보안 헤더**: Helmet.js를 통한 보안 헤더 설정
- **환경 변수**: 민감한 정보를 환경 변수로 관리

## 🛠️ 개발 환경 설정

### 개발 모드 실행
```bash
npm run dev
```

### 프로덕션 모드 실행
```bash
npm start
```

### 포트 변경
환경 변수 `PORT`를 설정하거나 `.env` 파일에서 수정:
```env
PORT=3000
```

## 📝 API 문서

### 인증 관련 API

#### `GET /authorize`
카카오 로그인 시작
- **응답**: 카카오 인증 페이지로 리다이렉트

#### `GET /redirect`
카카오 로그인 콜백 처리
- **파라미터**: `code` (인증 코드)
- **응답**: 메인 페이지로 리다이렉트

#### `GET /profile`
현재 사용자 정보 조회
- **응답**: JSON 형태의 사용자 정보

#### `GET /logout`
로그아웃
- **응답**: JSON 형태의 로그아웃 결과

#### `GET /unlink`
연결 해제
- **응답**: JSON 형태의 연결 해제 결과

## 🐛 문제 해결

### 일반적인 문제들

1. **의존성 설치 실패**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **포트 충돌**
   - `.env` 파일에서 `PORT` 변경
   - 또는 다른 포트 사용: `PORT=3000 npm start`

3. **카카오 로그인 실패**
   - 카카오 개발자 콘솔에서 설정 확인
   - Redirect URI 등록 확인
   - JavaScript 키와 Client Secret 확인

4. **세션 문제**
   - `SESSION_SECRET` 환경 변수 확인
   - 브라우저 쿠키 설정 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.

---

**개발자**: 1Hour App Team  
**버전**: 2.0.0 (Node.js)  
**최종 업데이트**: 2024년 