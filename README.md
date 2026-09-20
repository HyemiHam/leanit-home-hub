# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a7309b5d-528f-4851-b65b-b3232c4283e5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a7309b5d-528f-4851-b65b-b3232c4283e5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a7309b5d-528f-4851-b65b-b3232c4283e5) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## 로컬에서 웹사이트 실행하기

Node.js **20 LTS 이상**과 npm이 필요합니다. 설치 후 터미널을 새로 열어 `node -v`와 `npm -v`가 표시되는지 확인하세요.

### Windows

1. [Node.js LTS](https://nodejs.org/)를 설치합니다.
2. PowerShell 또는 명령 프롬프트에서 프로젝트 폴더로 이동합니다.
3. 아래 명령을 실행합니다.

```powershell
npm install
npm run dev
```

### macOS

1. [Node.js LTS](https://nodejs.org/)를 설치합니다. Homebrew를 사용한다면 `brew install node`로도 설치할 수 있습니다.
2. Terminal에서 프로젝트 폴더로 이동합니다.
3. 아래 명령을 실행합니다.

```bash
npm install
npm run dev
```

두 환경 모두 실행이 완료되면 브라우저에서 [http://localhost:8080](http://localhost:8080)을 엽니다. 종료하려면 실행 중인 터미널에서 `Ctrl + C`를 누릅니다.

김혜미 프로필 페이지는 [http://localhost:8080/kimhyemi](http://localhost:8080/kimhyemi)에서 확인할 수 있습니다.

### 문의 메일 기능까지 실행하려면

프런트엔드와 메일 API를 함께 실행하려면 다음 명령을 사용합니다.

```bash
npm run start
```

이 경우 `.env` 파일에 `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN` 및 `VITE_SEND_MAIL_URL`을 설정해야 합니다. 비밀 값은 저장소에 커밋하지 마세요. API 서버는 기본적으로 `http://localhost:5000`에서 실행됩니다.
