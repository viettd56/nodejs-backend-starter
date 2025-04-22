FROM node:20-alpine AS base
WORKDIR /app

FROM base AS build-code
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn install
ADD . /app
RUN yarn build

FROM base
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn install --production
COPY --from=build-code /app/dist/ /app/src