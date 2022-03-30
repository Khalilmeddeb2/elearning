# choose base image to build off of
FROM  node:12.22.8
# set the current working directory for all commands

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install -g @angular/cli@9.0.0

COPY . /usr/src/app/

RUN npm run build

