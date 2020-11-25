FROM node:lts-alpine
WORKDIR /usr/src/kirjasto

RUN apk update && apk add netcat-openbsd

COPY . .

RUN npm install

ENTRYPOINT ./wait-for.sh ${FRONTEND_URL} -t 9999 -- npm test
