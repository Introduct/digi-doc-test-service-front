FROM nginx:alpine
ARG BUILT_FILES=./dist
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx-front.conf  /etc/nginx/nginx.conf
COPY config/front.conf  /etc/nginx/conf.d/front.conf
COPY ${BUILT_FILES} /usr/share/nginx/html
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid
EXPOSE 8080
