# Eventos con OpenFaaS

En esta sección se detallas las pruebas y ejemplos de como lanzar funciones OpenFaaS de maneras distintas a una petición http.

## Examples

### Cron

En este ejemplo hacemos uno del [Cron Conector](https://github.com/OpenFaaS/cron-connector) para programar la ejecución desatendida de una función `Download Forecas`

- [Descriptor](/Examples/OpenFaaS/download-forecast.yml)
- [Código](/6.app/functions/download-forecast)

### minio-webhook

Aquí podemos ver como recibir un webhook desde minio a una función OpenFaaS cuando se crea ( o se sube ) un nuevo archivo a Minio

- [Descriptor](/Examples/OpenFaaS/minio-webhook.yml)
- [Código](/Examples/OpenFaaS/minio-webhook)

### nats queme

En este ejemplo tenemos 2 funciones, una que añade un mensaje a una cola nats y otra que se ejecuta cuando recibe este mensaje
Función emisora

- [Descriptor](/Examples/OpenFaaS/nats-publish.yml)
- [Código](/Examples/OpenFaaS/nats-publish)

Función receptora

- [Descriptor](/Examples/OpenFaaS/nats-reciver.yml)
- [Código](/Examples/OpenFaaS/nats-reciver)
