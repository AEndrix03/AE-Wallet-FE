# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia i file di dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm ci --silent

# Copia il resto del codice
COPY . .

# Build con Nx per produzione
RUN npx nx build wallet-fe --configuration=production

# Stage 2: Production
FROM nginx:alpine

# Copia la configurazione nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia i file buildati
COPY --from=build /app/dist/wallet-fe/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]