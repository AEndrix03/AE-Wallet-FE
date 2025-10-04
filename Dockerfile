# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia solo i file necessari per l'installazione delle dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm ci --silent

# Copia il resto del codice
COPY . .

# Build dell'applicazione per produzione
RUN npx nx build wallet-fe --configuration=production

# Stage 2: Production
FROM nginx:alpine

# Copia la configurazione nginx personalizzata
COPY nginx.conf /etc/nginx/nginx.conf

# Copia i file buildati dalla stage precedente
COPY --from=builder /app/dist/wallet-fe/browser /usr/share/nginx/html

# Esponi la porta 80
EXPOSE 80

# Avvia nginx
CMD ["nginx", "-g", "daemon off;"]