# syntax = docker/dockerfile:1.2

FROM oven/bun:1.3.4 as base
WORKDIR /usr/src/app

ENV NODE_ENV="production"
ENV PATH="/root/.bun/bin:$PATH"

RUN apt-get update \
  && apt-get install -y curl unzip bash ca-certificates

COPY . .
RUN bun install
CMD bun src/index.ts
