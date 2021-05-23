# Instalación

Guía de instalación paso por paso del [operador de PostgreSQL de Zalando](https://github.com/zalando/postgres-operator).

## Prerequisitos

[Instalación básica de MicroK8s](../../Microk8s.md)

- Instalar helm3 en microk8s

    ```shell
    microk8s.enable helm3
    sudo snap alias microk8s.helm3 helm
    ```

## Instalar el operador

1. Clonamos el repositorio

    ```shell
    git clone https://github.com/zalando/postgres-operator.git
    cd postgres-operator
    ```

1. Instalamos el operador de PostgreSql con helm

    ```shell
    helm install postgres-operator ./charts/postgres-operator -f ./charts/postgres-operator/values-crd.yaml
    ```

### Desplegamos la interfaz web (UI)

Instalamos la UI con con helm

```shell
helm install postgres-operator-ui ./charts/postgres-operator-ui
```

Abrimos el puerto a la UI con port-forward

```shell
kubectl port-forward svc/postgres-operator-ui 8081:8081
```

Y visitamos la web

- <http://localhost:8081>
