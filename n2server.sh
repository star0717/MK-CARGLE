# 도커 이미지가 실행될 때 수행되는 명령어들
cd /back-end/
npm run start:prod &
cd /front-end/
node server.js &
cd /
nginx -g 'daemon off;'
