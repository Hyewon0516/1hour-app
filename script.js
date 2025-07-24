let kakaoJsKey = '';
let currentUser = null;
let sdkReady = false;

// 설정에서 카카오 키 가져오기
function getKakaoJsKey() {
    // config.js에서 정의된 함수 사용
    if (typeof getKakaoKey === 'function') {
        return getKakaoKey();
    }
    // config.js에서 CONFIG 객체 직접 사용
    if (typeof CONFIG !== 'undefined' && CONFIG.KAKAO_JS_KEY) {
        return CONFIG.KAKAO_JS_KEY;
    }
    // 마지막 대안으로 에러 발생
    throw new Error('카카오 JavaScript 키가 설정되지 않았습니다. config.js 파일을 확인해주세요.');
}

// 상태 메시지 표시
function showStatus(message, type = 'info', loading = false) {
    const statusArea = document.getElementById('statusArea');
    if (!statusArea) {
        console.log(`Status: ${message}`);
        return;
    }
    
    const loadingHtml = loading ? '<div class="loading"></div>' : '';
    statusArea.innerHTML = `<div class="status ${type}">${loadingHtml}${message}</div>`;
    
    if (!loading) {
        setTimeout(() => {
            statusArea.innerHTML = '';
        }, 4000);
    }
}

// 카카오 SDK 동적 로드 (수정됨)
function loadKakaoSDK() {
    return new Promise((resolve, reject) => {
        // 이미 로드된 경우 바로 resolve
        if (typeof Kakao !== 'undefined' && Kakao.init && Kakao.Auth) {
            console.log('✅ 카카오 SDK 이미 로드됨');
            resolve();
            return;
        }
        
        console.log('📦 카카오 SDK 로드 확인 중...');
        showStatus('카카오 SDK를 확인하는 중...', 'info', true);
        
        // SDK가 이미 HTML에 포함되어 있으므로 짧은 대기만
        let checkCount = 0;
        const maxChecks = 100; // 5초 (50ms * 100)
        
        const checkReady = setInterval(() => {
            checkCount++;
            
            // SDK 준비 상태 확인
            if (typeof Kakao !== 'undefined' && 
                Kakao.init && 
                typeof Kakao.init === 'function' &&
                Kakao.Auth &&
                typeof Kakao.Auth.login === 'function') {
                
                clearInterval(checkReady);
                console.log('✅ 카카오 SDK 완전히 준비됨');
                showStatus('카카오 SDK 로드 완료!', 'success');
                resolve();
                return;
            }
            
            // 디버깅을 위한 로그
            if (checkCount % 20 === 0) { // 1초마다 로그
                console.log(`SDK 준비 확인 중... (${checkCount}/${maxChecks})`);
                console.log('Kakao 객체:', typeof Kakao);
                if (typeof Kakao !== 'undefined') {
                    console.log('Kakao.init:', typeof Kakao.init);
                    console.log('Kakao.Auth:', typeof Kakao.Auth);
                    if (Kakao.Auth) {
                        console.log('Kakao.Auth.login:', typeof Kakao.Auth.login);
                    }
                }
            }
            
            if (checkCount >= maxChecks) {
                clearInterval(checkReady);
                console.error('❌ SDK 준비 상태 확인 실패');
                console.log('최종 Kakao 객체 상태:', typeof Kakao);
                if (typeof Kakao !== 'undefined') {
                    console.log('Kakao.init 상태:', typeof Kakao.init);
                    console.log('Kakao.Auth 상태:', typeof Kakao.Auth);
                    if (Kakao.Auth) {
                        console.log('Kakao.Auth.login 상태:', typeof Kakao.Auth.login);
                    }
                }
                showStatus('SDK 초기화 실패. 페이지를 새로고침해주세요.', 'error');
                reject(new Error('SDK 준비 상태 확인 실패'));
            }
        }, 50);
    });
}

