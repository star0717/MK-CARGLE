# Install dependencies only when needed
FROM node:16.13.2-alpine AS be-deps
WORKDIR /app
COPY package*.json ./ 
RUN npm i --legacy-peer-deps

# Rebuild the source code only when needed
FROM node:16.13.2-alpine AS be-builder
WORKDIR /app
COPY --from=be-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:16.13.2-alpine AS be-runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=be-builder --chown=nestjs:nodejs /app ./
USER nestjs

CMD ["npm", "run", "start:prod"]