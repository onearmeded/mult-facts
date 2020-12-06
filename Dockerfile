FROM node:12 AS build
WORKDIR /app
COPY package* yarn.lock ./
RUN yarn install
COPY public ./public
COPY src ./src

FROM build AS dev
RUN yarn add react-scripts
EXPOSE 3000
CMD ["yarn", "start"]

FROM build AS publish
RUN yarn run build

FROM nginx:alpine
COPY --from=publish /app/build /usr/share/nginx/html