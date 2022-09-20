FROM node:16.14.0

COPY ["package.json","package-lock.json", "/usr/src/app/"]

WORKDIR /usr/src/app

RUN npm install

COPY [".", "/usr/src/app"]

EXPOSE 4000

CMD ["npm", "run", "start:d:all"]
