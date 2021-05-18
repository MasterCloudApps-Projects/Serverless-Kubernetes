# Eventos en Knative

## Ejemplo de Event Broker

 En este ejemplo hemos echo uso del event broker en memoria de knative lanzar un evento al broker y comprobar como se ejecutan una de las 2 funciones que hemos desplegado.

## Pasos

### Despliegue del "broker"

```bash
kubectl apply -f broker.yaml
```

validamos que el broker ha sido creado

```bash
kubectl --namespace event-example get Broker default
NAME      READY   REASON   URL                                                                              AGE
default   True             http://broker-ingress.knative-eventing.svc.cluster.local/event-example/default   4h34m
```

### Despliegue del "event consumers"

```bash
kubectl -n event-example apply hello-consumer.yaml
kubectl -n event-example apply goodby-consumer.yaml
```

validamos que el confumidor se ha creado correctamente.

```bash
kubectl --namespace event-example get deployments hello-display goodbye-display

NAME              READY   UP-TO-DATE   AVAILABLE   AGE
hello-display     1/1     1            1           4h30m
goodbye-display   1/1     1            1           4h26m
```

Para realizar la prueba nos vamos a conectar al el pod con el siguiente comando:

```bash
kubectl -n event-example attach curl -it
```

Lanzamos las llamadas con curl desde el pod

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

## Verificamos que se han recivido y tratado los eventos

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
