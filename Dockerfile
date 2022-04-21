# Step.1 
# npm 패키지 빌드용 환경
FROM node:16.13.2-alpine AS deps

## back-end용 npm 패키지 빌드
WORKDIR /back-end
COPY ./back-end/package*.json ./
RUN npm i --legacy-peer-deps

## front-end용 npm 패키지 빌드
WORKDIR /front-end
COPY ./front-end/package*.json ./ 
RUN npm i --legacy-peer-deps

# Step.2 
#소스 빌드용 환경
FROM node:16.13.2-alpine AS builder

## **** 소스를 복사할 때 소스만 복사되는지 여부 확인 필요. 각 모듈의 dockerignore가 적용되는지 확인 필요
## back-end 소스 빌드
WORKDIR /back-end
COPY --from=deps /back-end/node_modules ./node_modules
## 소스코드 외의 것이 복사되는지 확인 필요.
COPY ./back-end .
RUN npm run build

## front-end 소스 빌드
WORKDIR /front-end
COPY --from=deps /front-end/node_modules ./node_modules
COPY ./front-end .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Step.3 
# 필요한 구성만으로 도커 이미지 생성
FROM node:16.13.2-alpine AS runner

# 알래에서 끌어 올림
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 n2server

## back-end 구성
WORKDIR /back-end
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 n2server

# !!! 전체 복사하지 말자.확인 필요
COPY --from=builder --chown=n2server:nodejs /back-end ./
# COPY --from=builder --chown=n2server:nodejs /back-end/dist ./dist

WORKDIR /front-end
ENV NODE_ENV production
ENV DESTINATION_API http://18.136.126.186
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /front-end/next.config.js ./
COPY --from=builder /front-end/public ./public
COPY --from=builder /front-end/package.json ./package.json
COPY --from=builder --chown=n2server:nodejs /front-end/.next/standalone ./
COPY --from=builder --chown=n2server:nodejs /front-end/.next/static ./.next/static

# Nginx 설치 및 설정
# USER root
RUN apk add nginx curl
COPY ./proxy-server/default.conf /etc/nginx/http.d/default.conf
EXPOSE 80

WORKDIR /
# USER n2server
COPY --chown=n2server:nodejs n2server.sh .
RUN chmod 700 n2server.sh
RUN echo hello
CMD ["./n2server.sh"]