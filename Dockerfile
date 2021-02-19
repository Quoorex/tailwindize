FROM node:alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run-script build

FROM nginx:alpine

COPY --from=builder /app/build/ /usr/share/nginx/html/

VOLUME [ "/etc/nginx/nginx.conf" ]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]