
- config nats server
mc admin config set minio-tfm notify_nats:1 address=nats.openfaas.svc:4222 subject=minio

- config event 
mc event add  minio-tfm/forecast arn:minio:sqs:us-east-1:1:nats --suffix .xml
mc event list minio-tfm/forecast


- test event 
faas-cli deploy --name receive-message --image openfaas/receive-message:latest --fprocess='./handler' --annotation topic="minio"