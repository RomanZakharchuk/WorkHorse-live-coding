FROM mongo:8.0

RUN apt-get update && \
    apt-get install gosu && \
    rm -rf /var/lib/apt/lists/*

VOLUME /data/db
EXPOSE 27017 27017

CMD [ "--auth", "--bind_ip", "0.0.0.0" ]