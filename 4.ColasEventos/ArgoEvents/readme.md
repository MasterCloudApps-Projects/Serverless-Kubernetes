# ArgoEvents

![Argo Events](https://raw.githubusercontent.com/argoproj/argo-events/master/docs/assets/argo-events-top-level.png)

En este ejemplo vamos a desplegar [ArgoEvents](https://argoproj.github.io/argo-events/)  y usar un "event-source" de tipo webhook, para ejecutar una función OpenFaaS a través de un sensor

## Prerequisitos

- [Instalación Básica de MicroK8s](/Microk8s.md)
- [OpenFaaS instalado](/1.faas/OpenFaaS/install.md)
- [OpenFaaS cli instalado y configurado](/1.faas/OpenFaaS/readme.md#cli)

## Instalar ArgoEvents

Crear un namespace

```sh
kubectl create namespace argo-events
```

Desplegar los componentes de Argo Events, SA, ClusterRoles, Sensor Controller, EventBus Controller and EventSource Controller

```sh
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install.yaml
```

Desplegar un eventbus

```sh
kubectl apply -n argo-events -f https://raw.githubusercontent.com/argoproj/argo-events/stable/examples/eventbus/native.yaml
```

## Ejemplo

En este ejemplo vamos a desplegar un event-source de tipo webhook para iniciar el proceso,

```sh
kubectl -n argo-events apply -f event-source.yaml
```

Localizamos el pod que ha desplegado este webhook para "abrir" un puerto.

```sh
kubectl -n argo-events get pods --selector owner-name=webhook                      
NAME                                         READY   STATUS    RESTARTS   AGE
webhook-eventsource-k69fk-6769c7bbc8-2g9q8   1/1     Running   0          8m53s
```

```sh
kubectl -n argo-events port-forward webhook-eventsource-k69fk-6769c7bbc8-2g9q8 12000:12000
```

Desplegar una función OpenFaaS de ejemplo

```bash
faas-cli deploy -f https://raw.githubusercontent.com/MasterCloudApps-Projects/Serverless-Kubernetes/main/Examples/openfaas/hello-world.yml
```

Desplegar un sensor con un triger http a la función OpenFaaS

```sh
kubectl -n argo-events apply -f sensor.yaml
```

Para probarlos abrimos el puerto del pod del event-source

Y hacemos una llamada post a este puerto

```sh
curl -d '{"message":"this is my first webhook"}' -H "Content-Type: application/json" -X POST http://localhost:12000/example
```

Comprobamos en el log que se ha llamado a la funcion hello-world

```sh
faas logs hello-world
```

## Links

- [Argo events](https://argoproj.github.io/projects/argo-events/)
- [Available event sources](https://argoproj.github.io/argo-events/concepts/event_source/)
- [Http Triger](https://argoproj.github.io/argo-events/triggers/http-trigger/)
