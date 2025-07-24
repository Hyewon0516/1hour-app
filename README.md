# 1Hour App - 카카오 로그인

간단하고 안전한 카카오 로그인을 제공하는 웹 애플리케이션입니다.

## 🎯 프로젝트 개요

이 프로젝트는 카카오 SDK를 사용하여 사용자 인증을 구현한 웹 애플리케이션입니다. 모던한 UI/UX와 함께 안전하고 간편한 로그인 경험을 제공합니다.

## ✨ 주요 기능

- **카카오 로그인**: 카카오 SDK를 통한 안전한 OAuth 인증
- **사용자 정보 표시**: 프로필 이미지, 이름, 이메일, 사용자 ID 표시
- **세션 관리**: 로그인 상태 유지 및 자동 세션 확인
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 UI
- **실시간 상태 표시**: 로그인 진행 상황 및 오류 메시지 표시
- **로그아웃 기능**: 안전한 세션 종료

## 🚀 시작하기

### 필수 요구사항

- 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 카카오 개발자 계정
- 카카오 JavaScript 키

### 설치 및 설정

1. **프로젝트 클론**
   ```bash
   git clone [repository-url]
   cd 1hour-app
   ```

2. **카카오 개발자 설정**
   - [Kakao Developers](https://developers.kakao.com)에서 애플리케이션 생성
   - JavaScript 키 발급
   - 플랫폼 설정에서 도메인 등록

3. **환경 설정**
   - `config.js` 파일에서 카카오 JavaScript 키 설정:
   ```javascript
   const CONFIG = {
       KAKAO_JS_KEY: 'your_kakao_javascript_key_here'
   };
   ```

4. **개발 서버 실행**
   ```bash
   # Python 3를 사용한 간단한 HTTP 서버
   python3 -m http.server 8989
   
   # 또는 Node.js를 사용한 경우
   npx http-server -p 8989
   ```

5. **브라우저에서 접속**
   ```
   http://localhost:8989
   ```

## 📁 프로젝트 구조

```
1hour-app/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직
├── config.js           # 설정 파일
├── kakao.min.js       # 카카오 SDK (CDN 사용)
└── README.md          # 프로젝트 문서
```

## 🔧 주요 파일 설명

### `index.html`
- 메인 HTML 구조
- 카카오 SDK CDN 포함
- 반응형 레이아웃

### `styles.css`
- 모던한 UI 디자인
- 애니메이션 효과
- 반응형 스타일링

### `script.js`
- 카카오 SDK 초기화
- 로그인/로그아웃 로직
- 사용자 정보 관리
- 세션 상태 확인

### `config.js`
- 카카오 JavaScript 키 설정
- 환경 변수 지원
- 키 유효성 검사

## 🎨 UI/UX 특징

- **깔끔한 디자인**: 모던하고 직관적인 인터페이스
- **부드러운 애니메이션**: 사용자 경험을 향상시키는 전환 효과
- **상태 피드백**: 로딩 상태와 오류 메시지 표시
- **반응형 레이아웃**: 모든 디바이스에서 최적화된 표시

## 🔒 보안 고려사항

- 카카오 OAuth 2.0 인증 사용
- 클라이언트 사이드에서 안전한 토큰 관리
- HTTPS 환경에서 사용 권장

## 🛠️ 개발 환경 설정

### 로컬 개발 서버 실행

```bash
# Python 3 사용
python3 -m http.server 8989

# Node.js 사용
npx http-server -p 8989

# PHP 사용
php -S localhost:8989
```

### 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 사용법

1. **로그인**
   - "카카오 로그인" 버튼 클릭
   - 카카오 계정으로 인증
   - 권한 승인

2. **사용자 정보 확인**
   - 로그인 후 프로필 정보 자동 표시
   - 새로고침 버튼으로 정보 업데이트

3. **로그아웃**
   - "로그아웃" 버튼 클릭
   - 세션 종료 및 초기 화면으로 복귀

## 🐛 문제 해결

### 일반적인 문제들

1. **SDK 로딩 실패**
   - 인터넷 연결 확인
   - 브라우저 콘솔에서 오류 메시지 확인
   - 페이지 새로고침

2. **로그인 버튼 비활성화**
   - 카카오 JavaScript 키 설정 확인
   - 개발자 도구에서 네트워크 오류 확인

3. **사용자 정보 표시 안됨**
   - 카카오 개발자 콘솔에서 앱 설정 확인
   - 도메인 등록 상태 확인

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
**버전**: 1.0.0  
**최종 업데이트**: 2024년 