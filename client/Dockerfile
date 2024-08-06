FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM ubuntu:latest

RUN apt-get update && apt-get install -y apache2 && apt-get clean && apt-get autoremove

COPY --from=build /app/dist/ /var/www/html/

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]
