# Knative

![knative](https://github.com/knative/docs/raw/main/background.png)

En esta sección vamos a instalar y probar Knative, ademas de desplegar Knative vamos a desplegar una función que nos servirá un API REST.
[Google cloud run](https://cloud.google.com/run/) esta basado en Knative.

- [Documentación oficial](https://knative.dev/)

## Instalación

- [Instalación Knative](install.md)

## Como desarrollar

El desarrollo en Knative es simplemente montar un contenedor Docker con cualquier lenguaje y crear un descriptor YAML para desplegar el CRD del servicio Knative

## Ejemplos

### REST api

En este caso hemos creado una pequeña api REST con NODE simulando la base de datos en memoria.

- [Código](/Examples/knative/REST)

#### Despliegue

Aplicamos el archivo yaml con el servicio Knative

```bash
kubectl apply --filename https://raw.githubusercontent.com/MasterCloudApps-Projects/Serverless-Kubernetes/main/Examples/knative/REST/service.yaml
```

####  Llamada

Recuperamos la url del servicio Knative

``` shell
kubectl get ksvc knative-rest  --output=custom-columns=NAME:.metadata.name,URL:.status.url
NAME           URL
knative-rest   http://knative-rest.default.example.com
```

Recuperamos la ip de la maquina virtual

```shell
multipass list

Name                    State             IPv4             Image
serverlessk8s           Running           192.168.64.2     Ubuntu 20.04 LTS
```

Recuperamos el puerto del istio gateway

```shell
kubectl --namespace istio-system get service istio-ingressgateway
NAME                   TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)                 AGE
istio-ingressgateway   LoadBalancer   10.152.183.152   10.64.140.43   ... ,80:31380/TCP,...   22h
```

en este caso nos quedamos con el puerto externo equivalente al puerto 80

Y probamos el servicio a partir de esta plantilla (desde dentro de la maquina virtual podemos usar localhost )

```shell
curl -H "Host: knative-rest.default.example.com" http://[`ip de la maquina virtual`]:[`puerto externo del istio gateway`]
```

con los datos que tenemos quedaria la siguiente llamada y respuesta

```shell
curl -H "Host: knative-rest.default.example.com" http://192.168.64.2:31380/users

{"error":false,"code":200,"message":"Users fetched successfully","data":[{"username":"franrobles","name":"Francisco","lastname":"Robles"},{"username":"anajohnson","name":"Ana","lastname":"Johnson"}]}
```

## Monitorización

Prometheus y Grafana se han instalado en el namespace knative-monitoring

Primeramente tenemos que acceder a grafana, podremos hacer un proxy al puerto del servicio, pero por comodidad vamos a exponer el servicio con un ingress.

```bash
kubectl apply -f ingress-grafana.yml
```

accedes al dominio de ingress <http://grafana.192.168.64.2.nip.io/>

<!-- TODO añadir monitorizacion  -->
## Links

- [Auto Scaling](https://knative.dev/docs/serving/autoscaling/)
- [Event sources](https://knative.dev/docs/eventing/sources/)
