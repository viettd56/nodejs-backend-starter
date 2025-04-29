FROM node:alpine AS base
WORKDIR /app

FROM base AS build-code
RUN npm i -g @nestjs/cli
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn install
ADD . /app
RUN yarn build

FROM base
RUN apk add tmux
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn install --production
COPY --from=build-code /app/dist/ /app/src