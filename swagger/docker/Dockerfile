FROM openjdk:11-jre-slim

ARG VG_VERSION=0.0.1
ARG HOME=/opt/vg-swagger-$VG_VERSION
ARG JAR_FILE

COPY $JAR_FILE $HOME/app.jar
RUN touch $HOME/app.jar && \
    ln -s $HOME /opt/vg-swagger

COPY docker/docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8084
CMD ["swagger"]