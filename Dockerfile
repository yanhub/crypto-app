FROM node:20-alpine

RUN apk add --no-cache libc6-compat bash

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /home/node/app/

USER node

EXPOSE 3000

CMD ["pnpm", "dev"]