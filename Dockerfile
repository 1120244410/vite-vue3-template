FROM registry.cn-hangzhou.aliyuncs.com/uki-web/web-base-image:nginx
RUN mkdir -p /usr/src/app/neoclub/uta/

EXPOSE 81
COPY . /usr/src/app/neoclub/uta
