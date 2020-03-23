FROM node:10-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apk add --update --no-cache py-pip python curl

WORKDIR /opt/app