// 카카오 SDK 초기화 (수정됨)
async function initializeKakao() {
    try {
        showStatus('카카오 SDK 초기화 중...', 'info', true);
        
        if (!kakaoJsKey) {
            throw new Error('카카오 JavaScript 키가 설정되지 않았습니다.');
        }
        
        // 키 유효성 검사
        if (kakaoJsKey === 'YOUR_KEY_HERE' || kakaoJsKey === '') {
            throw new Error('유효한 카카오 JavaScript 키가 설정되지 않았습니다.');
        }
        
        // SDK 로드 확인
        if (typeof Kakao === 'undefined') {
            console.log('SDK가 로드되지 않음. 다시 로드 시도...');
            await loadKakaoSDK();
        }
        
        // 최종 SDK 확인 (더 엄격한 검사)
        if (typeof Kakao === 'undefined' || !Kakao.init || !Kakao.Auth) {
            throw new Error('카카오 SDK 로드 실패');
        }
        
        // 이미 초기화되어 있다면 정리
        if (Kakao.isInitialized && Kakao.isInitialized()) {
            console.log('기존 초기화 정리...');
            try {
                Kakao.cleanup();
            } catch (cleanupError) {
                console.warn('기존 초기화 정리 중 오류:', cleanupError);
            }
        }
        
        // 초기화
        console.log('카카오 SDK 초기화 중...');
        Kakao.init(kakaoJsKey);
        
        // 초기화 확인 (더 엄격한 검사)
        if (!Kakao.isInitialized || !Kakao.isInitialized()) {
            throw new Error('카카오 SDK 초기화 실패');
        }
        
        // Auth 모듈 확인
        if (!Kakao.Auth || typeof Kakao.Auth.login !== 'function') {
            throw new Error('카카오 인증 모듈이 준비되지 않았습니다');
        }
        
        console.log('✅ 카카오 SDK 초기화 완료');
        sdkReady = true;
        
        // UI 업데이트
        updateLoginButton(true);
        showStatus('카카오 SDK 초기화 완료!', 'success');
        
        // 기존 로그인 상태 확인
        setTimeout(() => {
            checkExistingLogin();
        }, 500);
        
    } catch (error) {
        console.error('❌ 카카오 SDK 초기화 실패:', error);
        sdkReady = false;
        updateLoginButton(false);
        showStatus(`초기화 실패: ${error.message}`, 'error');
    }
}

// 로그인 버튼 상태 업데이트
function updateLoginButton(ready) {
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnText = document.getElementById('loginBtnText');
    
    if (!loginBtn || !loginBtnText) {
        console.warn('로그인 버튼 요소를 찾을 수 없습니다');
        return;
    }
    
    if (ready) {
        loginBtn.disabled = false;
        loginBtnText.textContent = '카카오톡으로 로그인';
        loginBtn.classList.remove('loading');
    } else {
        loginBtn.disabled = true;
        loginBtnText.textContent = 'SDK 준비 중...';
        loginBtn.classList.add('loading');
    }
}

// 기존 로그인 상태 확인
function checkExistingLogin() {
    try {
        if (Kakao.Auth && typeof Kakao.Auth.getAccessToken === 'function') {
            const token = Kakao.Auth.getAccessToken();
            if (token) {
                console.log('기존 로그인 토큰 발견');
                getUserInfo();
            } else {
                console.log('기존 로그인 토큰 없음');
            }
        }
    } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
    }
}

// 카카오 로그인 처리 (공식 코드 스타일로 수정)
function handleKakaoLogin() {
    if (!sdkReady) {
        showStatus('카카오 SDK가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.', 'error');
        return;
    }
    
    // SDK 상태 재확인
    if (typeof Kakao === 'undefined') {
        showStatus('카카오 SDK가 로드되지 않았습니다. 페이지를 새로고침해주세요.', 'error');
        return;
    }
    
    if (!Kakao.Auth || typeof Kakao.Auth.authorize !== 'function') {
        showStatus('카카오 인증 모듈이 준비되지 않았습니다. SDK를 다시 초기화해주세요.', 'error');
        return;
    }
    
    console.log('🔑 커스텀 버튼 카카오 로그인 시도');
    
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnText = document.getElementById('loginBtnText');
    
    if (loginBtn && loginBtnText) {
        loginBtn.disabled = true;
        loginBtnText.textContent = '로그인 중...';
    }
    
    showStatus('카카오 로그인 창을 여는 중...', 'info', true);
    
    // 공식 코드와 동일한 방식 사용
    Kakao.Auth.authorize({
        redirectUri: window.location.origin + window.location.pathname,
    });
}

