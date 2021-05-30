# Eventos con OpenFaaS

En esta sección se detallas las pruebas y ejemplos de como lanzar funciones OpenFaaS de maneras distintas a una petición http.

## Examples

### Cron

En este ejemplo hacemos uno del [Cron Connector](https://github.com/OpenFaaS/cron-connector) para programar la ejecución desatendida de una función `Download Forecas`

- [Descriptor](/Examples/OpenFaaS/download-forecast.yml)
- [Código](/6.app/functions/download-forecast)

para poder probar  la función es necesario desplegar el [Cron Connector](https://github.com/OpenFaaS/cron-connector)

```ssh
kubectl apply -f https://raw.githubusercontent.com/MasterCloudApps-Projects/Serverless-Kubernetes/main/Examples/openfaas/kubernetes/cron-connector.yaml
```

### minio-webhook

Aquí podemos ver como recibir un webhook desde minio a una función OpenFaaS cuando se crea ( o se sube ) un nuevo archivo a Minio

- [Descriptor](/Examples/OpenFaaS/minio-webhook.yml)
- [Código](/Examples/OpenFaaS/minio-webhook)

1. Creamos el bucket

    ```bash
    mc mb minio-tfm/forecast
    ```

1. Configuramos los eventos del bucket

    ```sh
    mc admin config set minio-tfm notify_webhook:1 endpoint=http://gateway.openfaas:8080/function/minio-webhook 
    
    mc event add minio-tfm/forecast arn:minio:sqs::1:webhook --event put --suffix .xml

    ```

1. Subimos un xml a el bucket via web
1. Comprobamos el logs de la función

    ```sh
    faas logs minio-webhook
    ```

### nats queme

En este ejemplo tenemos 2 funciones, una que añade un mensaje a una cola nats y otra que se ejecuta cuando recibe este mensaje haciendo uso de [nats-connector](https://github.com/openfaas/nats-connector)
∑

```sh
kubectl apply -f https://raw.githubusercontent.com/MasterCloudApps-Projects/Serverless-Kubernetes/main/Examples/openfaas/kubernetes/nats-connector.yaml
```

#### Función emisora

- [Descriptor](/Examples/OpenFaaS/nats-publish.yml)
- [Código](/Examples/OpenFaaS/nats-publish)

#### Función receptora

- [Descriptor](/Examples/OpenFaaS/nats-reciver.yml)
- [Código](/Examples/OpenFaaS/nats-reciver)
