# Eventos

## deploy broker
```
kubectl apply -f broker.yaml
```

we validate that the broker is created
```
kubectl --namespace event-example get Broker default
NAME      READY   REASON   URL                                                                              AGE
default   True             http://broker-ingress.knative-eventing.svc.cluster.local/event-example/default   4h34m
```

## Deploy event consumer
```
kubectl -n event-example apply hello-consumer.yaml
kubectl -n event-example apply goodby-consumer.yaml
```

validate
```sh
kubectl --namespace event-example get deployments hello-display goodbye-display

NAME              READY   UP-TO-DATE   AVAILABLE   AGE
hello-display     1/1     1            1           4h30m
goodbye-display   1/1     1            1           4h26m
```


SSH into the pod by running the following command:
```bash
kubectl -n event-example attach curl -it
```

launch the events. 

```sh
curl -v "http://broker-ingress.knative-eventing.svc.cluster.local/event-example/default" \
  -X POST \
  -H "Ce-Id: say-hello" \
  -H "Ce-Specversion: 1.0" \
  -H "Ce-Type: greeting" \
  -H "Ce-Source: not-sendoff" \
  -H "Content-Type: application/json" \
  -d '{"msg":"Hello Knative!"}'



curl -v "http://broker-ingress.knative-eventing.svc.cluster.local/event-example/default" \
  -X POST \
  -H "Ce-Id: say-goodbye" \
  -H "Ce-Specversion: 1.0" \
  -H "Ce-Type: not-greeting" \
  -H "Ce-Source: sendoff" \
  -H "Content-Type: application/json" \
  -d '{"msg":"Goodbye Knative!"}'


curl -v "http://broker-ingress.knative-eventing.svc.cluster.local/event-example/default" \
  -X POST \
  -H "Ce-Id: say-hello" \
  -H "Ce-Specversion: 1.0" \
  -H "Ce-Type: greeting" \
  -H "Ce-Source: sendoff" \
  -H "Content-Type: application/json" \
  -d '{"msg":"Hello Knative!"}'
```


## Verifying that events were received

```bash
kubectl -n event-example logs -l app=hello-display --tail=100
```

```log
☁️  cloudevents.Event
Validation: valid
Context Attributes,
  specversion: 1.0
  type: greeting
  source: not-sendoff
  id: say-hello
  datacontenttype: application/json
Extensions,
  knativearrivaltime: 2020-11-05T17:15:18.675858622Z
  knativehistory: default-kne-trigger-kn-channel.event-example.svc.cluster.local
Data,
  {
    "msg": "Hello Knative!"
  }
☁️  cloudevents.Event
Validation: valid
Context Attributes,
  specversion: 1.0
  type: greeting
  source: sendoff
  id: say-hello-goodbye
  datacontenttype: application/json
Extensions,
  knativearrivaltime: 2020-11-05T17:15:32.381831666Z
  knativehistory: default-kne-trigger-kn-channel.event-example.svc.cluster.local
Data,
  {
    "msg": "Hello Knative! Goodbye Knative!"
  }
```

```bash
kubectl -n event-example logs -l app=goodbye-display --tail=100
```

```log
☁️  cloudevents.Event
Validation: valid
Context Attributes,
  specversion: 1.0
  type: not-greeting
  source: sendoff
  id: say-goodbye
  datacontenttype: application/json
Extensions,
  knativearrivaltime: 2020-11-05T17:15:25.578178677Z
  knativehistory: default-kne-trigger-kn-channel.event-example.svc.cluster.local
Data,
  {
    "msg": "Goodbye Knative!"
  }
☁️  cloudevents.Event
Validation: valid
Context Attributes,
  specversion: 1.0
  type: greeting
  source: sendoff
  id: say-hello-goodbye
  datacontenttype: application/json
Extensions,
  knativearrivaltime: 2020-11-05T17:15:32.381831666Z
  knativehistory: default-kne-trigger-kn-channel.event-example.svc.cluster.local
Data,
  {
    "msg": "Hello Knative! Goodbye Knative!"
  }
```