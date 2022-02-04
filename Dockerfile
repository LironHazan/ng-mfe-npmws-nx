FROM node:16.10.0-alpine AS build

WORKDIR /build_frontends
COPY ../. .

RUN npm i -g nx@13.2
RUN npm i
RUN npm i --ws

RUN nx run-many --target=build --all

#FROM nginx:latest
#
#COPY --from=build /build_frontends/dist/packages/shell /usr/share/nginx/html
#
#EXPOSE 80
