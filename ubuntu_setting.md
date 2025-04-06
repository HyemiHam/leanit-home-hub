## IP 고정 Start■■■■■

1) ifconfig로 ip 확인 후
현재 ip와 실행 시 좌측 상단의 이더넷명 확인
ex) 
이더넷명 : ens33 
IP : 192.168.0.74

2) ls로 어떤 파일이 있는지 확인하고 해당 파일을 수정하자
sudo vi /etc/netplan/50-cloud-init.yaml

network:
  ethernets:
    ens33:
      dhcp4: no
      addresses:
      - 192.168.0.102/24  # 원하는 고정 IP 주소
      routes:
      - to: default
        via: 192.168.0.1  # 기본 게이트웨이 (공유기 주소)
      nameservers:
        addresses:
        - 168.126.63.1
        - 168.126.63.2
  version: 2

3) 변경된 네트워크 정보를 반영하자
sudo netplan apply

4) 수정된 네트워크 정보를 다시 확인
ifconfig

단, 현재대로라면 재부팅시 다시 초기화 된다.
cloud-init이 netplan을 덮어쓰는 경우 (Ubuntu Server)
5) sudo touch /etc/cloud/cloud-init.disabled

## IP 고정 End■■■■■

## 리눅스 서버 셋팅(React) Start■■■■■

1) Node.js & npm 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

설치확인
node -v
npm -v

2) 소스 파일 받기
git pull을 통해 원하는 경로에 pull

3) 소스 루트 경로에서 실행
npm install
npm run dev

상대경로 이미지 수정
index.html

상대경로 이미지 수정 참조
https://rick-ford.tistory.com/entry/%EC%83%81%EB%8C%80%EA%B2%BD%EB%A1%9C-ogimage%EB%8A%94-%EC%99%B8%EC%95%8A%EB%90%98

## 리눅스 서버 셋팅(React) End■■■■■

## SSL 설정

--인증서 발급
sudo certbot --nginx -d leanit.kr

--인증서 자동 갱신 설정
sudo certbot renew --dry-run

nginx

#default 파일 설정 변경
sudo nano /etc/nginx/sites-available/default

sudo nginx -t  # 설정 확인
sudo systemctl reload nginx  # 적용


## 서버에서 빌드된 파일 복사

기존 파일 삭제
sudo rm -rf /var/www/html/*

하위 파일 및 폴더 전체를 다른 경로로 복사
sudo cp -r /home/leanit/leanit_web/dist/* /var/www/html/

## leanit 계정에 /var/www/html/ 경로에 권한부여
sudo chown -R leanit:leanit /var/www/html

## 로컬에서 빌드된 파일을 리눅스 서버에 배포
PS D:\Work\LeanIT\_ReactHome> scp -r dist/* leanit@192.168.0.102:/var/www/html/


## node.js 실행을 위한 pm2 설치 및 설정

npm install -g pm2 # 설치
pm2 start server.js --name my-node-app    # 1. 앱 실행
pm2 save                                  # 2. 현재 실행 상태 저장
pm2 startup                               # 3. 자동 시작 설정 (출력된 명령 복사해서 실행)

pm2 list # 수행중인 프로세스 확인