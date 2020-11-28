# Install postgresql operator

How to install zalando postres operator

## prerequisites

[Basic installation of microk8s](../../Microk8s.md)

1. install helm3 in microk8s

```shell
microk8s.enable helm3
sudo snap alias microk8s.helm3 helm
```

## Install operator 

```shell
# First, clone the repository and change to the directory
git clone https://github.com/zalando/postgres-operator.git
cd postgres-operator
```

```shell
helm install postgres-operator ./charts/postgres-operator -f ./charts/postgres-operator/values-crd.yaml
```

### Deploy UI

```shell
helm install postgres-operator-ui ./charts/postgres-operator-ui
```

Access to ui

```shell
kubectl port-forward svc/postgres-operator-ui 8081:8081
```

visit <http://localhost:8081>

