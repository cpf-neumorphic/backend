FROM node:12.2.0-alpine

RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server

COPY package.json /srv/app/server
COPY package-lock.json /srv/app/server

RUN npm install

COPY . /srv/app/server

RUN npm install -g pm2
CMD ["pm2-runtime","ecosystem.config.js"]

