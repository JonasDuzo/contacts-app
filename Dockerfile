# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY . .

RUN apk add --no-cache curl

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

ENV NODE_ENV=production

CMD ["npm", "start"]