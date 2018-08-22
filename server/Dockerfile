FROM node:6.9.2
COPY package*.json ./
RUN npm install
EXPOSE 8080
COPY server.js .
CMD node server.js
