FROM node:14-alpine 
WORKDIR /app
RUN apk add curl
RUN npm install serve -g

COPY ./build /app/build

HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["serve", "build", "-s", "-l", "3000"]