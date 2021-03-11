# Eventos
<!-- TODO -->
En esta sección se detallas las pruebas y ejemplos de como lanzar funciones openfaas de maneras distintas a una petición http.

## Examples

### Cron 
En este ejemplo hacemos uno del [Cron Conector](https://github.com/openfaas/cron-connector) para programar la ejecución desatendida de una función `Download Forecas`
- [Descriptor](/Examples/openfaas/download-forecast.yml)
- [Código](/app/functions/donwload-forecast)
### minio-webhook
Aquí podemos ver como recibir un webhook desde minio a una función openfaas cuando se crea( o se sube ) un nuevo archivo a Minio
(minio-webhook)[./examples/minio-webhook.yml]
- [Descriptor](/Examples/openfaas/minio-webhook.yml)
- [Código](/Examples/openfaas/minio-webhook)
### nats queme
En este ejemplo tenemos 2 funciones, una que añade un mensaje a una cola nats y otra que se ejecuta cuando recibe este mensaje
Función emisora
- [Descriptor](/Examples/openfaas/nats-publish.yml)
- [Código](/Examples/openfaas/nats-publish)

Función receptora
- [Descriptor](/Examples/openfaas/nats-reciver.yml)
- [Código](/Examples/openfaas/nats-reciver)