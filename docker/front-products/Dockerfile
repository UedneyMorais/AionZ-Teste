# --- ESTÁGIO DE BUILD ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json e instala dependências
# É crucial para o `npm install` no estágio de build
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Faz o build da aplicação Angular.
# O script 'build' no package.json já está configurado corretamente.
RUN npm run build

# --- ESTÁGIO DE SERVIÇO (PRODUÇÃO) ---
FROM node:20-alpine

WORKDIR /app

# Copia APENAS os arquivos de build gerados para o navegador e servidor
# Eles estão em subpastas dentro de dist/front-products
COPY --from=builder /app/dist/front-products/browser /app/browser
COPY --from=builder /app/dist/front-products/server /app/server

# Copia o package.json original para o estágio final
# O servidor Node.js do Angular Universal usará ESTE package.json para resolver suas dependências
# (como express, etc.)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json 

# Instala SOMENTE as dependências de produção necessárias para o servidor Node.js
# Isso garante que apenas o que é essencial para rodar o 'server.mjs' seja instalado.
RUN npm install --only=production

# Expõe a porta que o servidor Angular Universal escuta (geralmente 4000)
EXPOSE 4000

# Variável de ambiente para o SSR (lado do servidor) apontar para o backend Docker
ENV API_INTERNAL_URL=http://api_products_backend:3000

# Comando para iniciar o servidor Angular Universal
# O ponto de entrada principal do servidor é o 'server.mjs' dentro da pasta 'server'
CMD ["node", "server/server.mjs"]