# Eventos
<!-- TODO -->
En esta sección se detallas las pruebas y ejemplos de como lanzar funciones openfaas de maneras distintas a una peticion http.

## Examples

### Cron 
En este ejemplo hacemos uno del [Cron Conector](https://github.com/openfaas/cron-connector) para programar la ejecución desatendida de una función
(Download Forecas)[../../app/functions/download-forecast] y el descriptor con el ejemplo lo tenemos aquí (download-forecas.yaml)[./examples/download-forecas.yml]
### minio-webhook
Aquí podemos ver como recibir un webhook desde minio a una función openfaas cuando se crea( o se sube ) un nuevo archivo a Minio
(minio-webhook)[./examples/minio-webhook.yml]
### nats queme
En este ejemplo tenemos 2 funciones, una que añade un mensaje a una cola nats y otra que se ejecuta cuando recibe este mensaje
