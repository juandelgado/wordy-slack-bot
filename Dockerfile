FROM node:6.9-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY src/*.js /usr/src/app/
COPY config.json /usr/src/app/

CMD [ "node", "index.js" ]
