# syntax=docker/dockerfile:1

ARG REMOTE_PACKAGE
ARG REMOTE_PORT=3001

FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS builder
ARG REMOTE_PACKAGE
COPY package.json yarn.lock turbo.json ./
COPY packages ./packages
COPY remotes ./remotes
COPY src ./src
COPY postcss.config.mjs ./
COPY tsconfig.json ./
RUN yarn install --frozen-lockfile
RUN yarn workspace ${REMOTE_PACKAGE} build

FROM base AS runner
ARG REMOTE_PACKAGE
ARG REMOTE_PORT
ENV REMOTE_PACKAGE=${REMOTE_PACKAGE}
ENV REMOTE_PORT=${REMOTE_PORT}

COPY --from=builder /app /app
WORKDIR /app
EXPOSE ${REMOTE_PORT}

CMD sh -c "yarn workspace $REMOTE_PACKAGE preview --host 0.0.0.0 --port $REMOTE_PORT"
