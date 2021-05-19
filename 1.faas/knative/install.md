# Instalar Knative

## Prerequisitos

- [Instalación Básica de MicroK8s](/Microk8s.md)

Habilitar el addon  de istio

```shell
multipass shell serverlessk8s
```

```shell
microk8s.enable istio
```

## Pasos

- Instalar 'Serving component'
  
  ```shell
  kubectl apply --filename https://github.com/knative/serving/releases/download/v0.15.0/serving-crds.yaml
  kubectl apply --filename https://github.com/knative/serving/releases/download/v0.15.0/serving-core.yaml
  kubectl apply --filename https://github.com/knative/net-istio/releases/download/v0.15.0/release.yaml
  ```

- Verificamos la instalación del 'Serving component'
  todos los componentes deben tener el estado `Running` o `Completed`:

  ```shell
  kubectl get pods --namespace knative-serving
  ```

- Instalar 'eventing component'
  
  ```shell
  kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/eventing-crds.yaml
  kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/eventing-core.yaml
  kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/in-memory-channel.yaml
  kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.16.0/mt-channel-broker.yaml
  ```

- Verificamos la instalación del 'eventing component'
  todos los componentes deben tener el estado `Running` o `Completed`:

  ```shell
  kubectl get pods --namespace knative-eventing
  ```

- Instalar 'Observability plugin'

  ```shell
  kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/monitoring-core.yaml
  kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/monitoring-metrics-prometheus.yaml
  ```

- Verificamos la instalación del 'Observability plugin'
  todos los componentes deben tener el estado `Running` o `Completed`:

  ```shell
  kubectl get pods --namespace knative-monitoring
  ```
  