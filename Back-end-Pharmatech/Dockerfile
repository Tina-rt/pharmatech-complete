FROM node:20.18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .
ENV APP_PORT=3003
ENV HOST=0.0.0.0
EXPOSE 3003


CMD ["sh", "-c", "npx sequelize db:migrate && node seeders.js && node server.js"]


