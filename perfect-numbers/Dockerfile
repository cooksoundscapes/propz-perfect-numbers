FROM node:lts-alpine AS web-build
WORKDIR /web

COPY perfect-numbers-web ./

RUN npm install
RUN npm run build

#-------------------------

FROM gradle:8.0-jdk17 AS backend-build
WORKDIR /app
COPY perfect-numbers/build.gradle perfect-numbers/settings.gradle ./
COPY perfect-numbers/src ./src
COPY --from=web-build /web/dist /app/src/main/resources/static

RUN gradle build --no-daemon

#----------------------------

FROM openjdk:17-jdk-alpine
WORKDIR /app

COPY --from=backend-build /app/build/libs/perfect-numbers-0.0.1-SNAPSHOT.jar /app/perfect_numbers.jar

ENTRYPOINT ["java", "-jar", "/app/perfect_numbers.jar"]


