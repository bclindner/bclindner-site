# coded using boron LTS, so we'll stick with that
FROM node:boron-alpine

# set our work dir
WORKDIR /app
ADD . /app

# remove all node_modules, in case this is being test-deployed w/ node modules already added
RUN rm -rf node_modules

# install and run yarn to install our packages
# RUN npm install -g yarn
RUN yarn && \
    yarn global add nodemon && \
    yarn cache clean

EXPOSE 8000

# on launch, start the app using `yarn`:
CMD ["yarn", "start"]
