FROM node:lts-alpine3.14
COPY package.json .
RUN npm install
COPY . .
RUN apk add curl
CMD [ "node", "index.js" ]