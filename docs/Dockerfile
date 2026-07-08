# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS builder
COPY docs ./docs
COPY package.json yarn.lock ./
COPY packages ./packages
RUN yarn install --frozen-lockfile --ignore-scripts
WORKDIR /app/docs
RUN yarn build

FROM base AS runner
COPY --from=builder /app/docs /app/docs
WORKDIR /app/docs
EXPOSE 4321
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "4321"]
