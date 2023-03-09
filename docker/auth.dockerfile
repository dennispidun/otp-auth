FROM --platform=linux/amd64 node:16.15-alpine3.14
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

EXPOSE 5050
CMD [ "npm", "run", "start:withoutBuild"]