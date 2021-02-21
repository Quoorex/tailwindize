FROM nginx:alpine

ARG FILEPATH=/usr/share/nginx/html/
COPY src/ ${FILEPATH}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]