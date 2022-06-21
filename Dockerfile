# Base image
FROM node:16-alpine

ENV MONGO_URL "mongodb://mongodb:27017"

# Create app directory
WORKDIR /home/app

COPY . /home/app 

# Install app dependencies
RUN yarn

# Creates a "dist" folder with the production build
RUN yarn build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
