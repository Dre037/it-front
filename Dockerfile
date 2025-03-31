FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/it-front /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
