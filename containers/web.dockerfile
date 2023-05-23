FROM node:16.15.1-slim as base

WORKDIR /usr/authoring

COPY ./config/package.json ./config/package.json
COPY ./plugins/postcss-prefixer/package.json ./plugins/postcss-prefixer/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/templates/core/package.json ./packages/templates/core/package.json
COPY ./packages/templates/block-text/package.json ./packages/templates/block-text/package.json
COPY ./packages/templates/lesson-intro/package.json ./packages/templates/lesson-intro/package.json
COPY ./packages/templates/simple-text/package.json ./packages/templates/simple-text/package.json
COPY ./packages/templates/simple-video/package.json ./packages/templates/simple-video/package.json
COPY ./packages/templates/two-column/package.json ./packages/templates/two-column/package.json
COPY ./packages/player/package.json ./packages/player/package.json
COPY ./packages/runtime/package.json ./packages/runtime/package.json
COPY ./packages/editor/package.json ./packages/editor/package.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./config ./config
COPY ./plugins/postcss-prefixer ./plugins/postcss-prefixer
COPY ./packages/ui ./packages/ui
COPY ./packages/templates/core ./packages/templates/core
COPY ./packages/templates/block-text ./packages/templates/block-text
COPY ./packages/templates/lesson-intro ./packages/templates/lesson-intro
COPY ./packages/templates/simple-text ./packages/templates/simple-text
COPY ./packages/templates/simple-video ./packages/templates/simple-video
COPY ./packages/templates/two-column ./packages/templates/two-column
COPY ./packages/player ./packages/player
COPY ./packages/runtime ./packages/runtime

RUN yarn install

COPY ./packages/editor ./packages/editor
COPY ./dev.env ./packages/editor/.env

CMD ["yarn", "start:web"]