FROM node:20 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:20
WORKDIR /app
RUN mkdir /app/node_modules
COPY --from=build /app/build/ /app
COPY --from=build /app/node_modules/ /app/node_modules
COPY --from=build /app/package* /app
COPY --from=build /app/.env /app/.env
CMD ["node", "--env-file=.env", "index.js"]
