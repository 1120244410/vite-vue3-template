#!/bin/bash

npm run build:stag
docker build -f Dockerfile -t registry.cn-hangzhou.aliyuncs.com/uki-web/uta:test ./dist
docker push registry.cn-hangzhou.aliyuncs.com/uki-web/uta:test
docker rmi registry.cn-hangzhou.aliyuncs.com/uki-web/uta:test
curl https://cs.console.aliyun.com/hook/trigger?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVzdGVySWQiOiJjZmI1ZWRjNDEwOGMxNDcwZThhZjNiYmM3NzA4ODE4ODIiLCJpZCI6IjE3MDM3NCJ9.S1MR6uU_SELNGWHuYOUcH-xUA5XkKUk6ObYl0Bq7avNheCz2NKMyQd2x_h_HuhqPlPGxSScBeOr1kYzNB3NOPcVelxALbkZhOKproiI5fAI5n6kVSqCBX93G1cv7vcZxEx72JkRwTEt2ssz5tP7o0FrTvBEgxDKZbDz2iZDahNk
