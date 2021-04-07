# ArgoEvents

![Argo Events](https://raw.githubusercontent.com/argoproj/argo-events/master/docs/assets/argo-events-top-level.png)

En este ejemplo vamos a despleagar ArgoEvents y usar un "event-source" de tipo webhook, para ejecutar una función OpenFaas a través de un sensor

## Prerequisitos

- [Instalación Básica de MicroK8s](/Microk8s.md)
- [OpenFaas instalado](/1.faas/openFaas/install.md)
- [OpenFaas cli instalado y configurado](/1.faas/openFaas/readme.md#cli)

## Instalar ArgoEvents

Crear un namespace

```sh
kubectl create namespace argo-events
```

Desplegar los componentes de Argo Events, SA, ClusterRoles, Sensor Controller, EventBus Controller and EventSource Controller

```sh
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install.yaml
```

Desplegar un eventbus,

```sh
kubectl apply -n argo-events -f https://raw.githubusercontent.com/argoproj/argo-events/stable/examples/eventbus/native.yaml
```

## Ejemplo

Desplegar un event-source de tipo webhook

```sh
kubectl -n argo-events apply -f event-source.yaml
```

Desplegar una función OpenFaas de ejemplo

```bash
faas-cli deploy -f https://raw.githubusercontent.com/MasterCloudApps-Projects/Serverless-Kubernetes/main/faas/openFaas/examples/hello-world.ym
```

Desplegar un sensor con un triger http a la función OpenFaas

```sh
kubectl -n argo-events apply -f sensor.yaml
```

Para probarlos abrimos el puerto del pod del event-source

```sh
kubectl -n argo-events port-forward webhook-eventsource-n2f6q-6d8775745c-pqmvb 12000:12000
```

Y hacemos una llamada post a este puerto

```sh
curl -d '{"message":"this is my first webhook"}' -H "Content-Type: application/json" -X POST http://localhost:12000/example
```

## Links

- [Argo events](https://argoproj.github.io/projects/argo-events/)
- [Available event sources](https://argoproj.github.io/argo-events/concepts/event_source/)
- [Http Triger](https://argoproj.github.io/argo-events/triggers/http-trigger/)