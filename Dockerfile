FROM node:16-alpine

# [Required] MongoDB URL
ENV MONGO_URL="${MONGO_URL}"

ENV JWT_SECRET="${JWT_SECRET}"

ENV PORT=3000

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package.json /usr/src/api
RUN npm install
COPY . /usr/src/api
EXPOSE ${PORT}

CMD ["node", "."]