FROM oven/bun:1 AS builder

COPY . /app
WORKDIR /app

RUN bun install --frozen-lockfile
RUN bun run build

FROM node:22-alpine AS release
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json

ENTRYPOINT ["node", "build/index.js"]
