FROM node:16.13.2-alpine AS deps
WORKDIR /back-end
COPY ./back-end/package*.json ./
RUN npm i --legacy-peer-deps

WORKDIR /front-end
COPY ./front-end/package*.json ./ 
RUN npm i --legacy-peer-deps

FROM node:16.13.2-alpine AS builder
WORKDIR /back-end
COPY --from=deps /back-end/node_modules ./node_modules
COPY ./back-end .
RUN npm run build

WORKDIR /front-end
COPY --from=deps /front-end/node_modules ./node_modules
COPY ./front-end .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:16.13.2-alpine AS runner
WORKDIR /back-end
RUN mkdir -p /back-end/storage
RUN mkdir -p /back-end/storage/crn
RUN mkdir -p /back-end/storage/mrn
RUN mkdir -p /back-end/storage/stamp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 n2server

COPY --from=builder --chown=n2server:nodejs /back-end ./

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
# Remove any existing config files
# RUN rm /etc/nginx/conf.d/*
# Copy config files
# *.conf files in conf.d/ dir get included in main config
# COPY ./proxy-server/default.conf /etc/nginx/conf.d/
COPY ./proxy-server/default.conf /etc/nginx/http.d/default.conf
EXPOSE 80

# Expose the listening port
# RUN cat /etc/nginx/conf.d/default.conf
# WORKDIR /usr/bin/
# CMD [ "nginx", "-s", "reload" ]


# Launch NGINX
# CMD [ "nginx", "-g", "daemon off;" ]

# RUN cd /front-end
# RUN node server.js &
# CMD ["node", "server.js"]

# RUN cd /back-end
# RUN npm run start:prod &
# CMD ["npm", "run", "start:prod"]

WORKDIR /
# USER n2server
COPY --chown=n2server:nodejs n2server.sh .
RUN chmod 700 n2server.sh
# CMD [ "nginx", "-g", "daemon off;" ]
CMD ["./n2server.sh"]