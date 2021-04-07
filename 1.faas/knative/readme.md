# Knative

![knative](https://github.com/knative/docs/raw/main/background.png)
<!-- TODO  añadir imagen knative-->

En esta sección vamos a instalar y probar Knative, ademas de desplegar Knative vamos a desplegar una función que nos servirá un API REST.
[Google clod run](https://cloud.google.com/run/) esta basado en Knative.

- [Documentación oficial](https://knative.dev/)

## Instalación

- [Instalación Knative](install.md)

## Como desarrollar

El desarrollo en Knative es simplemente montar un contenedor Docker con cualquier lenguaje y crear un descriptor YAML para desplegar el CRD del servicio Knative

## Ejemplos

### REST api

En este caso hemos creado una pequeña api resto con NODE simulando la base de datos en memoria.

#### Despliegue

Aplicamos el archivo yaml con el servicio Knative

```bash
kubectl apply --filename examples/REST/service.yaml
```

####  Llamada

Recuperamos la url del servicio Knative

``` shell
kubectl get ksvc knative-rest  --output=custom-columns=NAME:.metadata.name,URL:.status.url
NAME           URL
knative-rest   http://knative-rest.default.example.com
```

## Monitorización

La instalación de Knative  
<!-- TODO añadir monitorizacion  -->
- prometheus and grafana instaled and configured in knative-monitoring namespace

## Links

- [Auto Scaling](https://knative.dev/docs/serving/autoscaling/)
- [Event sources](https://knative.dev/docs/eventing/sources/)