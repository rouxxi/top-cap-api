FROM node:23.11.1-alpine3.22

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm","start"]
