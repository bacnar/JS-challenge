FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="file:./dev.db"

RUN npx prisma migrate reset --force

EXPOSE 8080

CMD [ "node", "index.js" ]