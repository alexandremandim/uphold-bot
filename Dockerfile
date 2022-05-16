FROM node:16
WORKDIR /upholdbot
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "src/main.js" ]