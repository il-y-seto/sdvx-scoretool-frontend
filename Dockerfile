FROM node:13.0.1-stretch

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update && \
    apt-get install -y vim

WORKDIR /opt/app