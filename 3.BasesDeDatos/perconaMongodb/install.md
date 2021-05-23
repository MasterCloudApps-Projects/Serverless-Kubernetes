# Instalación

Guía de instalación paso por paso del [operador de MongoDb de Percona](https://www.percona.com/doc/kubernetes-operator-for-psmongodb/index.html).

## Prerequisitos

[Instalación Básica de MicroK8s](/Microk8s.md)

## Despliegue del operador

```shell
kubectl apply -f https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/v1.7.0/deploy/bundle.yaml
```

Podemos comporobar que el operador esta funcionando cuando su pod esta `Running`

```sh
kubectl get pod --selector=name=percona-server-mongodb-operator


NAME                                               READY   STATUS    RESTARTS   AGE
percona-server-mongodb-operator-6b5dbccbd5-p2jr2   1/1     Running   41         200d
````
