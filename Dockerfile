FROM node:18.3.0 as base

WORKDIR /docker.container

ENV PORT 80

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build