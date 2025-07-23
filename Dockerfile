FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm


FROM base AS build-code
ADD package.json /app/
ADD pnpm-lock.yaml /app/
RUN pnpm install
ADD . /app
RUN pnpm build

FROM base
ENV PNPM_PRODUCTION=true
RUN apk add curl
ADD package.json /app/
ADD pnpm-lock.yaml /app/
RUN pnpm install
ADD tsconfig.json /app/
COPY --from=build-code /app/dist/ /app/src