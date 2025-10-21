### Backend multi-stage Dockerfile - build with Maven then run jar
FROM maven:3.9.4-eclipse-temurin-21 as builder
WORKDIR /workspace
COPY pom.xml ./
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /workspace/target/smartlearn-backend-0.1.0.jar /app/smartlearn-backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/smartlearn-backend.jar"]
