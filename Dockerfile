FROM node:12-stretch as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx-front.conf  /etc/nginx/nginx.conf
COPY config/front.conf  /etc/nginx/conf.d/front.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY config/cert.crt /etc/nginx/pki/cert.crt
COPY config/cert.key /etc/nginx/pki/cert.key
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid
EXPOSE 8080

