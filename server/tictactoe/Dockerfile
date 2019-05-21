FROM node:6.14.2

EXPOSE 8080

COPY backend/ .
COPY package.json .
COPY test.js .
RUN npm install

CMD ["node", "entrypoint.js"]