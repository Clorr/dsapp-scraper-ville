FROM node:5-slim

COPY . /src
CMD ["node", "/src/scrap.js"]
