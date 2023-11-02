FROM node:18-alpine
LABEL authors="andrey_sudarev"

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
