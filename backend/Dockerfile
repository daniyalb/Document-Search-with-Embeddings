FROM node:25-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]