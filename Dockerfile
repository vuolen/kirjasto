FROM node:lts-alpine
WORKDIR /usr/src/kirjasto

RUN apk update && apk add netcat-openbsd

COPY . .

RUN npm install

ENTRYPOINT npm test
