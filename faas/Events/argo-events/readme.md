# ArgoEvents

![Argo Events](https://raw.githubusercontent.com/argoproj/argo-events/master/docs/assets/argo-events-top-level.png)

In this example we deploy ArgoEvents and use event-source of type webhook, to execute an openfaas function through a sensor


## Prerequisites

[Basic installation of microk8s](../../../Microk8s.md)
[OpenFaas installed](../../openFaas/install.md)
[OpenFaas cli installed and config](../../openFaas/readme.md#cli)


## Install ArgoEvents
Create the namespace

```sh
kubectl create namespace argo-events
```

Deploy Argo Events, SA, ClusterRoles, Sensor Controller, EventBus Controller and EventSource Controller

```sh
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-events/stable/manifests/install.yaml
```

Deploy the eventbus,
```sh
kubectl apply -n argo-events -f https://raw.githubusercontent.com/argoproj/argo-events/stable/examples/eventbus/native.yaml
```

## Test
Deploy event-source webhook
```sh
kubectl -n argo-events apply -f event-source.yaml
```

Deploy OpenFaas function
```bash
faas-cli deploy -f https://raw.githubusercontent.com/MasterCloudApps-Projects/Serverless-Kubernetes/master/faas/openFaas/examples/hello-world.ym
```

Deploy sensor with triger http to openfaas function
```sh
kubectl -n argo-events apply -f sensor.yaml
```

Open port of webhook pod
```sh
kubectl -n argo-events port-forward webhook-eventsource-n2f6q-6d8775745c-pqmvb 12000:12000
```

Post message to webhook
```sh
curl -d '{"message":"this is my first webhook"}' -H "Content-Type: application/json" -X POST http://localhost:12000/example
```

## Links
- [Argo events](https://argoproj.github.io/projects/argo-events/)
- [Available event sources](https://argoproj.github.io/argo-events/concepts/event_source/)
- [Http Triger](https://argoproj.github.io/argo-events/triggers/http-trigger/)