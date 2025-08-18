#!/bin/bash

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 로그 디렉토리 및 파일 설정
LOG_DIR="./logs"
LOG_FILE="${LOG_DIR}/service-$(date +%Y%m%d_%H%M%S).log"
ERROR_LOG_FILE="${LOG_DIR}/error-$(date +%Y%m%d_%H%M%S).log"

# 로그 디렉토리 생성
mkdir -p $LOG_DIR

# 로그 함수 정의
log() {
    local message="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
    echo -e "$message"
    echo "$message" >> "$LOG_FILE"
}

error_log() {
    local message="[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1"
    echo -e "${RED}$message${NC}"
    echo "$message" >> "$ERROR_LOG_FILE"
}

log "서비스 시작 스크립트 실행중..."

# 기존 프로세스 확인 및 종료
PID=$(lsof -t -i:8080)
if [ ! -z "$PID" ]; then
    log "포트 8080에서 실행 중인 프로세스 발견: ${PID}"
    log "프로세스 종료 시도..."
    
    # 프로세스 종료
    kill -15 $PID
    
    # 종료 대기 (최대 10초)
    WAIT_TIME=0
    while [ $WAIT_TIME -lt 10 ]; do
        if ! lsof -t -i:8080 > /dev/null; then
            log "프로세스가 성공적으로 종료되었습니다."
            break
        fi
        sleep 1
        WAIT_TIME=$((WAIT_TIME + 1))
    done
    
    # 10초 후에도 프로세스가 살아있다면 강제 종료
    if [ $WAIT_TIME -eq 10 ]; then
        error_log "프로세스가 응답하지 않습니다. 강제 종료를 시도합니다..."
        kill -9 $PID
        sleep 2
    fi
fi

# 포트가 비어있는지 최종 확인
if lsof -t -i:8080 > /dev/null; then
    error_log "오류: 포트 8080를 사용하는 프로세스를 종료할 수 없습니다."
    exit 1
fi

log "포트 8080 사용 가능, 서비스 시작 준비..."


# Install tailwindcss if not already installed
if ! npm list tailwindcss > /dev/null 2>&1; then
    log "tailwindcss가 설치되어 있지 않습니다. 설치를 시작합니다..."
    if npm install tailwindcss >> "$LOG_FILE" 2>> "$ERROR_LOG_FILE"; then
        log "tailwindcss 설치 완료"
    else
        error_log "tailwindcss 설치 실패"
        exit 1
    fi
else
    log "tailwindcss가 이미 설치되어 있습니다."
fi

# 프로덕션 빌드 실행
log "프로덕션 빌드 시작..."
if npm run build >> "$LOG_FILE" 2>> "$ERROR_LOG_FILE"; then
    log "빌드 완료"
else
    error_log "빌드 실패"
    exit 1
fi

# 서비스 시작
log "서비스 시작 중..."
npm run start >> "$LOG_FILE" 2>> "$ERROR_LOG_FILE" &

# 서비스 시작 확인
sleep 5
if lsof -t -i:8080 > /dev/null; then
    log "서비스가 성공적으로 시작되었습니다."
    log "포트: 8080"
    log "로그 파일 위치:"
    log "  - 서비스 로그: $LOG_FILE"
    log "  - 에러 로그: $ERROR_LOG_FILE"
else
    error_log "서비스 시작 실패"
    exit 1
fi

# 프로세스 ID 저장
PID=$(lsof -t -i:8080)
echo $PID > "${LOG_DIR}/service.pid"
log "서비스 PID: $PID (${LOG_DIR}/service.pid에 저장됨)" 