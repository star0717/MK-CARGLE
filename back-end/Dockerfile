# Step 1
## node:16.13.2 이미지를 이용해서 빌드환경 구축
FROM node:16.13.2 AS build-env
## back-end 소스 위치
WORKDIR /app
## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
COPY . .
## Nest.js project를 build 한다
RUN npm install
RUN npm run build

# Step 2
## node:16.13.2-alpine 이미지를 이용해서 배포환경 구축
FROM node:16.13.2-alpine AS production-env
## back-end 소스 위치
WORKDIR /app
## Step 1의 builder에서 build된 프로젝트를 가져온다
COPY --from=build-env /app ./
## application 실행
CMD ["npm", "run", "start:prod"]