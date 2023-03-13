FROM node:18-alpine as BUILD
RUN mkdir -p /opt/app

WORKDIR /opt/app/client
COPY ../client/package.json ../client/package-lock.json ./
RUN npm install
COPY ../client/ /opt/app/client/
RUN npm run build

WORKDIR /opt/app/auth
COPY ../auth/package.json ../auth/package-lock.json ./
RUN npm install
COPY ../auth/ /opt/app/auth/
RUN npm run build

FROM --platform=linux/amd64 node:18-alpine as SERVE

COPY --from=BUILD /opt/app/auth/dist /opt/app/dist
COPY --from=BUILD /opt/app/auth/package.json /opt/app/package.json
COPY --from=BUILD /opt/app/auth/package-lock.json /opt/app/package-lock.json
COPY --from=BUILD /opt/app/auth/node_modules /opt/app/node_modules

WORKDIR /opt/app/dist

EXPOSE 5050
CMD [ "nodejs", "--require", "dotenv/config", "app.js"]