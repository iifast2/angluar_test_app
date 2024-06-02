FROM node:17 as build
LABEL Maintainer="mohamed Amine"
WORKDIR /home/front
COPY . .
#install dependencies
RUN npm install
#run vue js in production
RUN npm run build

FROM nginx
COPY --from=build /home/front/dist/social-maedi-backoffice /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