// 사용자 정보 가져오기
function getUserInfo() {
    if (!Kakao.API || typeof Kakao.API.request !== 'function') {
        showStatus('카카오 API 모듈이 준비되지 않았습니다', 'error');
        return;
    }
    
    Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
            console.log('✅ 사용자 정보:', res);
            
            currentUser = {
                id: res.id,
                nickname: res.kakao_account?.profile?.nickname || '이름 없음',
                email: res.kakao_account?.email || '이메일 정보 없음',
                profileImage: res.kakao_account?.profile?.profile_image_url
            };
            
            showUserInfo();
            showStatus(`${currentUser.nickname}님 환영합니다!`, 'success');
        },
        fail: function(err) {
            console.error('❌ 사용자 정보 조회 실패:', err);
            showStatus('사용자 정보를 가져올 수 없습니다', 'error');
        }
    });
}

// 사용자 정보 표시
function showUserInfo() {
    const loginSection = document.getElementById('loginSection');
    const userInfo = document.getElementById('userInfo');
    
    if (loginSection) loginSection.style.display = 'none';
    if (userInfo) userInfo.style.display = 'block';
    
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userName) userName.textContent = currentUser.nickname;
    if (userEmail) userEmail.textContent = currentUser.email;
    
    if (userAvatar) {
        if (currentUser.profileImage) {
            userAvatar.src = currentUser.profileImage;
        } else {
            userAvatar.src = generateDefaultAvatar(currentUser.nickname);
        }
    }
}


// 로그아웃
function kakaoLogout() {
    try {
        if (Kakao.Auth && typeof Kakao.Auth.logout === 'function' && Kakao.Auth.getAccessToken()) {
            Kakao.Auth.logout(() => {
                console.log('✅ 카카오 로그아웃 완료');
            });
        }
    } catch (error) {
        console.error('로그아웃 중 오류:', error);
    }
    
    currentUser = null;
    const loginSection = document.getElementById('loginSection');
    const userInfo = document.getElementById('userInfo');
    
    if (loginSection) loginSection.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
    
    showStatus('로그아웃되었습니다', 'success');
}

// 수동 재시도 함수 (디버깅용)
function retryInitialization() {
    console.log('🔄 수동 재시도 시작');
    showStatus('다시 시도하는 중...', 'info', true);
    
    // 상태 초기화
    sdkReady = false;
    updateLoginButton(false);
    
    // 재시도
    setTimeout(async () => {
        try {
            await loadKakaoSDK();
            await initializeKakao();
        } catch (error) {
            console.error('재시도 실패:', error);
            showStatus('재시도 실패. 페이지를 새로고침해주세요.', 'error');
        }
    }, 1000);
}

// 페이지 로드 시 초기화 (공식 코드 스타일)
window.addEventListener('load', function() {
    console.log('🌐 페이지 로드 완료');
    
    // 초기 버튼 상태 설정
    updateLoginButton(false);
    
    try {
        // 공식 코드 스타일로 초기화
        console.log('⚙️ 카카오 SDK 공식 스타일 초기화 시작');
        initializeKakaoOfficial();
        
        // 최종 상태 확인
        if (sdkReady && typeof Kakao !== 'undefined' && Kakao.Auth) {
            console.log('✅ 모든 초기화 완료');
            showStatus('카카오 로그인이 준비되었습니다!', 'success');
        } else {
            throw new Error('SDK 초기화가 완료되지 않았습니다');
        }
        
    } catch (error) {
        console.error('❌ 초기화 실패:', error);
        showStatus(`초기화 실패: ${error.message}`, 'error');
        
        // 재시도 버튼 표시
        setTimeout(() => {
            const statusArea = document.getElementById('statusArea');
            if (statusArea) {
                statusArea.innerHTML += `
                    <div style="margin-top: 10px;">
                        <button onclick="retryInitialization()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            다시 시도
                        </button>
                    </div>
                `;
            }
        }, 2000);
    }
});

