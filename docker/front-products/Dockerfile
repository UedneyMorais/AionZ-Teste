FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/front-products/browser /app/browser
COPY --from=builder /app/dist/front-products/server /app/server

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json 

RUN npm install --only=production

EXPOSE 4000

ENV API_INTERNAL_URL=http://api_products_backend:3000

CMD ["node", "server/server.mjs"]