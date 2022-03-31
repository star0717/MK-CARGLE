# Install dependencies only when needed
FROM node:16.13.2-alpine AS fe-deps
WORKDIR /app
COPY package*.json ./ 
RUN npm ci

# Rebuild the source code only when needed
FROM node:16.13.2-alpine AS fe-builder
WORKDIR /app
COPY --from=fe-deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM node:16.13.2-alpine AS fe-runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=fe-builder /app/next.config.js ./
COPY --from=fe-builder /app/public ./public
COPY --from=fe-builder /app/package.json ./package.json
COPY --from=fe-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=fe-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
# CMD ["npm", "run", "start"]
RUN ls
CMD ["node", "server.js"]
