FROM node:14.4.0-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN npm install

COPY ./ /app

RUN npm run build