// 전역 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('전역 에러:', e.error);
    if (e.error && e.error.message && e.error.message.includes('Kakao')) {
        showStatus('카카오 SDK 오류가 발생했습니다. 페이지를 새로고침해주세요.', 'error');
    }
});

// 디버깅을 위한 상태 확인 함수
function checkSDKStatus() {
    console.log('=== SDK 상태 확인 ===');
    console.log('Kakao 객체:', typeof Kakao !== 'undefined' ? '존재' : '없음');
    console.log('Kakao.init:', typeof Kakao !== 'undefined' && Kakao.init ? '존재' : '없음');
    console.log('Kakao.Auth:', typeof Kakao !== 'undefined' && Kakao.Auth ? '존재' : '없음');
    console.log('Kakao.API:', typeof Kakao !== 'undefined' && Kakao.API ? '존재' : '없음');
    console.log('SDK 초기화됨:', typeof Kakao !== 'undefined' && Kakao.isInitialized ? Kakao.isInitialized() : 'N/A');
    console.log('sdkReady:', sdkReady);
    console.log('kakaoJsKey:', kakaoJsKey ? '설정됨' : '없음');
    console.log('==================');
}

// 카카오 공식 코드 스타일 초기화
function initializeKakaoOfficial() {
    try {
        kakaoJsKey = getKakaoJsKey();
        
        // 키 유효성 검사
        if (kakaoJsKey === 'YOUR_KEY_HERE' || kakaoJsKey === '') {
            throw new Error('유효한 카카오 JavaScript 키가 설정되지 않았습니다.');
        }
        
        // 공식 코드 스타일로 초기화
        Kakao.init(kakaoJsKey);
        
        console.log('✅ 카카오 SDK 공식 스타일 초기화 완료');
        sdkReady = true;
        
        // UI 업데이트
        updateLoginButton(true);
        showStatus('카카오 SDK 초기화 완료!', 'success');
        
        // 기존 로그인 상태 확인
        setTimeout(() => {
            displayToken();
            checkAuthCode(); // URL 파라미터에서 인증 코드 확인
        }, 500);
        
    } catch (error) {
        console.error('❌ 카카오 SDK 초기화 실패:', error);
        sdkReady = false;
        updateLoginButton(false);
        showStatus(`초기화 실패: ${error.message}`, 'error');
    }
}

// 공식 코드의 loginWithKakao 함수
function loginWithKakao() {
    if (!sdkReady) {
        showStatus('카카오 SDK가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.', 'error');
        return;
    }
    
    console.log('🔑 공식 카카오 로그인 시도');
    showStatus('카카오 로그인 창을 여는 중...', 'info', true);
    
    Kakao.Auth.authorize({
        redirectUri: window.location.origin + window.location.pathname, // 현재 페이지를 리다이렉트 URI로 사용
    });
}

// 공식 코드의 displayToken 함수
function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
        Kakao.Auth.setAccessToken(token);
        Kakao.Auth.getStatusInfo()
            .then(function(res) {
                if (res.status === 'connected') {
                    console.log('✅ 기존 로그인 토큰 발견');
                    document.getElementById('token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
                    getUserInfo();
                }
            })
            .catch(function(err) {
                console.log('토큰 검증 실패:', err);
                Kakao.Auth.setAccessToken(null);
            });
    } else {
        console.log('기존 로그인 토큰 없음');
    }
}

// URL 파라미터에서 인증 코드 확인 (리다이렉트 후 처리)
function checkAuthCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        console.log('✅ 인증 코드 발견:', code);
        showStatus('로그인 성공! 사용자 정보를 가져오는 중...', 'success', true);
        
        // 토큰을 쿠키에 저장하고 사용자 정보 가져오기
        setTimeout(() => {
            displayToken();
        }, 500);
        
        // URL에서 코드 파라미터 제거
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// 공식 코드의 getCookie 함수
function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { 
        return parts[1].split(';')[0]; 
    }
    return null;
}