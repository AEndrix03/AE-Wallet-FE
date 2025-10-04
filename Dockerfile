# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia .npmrc per l'autenticazione Verdaccio
COPY .npmrc ./

# Copia TUTTI i file di configurazione npm
COPY package.json package-lock.json ./

# Installa dipendenze usando npm ci (più affidabile)
# --legacy-peer-deps per ignorare conflitti peer deps
# Senza --production per includere devDependencies
RUN npm ci --legacy-peer-deps

# Verifica installazione
RUN ls -la node_modules/@angular-devkit/ && \
    npx nx --version

# Copia il codice sorgente
COPY . .

# Build per produzione
RUN npx nx build wallet-fe --configuration=production

# Stage 2: Production
FROM nginx:alpine

# Copia configurazione nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia i file buildati
COPY --from=build /app/dist/wallet-fe/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]