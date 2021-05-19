# Configuración del storage minio

> Necesitamos minio client instalado y configurado contra nuestro cluster.

## Despliegue de la aplicación web

1. Creamos y configuramos un bucket

    ```shell
    mc mb minio-tfm/static-site
    mc policy set download minio-tfm/static-site
    ```

1. Subimos a minio los archivos estáticos

    ```shell
    mc mirror ./faas-forecast/dist minio-tfm/static-site
    ```

1. Desplegamos la configuración de ingress

    ```shell
    kubectl apply -f kube/ingress.yaml
    ```

## Configuración del storage para los ficheros de predicciones

1. Creamos el bucket

    ```bash
    mc mb minio-tfm/forecast
    ```

1. Configuramos los eventos del bucket a la cola nats

    ```bash
    mc admin config set minio-tfm notify_nats:1 address=nats.openfaas.svc:4222 subject=minio
    ```

    ```bash
    mc event add minio-tfm/forecast arn:minio:sqs:us-east-1:1:nats --suffix .xml --event put
    mc event list minio-tfm/forecast
    ```
