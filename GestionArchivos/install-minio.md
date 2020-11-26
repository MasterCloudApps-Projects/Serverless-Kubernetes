# install minio

## Prerequisitos

Basic install microk8s

install helm3 in microk8s

```shell
microk8s.enable helm3
sudo snap alias microk8s.helm3 helm
```

## Whith helm 3

```shell
helm repo add minio https://helm.min.io/
helm install --set service.type=LoadBalancer my-minio minio/minio
```

```shell
kubectl get svc --namespace default -l release=my-minio
NAME       TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)          AGE
my-minio   LoadBalancer   10.152.183.223   192.168.0.105   9000:30544/TCP   16m
```
