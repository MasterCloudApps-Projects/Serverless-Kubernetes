# Configure minio

## Create bucket
```bash
mc mb minio-tfm/forecast
```

## config nats server
```bash
mc admin config set minio-tfm notify_nats:1 address=nats.openfaas.svc:4222 subject=minio
```

## config event 
```bash
mc event add minio-tfm/forecast arn:minio:sqs:us-east-1:1:nats --suffix .xml --event put
mc event list minio-tfm/forecast
```