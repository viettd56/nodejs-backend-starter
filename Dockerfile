FROM node:10.15.0-alpine AS base
WORKDIR /app
RUN apk update && apk add --virtual build-dependencies build-base gcc wget bash python

FROM base AS build-code
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app
RUN yarn build

FROM base AS build-node-modules
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn install --production --pure-lockfile

FROM node:10.15.0-alpine

WORKDIR /app
RUN npm install -g pm2 apollo
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 1M
RUN pm2 set pm2-logrotate:compress true
RUN pm2 set pm2-logrotate:workerInterval 600

COPY --from=build-node-modules /app .
COPY --from=build-code /app/dist/ /app/src

ADD package.json /app/
ADD locales /app/locales
ADD ecosystem.config.js /app/

CMD ["pm2-runtime", "start", "/app/ecosystem.config.js"]