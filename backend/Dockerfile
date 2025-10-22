### Backend multi-stage Dockerfile - build with Maven then run jar
FROM maven:3.9.4-eclipse-temurin-21 as builder
WORKDIR /workspace

# ⚡ 配置 Maven 使用国内镜像源（解决网络连接问题）
RUN mkdir -p /root/.m2 && \
    echo '<?xml version="1.0" encoding="UTF-8"?>' > /root/.m2/settings.xml && \
    echo '<settings>' >> /root/.m2/settings.xml && \
    echo '  <mirrors>' >> /root/.m2/settings.xml && \
    echo '    <mirror>' >> /root/.m2/settings.xml && \
    echo '      <id>aliyun-central</id>' >> /root/.m2/settings.xml && \
    echo '      <name>Aliyun Central</name>' >> /root/.m2/settings.xml && \
    echo '      <url>https://maven.aliyun.com/repository/central</url>' >> /root/.m2/settings.xml && \
    echo '      <mirrorOf>central</mirrorOf>' >> /root/.m2/settings.xml && \
    echo '    </mirror>' >> /root/.m2/settings.xml && \
    echo '  </mirrors>' >> /root/.m2/settings.xml && \
    echo '</settings>' >> /root/.m2/settings.xml

# ⚡ 优化：先复制 pom.xml，预下载依赖（利用 Docker 层缓存）
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# 再复制源代码（这样代码改变时不会重新下载依赖）
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /workspace/target/smartlearn-backend-0.1.0.jar /app/smartlearn-backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/smartlearn-backend.jar"]
