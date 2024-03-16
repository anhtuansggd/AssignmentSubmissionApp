FROM node:17-alpine3.15
LABEL authors="tuan"

ENTRYPOINT ["top", "-b"]

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build


#docker run -i --entrypoint /bin/sh -p 3000:3000 2ec

