FROM node:14-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apk add --update --no-cache py-pip python curl git

WORKDIR /opt/app
