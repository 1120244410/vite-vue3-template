#!/bin/bash

npm run build:develop
docker build -f Dockerfile -t registry.cn-hangzhou.aliyuncs.com/uki-web/uta:develop ./dist
docker push registry.cn-hangzhou.aliyuncs.com/uki-web/uta:develop
docker rmi registry.cn-hangzhou.aliyuncs.com/uki-web/uta:develop
curl http://devops-dev.neoclub.cn/k8s/restart/deployment/default/uki-h5-uta