FROM node:5-slim

COPY . /src

RUN mkdir data

CMD ["node", "/src/scrap.js"]
