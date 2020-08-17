# Install Knative

- Prerequisites

Basic installation of microk8s

```shell
multipass shell serverlessk8s
```

Enable istio addon

```shell
microk8s.enable istio
```

<https://knative.dev/docs/install/any-kubernetes-cluster/>

- Installing the Serving component
  
```shell
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.15.0/serving-crds.yaml
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.15.0/serving-core.yaml
kubectl apply --filename https://github.com/knative/net-istio/releases/download/v0.15.0/release.yaml
```

- Monitor the Knative components until all of the components show a STATUS of Running or Completed:

```shell
kubectl get pods --namespace knative-serving
```

- Installing the eventig component
  
```shell
kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/eventing-crds.yaml
kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/eventing-core.yaml
kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/in-memory-channel.yaml
kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/mt-channel-broker.yaml
```

- Monitor the Knative components until all of the components show a STATUS of Running:

```shell
kubectl get pods --namespace knative-eventing
```

- Installing the Observability plugin

```shell
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/monitoring-core.yaml
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/monitoring-metrics-prometheus.yaml
```
