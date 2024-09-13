FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm install -g @angular/cli

EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80"]
