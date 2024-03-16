FROM node:17-alpine3.15
LABEL authors="tuan"

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
#docker run -i --entrypoint /bin/sh -p 3000:3000 --network db-nework --name frContainer front-end

