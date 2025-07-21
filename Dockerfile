FROM node:20 as base
WORKDIR /app
COPY package.json .
COPY  package-lock.json* 

# Development stage
FROM base as dev
RUN npm install
COPY . .
EXPOSE 4000



# production stage
FROM base as prod
RUN npm install --only=production
COPY . .
EXPOSE 4000



