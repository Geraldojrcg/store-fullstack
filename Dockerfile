FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

COPY .env ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .