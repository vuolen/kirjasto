FROM node:latest
WORKDIR /usr/src/app
ENV NODE_ENV="development"
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
CMD npm run wait test
