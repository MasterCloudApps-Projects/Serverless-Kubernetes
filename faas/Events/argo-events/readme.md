# Argo Events

![argo events](https://raw.githubusercontent.com/argoproj/argo-events/master/docs/assets/argo-events-top-level.png)


## Install
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
kubectl apply -n argo-events -f https://raw.githubusercontent.com/argoproj/argo
```


## Test
Deploy event-source webhook
```sh
kubectl -n argo-events apply -f event-source.yml
```

Deploy sensor with triger http to openfaas function
```sh
kubectl -n argo-events apply -f sensor.yml
```

```sh
kubectl -n argo-events port-forward webhook-eventsource-n2f6q-6d8775745c-pqmvb 12000:12000
```

```sh
curl -d '{"message":"this is my first webhook"}' -H "Content-Type: application/json" -X POST http://localhost:12000/example
```

## Links
- [Argo events](https://argoproj.github.io/projects/argo-events/)
- [Available event sources](https://argoproj.github.io/argo-events/concepts/event_source/)
- [Http Triger](https://argoproj.github.io/argo-events/triggers/http-trigger/)