FROM node:16.15.1-slim as base

WORKDIR /authoring

FROM base as dependencies

COPY config/ config/
COPY plugins/ plugins/
COPY packages/ packages/
COPY package.json .
COPY yarn.lock .
COPY lerna.json .

RUN yarn install

CMD ["yarn", "start:web"]