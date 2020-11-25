FROM node:latest
WORKDIR /usr/src/kirjasto

COPY . .

RUN npm install
