FROM node:18.3.0

WORKDIR /docker.container

ENV PORT 80

COPY package.json /docker.container/package.json

RUN npm install

COPY . /docker.container

