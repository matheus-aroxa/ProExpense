FROM  amazoncorretto:21-alpine-jdk
WORKDIR /app
COPY target/ProExpense-backend-0.0.1-SNAPSHOT.jar /app/ProExpense-backend-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/ProExpense-backend-0.0.1-SNAPSHOT.jar"]