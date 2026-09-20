# 김혜미 프로필 관리 운영 안내

## 구조

- React: `/kimhyemi`, `/kimhyemi/admin`
- Express: `/api/kimhyemi/entries` 공개 조회, `/api/kimhyemi/admin/*` 로그인/관리
- SQLite: `DB_PATH`의 로컬 파일. 서버 프로세스만 접근합니다.
- 관리자 1명: 환경 변수의 사용자 이름과 scrypt 비밀번호 해시
- HttpOnly 세션 쿠키, 변경 요청 CSRF 토큰 및 Origin 검사
- 기존 21건은 최초 DB 생성 때 한 번만 이관합니다.

Node 22.13 이상이 필요합니다. 운영 Dockerfile은 Node 24를 사용합니다. Node 22에서는 내장 SQLite 실험 기능 경고가 표시될 수 있습니다.

## 운영 서버 연결

저장소의 `.github/workflows/deploy.yml`은 서버의 `/home/leanit-admin/dc-react`에 있는 외부 Compose 설정으로 `react-home`을 빌드합니다. 해당 파일은 이 저장소에 없으므로 최초 배포 전에 다음 설정을 그 파일에 통합해야 합니다. `compose.example.yml`은 독립 실행 예제입니다. 기존 다른 서비스와 네트워크 설정은 유지하세요.

```yaml
services:
  react-home:
    build:
      context: ./leanit_home
      dockerfile: Dockerfile
    restart: unless-stopped
    env_file:
      - ./leanit_home/.env
    environment:
      NODE_ENV: production
      PORT: 5000
      DB_PATH: /app/data/profile.sqlite
    ports:
      - "127.0.0.1:5000:5000"
    volumes:
      - kimhyemi-data:/app/data

volumes:
  kimhyemi-data:
```

위 포트는 호스트 Nginx를 사용하는 예시입니다. 프록시가 컨테이너이면 같은 Docker 네트워크에서 `react-home:5000`으로 연결하고 호스트 포트는 환경에 맞게 조정합니다. 프런트엔드와 API를 모두 새 Express 서비스에 전달해야 합니다. 기존 컨테이너의 `command`/`entrypoint`가 Vite/Nginx 실행을 강제한다면 제거하고 Dockerfile의 `node server.js`를 사용합니다. `/app` 전체를 예전 소스 볼륨으로 덮어쓰지 마세요.

운영 `.env` 설정:

```dotenv
APP_ORIGIN=https://leanit.kr
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH='생성한_scrypt_해시'
```

`APP_ORIGIN`은 관리자가 실제 접속하는 HTTPS 출처와 정확히 일치해야 합니다(경로·마지막 슬래시 제외). 운영 쿠키에는 Secure가 적용되므로 HTTPS가 필요합니다. 비밀번호 해시는 로컬에서 `npm run admin:password`로 생성해 복사할 수 있습니다. 해시의 `$` 문자를 Compose가 변수로 해석하지 않도록 `.env`에서는 반드시 작은따옴표로 감쌉니다. 비밀번호 평문을 프런트엔드 환경 변수나 Docker 빌드 인수에 넣지 않습니다.

호스트 Nginx의 기존 HTTPS 서버 블록에서 사용하는 예시:

```nginx
location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

기존 `/api/` 전용 location이 있으면 `/api/kimhyemi/`도 이 서비스로 전달되는지 확인하세요. 다른 API 라우팅은 유지합니다. 이 서비스는 프록시 전달 IP를 자동 신뢰하지 않습니다.

서버의 Compose 폴더에서 최초 적용:

```sh
docker compose config --quiet
docker compose up -d --build react-home
docker compose ps react-home
curl --fail https://leanit.kr/api/kimhyemi/entries
```

관리자 로그인 → 비공개 항목 추가 → 공개 페이지에서 숨김 확인 → 공개 전환 → 새로고침 확인 → 서비스 재생성 후 데이터 유지 확인을 수행합니다. 이후 기존 배포 워크플로가 같은 구성을 재사용합니다. 워크플로의 이미지 정리는 DB 볼륨을 지우지 않습니다. `docker compose down -v`는 DB 볼륨을 지우므로 사용하지 않습니다.

## 백업과 복구

실행 중인 WAL DB 파일만 단순 복사하지 말고 `npm run db:backup -- <백업파일>` 명령을 사용합니다. 일관된 SQLite 스냅샷을 생성하며 기존 파일은 덮어쓰지 않습니다.

로컬 예시:

```sh
npm run db:backup -- ./backups/profile-2026-09-20.sqlite
```

Docker에서 백업 파일을 호스트로 가져오는 예시(Compose 폴더에서 실행):

```sh
stamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p ./backups
docker compose exec -T react-home npm run db:backup -- /app/data/backup-$stamp.sqlite
docker compose cp react-home:/app/data/backup-$stamp.sqlite ./backups/profile-$stamp.sqlite
```

위 작업을 서버 스케줄러에서 매일 실행하고, 백업은 별도 저장소에도 보관하세요. 같은 DB 볼륨에만 두면 서버 장애에 대비할 수 없습니다. 백업에는 관리자 세션 데이터가 포함될 수 있으므로 접근 권한을 제한합니다. 보관 기간에 따른 정리 정책도 설정하세요.

복구 시 서비스를 완전히 중지하고 현재 DB 및 `-wal`/`-shm` 파일을 별도 보존합니다. 기존 경로에 백업 파일을 복원하고 예전 WAL/SHM 파일은 활성 경로에서 제거한 뒤 컨테이너 사용자가 읽고 쓸 수 있도록 소유권을 맞춥니다. 복구된 DB의 `profile_sessions` 행을 삭제하여 이전 세션을 무효화한 후 서비스를 시작합니다. 운영 적용 전 임시 DB로 복구를 연습하세요.

## 검증 명령

```sh
npm run test:profile
npm run build
npx tsc -p tsconfig.app.json --noEmit
```

참고: [Node SQLite API](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html), [Docker 영속 볼륨](https://docs.docker.com/engine/storage/volumes/)
