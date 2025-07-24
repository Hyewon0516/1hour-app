// 카카오 설정
const CONFIG = {
    KAKAO_JS_KEY: '15d305ee749c86d0a46182bfeb28d606'
};

// 카카오 키를 가져오는 함수
function getKakaoKey() {
    // 환경 변수가 설정되어 있으면 사용, 없으면 CONFIG에서 가져오기
    if (typeof process !== 'undefined' && process.env && process.env.KAKAO_JS_KEY) {
        return process.env.KAKAO_JS_KEY;
    }
    return CONFIG.KAKAO_JS_KEY;
}

// 리다이렉트 URI를 가져오는 함수 (동적으로 현재 페이지 URL 사용)
function getRedirectUri() {
    // 환경 변수가 설정되어 있으면 사용
    if (typeof process !== 'undefined' && process.env && process.env.REDIRECT_URI) {
        return process.env.REDIRECT_URI;
    }
    
    // 현재 페이지의 URL을 사용 (어떤 도메인에서든 작동)
    return window.location.origin + window.location.pathname;
}

// 키 유효성 검사
function validateKakaoKey() {
    const key = getKakaoKey();
    if (!key || key === 'YOUR_KEY_HERE') {
        throw new Error('유효한 카카오 JavaScript 키가 설정되지 않았습니다.');
    }
    return key;
} 