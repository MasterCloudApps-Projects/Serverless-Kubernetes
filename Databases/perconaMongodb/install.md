# Install mongodb operator

Guía de instalacion paso por paso del [opererador de MongoDb de Percona ](https://www.percona.com/doc/kubernetes-operator-for-psmongodb/index.html).


## Prerequisitos
[Instalacion Baseca de MicroK8s](../../Microk8s.md)


## Despliegue del operador
```shell
kubectl apply -f https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/v1.5.0/deploy/bundle.yaml
```
