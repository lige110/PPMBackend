FROM amazoncorretto:11

WORKDIR /app

COPY build/libs/ppmtool-*.jar app.jar

CMD ["sh","-c","java \
    -Duser.timezone=UTC \
    -jar app.jar"]