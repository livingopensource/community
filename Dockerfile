# ---- Base Node image ----
    FROM node:18-alpine AS base

    WORKDIR /app
    
    # Install system deps for Prisma
    RUN apk add --no-cache openssl
    
    # ---- Dependencies ----
    FROM base AS deps
    
    # Copy package and lock files
    COPY package.json package-lock.json* ./
    
    # Install dependencies
    RUN npm ci
    
    # ---- Prisma Generate ----
    FROM deps AS prisma
    
    # Copy Prisma schema and env file
    COPY prisma ./prisma
    COPY .env .env
    
    # Generate Prisma client using env vars
    RUN npx prisma generate
    
    # ---- Build ----
    FROM base AS build
    
    # Copy files
    COPY --from=deps /app/node_modules ./node_modules
    COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma
    COPY . .
    
    # Make sure env is available at build time (for prerendering, etc.)
    COPY .env .env
    
    RUN npm run build
    
    # ---- Production ----
    FROM base AS production
    
    ENV NODE_ENV=production
    ENV PORT=3000
    
    # Install only prod deps
    COPY package.json package-lock.json* ./
    RUN npm ci --omit=dev
    
    # Copy build + prisma client
    COPY --from=build /app/build ./build
    COPY --from=build /app/.svelte-kit ./.svelte-kit
    COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma
    COPY prisma ./prisma
    COPY .env .env
    
    # Expose port
    EXPOSE 3000
    
    CMD ["node", "build"]
    