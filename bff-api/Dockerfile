FROM node:10.16-alpine

EXPOSE 5000

WORKDIR /app

ENV NODE_ENV production

CMD ["node", "src/index.js"]

ADD package.json /app/ 

ADD src/ /app/src/

RUN yarn install