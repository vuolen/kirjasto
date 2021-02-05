FROM cypress/included:6.4.0
ENV NODE_ENV="development"
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

RUN apt-get update && apt-get install -y \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*


COPY . .

ENTRYPOINT []
CMD npm run e2e
