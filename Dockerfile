FROM node

WORKDIR /etc/app

RUN npm i -g yarn

COPY yarn.lock package.json ./

RUN yarn
COPY . . 
RUN yarn test-lint
RUN yarn test-formatting
RUN yarn build