FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

RUN pnpm config set fetch-retries 5 \
    && pnpm config set fetch-retry-mintimeout 20000 \
    && pnpm config set fetch-retry-maxtimeout 120000 \
    && (pnpm install --frozen-lockfile || pnpm install)

COPY . .

EXPOSE 3000

CMD ["node", "--import", "tsx/esm", "src/server.ts"]