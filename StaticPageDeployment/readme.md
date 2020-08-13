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

Configure mc client

```shell
# mc config host add minio-local http://<VirtualMachine-IP>:<External-Port> YOURACCESSKEY YOURSECRETKEY S3v4
mc config host add minio-local http://192.168.64.9:30544 YOURACCESSKEY YOURSECRETKEY
```

## Create and configure bucket

```shell
mc mb minio-local/static-site
mc policy set download minio-local/static-site
```

## upload static site 

```shell
mc mirror ./simple-app/dist minio-local/static-site
...d34bd3.js:  151.63 KiB / 151.63 KiB  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  1.24 MiB/s 0s
```

## Deploy ingress service

```shell
kubectl apply -f ingress.yaml
```

you can see de static site in
<https://miniostatic.192.168.64.9.nip.io/>
